import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowDown, 
  Play, 
  Sparkles, 
  Activity, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Heart, 
  ShieldCheck,
  ChevronRight,
  Info,
  Layers,
  Hand,
  Wind,
  Scan,
  Flame,
  Zap,
  Target
} from 'lucide-react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Preload the GLB model
useGLTF.preload('/human_anatomy.glb');

// ==========================================
// Custom Cybernetic / Medical Vector Badges
// ==========================================

export const FaceScannerIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <circle cx="12" cy="11" r="4" strokeWidth="1.8" />
    <path d="M12 7v8" strokeDasharray="1 1" />
    <path d="M9 18l3 2 3-2" strokeWidth="2" />
  </svg>
);

export const PulmonaryLungsIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 2v6 M13 2v6" strokeWidth="2" />
    <path d="M11 8c-3 1-6 4-6 9 0 3 2 4 4 4 3 0 4-3 4-7" />
    <path d="M13 8c3 1 6 4 6 9 0 3-2 4-4 4-3 0-4-3-4-7" />
    <circle cx="12" cy="5" r="1" fill="currentColor" />
  </svg>
);

export const DeltoidPowerIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="3" />
    <path d="M5 14l4-3 3 3 4-3 3 3" />
    <path d="M12 14v7" />
    <path d="M8 21h8" />
  </svg>
);

export const CoreMatrixIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="4" width="6" height="4" rx="1" />
    <rect x="13" y="4" width="6" height="4" rx="1" />
    <rect x="5" y="10" width="6" height="4" rx="1" />
    <rect x="13" y="10" width="6" height="4" rx="1" />
    <rect x="5" y="16" width="6" height="4" rx="1" />
    <rect x="13" y="16" width="6" height="4" rx="1" />
  </svg>
);

export const FemoralQuadIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3h10l-2 10-3 8-3-8z" />
    <line x1="12" y1="5" x2="12" y2="15" strokeDasharray="1 2" />
  </svg>
);

export const PatellarPivotIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 2v4 M12 18v4 M2 12h4 M18 12h4" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const AchillesCalfIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3c0 4 2 8 2 12l2 6h4l-1-7c0-4 1-7 1-11H8z" />
    <line x1="12" y1="12" x2="12" y2="19" strokeWidth="2.5" />
  </svg>
);

export const PlantarTripodIcon = ({ className = "size-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 17c1 3 4 4 8 4s7-1 8-4-3-8-8-8-7 5-8 8z" />
    <circle cx="7" cy="17" r="1.5" fill="currentColor" />
    <circle cx="17" cy="17" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// Map badge key to custom SVG component
const HOTSPOT_ICONS = {
  face: FaceScannerIcon,
  lungs: PulmonaryLungsIcon,
  deltoids: DeltoidPowerIcon,
  core: CoreMatrixIcon,
  quads: FemoralQuadIcon,
  knee: PatellarPivotIcon,
  calves: AchillesCalfIcon,
  toes: PlantarTripodIcon
};

// Anatomical Hotspots data with coordinates normalized to model space
const ANATOMICAL_HOTSPOTS = [
  {
    id: 'cranium',
    name: 'Cranial & Facial Aesthetics',
    category: 'Maxillofacial / Looksmaxxing',
    position: [0.0, 2.15, 0.35],
    iconKey: 'face',
    badgeColor: '#00E5FF',
    activation: '98%',
    status: 'Ascended Alignment',
    details: 'Cervical spine alignment, gonial mandibular angle, bilateral facial symmetry & palatal tongue suction.',
    actionTarget: 'looksmaxxing',
    actionLabel: 'Launch Face Looksmaxxing Camera ⚡'
  },
  {
    id: 'chest',
    name: 'Pectoralis Major & Pulmonary Lungs',
    category: 'Respiratory / Thoracic Expansion',
    position: [0.32, 1.35, 0.45],
    iconKey: 'lungs',
    badgeColor: '#00E5FF',
    activation: '95%',
    status: 'Optimal Tidal Flow',
    details: 'Thoracic volume expansion, autonomic vagal calm & diaphragmatic box breathing protocols.',
    actionTarget: 'lungs',
    actionLabel: 'Launch Lung & Breath Trainer 🫁'
  },
  {
    id: 'shoulder',
    name: 'Anterior & Lateral Deltoids',
    category: 'Glenohumeral Articulation',
    position: [-0.95, 1.55, 0.2],
    iconKey: 'deltoids',
    badgeColor: '#FF6B00',
    activation: '88%',
    status: 'Power Engaged',
    details: 'Rotator cuff stability verified. Lateral abduction vector tracking for capped shoulder development.',
    actionTarget: 'camera',
    exerciseId: 'deltoid_raises',
    actionLabel: 'Launch Deltoids AI Workout 💪'
  },
  {
    id: 'core',
    name: 'Rectus Abdominis & Core Matrix',
    category: 'Intra-Abdominal Stability',
    position: [0.0, 0.65, 0.4],
    iconKey: 'core',
    badgeColor: '#FF6B00',
    activation: '96%',
    status: 'Pelvic Braced',
    details: 'Intra-abdominal pressure stable. Plank tension holding anti-extension spine alignment.',
    actionTarget: 'camera',
    exerciseId: 'plank',
    actionLabel: 'Launch Core Plank AI Workout 🛡️'
  },
  {
    id: 'quadriceps',
    name: 'Quadriceps Femoris Power',
    category: 'Femoral Kinetic Chain',
    position: [0.4, -0.75, 0.45],
    iconKey: 'quads',
    badgeColor: '#10B981',
    activation: '92%',
    status: 'High Load Capacity',
    details: 'Vastus lateralis & rectus femoris power delivery during full 90° squat extension.',
    actionTarget: 'camera',
    exerciseId: 'squats',
    actionLabel: 'Launch AI Squat Trainer 🦵'
  },
  {
    id: 'knee',
    name: 'Patellar Hinge Joint',
    category: 'Hinge Articulation Telemetry',
    position: [-0.4, -1.4, 0.35],
    iconKey: 'knee',
    badgeColor: '#00E5FF',
    activation: '84%',
    status: 'Safe Angle Margins',
    details: 'Patellar tracking directly aligned with 2nd metatarsal. Zero valgus knee collapse detected.',
    actionTarget: 'camera',
    exerciseId: 'squats',
    actionLabel: 'Track Patellar Squat Depth 🎯'
  },
  {
    id: 'calves',
    name: 'Gastrocnemius & Soleus',
    category: 'Plantar Flexion Propulsion',
    position: [0.35, -2.0, -0.15],
    iconKey: 'calves',
    badgeColor: '#FF6B00',
    activation: '80%',
    status: 'Elastic Recoil Ready',
    details: 'Posterior chain plantar flexion torque balanced across Achilles tendon for explosive hops.',
    actionTarget: 'camera',
    exerciseId: 'jumping_jacks',
    actionLabel: 'Launch Calf & Cardio Workout ⚡'
  },
  {
    id: 'toes',
    name: 'Metatarsals & Plantar Grounding',
    category: 'Ground Force Vector',
    position: [-0.35, -2.45, 0.35],
    iconKey: 'toes',
    badgeColor: '#10B981',
    activation: '100%',
    status: 'Fully Grounded',
    details: 'Tripod ground contact (heel, 1st & 5th metatarsal) distributing bodyweight evenly.',
    actionTarget: 'camera',
    exerciseId: 'jumping_jacks',
    actionLabel: 'Launch Plantar Kinetic AI 🦶'
  }
];

// Stages for the non-overlapping Biomechanical HUD
const BIOMECHANICAL_STAGES = [
  {
    stage: 1,
    title: 'Cranial & Thoracic Musculature',
    subtitle: 'Head & Neck Articulation • Pectorals & Respiratory',
    range: [0, 25],
    color: '#00E5FF'
  },
  {
    stage: 2,
    title: 'Torso & Pelvic Neutral Bracing',
    subtitle: 'Rectus Abdominis • Lumbar Spine Neutral Margin',
    range: [25, 50],
    color: '#FF6B00'
  },
  {
    stage: 3,
    title: 'Femoral & Patellar Articulation',
    subtitle: 'Quadriceps Femoris • Knee Hinge & Squat Depth',
    range: [50, 75],
    color: '#10B981'
  },
  {
    stage: 4,
    title: 'Plantar & Kinetic Grounding',
    subtitle: 'Achilles Tendon • 3-Point Ground Contact Tripod',
    range: [75, 100],
    color: '#00E5FF'
  }
];

// Custom 3D Model Loader with Auto-Centering and Auto-Scaling
function RealGLBModel({ onLoaded }) {
  const { scene } = useGLTF('/human_anatomy.glb');
  const modelRef = useRef();

  const normalizedScene = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Target height ~ 4.8 units
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scaleFactor = 4.8 / maxDim;

    clone.scale.set(scaleFactor, scaleFactor, scaleFactor);
    clone.position.set(
      -center.x * scaleFactor,
      -center.y * scaleFactor,
      -center.z * scaleFactor
    );

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.35;
          child.material.metalness = 0.15;
          if (!child.material.map && child.material.color) {
            child.material.color.set('#c2410c');
          }
        }
      }
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    if (onLoaded && modelRef.current) {
      onLoaded(modelRef.current);
    }
  }, [onLoaded]);

  return <primitive ref={modelRef} object={normalizedScene} />;
}

// Fallback Mannequin
function ProceduralMannequinFallback() {
  return (
    <group position={[0, -0.2, 0]}>
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#00E5FF" wireframe={true} emissive="#00E5FF" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <capsuleGeometry args={[0.45, 0.9, 8, 16]} />
        <meshStandardMaterial color="#FF6B00" wireframe={true} emissive="#FF6B00" emissiveIntensity={0.5} />
      </mesh>
      {[-0.35, 0.35].map((x, i) => (
        <group key={i} position={[x, 0.4, 0]}>
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 1.1, 12]} />
            <meshStandardMaterial color="#FF6B00" wireframe={true} />
          </mesh>
          <mesh position={[0, -1.7, 0]}>
            <cylinderGeometry args={[0.06, 0.05, 1.1, 12]} />
            <meshStandardMaterial color="#00E5FF" wireframe={true} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Interactive Hotspot Component with Custom Holographic Vector Logo Badges
function HotspotMarker({ hotspot, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = HOTSPOT_ICONS[hotspot.iconKey] || Activity;

  return (
    <group position={hotspot.position}>
      <Html center distanceFactor={8} zIndexRange={[100, 0]}>
        <div 
          className="relative group cursor-pointer" 
          onClick={() => onClick(hotspot)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Pulsing Radar Ring */}
          <div 
            className="absolute -inset-1.5 rounded-full animate-ping opacity-30 pointer-events-none"
            style={{ backgroundColor: hotspot.badgeColor }}
          />

          {/* Futuristic Glassmorphic Hexagonal Badge */}
          <div 
            className={`size-8 md:size-9 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border ${
              isSelected || hovered 
                ? 'scale-125 border-white bg-[#182030] shadow-2xl' 
                : 'bg-[#121824]/80 hover:bg-[#182030] border-white/20'
            }`}
            style={{
              boxShadow: isSelected || hovered ? `0 0 16px ${hotspot.badgeColor}` : undefined
            }}
          >
            <div style={{ color: hotspot.badgeColor }}>
              <IconComponent className="size-4 md:size-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>

          {/* Quick HUD Label Pill */}
          <div className={`absolute left-11 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl backdrop-blur-xl text-xs font-bold border transition-all pointer-events-none flex items-center gap-2 shadow-2xl ${
            isSelected || hovered 
              ? 'bg-[#121824]/95 border-cyan-500/50 text-white opacity-100 translate-x-0' 
              : 'bg-[#0B0E14]/85 border-white/10 text-slate-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
          }`}>
            <span className="size-2 rounded-full" style={{ backgroundColor: hotspot.badgeColor }}></span>
            <span>{hotspot.name}</span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded-md border border-cyan-500/20">
              CLICK TO VIEW
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}

// 3D Scene Composition
function AnatomySceneContent({ onModelGroupReady, selectedHotspot, onSelectHotspot }) {
  const rootGroupRef = useRef();

  useEffect(() => {
    if (onModelGroupReady && rootGroupRef.current) {
      onModelGroupReady(rootGroupRef.current);
    }
  }, [onModelGroupReady]);

  return (
    <group ref={rootGroupRef} position={[0, -1.2, 0]}>
      {/* The Dotted Circular Hologram Ring from Reference Image */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
        <ringGeometry args={[2.0, 2.15, 64]} />
        <meshBasicMaterial color="#10B981" wireframe={true} side={THREE.DoubleSide} /> 
      </mesh>

      {/* Outer Cyan Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.62, 0]}>
        <ringGeometry args={[2.7, 2.75, 48]} />
        <meshBasicMaterial color="#00E5FF" transparent={true} opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Waist Orbit Ring */}
      <mesh rotation={[-Math.PI / 2.3, 0.2, 0]} position={[0, 0.4, 0]}>
        <ringGeometry args={[1.5, 1.54, 64]} />
        <meshBasicMaterial color="#00E5FF" transparent={true} opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Real 3D Model with Fallback */}
      <Suspense fallback={<ProceduralMannequinFallback />}>
        <RealGLBModel />
      </Suspense>

      {/* Interactive Biomechanical Hotspots with Custom SVG Logos */}
      {ANATOMICAL_HOTSPOTS.map((spot) => (
        <HotspotMarker 
          key={spot.id} 
          hotspot={spot} 
          isSelected={selectedHotspot?.id === spot.id}
          onClick={onSelectHotspot}
        />
      ))}
    </group>
  );
}

export default function ThreeDScene({ onStartWorkout, onNavigateToFeature }) {
  const containerRef = useRef(null);
  const [modelGroup, setModelGroup] = useState(null);
  const cameraRef = useRef();
  
  // Interactive state
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(ANATOMICAL_HOTSPOTS[0]);
  const [cameraFov, setCameraFov] = useState(42);
  const [scrollProgress, setScrollProgress] = useState(0);

  // GSAP ScrollTrigger: Rotates 360° & gradually descends from head to toes
  useEffect(() => {
    if (interactiveMode || !modelGroup) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.0,
          onUpdate: (self) => {
            setScrollProgress(Math.round(self.progress * 100));
          }
        }
      });

      // 1. Continuous 360° Model Rotation
      tl.to(modelGroup.rotation, { 
        y: Math.PI * 2, 
        ease: "none" 
      }, 0);

      // 2. Continuous Vertical Translation:
      modelGroup.position.y = -1.2;
      tl.to(modelGroup.position, { 
        y: 3.4, 
        ease: "none" 
      }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, [interactiveMode, modelGroup]);

  // Zoom controls
  const handleZoomIn = () => setCameraFov(prev => Math.max(25, prev - 5));
  const handleZoomOut = () => setCameraFov(prev => Math.min(65, prev + 5));
  const handleReset = () => {
    setCameraFov(42);
    if (modelGroup) {
      modelGroup.rotation.y = 0;
      modelGroup.position.y = -1.2;
    }
  };

  const handleLaunchFeature = (hotspot) => {
    if (!onNavigateToFeature) {
      if (onStartWorkout) onStartWorkout();
      return;
    }

    if (hotspot.actionTarget === 'looksmaxxing') {
      onNavigateToFeature('looksmaxxing');
    } else if (hotspot.actionTarget === 'lungs') {
      onNavigateToFeature('lungs');
    } else if (hotspot.actionTarget === 'camera') {
      onNavigateToFeature('camera', hotspot.exerciseId || 'squats');
    }
  };

  const currentStage = BIOMECHANICAL_STAGES.find(s => scrollProgress >= s.range[0] && scrollProgress <= s.range[1]) || BIOMECHANICAL_STAGES[0];
  const SelectedIcon = HOTSPOT_ICONS[selectedHotspot?.iconKey] || Activity;

  return (
    <div ref={containerRef} className="relative w-full bg-[#0B0E14] text-white font-sans selection:bg-[#00E5FF] selection:text-black">
      
      {/* Fixed Fullscreen 3D Background Canvas */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 bg-gradient-to-b from-[#0F172A] via-[#0B0E14] to-black">
        <Canvas 
          camera={{ position: [0, 0.4, 5.6], fov: cameraFov }}
          onCreated={({ camera }) => { cameraRef.current = camera; }}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[6, 8, 5]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-6, -4, -3]} intensity={1.2} color="#00E5FF" />
          <pointLight position={[0, 4, 3]} intensity={1.8} color="#FF6B00" />
          <pointLight position={[0, -2, 2]} intensity={1.4} color="#10B981" />

          <AnatomySceneContent 
            onModelGroupReady={setModelGroup}
            selectedHotspot={selectedHotspot}
            onSelectHotspot={setSelectedHotspot}
          />

          {interactiveMode && (
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              minDistance={2.5} 
              maxDistance={12} 
            />
          )}
        </Canvas>
      </div>

      {/* Sleek Docked Biomechanical Stage Telemetry (Center Top - Non-Overlapping!) */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full max-w-lg px-4">
        <div className="bg-[#121824]/85 backdrop-blur-xl p-3.5 rounded-2xl border border-white/[0.08] shadow-2xl flex items-center justify-between gap-4 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-cyan-500/15 text-[#00E5FF] flex items-center justify-center shrink-0 border border-cyan-500/20">
              <Sparkles className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  STAGE {currentStage.stage} / 4
                </span>
                <span className="size-1 rounded-full bg-slate-500"></span>
                <span className="text-[10px] font-mono text-slate-400">
                  {Math.round(scrollProgress * 3.6)}° ROTATION
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white tracking-tight">
                {currentStage.title}
              </h3>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="text-xs font-mono font-black text-cyan-400">{scrollProgress}%</span>
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Around-the-Body Muscle Group Quick-Launch Chips (Top-Right) */}
      <div className="fixed top-20 right-4 md:right-8 z-20 flex flex-col gap-2 max-w-[210px] pointer-events-none">
        <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase text-right px-1">
          KINETIC ANATOMY HUBS
        </div>
        <div className="space-y-1.5 pointer-events-auto">
          {ANATOMICAL_HOTSPOTS.slice(0, 5).map((spot) => {
            const SpotIcon = HOTSPOT_ICONS[spot.iconKey] || Activity;
            const isCur = selectedHotspot?.id === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setSelectedHotspot(spot)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border transition flex items-center justify-between backdrop-blur-xl ${
                  isCur 
                    ? 'bg-[#182030] text-cyan-400 border-cyan-500/50 shadow-lg glow-cyan scale-102' 
                    : 'bg-[#121824]/80 hover:bg-[#182030] text-slate-300 border-white/[0.08]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <SpotIcon className="size-3.5 shrink-0" style={{ color: spot.badgeColor }} />
                  <span className="truncate">{spot.name.split('&')[0]}</span>
                </div>
                <span className="text-[10px] opacity-80 font-mono">{spot.activation}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Glassmorphism Cards */}
      
      {/* 1. Athlete Biometrics Card (Top Left) */}
      <div className="fixed top-20 left-4 md:left-8 z-20 max-w-xs pointer-events-none">
        <div className="bg-[#121824]/85 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-white/[0.08] shadow-2xl pointer-events-auto transition hover:border-white/20 space-y-3">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              <ShieldCheck className="size-3.5" />
              <span>ApexForge Pro</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">ID: AF-2026-89</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md shrink-0">
              <div className="size-full rounded-[10px] bg-[#0B0E14] flex items-center justify-center font-bold text-white text-base">
                CV
              </div>
            </div>
            <div className="truncate">
              <h3 className="text-sm font-extrabold text-white truncate">Curtis Valk</h3>
              <p className="text-[11px] text-slate-400 truncate">Born: Mar 28, 1997 • Male • O+</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-black/40 p-2.5 rounded-xl border border-white/[0.05] font-mono">
            <div>
              <div className="text-[9px] text-slate-500 uppercase">Policy No.</div>
              <div className="text-slate-300 font-semibold text-[11px]">XY-2026-3487</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 uppercase">Plan Type</div>
              <div className="text-slate-300 font-semibold text-[11px]">SHP-20260487</div>
            </div>
          </div>

          <button 
            onClick={() => setSelectedHotspot(ANATOMICAL_HOTSPOTS[0])}
            className="w-full py-2 bg-[#00E5FF] hover:bg-[#00D0E6] text-black rounded-xl text-xs font-extrabold shadow-md glow-cyan transition flex items-center justify-center gap-1.5"
          >
            <Info className="size-3.5" />
            <span>Athlete Biometric Scan</span>
          </button>
        </div>
      </div>

      {/* 2. Live Heart Rate 72 BPM Card (Bottom Left) */}
      <div className="fixed bottom-6 left-4 md:left-8 z-20 pointer-events-none">
        <div className="bg-[#121824]/85 backdrop-blur-xl p-4 rounded-2xl border border-white/[0.08] shadow-2xl pointer-events-auto flex flex-col gap-2 min-w-[220px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center">
                <Heart className="size-3.5 animate-pulse" />
              </div>
              <div>
                <div className="text-[9px] uppercase font-mono text-slate-400">Heart Rate</div>
                <div className="text-lg font-black text-white flex items-baseline gap-1">
                  72 <span className="text-[10px] font-normal text-slate-400">BPM</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/20">
              Optimal
            </span>
          </div>

          {/* Centered SVG Animated Pulse Wave */}
          <div className="w-full h-9 flex items-center justify-center">
            <svg className="w-full h-full stroke-cyan-400 fill-none" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path 
                d="M0,12 L20,12 L25,3 L28,21 L32,8 L35,14 L38,12 L60,12 L65,3 L68,21 L72,8 L75,14 L78,12 L100,12" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Floating Hotspot Detail Modal (Bottom Right when selected) */}
      {selectedHotspot && (
        <div className="fixed bottom-6 right-4 md:right-8 z-20 max-w-sm pointer-events-none">
          <div className="bg-[#182030]/90 backdrop-blur-xl p-5 rounded-2xl border border-cyan-500/30 shadow-2xl pointer-events-auto glow-cyan space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                {selectedHotspot.category}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/20">
                {selectedHotspot.activation} Active
              </span>
            </div>

            <h4 className="text-base font-black text-white flex items-center gap-2.5">
              <div className="size-7 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <SelectedIcon className="size-4" />
              </div>
              <span>{selectedHotspot.name}</span>
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedHotspot.details}
            </p>

            {/* Direct Section Action Button */}
            <button
              onClick={() => handleLaunchFeature(selectedHotspot)}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-2"
            >
              <SelectedIcon className="size-4" />
              <span>{selectedHotspot.actionLabel}</span>
            </button>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.06] font-mono">
              <span className="text-slate-400 text-[11px]">Status: <strong className="text-white">{selectedHotspot.status}</strong></span>
              <span className="text-cyan-400 text-[10px]">Click hotspot to switch</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Right Side Camera Tool Palette */}
      <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 z-30 flex flex-col gap-2">
        <button
          onClick={() => setInteractiveMode(!interactiveMode)}
          title={interactiveMode ? "Switch to Scroll Mode" : "Switch to 3D Orbit Mode"}
          className={`size-10 rounded-xl backdrop-blur-xl border flex items-center justify-center transition shadow-xl ${
            interactiveMode 
              ? 'bg-cyan-500 text-black border-cyan-400 glow-cyan' 
              : 'bg-[#121824]/80 text-slate-300 hover:text-white border-white/[0.08] hover:border-white/20'
          }`}
        >
          <Hand className="size-4" />
        </button>

        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="size-10 rounded-xl bg-[#121824]/80 hover:bg-[#182030] backdrop-blur-xl border border-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition shadow-xl"
        >
          <ZoomIn className="size-4" />
        </button>

        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="size-10 rounded-xl bg-[#121824]/80 hover:bg-[#182030] backdrop-blur-xl border border-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition shadow-xl"
        >
          <ZoomOut className="size-4" />
        </button>

        <button
          onClick={handleReset}
          title="Reset View"
          className="size-10 rounded-xl bg-[#121824]/80 hover:bg-[#182030] backdrop-blur-xl border border-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition shadow-xl"
        >
          <RefreshCw className="size-3.5" />
        </button>
      </div>

      {/* Scrollable Spacer Container (enables smooth 360° GSAP rotation without ugly 2D colliding text cards!) */}
      <div className="relative z-10 w-full pointer-events-none">
        <div className="h-[300vh] w-full" />

        {/* Final CTA Section at bottom of scroll */}
        <section className="h-screen flex flex-col items-center justify-center px-6 text-center z-20 pointer-events-auto">
          <div className="max-w-xl bg-[#121824]/90 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/[0.08] shadow-2xl flex flex-col items-center">
            
            <div className="size-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center mb-5 shadow-xl glow-cyan">
              <Play className="size-7 text-black fill-black ml-0.5" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
              Kinetic Scan Complete.
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-6 max-w-md">
              Launch the live webcam studio to execute real-time movement tracking, looksmaxxing aesthetics, and breathwork.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onStartWorkout}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#00E5FF] hover:bg-[#00D0E6] text-black rounded-xl font-extrabold text-sm shadow-xl glow-cyan transition flex items-center justify-center gap-2 transform hover:scale-102 active:scale-98"
              >
                <Play className="size-4 fill-black" />
                <span>Launch Live AI Camera Studio</span>
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto px-5 py-3.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl font-semibold text-xs border border-white/[0.08] transition"
              >
                Back to Top
              </button>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
