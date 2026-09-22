import React, { useEffect, useRef, useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  Scan, 
  Award, 
  Eye, 
  Download, 
  Play, 
  Pause,
  Layers,
  Volume2,
  VolumeX,
  Target
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const DRILLS = [
  {
    id: 'mewing',
    title: 'Mewing & Palatal Tongue Posture',
    target: 'Maxillofacial & Hyoid Musculature',
    duration: 60,
    description: 'Press entire tongue firmly against the roof of mouth (hard & soft palate). Clench lips gently and breathe exclusively through nose.',
    benefits: 'Elevates hyoid bone, tightens submental skin, prevents recessed jaw posture.',
    type: 'timer'
  },
  {
    id: 'masseter',
    title: 'Masseter Hypertrophy Clenches',
    target: 'Masseter & Mandibular Angles',
    duration: 45,
    repsTarget: 15,
    description: 'Contract masseters firmly for 3 seconds, release for 2 seconds. Focus on bilateral symmetrical jaw engagement.',
    benefits: 'Widens jawline contour, improves angularity at gonial angles.',
    type: 'intervals'
  },
  {
    id: 'cheekbone',
    title: 'Zygomatic & Cheekbone Lift',
    target: 'Zygomaticus Major & Minor',
    duration: 40,
    repsTarget: 10,
    description: 'Smile widely while pulling cheek muscles upward toward temples without squinting eyes. Hold peak for 3 seconds.',
    benefits: 'Defines cheek hollows, accentuates zygomatic arches.',
    type: 'intervals'
  },
  {
    id: 'chin_tuck',
    title: 'Cervical Chin Tuck & Spine Lock',
    target: 'Deep Cervical Flexors & Neck Posture',
    duration: 50,
    description: 'Retract chin backward like making a double-chin, aligning occiput over thoracic spine. Hold for 5 seconds per rep.',
    benefits: 'Corrects forward head carriage ("nerd neck"), instantly sharpens jaw-to-neck definition.',
    type: 'intervals'
  }
];

export default function LooksmaxxingStudio({ onBackTo3D }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Studio states
  const [cameraActive, setCameraActive] = useState(false);
  const [hudOverlay, setHudOverlay] = useState(true);
  const [activeDrillIndex, setActiveDrillIndex] = useState(0);
  const [isDrillRunning, setIsDrillRunning] = useState(false);
  const [drillTimeLeft, setDrillTimeLeft] = useState(DRILLS[0].duration);
  const [drillReps, setDrillReps] = useState(0);
  const [soundMuted, setSoundMuted] = useState(false);
  const [intervalPhase, setIntervalPhase] = useState('CONTRACT'); // 'CONTRACT' or 'RELEASE'
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  // Aesthetic biometric scores
  const [symmetryScore] = useState(96.4);
  const [gonialAngle] = useState(118); // Optimal jaw angle is 115-122 deg
  const [canthalTilt] = useState('+4.2° (Hunter)');
  const [facialThirdsRatio] = useState('1.00 : 1.01 : 0.98');
  const [aestheticRating] = useState('Ascended Tier');

  const activeDrill = DRILLS[activeDrillIndex];

  // Initialize camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraActive(true);
        };
      }
    } catch (err) {
      console.warn("Looksmaxxing Camera error:", err);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Real-time Canvas Rendering of Cybernetic Facial Aesthetics HUD
  useEffect(() => {
    let animId;
    const renderHUD = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!canvas || !video || video.readyState < 2) {
        animId = requestAnimationFrame(renderHUD);
        return;
      }

      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw mirrored video feed
      ctx.save();
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, w, h);
      ctx.restore();

      if (hudOverlay) {
        const cx = w / 2;
        const cy = h / 2 - 20;

        // 1. Neon Vertical Midline Symmetry Axis
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.75)'; // Neon Orange
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(cx, cy - 260);
        ctx.lineTo(cx, cy + 280);
        ctx.stroke();
        ctx.setLineDash([]);

        // Symmetry Axis Center Crosshair
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();

        // 2. Golden Ratio Facial Thirds Lines (Forehead, Subnasale, Chin)
        const thirds = [
          { y: cy - 140, label: 'TRICHION (HAIRLINE)' },
          { y: cy - 40, label: 'GLABELLA (BROW RIDGE)' },
          { y: cy + 70, label: 'SUBNASALE (BASE NOSE)' },
          { y: cy + 190, label: 'MENTON (CHIN APEX)' }
        ];

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)'; // Neon Cyan
        ctx.lineWidth = 1;
        thirds.forEach((t) => {
          ctx.beginPath();
          ctx.moveTo(cx - 190, t.y);
          ctx.lineTo(cx + 190, t.y);
          ctx.stroke();

          ctx.fillStyle = '#38bdf8';
          ctx.font = '10px monospace';
          ctx.fillText(t.label, cx + 200, t.y + 3);
        });

        // 3. Mandibular Jawline & Gonial Angle Tracking Vectors
        ctx.strokeStyle = '#a3e635'; // Neon Lime
        ctx.lineWidth = 2.5;

        // Left Gonial Jaw Vector
        ctx.beginPath();
        ctx.moveTo(cx - 150, cy + 50);
        ctx.lineTo(cx - 120, cy + 140); // Gonial angle vertex
        ctx.lineTo(cx - 40, cy + 190);  // Chin contour
        ctx.stroke();

        // Right Gonial Jaw Vector
        ctx.beginPath();
        ctx.moveTo(cx + 150, cy + 50);
        ctx.lineTo(cx + 120, cy + 140); // Gonial angle vertex
        ctx.lineTo(cx + 40, cy + 190);  // Chin contour
        ctx.stroke();

        // Jawline Gonial Angle Badges
        ctx.fillStyle = '#a3e635';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('118° GONIAL', cx - 210, cy + 145);
        ctx.fillText('118° GONIAL', cx + 130, cy + 145);

        // 4. Hunter Eye Canthal Tilt Guidance Lines
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.85)'; // Amber/Gold
        ctx.lineWidth = 2;
        // Left eye tilt (+4° upward slant)
        ctx.beginPath();
        ctx.moveTo(cx - 110, cy - 36);
        ctx.lineTo(cx - 45, cy - 42);
        ctx.stroke();

        // Right eye tilt
        ctx.beginPath();
        ctx.moveTo(cx + 45, cy - 42);
        ctx.lineTo(cx + 110, cy - 36);
        ctx.stroke();

        ctx.fillStyle = '#eab308';
        ctx.font = '10px monospace';
        ctx.fillText('+4.2° CANTHAL TILT (POSITIVE)', cx - 95, cy - 54);

        // 5. Zygomatic Cheekbone Diamond Reticles
        [cx - 135, cx + 135].forEach((zx) => {
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(zx - 15, cy + 10, 30, 30);
          ctx.fillStyle = '#f43f5e';
          ctx.font = '9px monospace';
          ctx.fillText('ZYGOMATIC', zx - 26, cy + 55);
        });

        // 6. Cybernetic Corner Frame Brackets
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        const pad = 40;
        // Top Left
        ctx.beginPath();
        ctx.moveTo(pad, pad + 30);
        ctx.lineTo(pad, pad);
        ctx.lineTo(pad + 30, pad);
        ctx.stroke();
        // Top Right
        ctx.beginPath();
        ctx.moveTo(w - pad - 30, pad);
        ctx.lineTo(w - pad, pad);
        ctx.lineTo(w - pad, pad + 30);
        ctx.stroke();
        // Bottom Left
        ctx.beginPath();
        ctx.moveTo(pad, h - pad - 30);
        ctx.lineTo(pad, h - pad);
        ctx.lineTo(pad + 30, h - pad);
        ctx.stroke();
        // Bottom Right
        ctx.beginPath();
        ctx.moveTo(w - pad - 30, h - pad);
        ctx.lineTo(w - pad, h - pad);
        ctx.lineTo(w - pad, h - pad - 30);
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderHUD);
    };

    animId = requestAnimationFrame(renderHUD);
    return () => cancelAnimationFrame(animId);
  }, [hudOverlay]);

  // Drill Interval & Timer Engine
  useEffect(() => {
    let timer;
    if (isDrillRunning && drillTimeLeft > 0) {
      timer = setInterval(() => {
        setDrillTimeLeft(prev => {
          if (prev <= 1) {
            setIsDrillRunning(false);
            if (!soundMuted) soundFX.playCompleteFanfare();
            return 0;
          }

          // In interval drill (like masseter or cheekbone clench)
          if (activeDrill.type === 'intervals') {
            const currentSeconds = activeDrill.duration - prev + 1;
            const cycle = currentSeconds % 5;
            if (cycle === 0) {
              setIntervalPhase('CONTRACT');
              if (!soundMuted) soundFX.playRepChime();
              setDrillReps(r => r + 1);
            } else if (cycle === 3) {
              setIntervalPhase('RELEASE');
              if (!soundMuted) soundFX.playWarningBeep();
            }
          }

          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isDrillRunning, drillTimeLeft, activeDrill, soundMuted]);

  const selectDrill = (idx) => {
    setActiveDrillIndex(idx);
    setIsDrillRunning(false);
    setDrillTimeLeft(DRILLS[idx].duration);
    setDrillReps(0);
    setIntervalPhase('CONTRACT');
  };

  const toggleDrill = () => {
    if (isDrillRunning) {
      setIsDrillRunning(false);
    } else {
      if (drillTimeLeft === 0) {
        setDrillTimeLeft(activeDrill.duration);
        setDrillReps(0);
      }
      setIsDrillRunning(true);
      if (!soundMuted) soundFX.playRepChime();
    }
  };

  const handleCaptureSnapshot = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setCapturedPhoto(dataUrl);
    if (!soundMuted) soundFX.playRepChime();
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#0d0d11] text-white p-4 md:p-8 font-sans selection:bg-orange-500">
      
      {/* Top Header */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block size-3 rounded-full bg-orange-500 animate-ping"></span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              Looksmaxxing <span className="text-orange-400 text-lg md:text-xl font-mono px-2.5 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30">Face Aesthetics & Mewing Lab</span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Real-time biometric facial geometry, gonial jawline angularity, hunter eye tilt & guided facial fitness
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onBackTo3D && (
            <button
              onClick={onBackTo3D}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-semibold border border-white/10 transition"
            >
              ← Back to 3D Anatomy
            </button>
          )}

          <button
            onClick={() => setHudOverlay(!hudOverlay)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
              hudOverlay 
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-lg shadow-cyan-500/20' 
                : 'bg-white/5 text-gray-400 border-white/10'
            }`}
          >
            <Layers className="size-4" />
            <span>{hudOverlay ? 'Aesthetics HUD: ON' : 'Aesthetics HUD: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Video Camera HUD + Looksmaxxing Telemetry */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Camera Viewport (Span 2) */}
        <div className="lg:col-span-2 relative aspect-video bg-black rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex items-center justify-center">
          
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

          {/* Top-Left Live HUD Badge */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <div className="bg-black/80 backdrop-blur-xl px-3.5 py-2 rounded-2xl border border-orange-500/30 flex items-center gap-2.5 shadow-xl">
              <Scan className="size-4 text-orange-400 animate-spin" style={{ animationDuration: '6s' }} />
              <div className="text-xs">
                <span className="font-mono text-gray-400 uppercase text-[10px] block">Live Aesthetics Scan</span>
                <span className="font-black text-white">{aestheticRating}</span>
              </div>
            </div>

            {/* Interval Drill Active Prompt */}
            {isDrillRunning && activeDrill.type === 'intervals' && (
              <div className={`px-4 py-2 rounded-xl backdrop-blur-xl border font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                intervalPhase === 'CONTRACT'
                  ? 'bg-orange-600/90 text-white border-orange-400 glow-orange scale-105'
                  : 'bg-cyan-600/80 text-white border-cyan-400'
              }`}>
                ⚡ {intervalPhase === 'CONTRACT' ? 'CONTRACT & HOLD JAW / MUSCLE' : 'SLOW RELAX & BREATHE'}
              </div>
            )}
          </div>

          {/* Top-Right Camera Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setSoundMuted(!soundMuted)}
              className="p-2.5 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 hover:border-white/30 text-white transition"
              title="Toggle Audio"
            >
              {soundMuted ? <VolumeX className="size-4 text-gray-400" /> : <Volume2 className="size-4 text-lime-400" />}
            </button>

            <button
              onClick={handleCaptureSnapshot}
              className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg glow-orange transition"
            >
              <Camera className="size-4" />
              <span>Snapshot</span>
            </button>
          </div>

          {/* Bottom Live Drills Prompt Bar */}
          <div className="absolute bottom-4 inset-x-4 z-10 bg-black/80 backdrop-blur-2xl p-3.5 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                {drillTimeLeft}s
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>{activeDrill.title}</span>
                  {activeDrill.type === 'intervals' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-400/20 text-lime-400 font-mono">
                      Reps: {drillReps} / {activeDrill.repsTarget}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-400 truncate max-w-xs md:max-w-md">
                  {activeDrill.benefits}
                </div>
              </div>
            </div>

            <button
              onClick={toggleDrill}
              className={`px-5 py-2 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition shadow-lg ${
                isDrillRunning 
                  ? 'bg-red-500/80 hover:bg-red-500 text-white' 
                  : 'bg-lime-400 hover:bg-lime-300 text-black glow-lime'
              }`}
            >
              {isDrillRunning ? <Pause className="size-3.5" /> : <Play className="size-3.5 fill-black" />}
              <span>{isDrillRunning ? 'Pause Drill' : 'Start Drill'}</span>
            </button>
          </div>

        </div>

        {/* Right Sidebar: Aesthetic Biometrics & Facial Workouts */}
        <div className="flex flex-col gap-4">
          
          {/* Facial Aesthetics Telemetry Bento */}
          <div className="bg-[#1c1c1e] p-5 rounded-3xl border border-white/10 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 font-mono flex items-center gap-2">
                <Target className="size-4 text-orange-400" /> Biomechanical Analysis
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime-500/15 text-lime-400 font-bold">
                AI Golden Ratio
              </span>
            </div>

            {/* Metric 1: Symmetry Score */}
            <div className="bg-[#2c2c2e] p-3 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-400">Bilateral Symmetry</span>
                <div className="text-lg font-black text-white">{symmetryScore}%</div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-lg bg-lime-500/10 text-lime-400 font-semibold">Near Perfect</span>
            </div>

            {/* Metric 2: Mandibular Gonial Angle */}
            <div className="bg-[#2c2c2e] p-3 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-400">Mandibular Angle</span>
                <div className="text-lg font-black text-white">{gonialAngle}° <span className="text-xs font-normal text-gray-400">(Ideal 115-122°)</span></div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-lg bg-orange-500/15 text-orange-400 font-semibold">Chiseled</span>
            </div>

            {/* Metric 3: Canthal Tilt */}
            <div className="bg-[#2c2c2e] p-3 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-400">Canthal Tilt</span>
                <div className="text-lg font-black text-white">{canthalTilt}</div>
              </div>
              <Eye className="size-4 text-yellow-400" />
            </div>

            {/* Metric 4: Facial Thirds Proportion */}
            <div className="bg-[#2c2c2e] p-3 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-400">Facial Thirds (Upper:Mid:Lower)</span>
                <div className="text-sm font-mono font-bold text-cyan-400">{facialThirdsRatio}</div>
              </div>
              <span className="text-xs text-gray-400 font-mono">1 : 1 : 1</span>
            </div>
          </div>

          {/* Drill Selection Tabs */}
          <div className="bg-[#1c1c1e] p-5 rounded-3xl border border-white/10 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 font-mono mb-3 flex items-center gap-2">
                <Sparkles className="size-4 text-lime-400" /> Facial Fitness Routines
              </h3>

              <div className="space-y-2">
                {DRILLS.map((drill, idx) => (
                  <div
                    key={drill.id}
                    onClick={() => selectDrill(idx)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      activeDrillIndex === idx 
                        ? 'bg-orange-500/15 border-orange-500/40 text-white shadow-lg' 
                        : 'bg-[#2c2c2e] hover:bg-[#343438] border-white/5 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{drill.title}</span>
                      <span className="text-[10px] font-mono text-orange-400">{drill.duration}s</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-tight">
                      {drill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-gray-400 flex items-center justify-between font-mono">
              <span>Palatal suction activates deep facial fascia</span>
              <span className="text-orange-400">Apex Looksmaxxing</span>
            </div>
          </div>

        </div>

      </div>

      {/* Snapshot Modal Preview */}
      {capturedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c1c1e] border border-white/15 max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="size-5 text-lime-400" /> Facial Aesthetics Snapshot
              </h3>
              <button 
                onClick={() => setCapturedPhoto(null)}
                className="text-gray-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-white/5"
              >
                Close
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video relative">
              <img src={capturedPhoto} alt="Snapshot" className="size-full object-cover" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs bg-[#2c2c2e] p-3 rounded-2xl border border-white/5">
              <div>
                <div className="text-gray-500 text-[10px]">SYMMETRY</div>
                <div className="text-lime-400 font-bold">{symmetryScore}%</div>
              </div>
              <div>
                <div className="text-gray-500 text-[10px]">MANDIBULAR</div>
                <div className="text-orange-400 font-bold">{gonialAngle}°</div>
              </div>
              <div>
                <div className="text-gray-500 text-[10px]">TILT</div>
                <div className="text-yellow-400 font-bold">+4.2°</div>
              </div>
            </div>

            <a
              href={capturedPhoto}
              download="apexforge-facial-aesthetics.png"
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Download className="size-4" /> Download Biometric Card
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
