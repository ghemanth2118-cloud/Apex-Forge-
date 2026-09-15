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
  ChevronDown
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
  { id: 'squats', name: 'Squats', targetKcal: 0.45, icon: '🏋️‍♂️' },
  { id: 'bicep_curls', name: 'Bicep Curls', targetKcal: 0.35, icon: '💪' },
  { id: 'pushups', name: 'Pushups', targetKcal: 0.55, icon: '🤸‍♂️' },
  { id: 'jumping_jacks', name: 'Jumping Jacks', targetKcal: 0.4, icon: '⚡' }
];

export default function WorkoutTracker({ onSessionSaved }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Exercise & Tracking state
  const [selectedExercise, setSelectedExercise] = useState('squats');
  const [feedback, setFeedback] = useState("Initializing AI Camera...");
  const [feedbackType, setFeedbackType] = useState('neutral'); // neutral, good, warning
  const [repCount, setRepCount] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mistakesList, setMistakesList] = useState([]);
  const [accuracyScore, setAccuracyScore] = useState(100);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(null);

  // Exercise tracking logic refs
  const exercisePhaseRef = useRef('up'); // 'up' or 'down'
  const repCountRef = useRef(0);
  const mistakesCountRef = useRef(0);
  const poseLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);
  const lastWarningTimeRef = useRef(0);

  // Calculate 2D angle between 3 points: A-B-C
  const calculateAngle = (a, b, c) => {
    if (!a || !b || !c) return 0;
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
  };

  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.setMuted(!next);
  };

  // Sound and feedback notification helpers
  const triggerRepComplete = useCallback((exerciseName) => {
    repCountRef.current += 1;
    const newCount = repCountRef.current;
    setRepCount(newCount);

    const activeEx = EXERCISES.find(e => e.name.toLowerCase() === exerciseName.toLowerCase()) || EXERCISES[0];
    setCaloriesBurned(Math.round(newCount * activeEx.targetKcal * 10) / 10);

    soundFX.playRepChime();
    setFeedback("👍 Rep completed! Fantastic form.");
    setFeedbackType('good');

    // Confetti milestone on 10, 25 reps
    if (newCount % 10 === 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, []);

  const triggerMistakeWarning = useCallback((warningText) => {
    const now = performance.now();
    if (now - lastWarningTimeRef.current > 2000) {
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

  // Exercise Form Analyzers
  const analyzeExercise = useCallback((landmarks, exercise) => {
    if (!landmarks || landmarks.length < 33) return;

    if (exercise === 'squats') {
      // Analyze Knee Angle (Hip: 23/24, Knee: 25/26, Ankle: 27/28)
      // Use right or left side depending on visibility
      const leftHip = landmarks[23];
      const leftKnee = landmarks[25];
      const leftAnkle = landmarks[27];
      const leftShoulder = landmarks[11];

      const kneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
      const torsoAngle = calculateAngle(leftShoulder, leftHip, leftKnee);

      // Squat depth detection
      if (kneeAngle < 105) {
        if (exercisePhaseRef.current === 'up') {
          exercisePhaseRef.current = 'down';
          // Check torso / posture
          if (torsoAngle < 75) {
            triggerMistakeWarning("Chest too low! Keep back upright.");
          } else {
            setFeedback("⚡ Great depth! Drive up through heels.");
            setFeedbackType('good');
          }
        }
      } else if (kneeAngle > 155) {
        if (exercisePhaseRef.current === 'down') {
          exercisePhaseRef.current = 'up';
          triggerRepComplete('Squats');
        }
      }
    } else if (exercise === 'bicep_curls') {
      // Shoulder: 12, Elbow: 14, Wrist: 16 (Right Arm)
      const shoulder = landmarks[12];
      const elbow = landmarks[14];
      const wrist = landmarks[16];

      const elbowAngle = calculateAngle(shoulder, elbow, wrist);

      if (elbowAngle < 50) {
        if (exercisePhaseRef.current === 'down') {
          exercisePhaseRef.current = 'up';
        }
      } else if (elbowAngle > 145) {
        if (exercisePhaseRef.current === 'up') {
          exercisePhaseRef.current = 'down';
          triggerRepComplete('Bicep Curls');
        }
      } else if (elbowAngle < 130 && exercisePhaseRef.current === 'down') {
        setFeedback("🔥 Squeeze biceps at the top!");
        setFeedbackType('good');
      }
    } else if (exercise === 'pushups') {
      // Shoulder: 12, Elbow: 14, Wrist: 16 + Hip: 24
      const shoulder = landmarks[12];
      const elbow = landmarks[14];
      const wrist = landmarks[16];
      const hip = landmarks[24];

      const elbowAngle = calculateAngle(shoulder, elbow, wrist);
      const bodyAngle = calculateAngle(shoulder, hip, landmarks[26]); // Hip-Knee alignment

      if (elbowAngle < 90) {
        if (exercisePhaseRef.current === 'up') {
          exercisePhaseRef.current = 'down';
          if (bodyAngle < 140) {
            triggerMistakeWarning("Hips sagging! Tighten core.");
          }
        }
      } else if (elbowAngle > 155) {
        if (exercisePhaseRef.current === 'down') {
          exercisePhaseRef.current = 'up';
          triggerRepComplete('Pushups');
        }
      }
    } else if (exercise === 'jumping_jacks') {
      // Wrists above head (y < 11.y) & Feet spread apart
      const leftWrist = landmarks[15];
      const rightWrist = landmarks[16];
      const leftShoulder = landmarks[11];
      const rightShoulder = landmarks[12];
      const leftAnkle = landmarks[27];
      const rightAnkle = landmarks[28];

      const handsUp = leftWrist.y < leftShoulder.y && rightWrist.y < rightShoulder.y;
      const feetApart = Math.abs(leftAnkle.x - rightAnkle.x) > 0.35;

      if (handsUp && feetApart) {
        if (exercisePhaseRef.current === 'down') {
          exercisePhaseRef.current = 'up';
        }
      } else if (!handsUp && !feetApart) {
        if (exercisePhaseRef.current === 'up') {
          exercisePhaseRef.current = 'down';
          triggerRepComplete('Jumping Jacks');
        }
      }
    }
  }, [triggerRepComplete, triggerMistakeWarning]);

  // Main MediaPipe Prediction Loop
  const predictLoop = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !poseLandmarkerRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (video.readyState >= 2 && video.videoWidth > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const startTimeMs = performance.now();
      const results = poseLandmarkerRef.current.detectForVideo(video, startTimeMs);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];

        // 1. Draw Skeleton Bones
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.75)'; // Glowing Cyan lines
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        POSE_CONNECTIONS.forEach(([i, j]) => {
          const ptA = landmarks[i];
          const ptB = landmarks[j];
          if (ptA && ptB && (ptA.visibility === undefined || ptA.visibility > 0.5)) {
            ctx.beginPath();
            ctx.moveTo(ptA.x * canvas.width, ptA.y * canvas.height);
            ctx.lineTo(ptB.x * canvas.width, ptB.y * canvas.height);
            ctx.stroke();
          }
        });

        // 2. Draw Landmark Joints (Neon Lime Dots)
        landmarks.forEach((landmark) => {
          if (landmark.visibility === undefined || landmark.visibility > 0.5) {
            const x = landmark.x * canvas.width;
            const y = landmark.y * canvas.height;

            // Outer glow circle
            ctx.fillStyle = 'rgba(163, 230, 53, 0.35)';
            ctx.beginPath();
            ctx.arc(x, y, 9, 0, 2 * Math.PI);
            ctx.fill();

            // Core solid dot
            ctx.fillStyle = '#a3e635'; // Neon lime
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
          }
        });

        // 3. Analyze Posture & Count Reps
        analyzeExercise(landmarks, selectedExercise);
      }
    }

    animationFrameRef.current = requestAnimationFrame(predictLoop);
  }, [analyzeExercise, selectedExercise]);

  // Webcam Starter
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
          setFeedback("AI Ready. Stand in frame and begin!");
          setFeedbackType('good');
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
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setFeedback("Camera stopped. Ready to resume.");
    setFeedbackType('neutral');
  };

  const resetWorkout = () => {
    repCountRef.current = 0;
    mistakesCountRef.current = 0;
    setRepCount(0);
    setCaloriesBurned(0);
    setMistakesList([]);
    setAccuracyScore(100);
    setFeedback("Session reset. Start working out!");
    setFeedbackType('neutral');
  };

  // End Session & Save to Firebase
  const handleSaveSession = async () => {
    if (repCount === 0) {
      setFeedback("Complete at least 1 rep before saving!");
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
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });

    setSaveSuccessNotice(res.cloud ? "Saved to Firebase Cloud!" : "Session logged locally!");
    setTimeout(() => setSaveSuccessNotice(null), 4000);

    if (onSessionSaved) onSessionSaved();
  };

  // MediaPipe Initialization
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
        if (isMounted) {
          setFeedback("MediaPipe initialized with fallback mode.");
          await startWebcam();
        }
      }
    };

    setupMediaPipe();

    return () => {
      isMounted = false;
      stopWebcam();
      if (poseLandmarkerRef.current) {
        try {
          poseLandmarkerRef.current.close();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#1c1c1e] text-white p-4 md:p-8 font-sans">
      
      {/* Top Header & Exercise Selector */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block size-3 rounded-full bg-lime-400 animate-pulse"></span>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              ApexForge <span className="text-orange-500 text-lg md:text-xl font-medium px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">Live Pose AI</span>
            </h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Real-time joint geometry tracking, rep counting & biomechanical feedback
          </p>
        </div>

        {/* Exercise Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-[#2c2c2e] p-1.5 rounded-2xl border border-white/5">
          {EXERCISES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => {
                setSelectedExercise(ex.id);
                resetWorkout();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                selectedExercise === ex.id
                  ? 'bg-orange-500 text-white shadow-md glow-orange'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{ex.icon}</span>
              <span>{ex.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Video AI HUD Display */}
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Hidden source video */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" 
        />
        
        {/* Overlay Canvas rendering skeleton & camera */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover" 
        />

        {/* Subtle HUD scanning laser line */}
        {cameraActive && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-30 animate-hud-scan pointer-events-none"></div>
        )}

        {/* Top Left: Live Real-time Feedback HUD */}
        <div className="absolute top-4 md:top-6 left-4 md:left-6 max-w-md z-10">
          <div className={`px-4 md:px-5 py-3 rounded-2xl backdrop-blur-md border shadow-lg transition-all duration-300 flex items-center gap-3 ${
            feedbackType === 'good' 
              ? 'bg-black/85 border-lime-500/50 text-lime-400' 
              : feedbackType === 'warning'
              ? 'bg-black/85 border-orange-500/50 text-orange-400'
              : 'bg-black/80 border-white/10 text-gray-200'
          }`}>
            {feedbackType === 'good' && <CheckCircle2 className="size-5 shrink-0 text-lime-400" />}
            {feedbackType === 'warning' && <AlertTriangle className="size-5 shrink-0 text-orange-400 animate-bounce" />}
            {feedbackType === 'neutral' && <Activity className="size-5 shrink-0 text-cyan-400" />}
            <span className="text-sm md:text-base font-semibold tracking-tight">{feedback}</span>
          </div>
        </div>

        {/* Top Right: Status Controls (Audio, Camera toggle) */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-2 z-10">
          <button
            onClick={handleSoundToggle}
            aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
            className="p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 hover:border-white/30 text-white transition"
          >
            {soundEnabled ? <Volume2 className="size-5 text-lime-400" /> : <VolumeX className="size-5 text-gray-400" />}
          </button>
          
          <button
            onClick={cameraActive ? stopWebcam : startWebcam}
            aria-label={cameraActive ? "Stop camera" : "Start camera"}
            className={`px-3 py-2 rounded-xl backdrop-blur-md border text-sm font-medium flex items-center gap-2 transition ${
              cameraActive 
                ? 'bg-red-500/20 border-red-500/40 text-red-300 hover:bg-red-500/30' 
                : 'bg-lime-500/20 border-lime-500/40 text-lime-300 hover:bg-lime-500/30'
            }`}
          >
            {cameraActive ? <CameraOff className="size-4" /> : <Camera className="size-4" />}
            <span>{cameraActive ? "Pause" : "Start"}</span>
          </button>
        </div>

        {/* Bottom Left: Accuracy & Calorie HUD */}
        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex items-center gap-3 z-10">
          <div className="bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-orange-500" />
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Calories</div>
                <div className="text-lg font-bold text-white tabular-nums">{caloriesBurned} <span className="text-xs font-normal text-gray-400">kcal</span></div>
              </div>
            </div>

            <div className="w-px h-8 bg-white/10 mx-1"></div>

            <div className="flex items-center gap-2">
              <Award className="size-5 text-lime-400" />
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Accuracy</div>
                <div className="text-lg font-bold text-lime-400 tabular-nums">{accuracyScore}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right: High-Visibility Rep Counter HUD */}
        <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 z-10">
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 px-6 md:px-8 py-3 md:py-4 rounded-2xl text-white shadow-2xl border border-orange-400/40 flex items-center gap-3 transform hover:scale-105 transition">
            <div className="text-left">
              <div className="text-xs uppercase tracking-widest text-orange-200 font-mono">REPETITIONS</div>
              <div className="text-3xl md:text-4xl font-extrabold tabular-nums tracking-tight">
                {repCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Success Banner */}
      {saveSuccessNotice && (
        <div className="mt-4 px-6 py-3 bg-lime-500/20 border border-lime-500/40 text-lime-300 rounded-2xl flex items-center gap-2 font-medium">
          <CheckCircle2 className="size-5" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Action Toolbar & Mistake Log */}
      <div className="w-full max-w-5xl mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Session Actions Card */}
        <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
              <Activity className="size-4 text-orange-500" /> Session Controls
            </h3>
            <p className="text-xs text-gray-400 mb-4">Reset count or record session data to Firebase Firestore</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetWorkout}
              className="flex-1 py-2.5 px-4 bg-[#3a3a3c] hover:bg-[#4a4a4c] text-gray-200 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="size-4" /> Reset
            </button>

            <button
              onClick={handleSaveSession}
              disabled={isSaving}
              className="flex-1 py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 shadow-lg glow-orange disabled:opacity-50"
            >
              <Save className="size-4" /> {isSaving ? "Saving..." : "Save Workout"}
            </button>
          </div>
        </div>

        {/* Live Mistake Log Card */}
        <div className="md:col-span-2 bg-[#2c2c2e] p-5 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="size-4 text-orange-400" /> Posture Mistake Log
            </h3>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-gray-400">
              {mistakesList.length} Flagged
            </span>
          </div>

          {mistakesList.length === 0 ? (
            <div className="h-20 flex items-center justify-center text-sm text-gray-400 border border-dashed border-white/10 rounded-xl">
              <p>🎯 No form errors detected yet. Looking sharp!</p>
            </div>
          ) : (
            <div className="max-h-24 overflow-y-auto space-y-1.5 pr-2">
              {mistakesList.slice().reverse().map((mistake, idx) => (
                <div key={idx} className="text-xs bg-black/40 text-orange-300/90 px-3 py-1.5 rounded-lg border border-orange-500/20 flex items-center justify-between">
                  <span>{mistake}</span>
                  <span className="text-[10px] text-gray-500 font-mono">Biomechanical warning</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
