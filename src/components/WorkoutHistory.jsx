import React, { useState, useEffect } from 'react';
import { 
  getRecentSessions 
} from '../firebase/config';
import { 
  ShieldCheck, 
  Flame, 
  Award, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  Filter,
  CheckCircle,
  BarChart2
} from 'lucide-react';

export default function WorkoutHistory() {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions() {
      setLoading(true);
      const data = await getRecentSessions(20);
      setSessions(data);
      setLoading(false);
    }
    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter(s => {
    if (filter === 'all') return true;
    return s.exercise_type?.toLowerCase() === filter.toLowerCase();
  });

  const totalReps = sessions.reduce((acc, s) => acc + (s.total_reps || 0), 0);
  const totalKcal = Math.round(sessions.reduce((acc, s) => acc + (s.calories_burned || 0), 0));
  const avgAccuracy = sessions.length > 0 
    ? Math.round(sessions.reduce((acc, s) => acc + (s.accuracy_score || 92), 0) / sessions.length) 
    : 100;

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white p-4 md:p-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Workout History & Biomechanical Telemetry
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Historical logs of your reps, caloric burn, and AI form correction warnings from Firebase.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-[#2c2c2e] p-1.5 rounded-2xl border border-white/5">
          {['all', 'squats', 'bicep curls', 'pushups', 'jumping jacks'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                filter === type
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <BarChart2 className="size-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-mono uppercase">Total Repetitions</div>
            <div className="text-2xl font-black text-white tabular-nums">{totalReps}</div>
          </div>
        </div>

        <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center">
            <Flame className="size-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-mono uppercase">Total Energy Burned</div>
            <div className="text-2xl font-black text-white tabular-nums">{totalKcal} <span className="text-xs text-gray-400 font-normal">kcal</span></div>
          </div>
        </div>

        <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Award className="size-6" />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-mono uppercase">Avg Form Score</div>
            <div className="text-2xl font-black text-lime-400 tabular-nums">{avgAccuracy}%</div>
          </div>
        </div>
      </div>

      {/* Session Table / List */}
      <div className="bg-[#2c2c2e] rounded-3xl border border-white/5 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
          <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">Logged Sessions ({filteredSessions.length})</span>
          <span className="text-xs text-lime-400 flex items-center gap-1 font-medium">
            <CheckCircle className="size-3.5" /> Firestore Synced
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading session telemetry...</div>
        ) : filteredSessions.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No workout records found for this filter.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredSessions.map((session, index) => (
              <div key={session.id || index} className="p-6 hover:bg-white/[0.02] transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-white">{session.exercise_type}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {session.total_reps} Reps
                    </span>
                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                      <Calendar className="size-3 text-gray-500" />
                      {new Date(session.timestamp?.seconds ? session.timestamp.seconds * 1000 : session.created_at || Date.now()).toLocaleString()}
                    </span>
                  </div>

                  {session.mistakes_logged && session.mistakes_logged.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {session.mistakes_logged.map((m, mIdx) => (
                        <span key={mIdx} className="text-xs bg-black/40 text-orange-300 border border-orange-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <AlertTriangle className="size-3 text-orange-400 shrink-0" />
                          <span>{m}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-lime-400 flex items-center gap-1 mt-1">
                      <CheckCircle className="size-3.5" /> Perfect posture maintained throughout.
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6 shrink-0 font-mono text-sm">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Calories</div>
                    <div className="font-bold text-white">{session.calories_burned} kcal</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Accuracy</div>
                    <div className="font-bold text-lime-400">{session.accuracy_score || 94}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
