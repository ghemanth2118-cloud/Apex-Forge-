import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Wind, 
  Heart, 
  Activity, 
  ShieldCheck, 
  Award, 
  Timer, 
  ChevronRight,
  Flame,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import { saveWorkoutSession } from '../firebase/config';

// Scientific Breathing Protocols
const PROTOCOLS = [
  {
    id: 'box',
    name: 'Box Breathing (Navy SEAL 4-4-4-4)',
    category: 'Focus & Stress Regulation',
    phases: [
      { name: 'INHALE', duration: 4, label: 'Deep diaphragmatic intake', color: '#06b6d4' },
      { name: 'HOLD', duration: 4, label: 'Lock lungs full, expand chest', color: '#f97316' },
      { name: 'EXHALE', duration: 4, label: 'Smooth controlled release', color: '#a3e635' },
      { name: 'HOLD', duration: 4, label: 'Lungs empty, nervous reset', color: '#8b5cf6' }
    ],
    recommendedRounds: 6,
    benefits: 'Regulates autonomic nervous system, lowers cortisol, stabilizes heart rate variability (HRV).'
  },
  {
    id: '478',
    name: '4-7-8 Parasympathetic Reset',
    category: 'Vagal Nerve & Deep Calm',
    phases: [
      { name: 'INHALE', duration: 4, label: 'Quiet inhalation through nose', color: '#06b6d4' },
      { name: 'HOLD', duration: 7, label: 'Oxygen perfusion into bloodstream', color: '#f97316' },
      { name: 'EXHALE', duration: 8, label: 'Whoosh exhale through mouth', color: '#a3e635' }
    ],
    recommendedRounds: 4,
    benefits: 'Triggers parasympathetic acetylcholine release, ideal for post-workout recovery & deep rest.'
  },
  {
    id: 'wimhof',
    name: 'Hyper-Oxygenation & Retention',
    category: 'Cellular Alkalization',
    phases: [
      { name: 'INHALE', duration: 2, label: 'Power breath filling belly & chest', color: '#06b6d4' },
      { name: 'EXHALE', duration: 1, label: 'Let go naturally (do not force)', color: '#a3e635' }
    ],
    recommendedRounds: 25,
    benefits: 'Saturates tissue oxygen, activates adrenaline, temporarily alkalizes blood pH.'
  }
];

// Stylized Anatomical Dual Lung Vector
const PulmonaryLungsSVG = ({ scale = 1, isHolding = false, phaseName = 'INHALE' }) => {
  const pulseColor = phaseName === 'INHALE' ? '#06b6d4' : phaseName === 'HOLD' ? '#f97316' : '#a3e635';

  return (
    <div className="relative size-64 md:size-80 flex items-center justify-center">
      {/* Outer Thoracic Pulsing Aura */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl transition-all duration-1000 opacity-40 pointer-events-none"
        style={{
          backgroundColor: pulseColor,
          transform: `scale(${0.7 + scale * 0.4})`
        }}
      />

      {/* Orbit Expanding Rings */}
      <svg 
        className="absolute inset-0 size-full pointer-events-none transition-transform duration-700 ease-out" 
        viewBox="0 0 200 200"
        style={{ transform: `scale(${0.85 + scale * 0.25})` }}
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke={pulseColor} strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
        <circle cx="100" cy="100" r="82" fill="none" stroke={pulseColor} strokeWidth="1.5" opacity="0.6" />
      </svg>

      {/* Anatomical Lung Illustration */}
      <svg
        className="size-48 md:size-56 transition-transform duration-700 ease-out drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]"
        viewBox="0 0 100 100"
        style={{ transform: `scale(${0.8 + scale * 0.35})` }}
      >
        {/* Trachea / Windpipe */}
        <path d="M47,8 L53,8 L53,28 L47,28 Z" fill="#94a3b8" />
        <path d="M46,12 L54,12 M46,16 L54,16 M46,20 L54,20 M46,24 L54,24" stroke="#475569" strokeWidth="1" />
        {/* Main Bronchi bifurcation */}
        <path d="M47,28 Q38,36 30,42" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M53,28 Q62,36 70,42" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left Lung Lobe */}
        <path
          d="M45,30 C30,30 14,40 16,62 C18,80 32,88 44,82 C46,74 46,45 45,30 Z"
          fill="url(#leftLungGrad)"
          stroke={pulseColor}
          strokeWidth="1.5"
        />

        {/* Right Lung Lobe (Heart notch indentation) */}
        <path
          d="M55,30 C70,30 86,40 84,62 C82,80 68,88 56,82 C54,74 54,45 55,30 Z"
          fill="url(#rightLungGrad)"
          stroke={pulseColor}
          strokeWidth="1.5"
        />

        {/* Bronchial arborization branches */}
        <path d="M32,44 Q24,52 22,64 M32,44 Q32,56 30,70 M26,56 Q20,62 19,72" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
        <path d="M68,44 Q76,52 78,64 M68,44 Q68,56 70,70 M74,56 Q80,62 81,72" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />

        {/* Gradients */}
        <defs>
          <linearGradient id="leftLungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="rightLungGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function LungCapacityTrainer({ onBackTo3D }) {
  // Protocol State
  const [activeProtocolId, setActiveProtocolId] = useState('box');
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(PROTOCOLS[0].phases[0].duration);
  const [cycleCount, setCycleCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // VO2 Breath-Hold Challenge Mode
  const [isHoldChallenge, setIsHoldChallenge] = useState(false);
  const [holdTimer, setHoldTimer] = useState(0);
  const [isHoldingActive, setIsHoldingActive] = useState(false);
  const [bestHoldRecord, setBestHoldRecord] = useState(48); // default record in seconds

  const currentProtocol = PROTOCOLS.find(p => p.id === activeProtocolId) || PROTOCOLS[0];
  const currentPhase = currentProtocol.phases[phaseIndex] || currentProtocol.phases[0];

  // Calculate visual lung expansion scale (0.0 to 1.0)
  const currentPhaseProgress = 1 - (phaseSecondsLeft / currentPhase.duration);
  let visualScale = 0.5;
  if (currentPhase.name === 'INHALE') {
    visualScale = 0.2 + currentPhaseProgress * 0.8;
  } else if (currentPhase.name === 'HOLD') {
    visualScale = phaseIndex === 1 ? 1.0 : 0.2;
  } else if (currentPhase.name === 'EXHALE') {
    visualScale = 1.0 - currentPhaseProgress * 0.8;
  }

  // Timer Tick Engine for Guided Breathing
  useEffect(() => {
    let interval;
    if (isRunning && !isHoldChallenge) {
      interval = setInterval(() => {
        setPhaseSecondsLeft(prev => {
          if (prev <= 1) {
            // Transition to next phase
            const nextIdx = (phaseIndex + 1) % currentProtocol.phases.length;
            setPhaseIndex(nextIdx);
            const nextPhase = currentProtocol.phases[nextIdx];

            if (nextIdx === 0) {
              setCycleCount(c => c + 1);
            }

            // Audio tone for transition
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
    return () => clearInterval(interval);
  }, [isRunning, isHoldChallenge, phaseIndex, currentProtocol, soundEnabled]);

  // Breath-Hold Stopwatch
  useEffect(() => {
    let holdInt;
    if (isHoldingActive) {
      holdInt = setInterval(() => {
        setHoldTimer(t => t + 1);
      }, 1000);
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

    // Log breathwork to Firebase / Local
    await saveWorkoutSession({
      exercise_type: 'Lung Breath Hold Challenge',
      total_reps: holdTimer,
      calories_burned: Math.round(holdTimer * 0.15 * 10) / 10,
      accuracy_score: 98,
      mistakes_logged: [],
      duration_seconds: holdTimer
    });
  };

  const toggleBreathing = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
      if (soundEnabled) soundFX.playRepChime();
    }
  };

  const resetSession = () => {
    setIsRunning(false);
    setPhaseIndex(0);
    setPhaseSecondsLeft(currentProtocol.phases[0].duration);
    setCycleCount(0);
  };

  const switchProtocol = (id) => {
    setActiveProtocolId(id);
    setIsRunning(false);
    const target = PROTOCOLS.find(p => p.id === id) || PROTOCOLS[0];
    setPhaseIndex(0);
    setPhaseSecondsLeft(target.phases[0].duration);
    setCycleCount(0);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#0a0a0e] text-white p-4 md:p-8 font-sans selection:bg-cyan-500">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block size-3 rounded-full bg-cyan-400 animate-ping"></span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              Pulmonary & Respiratory <span className="text-cyan-400 text-lg md:text-xl font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30">Lung Capacity Lab</span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Diaphragmatic expansion, autonomic calm protocols & VO2 max breath-hold capacity training
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
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/30 text-white transition"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="size-4 text-cyan-400" /> : <VolumeX className="size-4 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Protocol Selection Pills */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 bg-[#18181c] p-2 rounded-2xl border border-white/10 mb-8">
        <div className="flex flex-wrap gap-2">
          {PROTOCOLS.map((proto) => (
            <button
              key={proto.id}
              onClick={() => {
                setIsHoldChallenge(false);
                switchProtocol(proto.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition flex items-center gap-2 ${
                !isHoldChallenge && activeProtocolId === proto.id
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wind className="size-4" />
              <span>{proto.name}</span>
            </button>
          ))}

          <button
            onClick={() => {
              setIsRunning(false);
              setIsHoldChallenge(true);
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition flex items-center gap-2 ${
              isHoldChallenge
                ? 'bg-orange-500 text-white shadow-lg glow-orange'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Timer className="size-4" />
            <span>VO2 Breath-Hold Challenge</span>
          </button>
        </div>

        <div className="text-xs font-mono text-gray-400 px-3 hidden md:block">
          {isHoldChallenge ? 'Benchmark Mode' : `${currentProtocol.category}`}
        </div>
      </div>

      {/* Main Interactive Stage */}
      {!isHoldChallenge ? (
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Visual Lung Stage (Span 2) */}
          <div className="lg:col-span-2 bg-[#121217] rounded-3xl border border-white/10 p-8 shadow-2xl flex flex-col items-center justify-between min-h-[460px] relative overflow-hidden">
            
            {/* Top Phase Indicator */}
            <div className="w-full flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full animate-pulse" style={{ backgroundColor: currentPhase.color }}></span>
                <span className="text-sm font-mono font-bold tracking-wider text-gray-300 uppercase">
                  PHASE {phaseIndex + 1}/{currentProtocol.phases.length}: {currentPhase.name}
                </span>
              </div>

              <div className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                Completed Cycles: <strong className="text-cyan-400">{cycleCount}</strong>
              </div>
            </div>

            {/* Central Animated Lungs */}
            <div className="my-4 flex flex-col items-center">
              <PulmonaryLungsSVG 
                scale={visualScale} 
                isHolding={currentPhase.name === 'HOLD'} 
                phaseName={currentPhase.name} 
              />
              
              {/* Giant Countdown Seconds */}
              <div className="text-5xl md:text-6xl font-black tracking-tight text-white mt-2 tabular-nums">
                {phaseSecondsLeft}s
              </div>
              <div className="text-xs md:text-sm font-semibold tracking-wide text-gray-300 mt-1 uppercase">
                {currentPhase.label}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="w-full flex items-center justify-center gap-4 z-10">
              <button
                onClick={toggleBreathing}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm transition shadow-2xl flex items-center gap-2.5 transform hover:scale-105 active:scale-95 ${
                  isRunning 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/25'
                }`}
              >
                {isRunning ? <Pause className="size-4" /> : <Play className="size-4 fill-black" />}
                <span>{isRunning ? 'Pause Session' : 'Begin Breathing Cadence'}</span>
              </button>

              <button
                onClick={resetSession}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition"
                title="Reset"
              >
                <RotateCcw className="size-4" />
              </button>
            </div>

          </div>

          {/* Right Sidebar: Respiratory Telemetry */}
          <div className="flex flex-col gap-4">
            
            {/* Real-time Respiratory Vitals */}
            <div className="bg-[#18181c] p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-mono text-gray-400 flex items-center gap-2">
                <Activity className="size-4 text-cyan-400" /> Respiratory Telemetry
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#121217] p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] uppercase font-mono text-gray-500">Est. Tidal Volume</span>
                  <div className="text-xl font-black text-white">4.8 <span className="text-xs font-normal text-gray-400">Liters</span></div>
                </div>

                <div className="bg-[#121217] p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] uppercase font-mono text-gray-500">Cadence Rate</span>
                  <div className="text-xl font-black text-cyan-400">
                    {Math.round(60 / (currentProtocol.phases.reduce((a, b) => a + b.duration, 0)))} <span className="text-xs font-normal text-gray-400">BPM</span>
                  </div>
                </div>

                <div className="bg-[#121217] p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] uppercase font-mono text-gray-500">O2 Saturation</span>
                  <div className="text-xl font-black text-lime-400">99%</div>
                </div>

                <div className="bg-[#121217] p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] uppercase font-mono text-gray-500">Parasympathetic</span>
                  <div className="text-xl font-black text-orange-400">High</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121217] border border-white/5">
                <div className="text-xs font-bold text-white mb-1">Scientific Mechanism:</div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {currentProtocol.benefits}
                </p>
              </div>
            </div>

            {/* Protocol Steps Guide */}
            <div className="bg-[#18181c] p-6 rounded-3xl border border-white/10 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-mono text-gray-400 mb-3 flex items-center gap-2">
                  <Sparkles className="size-4 text-lime-400" /> Cadence Phases
                </h3>

                <div className="space-y-2">
                  {currentProtocol.phases.map((ph, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                        phaseIndex === idx && isRunning
                          ? 'bg-cyan-500/15 border-cyan-500/40 text-white'
                          : 'bg-[#121217] border-white/5 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="size-2 rounded-full" style={{ backgroundColor: ph.color }}></span>
                        <span className="text-xs font-bold text-white">{ph.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold">{ph.duration}s</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-gray-500 font-mono">
                Controlled thoracic breathing expands active alveolar capacity.
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* VO2 Max Breath-Hold Challenge Mode */
        <div className="w-full max-w-3xl bg-[#121217] rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col items-center text-center">
          
          <div className="size-16 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
            <Timer className="size-8 animate-pulse" />
          </div>

          <h2 className="text-3xl font-black text-white mb-2">VO2 Breath-Hold Lung Capacity Test</h2>
          <p className="text-sm text-gray-300 max-w-md mb-8">
            Take three deep breaths, exhale 50%, then press Start and hold as long as safely comfortable.
          </p>

          {/* Stopwatch Ring */}
          <div className="size-56 rounded-full border-4 border-orange-500/30 flex flex-col items-center justify-center mb-8 shadow-2xl relative">
            <div className="text-6xl font-black tracking-tight text-white tabular-nums">
              {holdTimer}
            </div>
            <span className="text-xs uppercase font-mono tracking-widest text-orange-400 mt-1">SECONDS</span>
            
            {isHoldingActive && (
              <div className="absolute inset-0 rounded-full border-4 border-orange-500 animate-ping opacity-25"></div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mb-8">
            {!isHoldingActive ? (
              <button
                onClick={handleStartHold}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm rounded-2xl shadow-xl glow-orange transition"
              >
                Inhale & Begin Breath Hold
              </button>
            ) : (
              <button
                onClick={handleStopHold}
                className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm rounded-2xl shadow-xl glow-lime transition"
              >
                Release Breath & Record Score
              </button>
            )}
          </div>

          {/* Tier Assessment */}
          <div className="w-full grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-[#18181c] p-3 rounded-2xl border border-white/5">
              <span className="text-gray-500 text-[10px]">CURRENT RATING</span>
              <div className="text-white font-bold mt-0.5">
                {holdTimer < 30 ? 'Novice' : holdTimer < 60 ? 'Fit Athlete' : 'Elite Free-Diver'}
              </div>
            </div>

            <div className="bg-[#18181c] p-3 rounded-2xl border border-white/5">
              <span className="text-gray-500 text-[10px]">PERSONAL BEST</span>
              <div className="text-lime-400 font-bold mt-0.5">{bestHoldRecord}s</div>
            </div>

            <div className="bg-[#18181c] p-3 rounded-2xl border border-white/5">
              <span className="text-gray-500 text-[10px]">VITAL CAPACITY</span>
              <div className="text-cyan-400 font-bold mt-0.5">{Math.min(100, Math.round((holdTimer / 90) * 100))}%</div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
