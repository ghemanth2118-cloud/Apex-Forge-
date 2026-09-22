import React, { useState } from 'react';
import { 
  Activity, 
  Camera, 
  Box, 
  History, 
  Crown, 
  Sparkles, 
  Check, 
  X,
  ShieldCheck, 
  Zap
} from 'lucide-react';
import FitnessDashboard from './components/FitnessDashboard';
import WorkoutTracker from './components/WorkoutTracker';
import ThreeDScene from './components/ThreeDScene';
import WorkoutHistory from './components/WorkoutHistory';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cameraMode, setCameraMode] = useState('movement');
  const [selectedExercise, setSelectedExercise] = useState('squats');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleNavigateToFeature = (feature, exerciseId) => {
    if (feature === 'looksmaxxing') {
      setCameraMode('looksmaxxing');
      setActiveTab('camera');
    } else if (feature === 'lungs') {
      setCameraMode('pulmonary');
      setActiveTab('camera');
    } else if (feature === 'camera') {
      setCameraMode('movement');
      if (exerciseId) setSelectedExercise(exerciseId);
      setActiveTab('camera');
    } else {
      setActiveTab(feature);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col font-sans selection:bg-[#00E5FF] selection:text-black">
      
      {/* Global Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="size-8 md:size-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md glow-cyan group-hover:scale-105 transition">
            <Activity className="size-5 text-black font-extrabold" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-wider text-white flex items-center gap-1.5">
              APEX <span className="text-[#00E5FF]">FORGE</span>
            </span>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest -mt-1">
              AI Movement Lab
            </span>
          </div>
        </div>

        {/* Center Navigation Pills with Subtle Glow Indicators */}
        <nav className="flex items-center gap-1 bg-[#121824] p-1 rounded-full border border-white/[0.08] shadow-inner">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 md:px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-white text-black shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              setCameraMode('movement');
              setActiveTab('camera');
            }}
            className={`px-4 md:px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'camera'
                ? 'bg-[#00E5FF] text-black font-extrabold shadow-md glow-cyan'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Camera className="size-3.5" />
            <span>Live AI Camera</span>
          </button>

          <button
            onClick={() => setActiveTab('3d')}
            className={`px-4 md:px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === '3d'
                ? 'bg-cyan-500/20 text-[#00E5FF] font-bold border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Box className="size-3.5" />
            <span>3D Anatomy</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 md:px-5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-[#1E293B] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <History className="size-3.5" />
            <span className="hidden sm:inline">Telemetry</span>
          </button>
        </nav>

        {/* Upgrade / Pro Tier Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-cyan-500/10 hover:bg-cyan-500/20 text-[#00E5FF] border border-cyan-500/30 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition shadow-sm glow-cyan"
          >
            <Crown className="size-3.5 text-cyan-400" />
            <span className="hidden sm:inline">PRO TIER</span>
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 w-full">
        {activeTab === 'dashboard' && (
          <FitnessDashboard onNavigate={handleNavigateToFeature} />
        )}
        {activeTab === 'camera' && (
          <WorkoutTracker 
            initialMode={cameraMode}
            initialExercise={selectedExercise}
            onSessionSaved={() => {}} 
          />
        )}
        {activeTab === '3d' && (
          <ThreeDScene 
            onStartWorkout={() => {
              setCameraMode('movement');
              setSelectedExercise('squats');
              setActiveTab('camera');
            }}
            onNavigateToFeature={handleNavigateToFeature}
          />
        )}
        {activeTab === 'history' && (
          <WorkoutHistory />
        )}
      </main>

      {/* Upgrade Pro Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-white/[0.08] max-w-md w-full rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-white/5"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20">
              <Crown className="size-6" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2">ApexForge Pro Membership</h3>
            <p className="text-sm text-slate-300 mb-6">
              Unlock unlimited MediaPipe GPU vision sessions, custom GLB anatomy uploads, and live cloud telemetry syncing.
            </p>

            <div className="space-y-3 mb-6">
              {[
                "Unlimited MediaPipe Vision GPU sessions",
                "Advanced patellar & spine angle telemetry",
                "Unified Face Looksmaxxing & Breathing AI",
                "Direct Firebase Cloud Realtime Sync",
                "Dedicated audio trainer cadence chimes"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="size-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="size-3" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0E14] border border-white/[0.06] mb-6 flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono">Current Status</div>
                <div className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="size-4" /> Active Pro Subscriber
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">Tier: Founder</span>
            </div>

            <button
              onClick={() => setShowUpgradeModal(false)}
              className="w-full py-3.5 bg-[#00E5FF] hover:bg-[#00D0E6] text-black font-extrabold rounded-2xl text-sm transition shadow-xl glow-cyan"
            >
              Close & Enjoy Pro Access
            </button>
          </div>
        </div>
      )}

      {/* Global Status Bar Footer */}
      <footer className="bg-[#0B0E14] border-t border-white/[0.06] px-6 py-3 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping"></span>
            MediaPipe Pose Vision: Online
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-cyan-400" />
            Firebase: kinesispro
          </span>
        </div>
        <div>
          ApexForge &copy; 2026. Unified Biometrics & Movement Lab.
        </div>
      </footer>

    </div>
  );
}
