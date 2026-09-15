import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Activity, 
  Heart, 
  Flame, 
  Target, 
  TrendingUp, 
  Sparkles, 
  Camera, 
  Clock, 
  Calendar, 
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  Box
} from 'lucide-react';
import { getRecentSessions } from '../firebase/config';

// Activity Chart Data with Tuesday highlighted
const initialActivityData = [
  { day: 'Sun', value: 42, active: false },
  { day: 'Mon', value: 65, active: false },
  { day: 'Tue', value: 92, active: true }, // Highlighted Tuesday
  { day: 'Wed', value: 54, active: false },
  { day: 'Thu', value: 78, active: false },
  { day: 'Fri', value: 70, active: false },
  { day: 'Sat', value: 85, active: false }
];

const heartRateData = [
  { time: '08:00', bpm: 72 },
  { time: '09:00', bpm: 85 },
  { time: '10:00', bpm: 128 },
  { time: '11:00', bpm: 110 },
  { time: '12:00', bpm: 95 },
  { time: '13:00', bpm: 104 },
  { time: '14:00', bpm: 110 }
];

export default function FitnessDashboard({ onNavigate }) {
  const [activityData, setActivityData] = useState(initialActivityData);
  const [recentSessions, setRecentSessions] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Tue');
  const [isProUser, setIsProUser] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      const sessions = await getRecentSessions(4);
      setRecentSessions(sessions);
    }
    loadSessions();
  }, []);

  const handleBarClick = (entry) => {
    setSelectedDay(entry.day);
    setActivityData(prev => 
      prev.map(item => ({
        ...item,
        active: item.day === entry.day
      }))
    );
  };

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white p-4 md:p-8 font-sans">
      
      {/* Quick Hero Banner / Launch AI Camera */}
      <div className="w-full bg-gradient-to-r from-orange-500/15 via-[#2c2c2e] to-lime-500/10 border border-orange-500/20 rounded-3xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Zap className="size-3.5" /> MediaPipe Vision 2.0 Enabled
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            AI-Powered Biomechanics & Real-time Form Correction
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl">
            Track skeletal alignment in 3D space, calculate depth and flexion angles, and sync every repetition directly to your profile.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('camera')}
            className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg glow-orange flex items-center gap-2.5 transition transform hover:scale-105 active:scale-95"
          >
            <Camera className="size-5" />
            <span>Launch Live AI Tracker</span>
          </button>

          <button
            onClick={() => onNavigate('3d')}
            className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-2xl border border-white/10 text-sm font-medium flex items-center gap-2 transition"
          >
            <Box className="size-4 text-cyan-400" />
            <span>3D Anatomy</span>
          </button>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Activity Bar Chart (Span 2 columns) */}
        <div className="md:col-span-2 bg-[#2c2c2e] p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Weekly Movement</div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                Activity Score <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-gray-400 font-normal">Active: {selectedDay}</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-lime-500/15 border border-lime-500/30 text-lime-400 font-bold text-sm">
              <TrendingUp className="size-4" />
              <span>+25% vs last week</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="day" 
                  stroke="#71717a" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 13, fill: '#9ca3af' }}
                />
                <YAxis 
                  stroke="#71717a" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717a' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)', radius: 8 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-black/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs shadow-2xl">
                          <p className="font-bold text-white">{payload[0].payload.day}</p>
                          <p className="text-orange-400 font-semibold">{payload[0].value} Movement Units</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[8, 8, 0, 0]} 
                  onClick={handleBarClick}
                  className="cursor-pointer"
                >
                  {activityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.day === selectedDay ? '#f97316' : '#4a4a4c'} 
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 pt-4 border-t border-white/5">
            <span>Peak performance logged on Tuesday (92 pts)</span>
            <span className="text-orange-400 font-medium">Click any bar to inspect daily metrics</span>
          </div>
        </div>

        {/* 2. Workout Goals Circular Progress (1 column) */}
        <div className="bg-[#2c2c2e] p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="size-5 text-lime-400" /> Workout Goals
            </h2>
            <span className="text-xs px-2.5 py-1 bg-lime-500/10 text-lime-400 rounded-full font-semibold">
              On Track
            </span>
          </div>

          {/* SVG Circular Ring */}
          <div className="relative size-48 flex items-center justify-center my-4">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#3a3a3c"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress Ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#a3e635"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="62.8" // 75%
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out glow-lime"
              />
            </svg>

            {/* Centered Stats */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-4xl font-black text-white tracking-tight tabular-nums">75%</div>
              <div className="text-xs text-gray-400 font-medium mt-1">15/20 Completed</div>
            </div>
          </div>

          <p className="text-xs text-center text-gray-400">
            5 more workout sessions needed to hit your weekly target milestone.
          </p>
        </div>

        {/* 3. Calories & Macro-Nutrients Analysis (Span 2 columns) */}
        <div className="md:col-span-2 bg-[#2c2c2e] p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Nutritional Fuel</div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                Calories & Nutrient Analysis
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-400">Today's Summary</span>
          </div>

          <div className="space-y-4">
            {/* Calories Row */}
            <div className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-1/4">
                <div className="p-2.5 bg-orange-500/20 text-orange-400 rounded-xl">
                  <Flame className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Active Burn</div>
                  <div className="text-xs text-gray-400">Exercise + BMR</div>
                </div>
              </div>

              <div className="w-full md:w-2/4">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-mono">
                  <span>1,840 kcal</span>
                  <span>2,400 Goal (76.6%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#3a3a3c] rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full glow-orange" style={{ width: '76.6%' }}></div>
                </div>
              </div>

              <div className="w-full md:w-1/4 text-right">
                <span className="text-sm font-bold text-orange-400">560 kcal left</span>
              </div>
            </div>

            {/* Protein Row */}
            <div className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-1/4">
                <div className="p-2.5 bg-lime-500/20 text-lime-400 rounded-xl">
                  <Award className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Protein</div>
                  <div className="text-xs text-gray-400">Muscle recovery</div>
                </div>
              </div>

              <div className="w-full md:w-2/4">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-mono">
                  <span>145.0 g</span>
                  <span>180.0 g Goal (80.5%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#3a3a3c] rounded-full overflow-hidden">
                  <div className="h-full bg-lime-400 rounded-full glow-lime" style={{ width: '80.5%' }}></div>
                </div>
              </div>

              <div className="w-full md:w-1/4 text-right">
                <span className="text-sm font-bold text-lime-400">35 g left</span>
              </div>
            </div>

            {/* Carbs & Fats Compact Dual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1c1c1e] p-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Carbohydrates</div>
                  <div className="text-base font-bold text-white">210 g <span className="text-xs font-normal text-gray-400">/ 260 g</span></div>
                </div>
                <div className="text-right text-xs font-semibold text-cyan-400">80.7%</div>
              </div>

              <div className="bg-[#1c1c1e] p-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Healthy Fats</div>
                  <div className="text-base font-bold text-white">55 g <span className="text-xs font-normal text-gray-400">/ 70 g</span></div>
                </div>
                <div className="text-right text-xs font-semibold text-purple-400">78.5%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Heart Beat Monitor (1 column) */}
        <div className="bg-[#2c2c2e] p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Heart className="size-5 text-red-500 animate-pulse" /> Heart Beat
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 bg-red-500/10 text-red-400 rounded-full">
                ECG Live
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <div className="text-4xl font-extrabold text-white tabular-nums tracking-tight">110</div>
              <div className="text-sm text-gray-400">bpm <span className="text-xs text-lime-400">(Optimal Zone)</span></div>
            </div>
          </div>

          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide={true} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-black/90 px-3 py-1.5 rounded-lg text-xs border border-white/10">
                          <span className="text-red-400 font-bold">{payload[0].value} bpm</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bpm" 
                  stroke="#f97316" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 5, fill: '#f97316' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-gray-400 flex justify-between items-center pt-3 border-t border-white/5">
            <span>Resting BPM: 62</span>
            <span className="text-gray-300">Max Peak: 142</span>
          </div>
        </div>

      </div>

      {/* Recent AI Workout History Feed */}
      <div className="mt-8 bg-[#2c2c2e] p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="size-6 text-lime-400" /> Recent Cloud Sessions
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Workouts and form alerts logged directly to Firebase Firestore
            </p>
          </div>

          <button
            onClick={() => onNavigate('camera')}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-lime-400 border border-lime-500/20 flex items-center gap-1.5 transition"
          >
            <span>Start New Session</span>
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentSessions.map((session, idx) => (
            <div key={session.id || idx} className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5 hover:border-white/20 transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wide">
                    {session.exercise_type || 'Workout'}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {new Date(session.timestamp?.seconds ? session.timestamp.seconds * 1000 : session.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-2xl font-black text-white mb-1 tabular-nums">
                  {session.total_reps} <span className="text-xs font-normal text-gray-400">Reps</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Flame className="size-3 text-orange-500" /> {session.calories_burned} kcal</span>
                  <span className="flex items-center gap-1"><Award className="size-3 text-lime-400" /> {session.accuracy_score || 95}% Acc</span>
                </div>
              </div>

              {session.mistakes_logged && session.mistakes_logged.length > 0 ? (
                <div className="text-[11px] text-orange-300 bg-orange-500/10 border border-orange-500/20 px-2 py-1.5 rounded-lg truncate">
                  ⚠️ {session.mistakes_logged[0]}
                </div>
              ) : (
                <div className="text-[11px] text-lime-300 bg-lime-500/10 border border-lime-500/20 px-2 py-1.5 rounded-lg">
                  ✨ Flawless technique
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
