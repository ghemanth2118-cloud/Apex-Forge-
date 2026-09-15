import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html, Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowDown, 
  Play, 
  Sparkles, 
  Activity, 
  Rotate3d, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  QrCode, 
  Heart, 
  ShieldCheck,
  ChevronRight,
  Info,
  Layers,
  Hand
} from 'lucide-react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Preload the GLB model
useGLTF.preload('/human_anatomy.glb');

// Anatomical Hotspots data with coordinates normalized to model space
const ANATOMICAL_HOTSPOTS = [
  {
    id: 'cranium',
    name: 'Cranial & Cervical Musculature',
    category: 'Head & Neck Articulation',
    position: [0.0, 2.15, 0.35],
    icon: '🧠',
    activation: '97%',
    status: 'Neutral Posture',
    details: 'Cervical spine alignment locked. Sternocleidomastoid and splenius capitis in balanced tension.'
  },
  {
    id: 'chest',
    name: 'Pectoralis Major & Lungs',
    category: 'Respiratory / Upper Torso',
    position: [0.32, 1.35, 0.45],
    icon: '🫁',
    activation: '94%',
    status: 'Optimal Tension',
    details: 'Thoracic expansion and sternal pectoralis engagement. Symmetrical bilateral load.'
  },
  {
    id: 'shoulder',
    name: 'Anterior Deltoid',
    category: 'Glenohumeral Articulation',
    position: [-0.95, 1.55, 0.2],
    icon: '💪',
    activation: '88%',
    status: 'Engaged',
    details: 'Rotator cuff stability verified. Zero anterior impingement detected.'
  },
  {
    id: 'core',
    name: 'Rectus Abdominis & Obliques',
    category: 'Core Stability',
    position: [0.0, 0.65, 0.4],
    icon: '⚡',
    activation: '96%',
    status: 'Braced',
    details: 'Intra-abdominal pressure stable. Pelvic neutral alignment maintained.'
  },
  {
    id: 'quadriceps',
    name: 'Quadriceps Femoris',
    category: 'Lower Kinetic Chain',
    position: [0.4, -0.75, 0.45],
    icon: '🦵',
    activation: '91%',
    status: 'High Load',
    details: 'Vastus lateralis & rectus femoris power delivery during extension.'
  },
  {
    id: 'knee',
    name: 'Patellar Tendon & Knee Joint',
    category: 'Hinge Articulation',
    position: [-0.4, -1.4, 0.35],
    icon: '🎯',
    activation: '82%',
    status: 'Safe Angle',
    details: 'Patellar tracking directly aligned with 2nd metatarsal. No valgus collapse.'
  },
  {
    id: 'calves',
    name: 'Gastrocnemius & Soleus',
    category: 'Plantar Flexion',
    position: [0.35, -2.0, -0.15],
    icon: '⚡',
    activation: '79%',
    status: 'Stabilizing',
    details: 'Posterior chain plantar flexion torque balanced across Achilles tendon.'
  },
  {
    id: 'toes',
    name: 'Metatarsals & Plantar Grounding',
    category: 'Ground Force Vector',
    position: [-0.35, -2.45, 0.35],
    icon: '🦶',
    activation: '100%',
    status: 'Fully Grounded',
    details: 'Tripod ground contact (heel, 1st & 5th metatarsal) distributing bodyweight evenly.'
  }
];


// Custom 3D Model Loader with Auto-Centering and Auto-Scaling
function RealGLBModel({ onLoaded }) {
  const { scene } = useGLTF('/human_anatomy.glb');
  const modelRef = useRef();

  // Compute bounding box and normalize scale & center
  const normalizedScene = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Target height ~ 4.8 units
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scaleFactor = 4.8 / maxDim;

    clone.scale.set(scaleFactor, scaleFactor, scaleFactor);
    // Center at (0, 0, 0)
    clone.position.set(
      -center.x * scaleFactor,
      -center.y * scaleFactor,
      -center.z * scaleFactor
    );

    // Enhance materials for futuristic medical look
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.35;
          child.material.metalness = 0.15;
          // If muscle model, ensure rich tone
          if (!child.material.map && child.material.color) {
            child.material.color.set('#c2410c'); // Deep muscle crimson
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

// Procedural fallback mannequin
function ProceduralMannequinFallback() {
  return (
    <group position={[0, -0.2, 0]}>
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#06b6d4" wireframe={true} emissive="#06b6d4" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <capsuleGeometry args={[0.45, 0.9, 8, 16]} />
        <meshStandardMaterial color="#f97316" wireframe={true} emissive="#f97316" emissiveIntensity={0.5} />
      </mesh>
      {[-0.35, 0.35].map((x, i) => (
        <group key={i} position={[x, 0.4, 0]}>
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 1.1, 12]} />
            <meshStandardMaterial color="#f97316" wireframe={true} />
          </mesh>
          <mesh position={[0, -1.7, 0]}>
            <cylinderGeometry args={[0.06, 0.05, 1.1, 12]} />
            <meshStandardMaterial color="#38bdf8" wireframe={true} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Interactive Hotspot Component
function HotspotMarker({ hotspot, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={hotspot.position}>
      <Html center distanceFactor={8} zIndexRange={[100, 0]}>
        <div className="relative group cursor-pointer" onClick={() => onClick(hotspot)}>
          {/* Pulsing outer ring */}
          <div className={`size-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isSelected || hovered 
              ? 'bg-orange-500 scale-125 glow-orange' 
              : 'bg-blue-600/80 hover:bg-orange-500 border border-white/60 shadow-lg'
          }`}>
            <span className="text-[11px] select-none">{hotspot.icon}</span>
          </div>

          {/* Quick label pill */}
          <div className={`absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg backdrop-blur-md text-[11px] font-bold border transition-all pointer-events-none ${
            isSelected || hovered 
              ? 'bg-black/90 border-orange-500 text-orange-400 opacity-100' 
              : 'bg-black/70 border-white/10 text-gray-200 opacity-0 group-hover:opacity-100'
          }`}>
            {hotspot.name}
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
        <meshBasicMaterial color="#a3e635" wireframe={true} side={THREE.DoubleSide} /> 
      </mesh>

      {/* Outer Cyan Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.62, 0]}>
        <ringGeometry args={[2.7, 2.75, 48]} />
        <meshBasicMaterial color="#06b6d4" transparent={true} opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Waist Orbit Ring (Matching reference image circle) */}
      <mesh rotation={[-Math.PI / 2.3, 0.2, 0]} position={[0, 0.4, 0]}>
        <ringGeometry args={[1.5, 1.54, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent={true} opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Real 3D Model with Fallback */}
      <Suspense fallback={<ProceduralMannequinFallback />}>
        <RealGLBModel />
      </Suspense>

      {/* Interactive Biomechanical Hotspots */}
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

export default function ThreeDScene({ onStartWorkout }) {
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
      // Timeline linked directly to scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.0, // Smooth scrubbing
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
      // Model starts at y = -1.2 (Head, Face, and Cranium fully visible with clean headroom)
      // Model moves up to y = 3.4 (camera focuses on Legs, Ankles, and Toes grounded on holographic base ring)
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

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a0c] text-white font-sans selection:bg-orange-500">
      
      {/* Fixed Fullscreen 3D Background Canvas */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 bg-gradient-to-b from-[#0f0f13] via-[#09090b] to-black">
        <Canvas 
          camera={{ position: [0, 0.4, 5.6], fov: cameraFov }}
          onCreated={({ camera }) => { cameraRef.current = camera; }}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[6, 8, 5]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-6, -4, -3]} intensity={1.2} color="#06b6d4" />
          <pointLight position={[0, 4, 3]} intensity={1.8} color="#f97316" />
          <pointLight position={[0, -2, 2]} intensity={1.4} color="#a3e635" />

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



      {/* Floating Glassmorphism Cards (Inspired by Healix Reference Image) */}
      
      {/* 1. Athlete Biometrics Card (Top Left) */}
      <div className="fixed top-20 left-4 md:left-8 z-20 max-w-xs md:max-w-sm pointer-events-none">
        <div className="bg-black/50 backdrop-blur-2xl p-5 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto transition hover:border-white/20">
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              <ShieldCheck className="size-3.5" />
              <span>PrimeCare Plus</span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">ID: KP-2026-89</span>
          </div>

          <div className="flex items-center gap-3.5 mb-4">
            <div className="size-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 shadow-md">
              <div className="size-full rounded-[14px] bg-[#1c1c1e] flex items-center justify-center font-bold text-white text-lg">
                CV
              </div>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Curtis Valk</h3>
              <p className="text-xs text-gray-400">Born: March 28, 1997 • Male • O+</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-white/5 p-3 rounded-2xl border border-white/5 mb-3 font-mono">
            <div>
              <div className="text-[10px] text-gray-500">POLICY NUMBER</div>
              <div className="text-gray-200 font-semibold">XY-2026-3487</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500">PLAN TYPE</div>
              <div className="text-gray-200 font-semibold">SHP-2026048723</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button 
              onClick={() => setSelectedHotspot(ANATOMICAL_HOTSPOTS[0])}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
            >
              <Info className="size-3.5" />
              <span>Athlete Biometric Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Live Heart Rate 72 BPM Card (Bottom Left) */}
      <div className="fixed bottom-6 left-4 md:left-8 z-20 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto flex flex-col gap-2 min-w-[240px] md:min-w-[280px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                <Heart className="size-4 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-gray-400">Heart Rate</div>
                <div className="text-xl font-black text-white flex items-baseline gap-1">
                  72 <span className="text-xs font-normal text-gray-400">BPM</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-500/15 text-lime-400 font-semibold">
              Resting Optimal
            </span>
          </div>

          {/* SVG Animated Cardiac Rhythm Wave */}
          <div className="w-full h-12 pt-1">
            <svg className="w-full h-full stroke-blue-400 fill-none" viewBox="0 0 100 25" preserveAspectRatio="none">
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
        <div className="fixed bottom-6 right-4 md:right-20 z-20 max-w-sm pointer-events-none">
          <div className="bg-black/60 backdrop-blur-2xl p-5 rounded-3xl border border-orange-500/40 shadow-2xl pointer-events-auto glow-orange">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
                {selectedHotspot.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-lime-500/20 text-lime-400 font-bold">
                {selectedHotspot.activation} Active
              </span>
            </div>

            <h4 className="text-lg font-black text-white flex items-center gap-2 mb-1">
              <span>{selectedHotspot.icon}</span>
              <span>{selectedHotspot.name}</span>
            </h4>

            <p className="text-xs text-gray-300 leading-relaxed mb-3">
              {selectedHotspot.details}
            </p>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 font-mono">
              <span className="text-gray-400">Status: <strong className="text-white">{selectedHotspot.status}</strong></span>
              <span className="text-orange-400">Click markers to switch</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Right Side Floating Camera Tool Palette (Matching Reference Image Zoom/Rotate) */}
      <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 z-30 flex flex-col gap-2.5">
        <button
          onClick={() => setInteractiveMode(!interactiveMode)}
          title={interactiveMode ? "Switch to Scroll Mode" : "Switch to 3D Orbit Mode"}
          className={`size-11 rounded-2xl backdrop-blur-xl border flex items-center justify-center transition shadow-xl ${
            interactiveMode 
              ? 'bg-blue-600 text-white border-blue-400 shadow-blue-500/30' 
              : 'bg-black/50 text-gray-300 hover:text-white border-white/10 hover:border-white/30'
          }`}
        >
          <Hand className="size-5" />
        </button>

        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="size-11 rounded-2xl bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/10 hover:border-white/30 text-gray-300 hover:text-white flex items-center justify-center transition shadow-xl"
        >
          <ZoomIn className="size-5" />
        </button>

        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="size-11 rounded-2xl bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/10 hover:border-white/30 text-gray-300 hover:text-white flex items-center justify-center transition shadow-xl"
        >
          <ZoomOut className="size-5" />
        </button>

        <button
          onClick={handleReset}
          title="Reset View"
          className="size-11 rounded-2xl bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/10 hover:border-white/30 text-gray-300 hover:text-white flex items-center justify-center transition shadow-xl"
        >
          <RefreshCw className="size-4" />
        </button>
      </div>

      {/* Scrollable Storyboard Overlay (350vh) driving the GSAP 360° rotation & toe descent */}
      <div className="relative z-10 w-full">
        
        {/* Stage 1: Head & Pectorals */}
        <section className="h-screen flex flex-col justify-center items-end px-8 md:px-24 pointer-events-none">
          <div className="max-w-md bg-black/50 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase mb-3">
              <Sparkles className="size-3.5" /> Stage 1: Cranial & Thoracic
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              Upper Musculature
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Real-time biomechanical mapping of the deltoids, pectorals, and sternocleidomastoid. Scroll downward to rotate the body and inspect pelvic balance.
            </p>
            <div className="flex justify-end items-center gap-2 text-xs text-orange-400 font-mono">
              <span>SCROLL DOWN TO ROTATE & REVEAL LEGS</span>
              <ArrowDown className="size-4 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Stage 2: Abdominals & Core Bracing */}
        <section className="h-screen flex flex-col justify-center items-start px-8 md:px-24 pointer-events-none">
          <div className="max-w-md bg-black/50 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase mb-3">
              <Activity className="size-3.5" /> Stage 2: Core Stability
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              Torso & Pelvic Bracing
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              The camera shifts down toward the rectus abdominis and obliques as the 3D model turns. Spine curvature stays locked within healthy neutral margins.
            </p>
            <div className="text-xs text-gray-400 font-mono">
              Model Rotation: <strong className="text-white">{Math.round(scrollProgress * 3.6)}°</strong> / 360°
            </div>
          </div>
        </section>

        {/* Stage 3: Quadriceps & Knee Patella */}
        <section className="h-screen flex flex-col justify-center items-end px-8 md:px-24 pointer-events-none">
          <div className="max-w-md bg-black/50 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase mb-3">
              <Layers className="size-3.5" /> Stage 3: Femoral Articulation
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              Quadriceps & Patella
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Now descending into the thighs and knee hinge joints. Computer vision verifies squat depth threshold and prevents internal rotation.
            </p>
            <div className="flex justify-end gap-2 text-xs font-mono">
              <span className="px-2 py-1 bg-white/5 rounded-lg text-lime-400">Knee Angle: 90° Active</span>
            </div>
          </div>
        </section>

        {/* Stage 4: Calves, Ankles & Toes on the Holographic Ring */}
        <section className="h-screen flex flex-col justify-center items-start px-8 md:px-24 pointer-events-none">
          <div className="max-w-md bg-black/50 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-white/10 pointer-events-auto shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase mb-3">
              <Sparkles className="size-3.5" /> Stage 4: Plantar Grounding
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              Ankles & Toes Grounded
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              The camera descends all the way down to the feet and toes resting directly on the neon holographic base ring. 360° kinetic scan completed.
            </p>
            <div className="text-xs text-lime-400 font-mono flex items-center gap-1.5">
              <span>Full kinetic chain aligned. Ready to move.</span>
            </div>
          </div>
        </section>

        {/* Stage 5: Deep Black Transition & Final Start Workout CTA */}
        <section className="h-screen bg-gradient-to-b from-transparent via-black/95 to-black flex flex-col items-center justify-center px-6 text-center z-20">
          <div className="max-w-2xl bg-black/80 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/15 shadow-2xl flex flex-col items-center">
            
            <div className="size-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-lime-400 flex items-center justify-center mb-6 shadow-xl glow-orange">
              <Play className="size-8 text-black fill-black ml-1" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Kinetic Analysis Complete.
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg">
              Launch the live webcam pose tracker to execute your workout with real-time MediaPipe joint angle feedback.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartWorkout}
                className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-bold text-base shadow-2xl glow-orange transition flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
              >
                <Play className="size-5 fill-white" />
                <span>Launch Live AI Pose Camera</span>
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/10 text-gray-300 rounded-2xl font-semibold text-sm border border-white/10 transition"
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
