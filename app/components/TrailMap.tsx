"use client";

import { useState, useEffect, useRef } from "react";

interface Checkpoint {
  name: string;
  elevation: number;
  distance: number; // km from basecamp
  temp: number; // typical temp
  x: number; // SVG X coordinate
  y: number; // SVG Y coordinate
}

export default function TrailMap() {
  const checkpoints: Checkpoint[] = [
    { name: "Basecamp Patakbanteng", elevation: 1400, distance: 0.0, temp: 18, x: 50, y: 350 },
    { name: "Pos 1: Sikut Dewo", elevation: 1650, distance: 1.1, temp: 16, x: 120, y: 300 },
    { name: "Pos 2: Canggal Bulung", elevation: 1900, distance: 2.2, temp: 15, x: 220, y: 220 },
    { name: "Pos 3: Cacingan", elevation: 2200, distance: 3.2, temp: 13, x: 340, y: 150 },
    { name: "Puncak Prau (Camp)", elevation: 2565, distance: 4.2, temp: 11, x: 450, y: 50 },
  ];

  // Simulation State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [speed, setSpeed] = useState(1); // multiplier
  const [currentCheckpoint, setCurrentCheckpoint] = useState<Checkpoint>(checkpoints[0]);
  const [liveStats, setLiveStats] = useState({
    elevation: 1400,
    distance: 0.0,
    temp: 18,
    timeRemaining: 210, // minutes (3.5 hours)
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate smooth trail path points for the SVG line
  const pathData = checkpoints.map((cp, idx) => `${idx === 0 ? "M" : "L"} ${cp.x} ${cp.y}`).join(" ");

  // Path interpolation to calculate exact coordinates for the moving dot
  const getCoordinatesAtProgress = (pct: number) => {
    if (pct <= 0) return { x: checkpoints[0].x, y: checkpoints[0].y };
    if (pct >= 100) return { x: checkpoints[checkpoints.length - 1].x, y: checkpoints[checkpoints.length - 1].y };

    const totalSegments = checkpoints.length - 1;
    const segmentIndex = Math.min(Math.floor((pct / 100) * totalSegments), totalSegments - 1);
    const segmentPct = (pct / 100) * totalSegments - segmentIndex;

    const start = checkpoints[segmentIndex];
    const end = checkpoints[segmentIndex + 1];

    const x = start.x + (end.x - start.x) * segmentPct;
    const y = start.y + (end.y - start.y) * segmentPct;

    return { x, y };
  };

  const currentCoords = getCoordinatesAtProgress(progress);

  // Start / Pause Simulation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5 * speed;
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed]);

  // Dynamically update stats as hiker progress increases
  useEffect(() => {
    const totalSegments = checkpoints.length - 1;
    const pct = progress / 100;

    // Find current active segment
    const segmentIndex = Math.min(Math.floor(pct * totalSegments), totalSegments - 1);
    const segmentPct = pct * totalSegments - segmentIndex;

    const start = checkpoints[segmentIndex];
    const end = checkpoints[segmentIndex + 1];

    // Interpolate values
    const elevation = Math.round(start.elevation + (end.elevation - start.elevation) * segmentPct);
    const distance = parseFloat((start.distance + (end.distance - start.distance) * segmentPct).toFixed(2));
    const temp = Math.round(start.temp + (end.temp - start.temp) * segmentPct);
    
    // 3.5 hours (210 mins) down to 0 mins
    const totalDuration = 210;
    const timeRemaining = Math.max(Math.round(totalDuration * (1 - pct)), 0);

    setLiveStats({ elevation, distance, temp, timeRemaining });
    setCurrentCheckpoint(pct >= 1 ? checkpoints[checkpoints.length - 1] : checkpoints[segmentIndex]);
  }, [progress]);

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <section className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/30 card-shadow space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <span className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1">
            <span className="material-symbols-outlined text-xs animate-pulse text-error">satellite_alt</span>
            Live Tracking &amp; Peta Topografi
          </span>
          <h3 className="font-headline font-black text-2xl text-on-surface mt-1">
            Visualisasi Jalur Patakbanteng
          </h3>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="forest-gradient text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">
              {isPlaying ? "pause" : "play_arrow"}
            </span>
            {isPlaying ? "Jeda" : progress === 0 ? "Mulai Tracking" : "Lanjutkan"}
          </button>
          
          <button
            onClick={handleReset}
            className="bg-white border border-outline-variant/60 text-secondary hover:bg-surface-container-low px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xs">replay</span>
            Reset
          </button>

          {/* Speed Selector */}
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="bg-surface-container border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none"
          >
            <option value={1}>Speed: 1x</option>
            <option value={5}>Speed: 5x</option>
            <option value={10}>Speed: 10x</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Topographic SVG Map */}
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] shadow-inner">
          {/* Signal Indicator Overlay */}
          <div className="absolute top-4 left-4 bg-white/85 backdrop-blur-md px-3 py-1 rounded-full border border-outline-variant/30 flex items-center gap-1.5 shadow-sm text-[10px] font-bold">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-500 animate-ping" : "bg-primary"}`}></span>
            <span className="text-secondary font-mono">GPS: {isPlaying ? "TRANSMITTING" : "STANDBY"}</span>
          </div>

          <svg viewBox="0 0 500 400" className="w-full h-full max-w-[500px]">
            {/* Background Topographic Contour Lines */}
            <path d="M -50 380 Q 250 350 550 380" fill="none" stroke="rgba(45, 90, 39, 0.08)" strokeWidth="8" />
            <path d="M -50 330 Q 250 300 550 330" fill="none" stroke="rgba(45, 90, 39, 0.08)" strokeWidth="6" />
            <path d="M -50 280 Q 250 240 550 280" fill="none" stroke="rgba(45, 90, 39, 0.08)" strokeWidth="5" />
            <path d="M -50 220 Q 250 180 550 220" fill="none" stroke="rgba(45, 90, 39, 0.08)" strokeWidth="4" />
            <path d="M -50 150 Q 250 100 550 150" fill="none" stroke="rgba(45, 90, 39, 0.08)" strokeWidth="3" />
            <path d="M -50 80 Q 250 40 550 80" fill="none" stroke="rgba(45, 90, 39, 0.08)" strokeWidth="2.5" />
            <path d="M -50 20 Q 250 -10 550 20" fill="none" stroke="rgba(45, 90, 39, 0.08)" strokeWidth="1.5" />

            {/* Trail Route Path (Underlay) */}
            <path
              d={pathData}
              fill="none"
              stroke="#aff0ad"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Active Trail Route Path (Dashed Overlay) */}
            <path
              d={pathData}
              fill="none"
              stroke="#2d5a27"
              strokeWidth="3"
              strokeDasharray="6,4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Checkpoints Circles */}
            {checkpoints.map((cp, index) => {
              const isActive = liveStats.elevation >= cp.elevation;
              return (
                <g key={cp.name} className="cursor-pointer">
                  <circle
                    cx={cp.x}
                    cy={cp.y}
                    r={index === 0 || index === checkpoints.length - 1 ? 7 : 5}
                    className={`transition-all duration-300 ${
                      isActive ? "fill-primary stroke-primary-fixed" : "fill-white stroke-outline-variant"
                    }`}
                    strokeWidth="3"
                  />
                  
                  {/* Label Text */}
                  <text
                    x={cp.x}
                    y={cp.y - 12}
                    className="font-headline font-bold fill-on-surface/90 text-[9px]"
                    textAnchor="middle"
                  >
                    {cp.name.split(":")[0]}
                  </text>
                  <text
                    x={cp.x}
                    y={cp.y + 16}
                    className="font-mono fill-secondary/70 text-[8px]"
                    textAnchor="middle"
                  >
                    {cp.elevation}m
                  </text>
                </g>
              );
            })}

            {/* Moving Hiker GPS Indicator (Dot) */}
            <g transform={`translate(${currentCoords.x}, ${currentCoords.y})`}>
              <circle cx="0" cy="0" r="10" className="fill-error/20 stroke-error/40" strokeWidth="1" />
              <circle cx="0" cy="0" r="6" className="fill-error animate-pulse" />
              {/* Pulsing signal ring */}
              {isPlaying && (
                <circle cx="0" cy="0" r="14" className="fill-none stroke-error/30 animate-ping" strokeWidth="1.5" />
              )}
            </g>
          </svg>
        </div>

        {/* Right Column: Simulated Live Stats */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          {/* Real-time Status Card */}
          <div className="bg-surface-container/50 border border-outline-variant/30 rounded-2xl p-5 space-y-4">
            <h4 className="font-bold text-xs text-secondary uppercase tracking-widest border-b border-outline-variant/20 pb-2">
              Status Real-Time
            </h4>

            <div className="space-y-3">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">Lokasi Saat Ini</span>
                <span className="text-base font-headline font-black text-primary truncate block">
                  {progress === 100 ? "Tiba di Puncak Prau!" : currentCheckpoint.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">Ketinggian</span>
                  <span className="text-lg font-black font-headline text-on-surface font-mono">{liveStats.elevation} <span className="text-xs font-normal">mdpl</span></span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">Suhu Ketinggian</span>
                  <span className="text-lg font-black font-headline text-on-surface font-mono">{liveStats.temp}°C</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">Jarak Tempuh</span>
                  <span className="text-lg font-black font-headline text-on-surface font-mono">{liveStats.distance} <span className="text-xs font-normal">km</span></span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">Estimasi Sisa</span>
                  <span className="text-lg font-black font-headline text-on-surface font-mono">
                    {Math.floor(liveStats.timeRemaining / 60)}j {liveStats.timeRemaining % 60}m
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-secondary">
                <span>PROGRESS MENDAKI</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full forest-gradient transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Safety Checkpoint Checklist */}
          <div className="bg-white border border-outline-variant/20 rounded-2xl p-5 space-y-3 shadow-sm flex-grow">
            <h4 className="font-bold text-xs text-secondary uppercase tracking-widest border-b border-outline-variant/25 pb-2 flex items-center justify-between">
              <span>Protokol Checkpoint</span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[8px] font-mono">SIMAKSI VALID</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {checkpoints.map((cp, idx) => {
                const isChecked = liveStats.elevation >= cp.elevation;
                return (
                  <li key={cp.name} className="flex items-center gap-2.5 transition-colors duration-300">
                    <span
                      className={`material-symbols-outlined text-sm ${
                        isChecked ? "text-primary font-bold" : "text-secondary/20"
                      }`}
                    >
                      {isChecked ? "check_box" : "check_box_outline_blank"}
                    </span>
                    <span className={isChecked ? "text-on-surface" : "text-on-surface-variant/50"}>
                      Checkpoint #{idx + 1}: {cp.name.split(":")[0]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
