'use client'

import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  
  const [pos1, setPos1] = useState({ x: 15, y: 15 });
  const [pos2, setPos2] = useState({ x: 50, y: 15 });
  const [pos3, setPos3] = useState({ x: 85, y: 15 });
  
  const [dragging, setDragging] = useState(null);
  const imageRef = useRef(null);

  const handleMouseDown = (index) => {
    setDragging(index);
  };

  const handleMouseMove = (e) => {
    if (dragging === null || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Keep within bounds
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    
    if (dragging === 1) setPos1({ x: clampedX, y: clampedY });
    if (dragging === 2) setPos2({ x: clampedX, y: clampedY });
    if (dragging === 3) setPos3({ x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleDownload = async () => {
    if (!imageRef.current) return;
    
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(imageRef.current, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    });
    
    const link = document.createElement('a');
    link.download = 'normie-meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-100 p-8"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="flex gap-8 items-start max-w-7xl">
        {/* Image container with text overlays */}
        <div className="relative" ref={imageRef}>
          <Image 
            src="/normie-meme.jpg" 
            alt="Meme" 
            width={800} 
            height={600} 
            className="max-w-full h-auto select-none"
          />
          
          {/* Text overlays - draggable */}
          {text1 && (
            <div 
              className="absolute bg-white px-3 py-1 rounded font-bold text-center whitespace-nowrap cursor-move hover:ring-2 hover:ring-blue-500"
              style={{ 
                left: `${pos1.x}%`, 
                top: `${pos1.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseDown={() => handleMouseDown(1)}
            >
              {text1}
            </div>
          )}
          
          {text2 && (
            <div 
              className="absolute bg-white px-3 py-1 rounded font-bold text-center whitespace-nowrap cursor-move hover:ring-2 hover:ring-blue-500"
              style={{ 
                left: `${pos2.x}%`, 
                top: `${pos2.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseDown={() => handleMouseDown(2)}
            >
              {text2}
            </div>
          )}
          
          {text3 && (
            <div 
              className="absolute bg-white px-3 py-1 rounded font-bold text-center whitespace-nowrap cursor-move hover:ring-2 hover:ring-blue-500"
              style={{ 
                left: `${pos3.x}%`, 
                top: `${pos3.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseDown={() => handleMouseDown(3)}
            >
              {text3}
            </div>
          )}
        </div>

        {/* Input boxes on the right */}
        <div className="flex flex-col gap-4 min-w-[250px]">
          <div>
            <label htmlFor="text1" className="block text-sm font-medium text-gray-700 mb-2">
              Left Avatar Text
            </label>
            <input
              id="text1"
              type="text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter text for left avatar"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="text2" className="block text-sm font-medium text-gray-700 mb-2">
              Middle Avatar Text
            </label>
            <input
              id="text2"
              type="text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter text for middle avatar"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="text3" className="block text-sm font-medium text-gray-700 mb-2">
              Right Avatar Text
            </label>
            <input
              id="text3"
              type="text"
              value={text3}
              onChange={(e) => setText3(e.target.value)}
              placeholder="Enter text for right avatar"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleDownload}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-400 text-sm"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}