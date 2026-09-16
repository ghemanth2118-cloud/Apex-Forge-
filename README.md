# ⚡ ApexForge — AI Biomechanical Training & 3D Interactive Performance Platform

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Graphics-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Pose%20Vision-0097A7?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting%20%26%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

ApexForge is a high-performance, next-generation fitness web application combining **real-time Computer Vision pose tracking**, **interactive 3D anatomical visualization**, and **intelligent form feedback** into a unified biomechanical training cockpit.

---

## 🌟 Key Features

- 🧬 **Interactive 3D Anatomical Musculoskeletal Model**
  - High-fidelity GLTF 3D anatomical render powered by Three.js & React Three Fiber.
  - Dynamically highlights active prime movers and stabilizer muscle groups (Biceps, Quads, Pecs, Delts, Core, Glutes) as you exercise.
  - Orbit controls for 360° biomechanical examination.

- 👁️ **Computer Vision & Pose Tracking (MediaPipe)**
  - Real-time landmark joint detection running client-side at up to 60 FPS.
  - Automatic rep counting with joint angle inflection math.
  - Form validation with biomechanical warnings for form deviations.

- 🔊 **Live Web Audio Feedback Synthesizer**
  - Integrated audio cues for rep completion, tempo cadence, and form alerts.

- 📊 **Performance Analytics & Telemetry**
  - Real-time cadence, workout duration, rep counts, form accuracy, and calorie burning burn-rate algorithms.
  - Interactive workout logging and history tracking.

- ☁️ **Cloud Synchronization & Global Deployment**
  - Full Firebase Cloud Firestore database integration for multi-session sync.
  - Production deployment ready via Firebase Hosting.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + Vite |
| **3D Rendering Engine** | Three.js + React Three Fiber + Drei |
| **Computer Vision** | Google MediaPipe Pose Landmark Detection |
| **Audio Engine** | Native Web Audio API |
| **Icons & UI Assets** | Lucide React |
| **Cloud & Hosting** | Google Firebase (Firestore + Hosting) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm / pnpm / yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ghemanth2118-cloud/Apex-Forge-.git
   cd Apex-Forge-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 📦 Production Build & Deployment

### Build for Production:
```bash
npm run build
```

### Deploy to Firebase:
```bash
firebase deploy --only hosting
```

---

## 📄 License

This project is licensed under the MIT License.
