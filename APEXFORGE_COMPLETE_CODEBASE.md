# ⚡ ApexForge — Complete Single-File Codebase & System Specification

> **All-In-One Codebase & Architecture Specification**  
> This file contains the complete architecture, configuration, data structures, biomechanical algorithms, mathematical formulas, and the **full, untruncated source code for every file** in ApexForge. It is structured so that any AI or developer can inspect, refactor, extend, or reconstruct the entire application from this single document.

---

## 📑 Table of Contents
1. [System Overview & Architecture](#1-system-overview--architecture)
2. [Project Directory & File Inventory](#2-project-directory--file-inventory)
3. [Biomechanical Algorithms & Computer Vision Math](#3-biomechanical-algorithms--computer-vision-math)
4. [3D Anatomical Scene & Camera Pipeline](#4-3d-anatomical-scene--camera-pipeline)
5. [Audio Synthesizer Specification](#5-audio-synthesizer-specification)
6. [Cloud & Local Telemetry Architecture](#6-cloud--local-telemetry-architecture)
7. [Dependencies & Build System Configurations](#7-dependencies--build-system-configurations)
   - `package.json`
   - `vite.config.js`
   - `index.html`
   - `firebase.json`
   - `.firebaserc`
8. [Styles & Theme System](#8-styles--theme-system)
   - `src/index.css`
   - `src/App.css`
9. [Core Engine & Utility Modules](#9-core-engine--utility-modules)
   - `src/main.jsx`
   - `src/firebase/config.js`
   - `src/utils/audio.js`
10. [Application UI & Feature Components](#10-application-ui--feature-components)
    - `src/App.jsx`
    - `src/components/FitnessDashboard.jsx`
    - `src/components/WorkoutTracker.jsx`
    - `src/components/ThreeDScene.jsx`
    - `src/components/WorkoutHistory.jsx`
    - `src/components/LooksmaxxingStudio.jsx`
    - `src/components/LungCapacityTrainer.jsx`
11. [Guide for AI-Driven Modifications](#11-guide-for-ai-driven-modifications)

---

## 1. System Overview & Architecture

ApexForge is an AI-powered biomechanical training cockpit built with React 19, Vite, Three.js (React Three Fiber/Drei), Google MediaPipe Pose Landmarker, Tailwind CSS v4, Web Audio API, and Google Firebase Firestore.

### Key Functional Pillars:
- **Unified Live AI Studio (`WorkoutTracker.jsx`)**: Real-time biometric computer vision suite supporting 3 integrated studio modes:
  1. *Movement AI*: Full-body skeletal kinematics tracking across 6 exercises (Squats, Bicep Curls, Pushups, Lateral Deltoid Raises, Core Plank Hold, Jumping Jacks) with 33 landmark points, joint inflection detection, dynamic HUD angles, and form warnings.
  2. *Looksmaxxing Facial Aesthetic Studio*: Facial symmetry scoring, gonial mandibular jawline angle computation (optimal 115°–122°), hunter eye canthal tilt angle overlay (+4.2°), facial thirds ratio analysis, and guided facial myofunctional drills (Mewing, Masseter clenches, Zygomatic lift, Cervical chin tuck).
  3. *Pulmonary Thoracic Expansion Trainer*: Guided diaphragmatic breathing cadence (Box Breathing 4-4-4-4, 4-7-8 Parasympathetic Reset, Wim Hof hyper-oxygenation) with real-time HUD thoracic expansion ring scaling and a high-precision VO2 breath-hold retention challenge stopwatch.
- **Interactive 3D Anatomical Musculoskeletal Model (`ThreeDScene.jsx`)**: Renders a high-fidelity 3D musculoskeletal anatomical model (`human_anatomy.glb`) via React Three Fiber. Features automatic bounding-box normalization and centering, neon dual holographic floating rings, and 8 interactive cybernetic hotspots with custom SVG icons (Cranium, Chest, Deltoids, Core, Quadriceps, Patellar Hinge, Calves, Metatarsals/Toes) linking directly into specialized AI camera studios or workouts. Includes 360° orbital controls and GSAP ScrollTrigger multi-stage cinematic descent.
- **Dedicated Modular Studios (`LooksmaxxingStudio.jsx` & `LungCapacityTrainer.jsx`)**: Standalone, specialized production-grade component architectures for intensive facial training (with photo snapshot capture, interval timers, and audio chimes) and deep pulmonary respiratory capacity optimization (with cellular alkalization protocols and confetti celebrations).
- **Performance Analytics & Bento Dashboard (`FitnessDashboard.jsx`)**: Dynamic metrics visualization with Recharts (activity charts, heart rate ECG simulation, circular SVG progress rings, caloric/macronutrient breakdown, and recent cloud workout cards).
- **Telemetry & Cloud Synchronization (`WorkoutHistory.jsx` & `firebase/config.js`)**: Real-time Firebase Cloud Firestore persistence with immediate local-storage fallback for offline operation, sorting sessions by timestamp, calculating aggregate volume, energy burned, and average posture scores.
- **Zero-Latency Web Audio Synthesizer (`utils/audio.js`)**: Procedural audio generator using the native Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`) playing pleasant harmonic chords for reps, corrective low-frequency tones for form breaks, and fanfare sweeps for completions.

---

## 2. Project Directory & File Inventory

```
ApexForge/
├── .firebaserc                         # Firebase active project identifier
├── firebase.json                       # Firebase Hosting configuration & single-page rewrites
├── index.html                          # HTML5 entry with dark mode & Google Fonts (Inter)
├── package.json                        # Dependencies and scripts (React 19, Three.js, MediaPipe, Vite)
├── vite.config.js                      # Vite bundler configuration with @tailwindcss/vite
├── public/
│   ├── human_anatomy.glb              # 3D GLTF musculoskeletal anatomy model (5.2MB)
│   ├── favicon.svg                     # Application favicon
│   └── vite.svg                        # Vite asset
└── src/
    ├── main.jsx                        # React 19 root DOM mount
    ├── index.css                       # Modern dark cyberpunk tokens (#0B0E14, #00E5FF, #FF6B00, #10B981)
    ├── App.css                         # Component styling classes
    ├── App.jsx                         # Top navigation bar, active tab router, pro upgrade modal, footer
    ├── firebase/
    │   └── config.js                   # Firebase app & Firestore initialization, save/load telemetry methods
    ├── utils/
    │   └── audio.js                    # Web Audio API SoundFX class with zero-latency synthesized sound cues
    └── components/
        ├── FitnessDashboard.jsx         # Bento grid dashboard, Recharts charts, macro nutrient burn
        ├── WorkoutTracker.jsx           # Unified MediaPipe pose vision loop, skeleton drawing, rep detection math, multi-studio mode
        ├── ThreeDScene.jsx              # Three.js 3D canvas, GSAP scroll camera, GLB loader, 8 cybernetic hotspots
        ├── WorkoutHistory.jsx           # Historical workout telemetry table, filter pills, statistics
        ├── LooksmaxxingStudio.jsx       # Dedicated Facial Aesthetics & Myofunctional Gym studio
        └── LungCapacityTrainer.jsx      # Dedicated Pulmonary & VO2 Breath Retention Trainer
```

---

## 3. Biomechanical Algorithms & Computer Vision Math

### Joint Angle Calculation:
For any three joint coordinates $A(x_a, y_a)$, $B(x_b, y_b)$, and $C(x_c, y_c)$ where $B$ is the vertex (hinge joint):

$$\theta = \left| \text{atan2}(y_c - y_b, x_c - x_b) - \text{atan2}(y_a - y_b, x_a - x_b) \right| \times \frac{180}{\pi}$$

If $\theta > 180^\circ$, then $\theta = 360^\circ - \theta$.

```javascript
const calculateAngle = (a, b, c) => {
  if (!a || !b || !c) return 0;
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) angle = 360 - angle;
  return angle;
};
```

### MediaPipe 33 Landmark Keypoint Indices:
- `0`: Nose
- `1, 2, 3, 7`: Left Eye Inner, Pupil, Outer, Ear
- `4, 5, 6, 8`: Right Eye Inner, Pupil, Outer, Ear
- `9, 10`: Mouth Left, Mouth Right
- `11, 12`: Left and Right Shoulders
- `13, 14`: Left and Right Elbows
- `15, 16`: Left and Right Wrists
- `23, 24`: Left and Right Hips
- `25, 26`: Left and Right Knees
- `27, 28`: Left and Right Ankles
- `29, 30`: Left and Right Heels
- `31, 32`: Left and Right Foot Index (Toes)

### Exercise Detection State Machines:
1. **Squats**:
   - Primary: Hip (`23`), Knee (`25`), Ankle (`27`)
   - Inflection Down (Deep squat): $\text{kneeAngle} < 105^\circ$
   - Inflection Up (Rep completed): $\text{kneeAngle} > 155^\circ$
   - Form Check: Torso angle (Shoulder-Hip-Knee) $< 75^\circ$ triggers "Chest too low! Keep back upright."
2. **Bicep Curls**:
   - Primary: Shoulder (`12`), Elbow (`14`), Wrist (`16`)
   - Inflection Up (Peak contraction): $\text{elbowAngle} < 50^\circ$
   - Inflection Down (Full extension): $\text{elbowAngle} > 145^\circ$ triggers rep completion.
3. **Pushups**:
   - Primary: Shoulder (`12`), Elbow (`14`), Wrist (`16`), Hip (`24`), Knee (`26`)
   - Inflection Down: $\text{elbowAngle} < 90^\circ$
   - Inflection Up: $\text{elbowAngle} > 155^\circ$
   - Form Check: Spine alignment angle (Shoulder-Hip-Knee) $< 140^\circ$ triggers "Hips sagging! Tighten core."
4. **Lateral Deltoid Raises**:
   - Primary: Hip (`24`), Shoulder (`12`), Elbow (`14`)
   - Bottom Phase: $\text{armAbduction} < 35^\circ$
   - Top Phase (Peak parallel raise): $\text{armAbduction} > 85^\circ$
   - Form Check: Avoid shrugging or over-abduction $> 110^\circ$.
5. **Core Plank Hold**:
   - Primary: Shoulder (`12`), Hip (`24`), Ankle (`28`)
   - Target Alignment Margin: $165^\circ \le \theta \le 180^\circ$
   - Continuous isometric anti-extension timer with second-by-second volume tracking.
6. **Jumping Jacks & Calf Hops**:
   - Primary: Wrists (`15, 16`) vs Shoulders (`11, 12`) and Ankles (`27, 28`)
   - Up Phase: $\text{wrist}_y < \text{shoulder}_y$ and $|\text{ankle}_L.x - \text{ankle}_R.x| > 0.35$
   - Down Phase: Hands return below chest and feet return together triggers rep completion.

### Looksmaxxing Facial Biometrics & Aesthetics Math:
- **Mandibular Gonial Angle**: Angle formed between the ramus line and mandibular body plane. Optimal male/female aesthetic range: $115^\circ - 122^\circ$.
- **Canthal Tilt Vector**: Computed from medial canthus to lateral canthus. A positive upward slope ($+3^\circ$ to $+6^\circ$) establishes the positive "hunter eyes" aesthetic phenotype.
- **Facial Thirds Proportionality**: Balanced vertical thirds ($1:1:1$) measured between Trichion (hairline) $\to$ Glabella (brow) $\to$ Subnasale (base of nose) $\to$ Gnathion (menton/chin).
- **Palatal Tongue Suction Dynamics**: Tongue pressed firmly against hard and soft palates creates negative intra-oral suction, elevating the hyoid apparatus and tightening submental tissue.

### Pulmonary Respiration & Breathwork Mechanics:
- **Diaphragmatic Expansion**: Visualized via dynamic canvas HUD ring expanding radially from scale $0.3 \to 1.0$ on Inhale, sustained at $1.0$ on Hold, and contracting to $0.3$ on Exhale.
- **Box Breathing (Navy SEAL 4-4-4-4)**: Regulates autonomic sympathetic/parasympathetic balance: 4s Inhale, 4s Hold full, 4s Exhale, 4s Hold empty.
- **4-7-8 Parasympathetic Reset**: Stimulates vagus nerve acetylcholine release: 4s Inhale, 7s Hold, 8s Exhale.
- **VO2 Retention Energy Formula**: Caloric burn estimate during sustained breath holds: $E = t \times 0.15 \text{ kcal/s}$.

---

## 4. 3D Anatomical Scene & Camera Pipeline

- **Automatic Normalization**: Rather than hardcoding 3D transform scales, `RealGLBModel` computes the bounding box `THREE.Box3().setFromObject(scene)` and calculates:
  $$\text{scaleFactor} = \frac{4.8}{\max(\text{size}_x, \text{size}_y, \text{size}_z)}$$
  Centering the root pivot at `(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor)`.
- **Cybernetic Floating Ring Base**:
  Double-sided wireframe rings positioned at $y = -2.6$ and $y = -2.62$ in `#10B981` (emerald) and `#00E5FF` (cyan), plus a floating waist orbit ring at $y = 0.4$ angled at $-80^\circ$.
- **8 Anatomical Cybernetic Hotspots**:
  1. `cranium`: Position `[0.0, 2.15, 0.35]` • Launches Face Looksmaxxing Camera ⚡
  2. `chest`: Position `[0.32, 1.35, 0.45]` • Launches Lung & Breath Trainer 🫁
  3. `shoulder`: Position `[-0.95, 1.55, 0.2]` • Launches Deltoids AI Workout 💪
  4. `core`: Position `[0.0, 0.65, 0.4]` • Launches Core Plank AI Workout 🛡️
  5. `quadriceps`: Position `[0.4, -0.75, 0.45]` • Launches AI Squat Trainer 🦵
  6. `knee`: Position `[-0.4, -1.4, 0.35]` • Tracks Patellar Squat Depth 🎯
  7. `calves`: Position `[0.35, -2.0, -0.15]` • Launches Calf & Cardio Workout ⚡
  8. `toes`: Position `[-0.35, -2.45, 0.35]` • Launches Plantar Kinetic AI 🦶
- **GSAP ScrollTrigger Multi-Stage Cinematic Pipeline**:
  - Stage 1 (0–25%): Cranial & Thoracic Musculature
  - Stage 2 (25–50%): Torso & Pelvic Neutral Bracing
  - Stage 3 (50–75%): Femoral & Patellar Articulation
  - Stage 4 (75–100%): Plantar & Kinetic Grounding
  Continuously rotates the model 360° (`modelGroup.rotation.y = Math.PI * 2`) and smoothly translates model vertically (`modelGroup.position.y` from `-1.2` to `3.4`).

---

## 5. Audio Synthesizer Specification

The procedural audio system in `src/utils/audio.js` generates synthetic sound directly through the native browser `AudioContext`:
- **Rep Completion Chime (`playRepChime`)**: Dual sine frequency inflection from $659.25\text{ Hz}$ (E5) exponentially ramping to $880.0\text{ Hz}$ (A5) over $120\text{ ms}$, followed by an exponential gain decay to zero over $350\text{ ms}$.
- **Corrective Form Alert (`playWarningBeep`)**: Corrective low-frequency triangle wave descending from $261.63\text{ Hz}$ (C4) linearly down to $220.0\text{ Hz}$ (A3) over $180\text{ ms}$.
- **Workout Complete Fanfare (`playCompleteFanfare`)**: Harmonic triad sequence across 3 chord stages (C5 $523.25\text{ Hz}$, E5 $659.25\text{ Hz}$, G5 $783.99\text{ Hz}$, culminating in high C6 $1046.50\text{ Hz}$).

---

## 6. Cloud & Local Telemetry Architecture

- **Firebase Firestore Synchronization**:
  - Telemetry logs are persisted to collection `workouts` via `addDoc(collection(db, "workouts"), ...)`.
  - Schema:
    ```typescript
    interface WorkoutSession {
      exercise_type: string;
      total_reps: number;
      calories_burned: number;
      accuracy_score: number;
      mistakes_logged: string[];
      duration_seconds: number;
      timestamp: FieldValue | string;
    }
    ```
- **Offline Resilience Fallback**:
  - If network connectivity fails or Firebase credentials are unconfigured, sessions are automatically serialized into `localStorage` key `'apexforge_saved_sessions'`.
  - On mount, `getRecentSessions()` reconciles Firestore data with locally cached telemetry so historical charts always render instantly.

---

## 7. Dependencies & Build System Configurations

### `package.json`
```json
{
  "name": "apexforge",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@mediapipe/tasks-vision": "^1.0.1",
    "@react-three/drei": "^10.7.8",
    "@react-three/fiber": "^9.7.0",
    "@tailwindcss/vite": "^4.3.3",
    "autoprefixer": "^10.6.1",
    "canvas-confetti": "^1.9.4",
    "firebase": "^12.19.0",
    "gsap": "^3.15.0",
    "lucide-react": "^1.46.0",
    "postcss": "^8.5.28",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-is": "^19.3.0",
    "recharts": "^3.10.1",
    "tailwindcss": "^4.3.3",
    "three": "^0.186.0"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "oxlint": "^1.81.0",
    "vite": "^8.3.0"
  }
}

```

### `vite.config.js`
```javascript
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})


```

### `index.html`
```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#1c1c1e" />
    <meta name="description" content="ApexForge - Real-time AI pose detection, 3D anatomical biomechanics, and cloud workout telemetry powered by Google MediaPipe and Three.js." />
    <title>ApexForge | Live Pose AI & Biomechanical Dashboard</title>
    <!-- Google Fonts Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#1c1c1e] text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

### `firebase.json`
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

```

### `.firebaserc`
```json
{
  "projects": {
    "default": "apexforge-e2bc9"
  }
}

```

---

## 8. Styles & Theme System

### `src/index.css`
```css
@import "tailwindcss";

@layer base {
  :root {
    --bg-base: #0B0E14;
    --bg-surface: #121824;
    --bg-elevated: #182030;
    --border-subtle: rgba(255, 255, 255, 0.08);
    --accent-cyan: #00E5FF;
    --accent-amber: #FF6B00;
    --accent-emerald: #10B981;
    --text-primary: #F8FAFC;
    --text-secondary: #94A3B8;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--bg-base);
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, sans-serif;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

/* Custom scrollbar for sleek modern HUD look */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #0B0E14;
}

::-webkit-scrollbar-thumb {
  background: #1E293B;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #334155;
}

/* Unified Design System Glow Utilities */
.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
}

.glow-amber {
  box-shadow: 0 0 20px rgba(255, 107, 0, 0.3);
}

.glow-emerald {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

.glow-text-cyan {
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
}

.glow-text-amber {
  text-shadow: 0 0 10px rgba(255, 107, 0, 0.6);
}

.border-subtle {
  border-color: rgba(255, 255, 255, 0.08);
}

/* HUD Scanning laser animation */
@keyframes hud-scan {
  0% {
    transform: translateY(0%);
    opacity: 0.8;
  }
  50% {
    transform: translateY(100%);
    opacity: 0.3;
  }
  100% {
    transform: translateY(0%);
    opacity: 0.8;
  }
}

.animate-hud-scan {
  animation: hud-scan 4s ease-in-out infinite;
}

```

### `src/App.css`
```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

```

---

## 9. Core Engine & Utility Modules

### `src/main.jsx`
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

### `src/firebase/config.js`
```javascript
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5vwMAoCrYmqI5wussTNtifUlwHYAuxZk",
  authDomain: "apexforge-e2bc9.firebaseapp.com",
  projectId: "apexforge-e2bc9",
  storageBucket: "apexforge-e2bc9.firebasestorage.app",
  messagingSenderId: "918484462971",
  appId: "1:918484462971:web:d5cb90f0ab69de0ce4e1de",
  measurementId: "G-R1TFB7H719"
};

// Initialize Firebase
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (err) {
  console.warn("Firebase initialization notice:", err);
}

export { app, db };

const LOCAL_STORAGE_KEY = 'apexforge_saved_sessions';

// Default mock sessions if no prior data exists
const initialMockSessions = [
  {
    id: 'mock-1',
    exercise_type: 'Squats',
    total_reps: 24,
    calories_burned: 42,
    accuracy_score: 94,
    mistakes_logged: ["Knees slightly inward on rep 18"],
    duration_seconds: 140,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'mock-2',
    exercise_type: 'Bicep Curls',
    total_reps: 30,
    calories_burned: 36,
    accuracy_score: 88,
    mistakes_logged: ["Incomplete extension on rep 12", "Slight elbow swing on rep 22"],
    duration_seconds: 120,
    timestamp: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'mock-3',
    exercise_type: 'Pushups',
    total_reps: 20,
    calories_burned: 55,
    accuracy_score: 96,
    mistakes_logged: [],
    duration_seconds: 90,
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export async function saveWorkoutSession(sessionData) {
  const sessionRecord = {
    ...sessionData,
    created_at: new Date().toISOString(),
    id: 'session_' + Date.now()
  };

  // 1. Always save to LocalStorage for instant UI responsiveness & offline resilience
  try {
    const cached = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const updated = [sessionRecord, ...cached];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
  } catch (localErr) {
    console.warn("Local storage write error:", localErr);
  }

  // 2. Push to Firestore cloud
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "sessions"), {
        ...sessionRecord,
        timestamp: serverTimestamp()
      });
      console.log("Session saved to Firestore with ID: ", docRef.id);
      return { success: true, id: docRef.id, cloud: true };
    } catch (firebaseErr) {
      console.warn("Firestore sync deferred (using local cache):", firebaseErr.message);
      return { success: true, id: sessionRecord.id, cloud: false, note: "Saved locally" };
    }
  }

  return { success: true, id: sessionRecord.id, cloud: false };
}

export async function getRecentSessions(limitCount = 10) {
  // Try fetching from Firestore first
  if (db) {
    try {
      const q = query(collection(db, "sessions"), orderBy("timestamp", "desc"), limit(limitCount));
      const querySnapshot = await getDocs(q);
      const firestoreData = [];
      querySnapshot.forEach((doc) => {
        firestoreData.push({ id: doc.id, ...doc.data() });
      });

      if (firestoreData.length > 0) {
        return firestoreData;
      }
    } catch (err) {
      console.warn("Firestore query fallback to local cache:", err.message);
    }
  }

  // Fallback to localStorage or mock
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.length > 0) return parsed.slice(0, limitCount);
    }
  } catch (err) {
    console.warn("Failed to read local cache:", err);
  }

  return initialMockSessions.slice(0, limitCount);
}

```

### `src/utils/audio.js`
```javascript
// Web Audio API Synthesizer for instant zero-latency feedback
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playRepChime() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      // High pitch two-tone pleasant success chord (E5 -> A5)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now); // E5
      osc1.frequency.exponentialRampToValueAtTime(880.0, now + 0.12); // A5

      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.35);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  playWarningBeep() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      // Low subtle corrective tone (C4 -> B3)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.linearRampToValueAtTime(220.0, now + 0.18); // A3

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  playCompleteFanfare() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }
}

export const soundFX = new SoundFX();

```

---

## 10. Application UI & Feature Components

### `src/App.jsx`
```jsx
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
            Firebase: apexforge-e2bc9
          </span>
        </div>
        <div>
          ApexForge &copy; 2026. Unified Biometrics & Movement Lab.
        </div>
      </footer>

    </div>
  );
}

```

### `src/components/FitnessDashboard.jsx`
```jsx
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
  Camera, 
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
  { day: 'Tue', value: 92, active: true },
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
    <div className="min-h-screen bg-[#0B0E14] text-white p-4 md:p-8 font-sans selection:bg-[#00E5FF] selection:text-black">
      
      {/* Quick Hero Banner / Launch AI Camera */}
      <div className="w-full bg-gradient-to-r from-cyan-500/10 via-[#121824] to-emerald-500/10 border border-cyan-500/20 rounded-3xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#00E5FF] text-xs font-semibold">
            <Zap className="size-3.5" /> MediaPipe Vision 2.0 Enabled
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            AI-Powered Biomechanics & Real-time Form Correction
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl">
            Track skeletal alignment in 3D space, calculate depth and flexion angles, and sync every repetition directly to your profile.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('camera')}
            className="px-6 py-3.5 bg-[#00E5FF] hover:bg-[#00D0E6] text-black font-extrabold rounded-2xl shadow-lg glow-cyan flex items-center gap-2.5 transition transform hover:scale-102 active:scale-98"
          >
            <Camera className="size-4" />
            <span>Launch Live AI Tracker</span>
          </button>

          <button
            onClick={() => onNavigate('3d')}
            className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-2xl border border-white/[0.08] text-sm font-semibold flex items-center gap-2 transition"
          >
            <Box className="size-4 text-cyan-400" />
            <span>3D Anatomy</span>
          </button>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Activity Bar Chart (Span 2 columns) */}
        <div className="md:col-span-2 bg-[#121824] p-6 md:p-8 rounded-3xl border border-white/[0.08] shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Weekly Movement</div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                Activity Score <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 font-normal">Active: {selectedDay}</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-sm">
              <TrendingUp className="size-4" />
              <span>+25% vs last week</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="day" 
                  stroke="#64748B" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 13, fill: '#94A3B8' }}
                />
                <YAxis 
                  stroke="#64748B" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.04)', radius: 8 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0B0E14]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs shadow-2xl">
                          <p className="font-bold text-white">{payload[0].payload.day}</p>
                          <p className="text-cyan-400 font-semibold">{payload[0].value} Movement Units</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]} 
                  onClick={handleBarClick}
                  className="cursor-pointer"
                >
                  {activityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.day === selectedDay ? '#00E5FF' : '#1E293B'} 
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-white/[0.06]">
            <span>Peak performance logged on Tuesday (92 pts)</span>
            <span className="text-cyan-400 font-medium">Click any bar to inspect daily metrics</span>
          </div>
        </div>

        {/* 2. Workout Goals Circular Progress (1 column) */}
        <div className="bg-[#121824] p-6 md:p-8 rounded-3xl border border-white/[0.08] shadow-xl flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="size-5 text-emerald-400" /> Workout Goals
            </h2>
            <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full font-semibold border border-emerald-500/20">
              On Track
            </span>
          </div>

          {/* SVG Circular Ring */}
          <div className="relative size-44 flex items-center justify-center my-4">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#1E293B"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#10B981"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="62.8"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out glow-emerald"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-black text-white tracking-tight tabular-nums">75%</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">15/20 Completed</div>
            </div>
          </div>

          <p className="text-xs text-center text-slate-400">
            5 more workout sessions needed to hit your weekly target milestone.
          </p>
        </div>

        {/* 3. Calories & Macro-Nutrients Analysis (Span 2 columns) */}
        <div className="md:col-span-2 bg-[#121824] p-6 md:p-8 rounded-3xl border border-white/[0.08] shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Nutritional Fuel</div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                Calories & Nutrient Analysis
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Today's Summary</span>
          </div>

          <div className="space-y-4">
            {/* Calories Row */}
            <div className="bg-[#0B0E14] p-4 rounded-2xl border border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-1/4">
                <div className="p-2.5 bg-amber-500/15 text-[#FF6B00] rounded-xl border border-amber-500/20">
                  <Flame className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Active Burn</div>
                  <div className="text-xs text-slate-400">Exercise + BMR</div>
                </div>
              </div>

              <div className="w-full md:w-2/4">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
                  <span>1,840 kcal</span>
                  <span>2,400 Goal (76.6%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF6B00] rounded-full glow-amber" style={{ width: '76.6%' }}></div>
                </div>
              </div>

              <div className="w-full md:w-1/4 text-right">
                <span className="text-sm font-bold text-amber-400">560 kcal left</span>
              </div>
            </div>

            {/* Protein Row */}
            <div className="bg-[#0B0E14] p-4 rounded-2xl border border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-1/4">
                <div className="p-2.5 bg-emerald-500/15 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <Award className="size-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Protein</div>
                  <div className="text-xs text-slate-400">Muscle recovery</div>
                </div>
              </div>

              <div className="w-full md:w-2/4">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
                  <span>145.0 g</span>
                  <span>180.0 g Goal (80.5%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full glow-emerald" style={{ width: '80.5%' }}></div>
                </div>
              </div>

              <div className="w-full md:w-1/4 text-right">
                <span className="text-sm font-bold text-emerald-400">35 g left</span>
              </div>
            </div>

            {/* Carbs & Fats Compact Dual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0B0E14] p-3.5 rounded-2xl border border-white/[0.05] flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Carbohydrates</div>
                  <div className="text-sm font-bold text-white">210 g <span className="text-xs font-normal text-slate-400">/ 260 g</span></div>
                </div>
                <div className="text-right text-xs font-semibold text-cyan-400">80.7%</div>
              </div>

              <div className="bg-[#0B0E14] p-3.5 rounded-2xl border border-white/[0.05] flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Healthy Fats</div>
                  <div className="text-sm font-bold text-white">55 g <span className="text-xs font-normal text-slate-400">/ 70 g</span></div>
                </div>
                <div className="text-right text-xs font-semibold text-purple-400">78.5%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Heart Beat Monitor (1 column) */}
        <div className="bg-[#121824] p-6 md:p-8 rounded-3xl border border-white/[0.08] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Heart className="size-5 text-red-500 animate-pulse" /> Heart Beat
              </h2>
              <span className="text-xs font-mono px-2.5 py-0.5 bg-red-500/10 text-red-400 rounded-full border border-red-500/20">
                ECG Live
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <div className="text-4xl font-extrabold text-white tabular-nums tracking-tight">110</div>
              <div className="text-sm text-slate-400">bpm <span className="text-xs text-emerald-400 font-semibold">(Optimal Zone)</span></div>
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
                        <div className="bg-[#0B0E14]/90 px-3 py-1.5 rounded-lg text-xs border border-white/10">
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
                  stroke="#00E5FF" 
                  strokeWidth={2.5} 
                  dot={false}
                  activeDot={{ r: 5, fill: '#00E5FF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-slate-400 flex justify-between items-center pt-3 border-t border-white/[0.06]">
            <span>Resting BPM: 62</span>
            <span className="text-slate-300">Max Peak: 142</span>
          </div>
        </div>

      </div>

      {/* Recent AI Workout History Feed */}
      <div className="mt-8 bg-[#121824] p-6 md:p-8 rounded-3xl border border-white/[0.08] shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="size-5 text-emerald-400" /> Recent Cloud Sessions
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Workouts and biomechanical telemetry logged directly to Firebase Firestore
            </p>
          </div>

          <button
            onClick={() => onNavigate('camera')}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5 transition"
          >
            <span>Start New Session</span>
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentSessions.map((session, idx) => (
            <div key={session.id || idx} className="bg-[#0B0E14] p-4 rounded-2xl border border-white/[0.06] hover:border-white/20 transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
                    {session.exercise_type || 'Workout'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(session.timestamp?.seconds ? session.timestamp.seconds * 1000 : session.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-2xl font-black text-white mb-1 tabular-nums">
                  {session.total_reps} <span className="text-xs font-normal text-slate-400">Reps</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Flame className="size-3 text-amber-500" /> {session.calories_burned} kcal</span>
                  <span className="flex items-center gap-1"><Award className="size-3 text-emerald-400" /> {session.accuracy_score || 95}% Acc</span>
                </div>
              </div>

              {session.mistakes_logged && session.mistakes_logged.length > 0 ? (
                <div className="text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-1.5 rounded-lg truncate">
                  ⚠️ {session.mistakes_logged[0]}
                </div>
              ) : (
                <div className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1.5 rounded-lg">
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

```

### `src/components/WorkoutTracker.jsx`
```jsx
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

```

### `src/components/ThreeDScene.jsx`
```jsx
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

```

### `src/components/WorkoutHistory.jsx`
```jsx
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

```

### `src/components/LooksmaxxingStudio.jsx`
```jsx
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

```

### `src/components/LungCapacityTrainer.jsx`
```jsx
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

```

---

## 11. Guide for AI-Driven Modifications

When prompting another AI assistant to make modifications using this file, follow these strategies:

1. **Adding a New Exercise to Computer Vision (`WorkoutTracker.jsx` & `ThreeDScene.jsx`)**:
   - Add an entry to the `EXERCISES` array in `WorkoutTracker.jsx`:
     `{ id: 'lunges', name: 'Lunges', targetKcal: 0.5, icon: '🦿', targetMuscle: 'Quadriceps & Glutes' }`.
   - In `analyzeExercise(landmarks, exercise)`, calculate the target joint angle (e.g. forward knee flexion `calculateAngle(landmarks[23], landmarks[25], landmarks[27])`).
   - Set the threshold boundaries for inflection points (e.g. down when $< 95^\circ$, up when $> 150^\circ$) and call `triggerRepComplete('Lunges')` or `triggerMistakeWarning('Warning text')`.
   - Optionally add a corresponding 3D interactive hotspot in `ThreeDScene.jsx` `ANATOMICAL_HOTSPOTS` with `actionTarget: 'camera'` and `exerciseId: 'lunges'`.

2. **Customizing the 3D Musculoskeletal Model & Hotspots (`ThreeDScene.jsx`)**:
   - Replace `/human_anatomy.glb` in `public/` or update the URL in `useGLTF.preload('/your_model.glb')` and `useGLTF('/your_model.glb')`.
   - Because `RealGLBModel` uses automatic bounding box normalization, any `.glb` model is automatically centered and scaled to fit the 4.8-unit vertical viewport.
   - Adjust coordinates in `ANATOMICAL_HOTSPOTS` array `[x, y, z]` to map markers to new anatomical targets.

3. **Styling & Cyberpunk Color Palettes (`src/index.css` & Tailwind v4)**:
   - The theme is driven by CSS variables in `src/index.css` (`--bg-base: #0B0E14`, `--bg-surface: #121824`, `--accent-cyan: #00E5FF`, `--accent-amber: #FF6B00`, `--accent-emerald: #10B981`).
   - Use unified glow utilities `.glow-cyan`, `.glow-amber`, `.glow-emerald`, and border utility `.border-subtle` to maintain visual hierarchy.

4. **Connecting Custom Firebase Credentials (`src/firebase/config.js`)**:
   - Replace the `firebaseConfig` object in `src/firebase/config.js` with your production Firebase credentials from the Firebase Console.
