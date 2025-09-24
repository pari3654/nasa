# 🌌 The Explorable Universe Navigator
### NASA Space Apps Challenge 2025 Submission

This project delivers a **web-based visualization platform** that transforms NASA's vast collection of ultra-high-resolution space images (Hubble, JWST, Chandra) into an interactive, explorable digital universe.  

It empowers users to:  
- Analyze complex, multi-layered data  
- Seamlessly explore images with zoom & pan  
- Learn from an AI-powered space guide  
  
---

## ✨ Key Features  

| Feature | Technologies | Description |
|---------|--------------|-------------|
| **1. Explorable Navigator** | React Hooks (`useState`, `useRef`), CSS Transforms | Seamless Zoom and Pan functionality using mouse gestures, allowing users to navigate trillions of pixels easily. |
| **2. Multi-Layer Views** | React State Management | Dynamically switches the image source between Visible (Hubble), Infrared (JWST), and X-ray (Chandra) perspectives of the same cosmic object. |
| **3. AI Space Guide** | Gemini API, Node.js/Express | A real-time, context-aware chatbot that provides concise, astronomical information about stars, nebulae, and galaxies on demand. |

---

## 🛠️ Technology Stack  

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | React.js (Vite), CSS/HTML | UI framework for components and efficient module bundling |
| **Data Visualization** | CSS Transforms | Smooth, browser-native zooming and panning |
| **Backend/API** | Node.js, Express.js | API server for routing, database communication, and AI gateway |
| **AI Integration** | Google Gemini API | Powers the intelligent response system for the AI Space Guide |

---

## 🚀 Getting Started (Local Setup)  

To run the application locally, you need to set up both the **frontend** and the **backend**.  

### ✅ Prerequisites  
- Node.js (v18+)  
- Gemini API Key  

---

### 🔧 Installation  

#### 1. Clone the Repository  
git clone https://github.com/pari3654/nasa.git
cd nasa

#### 2. Backend Setup (server folder)  
cd server
npm install

# Create a .env file with your keys:
# GEMINI_API_KEY="your_api_key_here"

# Run the backend
node server.js

#### 3. Frontend Setup (space-explorer folder)  
cd ../space-explorer
npm install
npm run dev


git clone https://github.com/pari3654/nasa.git
cd nasa
