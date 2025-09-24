import { useState, useRef, useEffect } from 'react';
import './App.css';
import ChatWindow from './ChatWindow';

// Import all image layers from the assets folder
import VISIBLE_IMAGE from './assets/nasa-visible.jpg'; 
import INFRARED_IMAGE from './assets/nasa-infrared.jpg';
import XRAY_IMAGE from './assets/nasa-xray.jpg'; 

// Map layer names to imported image variables
const LAYER_MAP = {
  Visible: VISIBLE_IMAGE,
  Infrared: INFRARED_IMAGE,
  Xray: XRAY_IMAGE,
};

function App() {
  // Navigation states
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  
  // Feature states
  const [currentLayer, setCurrentLayer] = useState('Visible'); 
  const [isChatOpen, setIsChatOpen] = useState(false); 

  // Function to start Panning (Mouse Down)
  const handleMouseDown = (event) => {
    event.preventDefault(); 
    setIsPanning(true);
    // Calculate the offset from the mouse pointer to the image position
    startPosRef.current = { x: event.clientX - position.x, y: event.clientY - position.y };
  };

  // Global Mouse Event Listener for smooth Panning
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isPanning) return;
      // Update image position based on current mouse position and starting offset
      setPosition({
        x: event.clientX - startPosRef.current.x,
        y: event.clientY - startPosRef.current.y
      });
    };

    const handleMouseUp = () => {
      setIsPanning(false);
    };

    if (isPanning) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning]);

  // Function to handle Zoom (Mouse Wheel)
  const handleWheel = (event) => {
    event.preventDefault();
    const newZoom = zoom + event.deltaY * -0.001; // Adjust zoom factor
    setZoom(Math.min(Math.max(1, newZoom), 5)); // Limit zoom between 1x and 5x
  };
  
  // UI button for Zoom In
  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.5, 5));
  };

  // UI button for Zoom Out
  const zoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.5, 1));
  };

  return (
    <div className="app-container">
      
      <h1>The Explorable Universe Navigator</h1>
      
      <div className="controls">
        {/* Zoom Controls */}
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>-</button>

        {/* Multi-Layer View Dropdown */}
        <select 
          onChange={(e) => setCurrentLayer(e.target.value)} 
          value={currentLayer}
          className="layer-select"
        >
          <option value="Visible">Visible (Hubble)</option>
          <option value="Infrared">Infrared (JWST)</option>
          <option value="Xray">X-ray (Chandra)</option>
        </select>
        
        {/* AI Chatbot Toggle Button */}
        <button className="chat-toggle" onClick={() => setIsChatOpen(prev => !prev)}>
            {isChatOpen ? 'Chat Close' : 'AI Guide'} 
        </button>
      </div>

      <div
        className="image-container"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <img
          // Dynamically set image source based on selected layer
          src={LAYER_MAP[currentLayer]} 
          alt={`Layer: ${currentLayer} NASA image`}
          className="zoomable-image"
          style={{
            // Apply current zoom and position transformations
            transform: `scale(${zoom})`,
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isPanning ? 'grabbing' : 'grab'
          }}
        />
      </div>
      
      {/* Render the Chat Window component */}
      <ChatWindow 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
}

export default App;