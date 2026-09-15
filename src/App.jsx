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
  Flame,
  ShieldCheck,
  Zap
} from 'lucide-react';
import FitnessDashboard from './components/FitnessDashboard';
import WorkoutTracker from './components/WorkoutTracker';
import ThreeDScene from './components/ThreeDScene';
import WorkoutHistory from './components/WorkoutHistory';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1c1c1e]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="size-9 rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center shadow-md glow-orange group-hover:scale-105 transition">
            <Activity className="size-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider text-white flex items-center gap-1.5">
              APEX <span className="text-orange-500">FORGE</span>
            </span>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest -mt-1">
              AI Movement Lab
            </span>
          </div>
        </div>

        {/* Center Navigation Pills */}
        <nav className="flex items-center gap-1.5 bg-[#2c2c2e] p-1.5 rounded-full border border-white/5 shadow-inner">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-white text-black shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('camera')}
            className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'camera'
                ? 'bg-orange-500 text-white shadow-md glow-orange'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Camera className="size-4" />
            <span>Live Pose AI</span>
          </button>

          <button
            onClick={() => setActiveTab('3d')}
            className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === '3d'
                ? 'bg-cyan-500 text-black font-bold shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Box className="size-4" />
            <span>3D Anatomy</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-lime-400 text-black font-bold shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <History className="size-4" />
            <span className="hidden sm:inline">Telemetry</span>
          </button>
        </nav>

        {/* Upgrade / Pro Tier Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-lime-400/15 hover:bg-lime-400/25 text-lime-400 border border-lime-400/30 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            <Crown className="size-4 text-lime-400 fill-lime-400/20" />
            <span className="hidden sm:inline">PRO TIER</span>
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 w-full">
        {activeTab === 'dashboard' && <FitnessDashboard onNavigate={setActiveTab} />}
        {activeTab === 'camera' && <WorkoutTracker onSessionSaved={() => {}} />}
        {activeTab === '3d' && <ThreeDScene onStartWorkout={() => setActiveTab('camera')} />}
        {activeTab === 'history' && <WorkoutHistory />}
      </main>

      {/* Upgrade Pro Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#2c2c2e] border border-white/15 max-w-md w-full rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full bg-white/5"
            >
              <X className="size-5" />
            </button>

            <div className="size-12 rounded-2xl bg-lime-400/20 text-lime-400 flex items-center justify-center mb-4">
              <Crown className="size-6" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2">ApexForge Pro Membership</h3>
            <p className="text-sm text-gray-300 mb-6">
              Unlock unlimited 3D motion scans, custom GLB anatomy model uploads, and live cloud telemetry syncing.
            </p>

            <div className="space-y-3 mb-6">
              {[
                "Unlimited MediaPipe Vision GPU sessions",
                "Advanced patellar & spine angle telemetry",
                "Custom 3D Anatomy GLB model uploads",
                "Direct Firebase Cloud Realtime Sync",
                "Dedicated audio trainer cadence chimes"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-gray-200">
                  <div className="size-4 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center shrink-0">
                    <Check className="size-3" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#1c1c1e] border border-white/5 mb-6 flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-400 uppercase font-mono">Current Status</div>
                <div className="text-base font-bold text-lime-400 flex items-center gap-1.5">
                  <ShieldCheck className="size-4" /> Active Pro Subscriber
                </div>
              </div>
              <span className="text-xs text-gray-400 font-mono">Tier: Founder</span>
            </div>

            <button
              onClick={() => setShowUpgradeModal(false)}
              className="w-full py-3.5 bg-lime-400 hover:bg-lime-500 text-black font-extrabold rounded-2xl text-sm transition shadow-xl glow-lime"
            >
              Close & Enjoy Pro Access
            </button>
          </div>
        </div>
      )}

      {/* Global Status Bar Footer */}
      <footer className="bg-[#1c1c1e] border-t border-white/5 px-6 py-3 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-lime-400 animate-ping"></span>
            MediaPipe Pose Vision: Online
          </span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-orange-400" />
            Firebase: apexforge-e2bc9
          </span>
        </div>
        <div>
          ApexForge &copy; 2026. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
