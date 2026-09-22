import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision';
import { 
  Camera, 
  CameraOff, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Award, 
  Activity,
  Save,
  Layers,
  Wind,
  Sparkles,
  Scan,
  Timer,
  Play,
  Pause,
  Download,
  Eye,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import { saveWorkoutSession } from '../firebase/config';

// 33 Landmark skeleton connections
const POSE_CONNECTIONS = [
  [11, 12], // Shoulders
  [11, 13], [13, 15], // Left Arm
  [12, 14], [14, 16], // Right Arm
  [11, 23], [12, 24], // Torso sides
  [23, 24], // Hips
  [23, 25], [25, 27], // Left Leg
  [24, 26], [26, 28], // Right Leg
  [27, 29], [29, 31], // Left Foot
  [28, 30], [30, 32], // Right Foot
  [0, 1], [1, 2], [2, 3], [3, 7], // Left Face
  [0, 4], [4, 5], [5, 6], [6, 8]  // Right Face
];

const EXERCISES = [
  { id: 'squats', name: 'Squats', targetKcal: 0.45, icon: '🦵', targetMuscle: 'Quadriceps & Glutes' },
  { id: 'bicep_curls', name: 'Bicep Curls', targetKcal: 0.35, icon: '💪', targetMuscle: 'Biceps Brachii' },
  { id: 'pushups', name: 'Pushups', targetKcal: 0.55, icon: '🤸‍♂️', targetMuscle: 'Pectoralis & Triceps' },
  { id: 'deltoid_raises', name: 'Lateral Deltoid Raises', targetKcal: 0.38, icon: '⚡', targetMuscle: 'Anterior & Lateral Deltoids' },
  { id: 'plank', name: 'Core Plank Hold', targetKcal: 0.4, icon: '🛡️', targetMuscle: 'Rectus Abdominis & Core' },
  { id: 'jumping_jacks', name: 'Jumping Jacks & Calf Hops', targetKcal: 0.42, icon: '⚡', targetMuscle: 'Calves & Kinetic Chain' }
];

const LOOKSMAXXING_DRILLS = [
  {
    id: 'mewing',
    title: 'Mewing & Palatal Tongue Posture',
    target: 'Maxillofacial & Hyoid Musculature',
    duration: 60,
    description: 'Press entire tongue firmly against roof of mouth. Breathe exclusively through nose.',
    benefits: 'Elevates hyoid bone, tightens submental skin, prevents recessed jaw posture.',
    type: 'timer'
  },
  {
    id: 'masseter',
    title: 'Masseter Hypertrophy Clenches',
    target: 'Masseter & Mandibular Angles',
    duration: 45,
    repsTarget: 15,
    description: 'Contract masseters firmly for 3s, release for 2s. Focus on bilateral symmetrical jaw engagement.',
    benefits: 'Widens jawline contour, improves angularity at gonial angles.',
    type: 'intervals'
  },
  {
    id: 'cheekbone',
    title: 'Zygomatic & Cheekbone Lift',
    target: 'Zygomaticus Major & Minor',
    duration: 40,
    repsTarget: 10,
    description: 'Smile widely while lifting cheek muscles toward temples without squinting eyes.',
    benefits: 'Defines cheek hollows, accentuates zygomatic arches.',
    type: 'intervals'
  },
  {
    id: 'chin_tuck',
    title: 'Cervical Chin Tuck & Spine Lock',
    target: 'Deep Cervical Flexors',
    duration: 50,
    description: 'Retract chin backward, aligning occiput over thoracic spine. Hold 5s per rep.',
    benefits: 'Corrects forward head carriage, sharpens jaw-to-neck definition.',
    type: 'intervals'
  }
];

const BREATHING_PROTOCOLS = [
  {
    id: 'box',
    name: 'Box Breathing (Navy SEAL 4-4-4-4)',
    category: 'Stress Regulation',
    phases: [
      { name: 'INHALE', duration: 4, label: 'Deep diaphragmatic intake', color: '#00E5FF' },
      { name: 'HOLD', duration: 4, label: 'Lock lungs full, expand chest', color: '#FF6B00' },
      { name: 'EXHALE', duration: 4, label: 'Smooth controlled release', color: '#10B981' },
      { name: 'HOLD', duration: 4, label: 'Lungs empty, nervous reset', color: '#00E5FF' }
    ]
  },
  {
    id: '478',
    name: '4-7-8 Parasympathetic Reset',
    category: 'Vagal Nerve Activation',
    phases: [
      { name: 'INHALE', duration: 4, label: 'Quiet nose inhalation', color: '#00E5FF' },
      { name: 'HOLD', duration: 7, label: 'Oxygen perfusion', color: '#FF6B00' },
      { name: 'EXHALE', duration: 8, label: 'Whoosh mouth exhale', color: '#10B981' }
    ]
  }
];

export default function WorkoutTracker({ 
  onSessionSaved, 
  initialExercise = 'squats', 
  initialMode = 'movement' 
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Active Studio Mode: 'movement' | 'looksmaxxing' | 'pulmonary'
  const [activeStudioMode, setActiveStudioMode] = useState(initialMode);
  
  // General Tracking States
  const [cameraActive, setCameraActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(initialExercise);

  // Synchronize dynamic prop updates from 3D Scene or parent router
  useEffect(() => {
    if (initialMode) setActiveStudioMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (initialExercise) setSelectedExercise(initialExercise);
  }, [initialExercise]);
  const [feedback, setFeedback] = useState("Initializing AI Camera...");
  const [feedbackType, setFeedbackType] = useState('neutral');
  const [repCount, setRepCount] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [mistakesList, setMistakesList] = useState([]);
  const [accuracyScore, setAccuracyScore] = useState(100);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(null);
  const [liveAngleReadout, setLiveAngleReadout] = useState(null);

  // Looksmaxxing Mode States
  const [looksmaxxingDrillIdx, setLooksmaxxingDrillIdx] = useState(0);
  const [drillRunning, setDrillRunning] = useState(false);
  const [drillTimeLeft, setDrillTimeLeft] = useState(LOOKSMAXXING_DRILLS[0].duration);
  const [drillReps, setDrillReps] = useState(0);
  const [drillPhase, setDrillPhase] = useState('CONTRACT');
  const [hudOverlay, setHudOverlay] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  // Pulmonary Mode States
  const [activeProtocolId, setActiveProtocolId] = useState('box');
  const [breathingRunning, setBreathingRunning] = useState(false);
  const [breathPhaseIdx, setBreathPhaseIdx] = useState(0);
  const [breathSecondsLeft, setBreathSecondsLeft] = useState(BREATHING_PROTOCOLS[0].phases[0].duration);
  const [breathCycles, setBreathCycles] = useState(0);
  const [isHoldChallenge, setIsHoldChallenge] = useState(false);
  const [holdTimer, setHoldTimer] = useState(0);
  const [isHoldingActive, setIsHoldingActive] = useState(false);
  const [bestHoldRecord, setBestHoldRecord] = useState(48);

  // State Machine Ref for Movement Rep Counting
  const repStateRef = useRef({
    phase: 'AWAITING_VISIBILITY',
    hasReachedPeak: false,
    repStartTime: 0,
    lastRepCompleteTime: 0
  });

  const repCountRef = useRef(0);
  const mistakesCountRef = useRef(0);
  const poseLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);
  const lastWarningTimeRef = useRef(0);

  // Sync props if changed
  useEffect(() => {
    if (initialMode && initialMode !== activeStudioMode) {
      setActiveStudioMode(initialMode);
    }
  }, [initialMode]);

  useEffect(() => {
    if (initialExercise && initialExercise !== selectedExercise) {
      setSelectedExercise(initialExercise);
      resetWorkout();
    }
  }, [initialExercise]);

  const calculateAngle = (a, b, c) => {
    if (!a || !b || !c) return 0;
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return Math.round(angle);
  };

  const hasGoodVisibility = (landmarks, indices, minConf = 0.65) => {
    return indices.every(idx => {
      const lm = landmarks[idx];
      return lm && (lm.visibility === undefined || lm.visibility >= minConf);
    });
  };

  const triggerRepComplete = useCallback((exerciseName) => {
    const now = performance.now();
    if (now - repStateRef.current.lastRepCompleteTime < 1100) return;

    repStateRef.current.lastRepCompleteTime = now;
    repStateRef.current.phase = 'START_REST';
    repStateRef.current.hasReachedPeak = false;

    repCountRef.current += 1;
    const newCount = repCountRef.current;
    setRepCount(newCount);

    const activeEx = EXERCISES.find(e => e.id === exerciseName || e.name.toLowerCase() === exerciseName.toLowerCase()) || EXERCISES[0];
    setCaloriesBurned(Math.round(newCount * activeEx.targetKcal * 10) / 10);

    soundFX.playRepChime();
    setFeedback(`👍 Verified Rep #${newCount} completed! Clean form.`);
    setFeedbackType('good');

    if (newCount % 10 === 0) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  }, []);

  const triggerMistakeWarning = useCallback((warningText) => {
    const now = performance.now();
    if (now - lastWarningTimeRef.current > 2500) {
      lastWarningTimeRef.current = now;
      mistakesCountRef.current += 1;
      setMistakesList(prev => [...prev.slice(-9), `${warningText} (Rep ${repCountRef.current + 1})`]);
      soundFX.playWarningBeep();

      const totalAttempts = repCountRef.current + mistakesCountRef.current;
      const score = totalAttempts > 0 ? Math.round((repCountRef.current / totalAttempts) * 100) : 100;
      setAccuracyScore(Math.max(60, score));
    }
    setFeedback(`⚠️ ${warningText}`);
    setFeedbackType('warning');
  }, []);

  // Movement Form Analyzer with Strict Visibility Checks
  const analyzeExercise = useCallback((landmarks, exercise) => {
    if (!landmarks || landmarks.length < 33) return;
    const state = repStateRef.current;
    const now = performance.now();

    if (exercise === 'squats') {
      const leftVisible = hasGoodVisibility(landmarks, [23, 25, 27], 0.65);
      const rightVisible = hasGoodVisibility(landmarks, [24, 26, 28], 0.65);

      if (!leftVisible && !rightVisible) {
        setFeedback("⚠️ Stand back: Full legs & knees must be visible in frame.");
        setFeedbackType('warning');
        setLiveAngleReadout(null);
        state.phase = 'AWAITING_VISIBILITY';
        return;
      }

      const hip = leftVisible ? landmarks[23] : landmarks[24];
      const knee = leftVisible ? landmarks[25] : landmarks[26];
      const ankle = leftVisible ? landmarks[27] : landmarks[28];
      const shoulder = leftVisible ? landmarks[11] : landmarks[12];

      const kneeAngle = calculateAngle(hip, knee, ankle);
      const torsoAngle = calculateAngle(shoulder, hip, knee);
      setLiveAngleReadout(`Knee: ${kneeAngle}° | Torso: ${torsoAngle}°`);

      if (kneeAngle > 158) {
        if (state.hasReachedPeak) {
          triggerRepComplete('squats');
        } else {
          state.phase = 'START_REST';
          setFeedback("Ready. Begin squat descent.");
          setFeedbackType('neutral');
        }
      } else if (kneeAngle < 105) {
        state.hasReachedPeak = true;
        state.phase = 'PEAK_REACHED';

        if (torsoAngle < 70) {
          triggerMistakeWarning("Chest collapsed forward! Keep spine upright.");
        } else {
          setFeedback("⚡ Great depth! Drive through heels to stand.");
          setFeedbackType('good');
        }
      }
    } else if (exercise === 'bicep_curls') {
      const leftArm = hasGoodVisibility(landmarks, [11, 13, 15], 0.65);
      const rightArm = hasGoodVisibility(landmarks, [12, 14, 16], 0.65);

      if (!leftArm && !rightArm) {
        setFeedback("⚠️ Position arm in clear camera view (shoulder to wrist).");
        setFeedbackType('warning');
        setLiveAngleReadout(null);
        state.phase = 'AWAITING_VISIBILITY';
        return;
      }

      const shoulder = rightArm ? landmarks[12] : landmarks[11];
      const elbow = rightArm ? landmarks[14] : landmarks[13];
      const wrist = rightArm ? landmarks[16] : landmarks[15];

      const elbowAngle = calculateAngle(shoulder, elbow, wrist);
      setLiveAngleReadout(`Elbow: ${elbowAngle}°`);

      if (elbowAngle > 145) {
        if (state.hasReachedPeak) {
          triggerRepComplete('bicep_curls');
        } else {
          state.phase = 'START_REST';
          setFeedback("Arms extended. Curl upward smoothly.");
          setFeedbackType('neutral');
        }
      } else if (elbowAngle < 55) {
        state.hasReachedPeak = true;
        state.phase = 'PEAK_REACHED';
        setFeedback("🔥 Peak contraction! Lower with control.");
        setFeedbackType('good');
      }
    } else if (exercise === 'deltoid_raises') {
      const torsoVisible = hasGoodVisibility(landmarks, [11, 12, 13, 14, 23, 24], 0.65);
      if (!torsoVisible) {
        setFeedback("⚠️ Stand back: Torso and both arms must be in view.");
        setFeedbackType('warning');
        setLiveAngleReadout(null);
        return;
      }

      const leftAbduction = calculateAngle(landmarks[23], landmarks[11], landmarks[13]);
      const rightAbduction = calculateAngle(landmarks[24], landmarks[12], landmarks[14]);
      const avgAbduction = Math.round((leftAbduction + rightAbduction) / 2);
      setLiveAngleReadout(`Deltoid Abduction: ${avgAbduction}°`);

      if (avgAbduction < 30) {
        if (state.hasReachedPeak) {
          triggerRepComplete('deltoid_raises');
        } else {
          state.phase = 'START_REST';
          setFeedback("Arms at sides. Raise laterally to shoulder level.");
          setFeedbackType('neutral');
        }
      } else if (avgAbduction > 82) {
        state.hasReachedPeak = true;
        state.phase = 'PEAK_REACHED';
        setFeedback("⚡ Parallel elevation reached! Lower with control.");
        setFeedbackType('good');
      }
    } else if (exercise === 'pushups') {
      const armVisible = hasGoodVisibility(landmarks, [12, 14, 16, 24], 0.6);
      if (!armVisible) {
        setFeedback("⚠️ Ensure upper body & arms are visible in plank position.");
        setFeedbackType('warning');
        setLiveAngleReadout(null);
        return;
      }

      const elbowAngle = calculateAngle(landmarks[12], landmarks[14], landmarks[16]);
      const spineAngle = calculateAngle(landmarks[12], landmarks[24], landmarks[26]);
      setLiveAngleReadout(`Elbow: ${elbowAngle}° | Spine: ${spineAngle}°`);

      if (elbowAngle > 150) {
        if (state.hasReachedPeak) {
          triggerRepComplete('pushups');
        } else {
          state.phase = 'START_REST';
          setFeedback("Top of plank. Lower chest to floor.");
          setFeedbackType('neutral');
        }
      } else if (elbowAngle < 90) {
        state.hasReachedPeak = true;
        state.phase = 'PEAK_REACHED';
        if (spineAngle < 145) {
          triggerMistakeWarning("Hips sagging! Tighten core.");
        } else {
          setFeedback("⚡ Great depth! Drive through palms.");
          setFeedbackType('good');
        }
      }
    } else if (exercise === 'plank') {
      const bodyVisible = hasGoodVisibility(landmarks, [11, 12, 23, 24, 25, 26], 0.6);
      if (!bodyVisible) {
        setFeedback("⚠️ Side angle needed: Shoulder, hip, and knees in view.");
        setFeedbackType('warning');
        setLiveAngleReadout(null);
        return;
      }

      const spineAngle = calculateAngle(landmarks[11], landmarks[23], landmarks[25]);
      setLiveAngleReadout(`Core Neutral: ${spineAngle}°`);

      if (spineAngle >= 155 && spineAngle <= 180) {
        setFeedback("🛡️ Pelvic neutral locked! Core engaged.");
        setFeedbackType('good');
        if (now - state.repStartTime > 2000) {
          state.repStartTime = now;
          triggerRepComplete('plank');
        }
      } else {
        triggerMistakeWarning("Spine deviation! Tighten abs and glutes.");
      }
    } else if (exercise === 'jumping_jacks') {
      const fullVisible = hasGoodVisibility(landmarks, [11, 12, 15, 16, 27, 28], 0.65);
      if (!fullVisible) {
        setFeedback("⚠️ Full body head-to-toe required for jumping mechanics.");
        setFeedbackType('warning');
        setLiveAngleReadout(null);
        return;
      }

      const handsUp = landmarks[15].y < landmarks[11].y && landmarks[16].y < landmarks[12].y;
      const feetSpread = Math.abs(landmarks[27].x - landmarks[28].x) > 0.32;

      if (handsUp && feetSpread) {
        state.hasReachedPeak = true;
      } else if (!handsUp && !feetSpread) {
        if (state.hasReachedPeak) {
          triggerRepComplete('jumping_jacks');
        } else {
          setFeedback("Jump and spread arms overhead!");
          setFeedbackType('neutral');
        }
      }
    }
  }, [triggerRepComplete, triggerMistakeWarning]);

  // Main Shared MediaPipe Camera Prediction Loop
  const predictLoop = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (video.readyState >= 2 && video.videoWidth > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Render mirrored video feed for natural mirror view
      ctx.save();
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, w, h);
      ctx.restore();

      // MODE 1: MOVEMENT POSE DETECTION
      if (activeStudioMode === 'movement') {
        if (poseLandmarkerRef.current) {
          const startTimeMs = performance.now();
          const results = poseLandmarkerRef.current.detectForVideo(video, startTimeMs);

          if (results.landmarks && results.landmarks.length > 0) {
            const landmarks = results.landmarks[0];

            // 1. Draw Skeleton Bones
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.75)'; // Cyan
            ctx.lineWidth = 3.5;
            ctx.lineCap = 'round';

            POSE_CONNECTIONS.forEach(([i, j]) => {
              const ptA = landmarks[i];
              const ptB = landmarks[j];
              if (ptA && ptB && (ptA.visibility === undefined || ptA.visibility > 0.5)) {
                ctx.beginPath();
                ctx.moveTo((1 - ptA.x) * w, ptA.y * h); // mirror x
                ctx.lineTo((1 - ptB.x) * w, ptB.y * h);
                ctx.stroke();
              }
            });

            // 2. Draw Landmark Joints
            landmarks.forEach((landmark) => {
              if (landmark.visibility === undefined || landmark.visibility > 0.5) {
                const x = (1 - landmark.x) * w;
                const y = landmark.y * h;

                ctx.fillStyle = 'rgba(16, 185, 129, 0.35)'; // Emerald
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, 2 * Math.PI);
                ctx.fill();

                ctx.fillStyle = '#00E5FF'; // Cyan
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
              }
            });

            analyzeExercise(landmarks, selectedExercise);
          } else {
            setFeedback("⚠️ Step in front of camera to begin tracking.");
            setFeedbackType('neutral');
            setLiveAngleReadout(null);
          }
        }
      }

      // MODE 2: LOOKSMAXXING FACIAL AESTHETICS OVERLAY
      else if (activeStudioMode === 'looksmaxxing' && hudOverlay) {
        const cx = w / 2;
        const cy = h / 2 - 20;

        // Vertical Midline Symmetry Axis
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.75)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(cx, cy - 240);
        ctx.lineTo(cx, cy + 260);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#00E5FF';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();

        // Golden Ratio Thirds
        const thirds = [
          { y: cy - 130, label: 'TRICHION (HAIRLINE)' },
          { y: cy - 35, label: 'GLABELLA (BROW RIDGE)' },
          { y: cy + 65, label: 'SUBNASALE (BASE NOSE)' },
          { y: cy + 175, label: 'MENTON (CHIN APEX)' }
        ];

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1;
        thirds.forEach((t) => {
          ctx.beginPath();
          ctx.moveTo(cx - 180, t.y);
          ctx.lineTo(cx + 180, t.y);
          ctx.stroke();

          ctx.fillStyle = '#00E5FF';
          ctx.font = '10px monospace';
          ctx.fillText(t.label, cx + 190, t.y + 3);
        });

        // Mandibular Jawline Contours
        ctx.strokeStyle = '#10B981'; // Emerald
        ctx.lineWidth = 2.5;
        // Left jaw
        ctx.beginPath();
        ctx.moveTo(cx - 140, cy + 40);
        ctx.lineTo(cx - 110, cy + 130);
        ctx.lineTo(cx - 35, cy + 175);
        ctx.stroke();
        // Right jaw
        ctx.beginPath();
        ctx.moveTo(cx + 140, cy + 40);
        ctx.lineTo(cx + 110, cy + 130);
        ctx.lineTo(cx + 35, cy + 175);
        ctx.stroke();

        ctx.fillStyle = '#10B981';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('118° GONIAL', cx - 200, cy + 135);
        ctx.fillText('118° GONIAL', cx + 120, cy + 135);

        // Hunter Eye Canthal Tilt Lines
        ctx.strokeStyle = '#FF6B00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 100, cy - 35);
        ctx.lineTo(cx - 40, cy - 40);
        ctx.moveTo(cx + 40, cy - 40);
        ctx.lineTo(cx + 100, cy - 35);
        ctx.stroke();

        ctx.fillStyle = '#FF6B00';
        ctx.font = '10px monospace';
        ctx.fillText('+4.2° HUNTER TILT', cx - 55, cy - 50);
      }

      // MODE 3: PULMONARY THORACIC EXPANSION OVERLAY
      else if (activeStudioMode === 'pulmonary') {
        const cx = w / 2;
        const cy = h / 2;
        const currProto = BREATHING_PROTOCOLS.find(p => p.id === activeProtocolId) || BREATHING_PROTOCOLS[0];
        const currPhase = currProto.phases[breathPhaseIdx] || currProto.phases[0];

        // Thoracic Expansion Ring
        const progress = 1 - (breathSecondsLeft / currPhase.duration);
        let scale = 0.5;
        if (currPhase.name === 'INHALE') scale = 0.3 + progress * 0.7;
        else if (currPhase.name === 'HOLD') scale = 1.0;
        else if (currPhase.name === 'EXHALE') scale = 1.0 - progress * 0.7;

        ctx.strokeStyle = currPhase.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, 100 * scale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `${currPhase.color}22`;
        ctx.fill();
      }
    }

    animationFrameRef.current = requestAnimationFrame(predictLoop);
  }, [activeStudioMode, analyzeExercise, selectedExercise, hudOverlay, activeProtocolId, breathPhaseIdx, breathSecondsLeft]);

  // Shared Camera Hardware Starter
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 }, 
          facingMode: "user" 
        } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraActive(true);
          setFeedback("AI Camera Active. Select workout or aesthetic drill.");
          setFeedbackType('neutral');
          animationFrameRef.current = requestAnimationFrame(predictLoop);
        };
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setFeedback("Camera permission denied or device unavailable.");
      setFeedbackType('warning');
    }
  };

  const stopWebcam = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  };

  // Looksmaxxing Drill Engine
  const activeDrill = LOOKSMAXXING_DRILLS[looksmaxxingDrillIdx];
  useEffect(() => {
    let drillTimer;
    if (activeStudioMode === 'looksmaxxing' && drillRunning && drillTimeLeft > 0) {
      drillTimer = setInterval(() => {
        setDrillTimeLeft(prev => {
          if (prev <= 1) {
            setDrillRunning(false);
            if (soundEnabled) soundFX.playCompleteFanfare();
            return 0;
          }
          if (activeDrill.type === 'intervals') {
            const elapsed = activeDrill.duration - prev + 1;
            const cycle = elapsed % 5;
            if (cycle === 0) {
              setDrillPhase('CONTRACT');
              if (soundEnabled) soundFX.playRepChime();
              setDrillReps(r => r + 1);
            } else if (cycle === 3) {
              setDrillPhase('RELEASE');
              if (soundEnabled) soundFX.playWarningBeep();
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(drillTimer);
  }, [activeStudioMode, drillRunning, drillTimeLeft, activeDrill, soundEnabled]);

  // Pulmonary Breathing Cadence Engine
  useEffect(() => {
    let breathTimer;
    const currProto = BREATHING_PROTOCOLS.find(p => p.id === activeProtocolId) || BREATHING_PROTOCOLS[0];
    if (activeStudioMode === 'pulmonary' && breathingRunning && !isHoldChallenge) {
      breathTimer = setInterval(() => {
        setBreathSecondsLeft(prev => {
          if (prev <= 1) {
            const nextIdx = (breathPhaseIdx + 1) % currProto.phases.length;
            setBreathPhaseIdx(nextIdx);
            const nextPhase = currProto.phases[nextIdx];
            if (nextIdx === 0) setBreathCycles(c => c + 1);

            if (soundEnabled) {
              if (nextPhase.name === 'INHALE') soundFX.playRepChime();
              else if (nextPhase.name === 'HOLD') soundFX.playWarningBeep();
              else soundFX.playRepChime();
            }
            return nextPhase.duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(breathTimer);
  }, [activeStudioMode, breathingRunning, isHoldChallenge, breathPhaseIdx, activeProtocolId, soundEnabled]);

  // VO2 Breath-Hold Stopwatch
  useEffect(() => {
    let holdInt;
    if (isHoldingActive) {
      holdInt = setInterval(() => setHoldTimer(t => t + 1), 1000);
    }
    return () => clearInterval(holdInt);
  }, [isHoldingActive]);

  const handleStartHold = () => {
    setHoldTimer(0);
    setIsHoldingActive(true);
    if (soundEnabled) soundFX.playRepChime();
  };

  const handleStopHold = async () => {
    setIsHoldingActive(false);
    if (holdTimer > bestHoldRecord) {
      setBestHoldRecord(holdTimer);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    if (soundEnabled) soundFX.playCompleteFanfare();
    await saveWorkoutSession({
      exercise_type: 'Lung Breath Hold Challenge',
      total_reps: holdTimer,
      calories_burned: Math.round(holdTimer * 0.15 * 10) / 10,
      accuracy_score: 98,
      mistakes_logged: [],
      duration_seconds: holdTimer
    });
  };

  const resetWorkout = () => {
    repCountRef.current = 0;
    mistakesCountRef.current = 0;
    repStateRef.current = {
      phase: 'AWAITING_VISIBILITY',
      hasReachedPeak: false,
      repStartTime: 0,
      lastRepCompleteTime: 0
    };
    setRepCount(0);
    setCaloriesBurned(0);
    setMistakesList([]);
    setAccuracyScore(100);
    setFeedback("Session reset. Assume starting posture.");
    setFeedbackType('neutral');
  };

  // Save Workout to Firebase
  const handleSaveSession = async () => {
    if (repCount === 0) {
      setFeedback("Complete at least 1 verified rep before saving!");
      setFeedbackType('warning');
      return;
    }

    setIsSaving(true);
    const sessionData = {
      exercise_type: EXERCISES.find(e => e.id === selectedExercise)?.name || 'Workout',
      total_reps: repCount,
      calories_burned: caloriesBurned,
      accuracy_score: accuracyScore,
      mistakes_logged: mistakesList,
      duration_seconds: 120
    };

    const res = await saveWorkoutSession(sessionData);
    setIsSaving(false);

    soundFX.playCompleteFanfare();
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    setSaveSuccessNotice(res.cloud ? "Saved to Firebase Cloud!" : "Session logged locally!");
    setTimeout(() => setSaveSuccessNotice(null), 4000);
    if (onSessionSaved) onSessionSaved();
  };

  // Initialize MediaPipe once
  useEffect(() => {
    let isMounted = true;
    const setupMediaPipe = async () => {
      try {
        setFeedback("Loading Google MediaPipe Vision Model...");
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        if (!isMounted) return;

        const landmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numPoses: 1
        });
        if (!isMounted) return;
        poseLandmarkerRef.current = landmarker;
        setFeedback("Vision AI Initialized. Starting camera...");
        await startWebcam();
      } catch (error) {
        console.error("Error loading MediaPipe:", error);
        if (isMounted) await startWebcam();
      }
    };

    setupMediaPipe();
    return () => {
      isMounted = false;
      stopWebcam();
      if (poseLandmarkerRef.current) {
        try { poseLandmarkerRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  const handleCaptureSnapshot = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setCapturedPhoto(dataUrl);
    if (soundEnabled) soundFX.playRepChime();
  };

  const activeExObj = EXERCISES.find(e => e.id === selectedExercise) || EXERCISES[0];
  const currProto = BREATHING_PROTOCOLS.find(p => p.id === activeProtocolId) || BREATHING_PROTOCOLS[0];
  const currPhase = currProto.phases[breathPhaseIdx] || currProto.phases[0];

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#0B0E14] text-white p-4 md:p-8 font-sans selection:bg-[#00E5FF] selection:text-black">
      
      {/* Top Header with Unified Studio Mode Segmented Control */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block size-2.5 rounded-full bg-[#00E5FF] animate-ping"></span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              ApexForge <span className="text-[#00E5FF] text-base md:text-lg font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">Live AI Studio</span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">
            Real-time biometric computer vision • Unified movement, aesthetics & breathwork
          </p>
        </div>

        {/* Master Camera Studio Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#121824] p-1.5 rounded-2xl border border-white/[0.08] shadow-inner">
          <button
            onClick={() => setActiveStudioMode('movement')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeStudioMode === 'movement'
                ? 'bg-[#00E5FF] text-black shadow-md glow-cyan'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Activity className="size-3.5" />
            <span>Movement AI</span>
          </button>

          <button
            onClick={() => setActiveStudioMode('looksmaxxing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeStudioMode === 'looksmaxxing'
                ? 'bg-[#FF6B00] text-white shadow-md glow-amber'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Scan className="size-3.5" />
            <span>Looksmaxxing</span>
          </button>

          <button
            onClick={() => setActiveStudioMode('pulmonary')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeStudioMode === 'pulmonary'
                ? 'bg-[#10B981] text-black shadow-md glow-emerald'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Wind className="size-3.5" />
            <span>Pulmonary</span>
          </button>
        </div>
      </div>

      {/* Mode Specific Sub-Selectors */}
      {activeStudioMode === 'movement' && (
        <div className="w-full max-w-5xl flex items-center justify-between gap-2 overflow-x-auto pb-2 mb-4">
          <div className="flex items-center gap-1.5 bg-[#121824] p-1.5 rounded-xl border border-white/[0.08]">
            {EXERCISES.map((ex) => (
              <button
                key={ex.id}
                onClick={() => {
                  setSelectedExercise(ex.id);
                  resetWorkout();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  selectedExercise === ex.id
                    ? 'bg-[#00E5FF] text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{ex.icon}</span>
                <span>{ex.name}</span>
              </button>
            ))}
          </div>
          <div className="text-[11px] font-mono text-slate-400 px-2 hidden sm:block">
            Target: <strong className="text-cyan-400">{activeExObj.targetMuscle}</strong>
          </div>
        </div>
      )}

      {activeStudioMode === 'looksmaxxing' && (
        <div className="w-full max-w-5xl flex items-center justify-between gap-2 overflow-x-auto pb-2 mb-4">
          <div className="flex items-center gap-1.5 bg-[#121824] p-1.5 rounded-xl border border-white/[0.08]">
            {LOOKSMAXXING_DRILLS.map((drill, idx) => (
              <button
                key={drill.id}
                onClick={() => {
                  setLooksmaxxingDrillIdx(idx);
                  setDrillRunning(false);
                  setDrillTimeLeft(drill.duration);
                  setDrillReps(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  looksmaxxingDrillIdx === idx
                    ? 'bg-[#FF6B00] text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Sparkles className="size-3.5" />
                <span>{drill.title.split('&')[0]}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setHudOverlay(!hudOverlay)}
            className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#121824] border border-white/[0.08] text-cyan-400"
          >
            {hudOverlay ? 'Facial Grid: ON' : 'Facial Grid: OFF'}
          </button>
        </div>
      )}

      {activeStudioMode === 'pulmonary' && (
        <div className="w-full max-w-5xl flex items-center justify-between gap-2 overflow-x-auto pb-2 mb-4">
          <div className="flex items-center gap-1.5 bg-[#121824] p-1.5 rounded-xl border border-white/[0.08]">
            {BREATHING_PROTOCOLS.map((proto) => (
              <button
                key={proto.id}
                onClick={() => {
                  setIsHoldChallenge(false);
                  setActiveProtocolId(proto.id);
                  setBreathingRunning(false);
                  setBreathPhaseIdx(0);
                  setBreathSecondsLeft(proto.phases[0].duration);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  !isHoldChallenge && activeProtocolId === proto.id
                    ? 'bg-[#10B981] text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Wind className="size-3.5" />
                <span>{proto.name.split('(')[0]}</span>
              </button>
            ))}

            <button
              onClick={() => {
                setBreathingRunning(false);
                setIsHoldChallenge(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                isHoldChallenge
                  ? 'bg-[#FF6B00] text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Timer className="size-3.5" />
              <span>VO2 Breath-Hold</span>
            </button>
          </div>
          <div className="text-[11px] font-mono text-slate-400 px-2 hidden sm:block">
            {isHoldChallenge ? 'Vital Capacity Stopwatch' : `${currProto.category}`}
          </div>
        </div>
      )}

      {/* Main Video AI HUD Display */}
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" 
        />
        
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover" 
        />

        {cameraActive && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-hud-scan pointer-events-none"></div>
        )}

        {/* Top Left: Real-time Feedback & Telemetry HUD */}
        <div className="absolute top-4 left-4 max-w-md z-10 space-y-2">
          {activeStudioMode === 'movement' && (
            <>
              <div className={`px-4 py-2.5 rounded-2xl backdrop-blur-md border shadow-lg flex items-center gap-3 ${
                feedbackType === 'good' 
                  ? 'bg-[#121824]/90 border-emerald-500/40 text-emerald-400' 
                  : feedbackType === 'warning'
                  ? 'bg-[#121824]/90 border-amber-500/40 text-amber-400'
                  : 'bg-[#121824]/85 border-white/[0.08] text-slate-200'
              }`}>
                {feedbackType === 'good' && <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />}
                {feedbackType === 'warning' && <AlertTriangle className="size-4 shrink-0 text-amber-400 animate-bounce" />}
                {feedbackType === 'neutral' && <Activity className="size-4 shrink-0 text-cyan-400" />}
                <span className="text-xs md:text-sm font-semibold tracking-tight">{feedback}</span>
              </div>

              {liveAngleReadout && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121824]/85 backdrop-blur-md rounded-xl border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-md">
                  <span className="size-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>{liveAngleReadout}</span>
                </div>
              )}
            </>
          )}

          {activeStudioMode === 'looksmaxxing' && (
            <div className="bg-[#121824]/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-cyan-500/30 flex items-center gap-2.5 shadow-xl">
              <Scan className="size-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <div className="text-xs">
                <span className="font-mono text-slate-400 uppercase text-[9px] block">Aesthetic Analysis</span>
                <span className="font-bold text-white">96.4% Symmetrical • 118° Mandibular</span>
              </div>
            </div>
          )}

          {activeStudioMode === 'pulmonary' && (
            <div className="bg-[#121824]/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-emerald-500/30 flex items-center gap-2.5 shadow-xl">
              <Wind className="size-4 text-emerald-400 animate-pulse" />
              <div className="text-xs">
                <span className="font-mono text-slate-400 uppercase text-[9px] block">
                  {isHoldChallenge ? 'Breath Retention' : `Phase: ${currPhase.name}`}
                </span>
                <span className="font-bold text-white">
                  {isHoldChallenge ? `${holdTimer}s Active` : `${breathSecondsLeft}s Left`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Top Right: Status Controls (Audio, Camera toggle, Snapshot) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {activeStudioMode === 'looksmaxxing' && (
            <button
              onClick={handleCaptureSnapshot}
              className="px-3 py-1.5 rounded-xl bg-[#00E5FF] hover:bg-[#00D0E6] text-black text-xs font-bold flex items-center gap-1.5 shadow-md glow-cyan transition"
            >
              <Camera className="size-3.5" />
              <span>Snapshot</span>
            </button>
          )}

          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              soundFX.setMuted(!next);
            }}
            aria-label="Toggle Audio"
            className="p-2.5 rounded-xl bg-[#121824]/80 backdrop-blur-md border border-white/[0.08] hover:border-white/20 text-white transition"
          >
            {soundEnabled ? <Volume2 className="size-4 text-cyan-400" /> : <VolumeX className="size-4 text-slate-400" />}
          </button>
          
          <button
            onClick={cameraActive ? stopWebcam : startWebcam}
            aria-label="Toggle Camera"
            className={`px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-semibold flex items-center gap-1.5 transition ${
              cameraActive 
                ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
            }`}
          >
            {cameraActive ? <CameraOff className="size-3.5" /> : <Camera className="size-3.5" />}
            <span>{cameraActive ? "Pause" : "Start"}</span>
          </button>
        </div>

        {/* Bottom HUD: Mode-Specific Metric Chips */}
        {activeStudioMode === 'movement' && (
          <>
            <div className="absolute bottom-4 left-4 flex items-center gap-3 z-10">
              <div className="bg-[#121824]/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/[0.08] flex items-center gap-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Flame className="size-4 text-[#FF6B00]" />
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-mono">Calories</div>
                    <div className="text-base font-bold text-white tabular-nums">{caloriesBurned} <span className="text-[10px] text-slate-400">kcal</span></div>
                  </div>
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                <div className="flex items-center gap-2">
                  <Award className="size-4 text-[#10B981]" />
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-mono">Accuracy</div>
                    <div className="text-base font-bold text-emerald-400 tabular-nums">{accuracyScore}%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <div className="bg-[#182030]/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-cyan-500/40 text-white shadow-2xl flex items-center gap-3">
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-widest text-cyan-400 font-mono">VERIFIED REPS</div>
                  <div className="text-2xl font-black tabular-nums tracking-tight text-white">{repCount}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Looksmaxxing Drill Bottom Controls */}
        {activeStudioMode === 'looksmaxxing' && (
          <div className="absolute bottom-4 inset-x-4 z-10 bg-[#121824]/90 backdrop-blur-xl p-3 rounded-2xl border border-white/[0.08] flex items-center justify-between gap-3 shadow-2xl">
            <div className="flex items-center gap-3 truncate">
              <div className="size-8 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 border border-cyan-500/20">
                {drillTimeLeft}s
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{activeDrill.title}</div>
                <div className="text-[10px] text-slate-400 truncate">{activeDrill.benefits}</div>
              </div>
            </div>

            <button
              onClick={() => {
                if (drillRunning) setDrillRunning(false);
                else {
                  if (drillTimeLeft === 0) setDrillTimeLeft(activeDrill.duration);
                  setDrillRunning(true);
                  if (soundEnabled) soundFX.playRepChime();
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${
                drillRunning ? 'bg-red-500 text-white' : 'bg-[#00E5FF] text-black glow-cyan'
              }`}
            >
              {drillRunning ? <Pause className="size-3.5" /> : <Play className="size-3.5 fill-black" />}
              <span>{drillRunning ? 'Pause Drill' : 'Start Drill'}</span>
            </button>
          </div>
        )}

        {/* Pulmonary Cadence Bottom Controls */}
        {activeStudioMode === 'pulmonary' && (
          <div className="absolute bottom-4 inset-x-4 z-10 bg-[#121824]/90 backdrop-blur-xl p-3 rounded-2xl border border-white/[0.08] flex items-center justify-between gap-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-500/20">
                {isHoldChallenge ? `${holdTimer}s` : `${breathSecondsLeft}s`}
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {isHoldChallenge ? 'VO2 Breath-Hold Challenge' : `${currPhase.name}: ${currPhase.label}`}
                </div>
                <div className="text-[10px] text-slate-400">
                  {isHoldChallenge ? `Personal Best: ${bestHoldRecord}s` : `Completed Cycles: ${breathCycles}`}
                </div>
              </div>
            </div>

            {!isHoldChallenge ? (
              <button
                onClick={() => {
                  setBreathingRunning(!breathingRunning);
                  if (soundEnabled) soundFX.playRepChime();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${
                  breathingRunning ? 'bg-red-500 text-white' : 'bg-[#10B981] text-black glow-emerald'
                }`}
              >
                {breathingRunning ? <Pause className="size-3.5" /> : <Play className="size-3.5 fill-black" />}
                <span>{breathingRunning ? 'Pause Cadence' : 'Begin Cadence'}</span>
              </button>
            ) : (
              <button
                onClick={isHoldingActive ? handleStopHold : handleStartHold}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${
                  isHoldingActive ? 'bg-[#10B981] text-black glow-emerald' : 'bg-[#FF6B00] text-white glow-amber'
                }`}
              >
                <span>{isHoldingActive ? 'Release & Record' : 'Inhale & Hold'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Save Success Banner */}
      {saveSuccessNotice && (
        <div className="mt-3 px-5 py-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl flex items-center gap-2 text-xs font-medium">
          <CheckCircle2 className="size-4" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Bottom Telemetry Cards for Movement AI */}
      {activeStudioMode === 'movement' && (
        <div className="w-full max-w-5xl mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#121824] p-4 md:p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                <Activity className="size-4 text-cyan-400" /> Session Controls
              </h3>
              <p className="text-xs text-slate-400 mb-4">Reset count or sync session data to Firebase Firestore</p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={resetWorkout}
                className="flex-1 py-2 px-3 bg-[#182030] hover:bg-white/[0.08] text-slate-300 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="size-3.5" /> Reset
              </button>

              <button
                onClick={handleSaveSession}
                disabled={isSaving}
                className="flex-1 py-2 px-3 bg-[#00E5FF] hover:bg-[#00D0E6] text-black font-extrabold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md glow-cyan disabled:opacity-50"
              >
                <Save className="size-3.5" /> {isSaving ? "Saving..." : "Save Workout"}
              </button>
            </div>
          </div>

          <div className="md:col-span-2 bg-[#121824] p-4 md:p-5 rounded-2xl border border-white/[0.08]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-400" /> Biomechanical Posture Log
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400">
                {mistakesList.length} Flagged
              </span>
            </div>

            {mistakesList.length === 0 ? (
              <div className="h-16 flex items-center justify-center text-xs text-slate-400 border border-dashed border-white/[0.08] rounded-xl">
                <p>🎯 Optimal joint alignment detected. No form warnings.</p>
              </div>
            ) : (
              <div className="max-h-20 overflow-y-auto space-y-1.5 pr-2">
                {mistakesList.slice().reverse().map((mistake, idx) => (
                  <div key={idx} className="text-xs bg-black/40 text-amber-300/90 px-3 py-1.5 rounded-lg border border-amber-500/20 flex items-center justify-between">
                    <span>{mistake}</span>
                    <span className="text-[9px] text-slate-500 font-mono">Joint Vector Warning</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Snapshot Preview Modal for Looksmaxxing */}
      {capturedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-white/[0.08] max-w-md w-full rounded-2xl p-5 shadow-2xl space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="size-4 text-cyan-400" /> Biometric Card Snapshot
              </h3>
              <button 
                onClick={() => setCapturedPhoto(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-white/[0.05]"
              >
                Close
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 aspect-video relative">
              <img src={capturedPhoto} alt="Snapshot" className="size-full object-cover" />
            </div>

            <a
              href={capturedPhoto}
              download="apexforge-biometric-card.png"
              className="w-full py-2.5 bg-[#00E5FF] hover:bg-[#00D0E6] text-black rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition"
            >
              <Download className="size-3.5" /> Download Biometric Card
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
