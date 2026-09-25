import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';

type FitType = 'underfit' | 'optimal' | 'overfit';

export const ModelFitSimulator: React.FC = () => {
  const [fit, setFit] = useState<FitType>('optimal');

  const { points, optimalPath, overfitPath, underfitPath } = useMemo(() => {
    const pts: [number, number][] = [];
    // Deterministic pseudo-random noise for 25 points
    const noise = [3, -5, 8, -4, 9, -7, 5, -2, 10, -8, 6, -5, 7, -9, 4, 1, -6, 8, -3, 5, -8, 4, -7, 2, 9];
    
    for(let i = 0; i < 25; i++) {
        const x = 2 + i * 4;
        const trueY = 50 - 35 * Math.sin((x - 20) * Math.PI / 40);
        pts.push([x, trueY + noise[i]]);
    }
    
    // Helper function to linearly interpolate Y values for our noisy points
    const getInterpolatedY = (x: number) => {
      if (x <= pts[0][0]) return pts[0][1];
      if (x >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
      
      for (let j = 0; j < pts.length - 1; j++) {
        if (x >= pts[j][0] && x <= pts[j+1][0]) {
          const t = (x - pts[j][0]) / (pts[j+1][0] - pts[j][0]);
          return pts[j][1] + t * (pts[j+1][1] - pts[j][1]);
        }
      }
      return 50;
    };

    // By making EVERY path exactly 101 points (0 to 100), Framer Motion
    // can perfectly morph the SVG strings point-by-point.
    
    const optPath = Array.from({length: 101}, (_, i) => {
        const y = 50 - 35 * Math.sin((i - 20) * Math.PI / 40);
        return `${i===0 ? 'M' : 'L'} ${i} ${y}`;
    }).join(' ');
    
    const overPath = Array.from({length: 101}, (_, i) => {
        const y = getInterpolatedY(i);
        return `${i===0 ? 'M' : 'L'} ${i} ${y}`;
    }).join(' ');
    
    const underPath = Array.from({length: 101}, (_, i) => {
        const y = 55 - 0.1 * i; // Linear regression approximation
        return `${i===0 ? 'M' : 'L'} ${i} ${y}`;
    }).join(' ');
    
    return { points: pts, optimalPath: optPath, overfitPath: overPath, underfitPath: underPath };
  }, []);

  const getPath = () => {
    switch(fit) {
      case 'underfit': return underfitPath;
      case 'optimal': return optimalPath;
      case 'overfit': return overfitPath;
    }
  };

  const getThemeColor = () => {
    switch(fit) {
      case 'underfit': return '#3b82f6'; // Blue-500
      case 'optimal': return '#22c55e'; // Green-500
      case 'overfit': return '#ef4444'; // Red-500
    }
  };

  return (
    <div className="flex flex-col border-2 border-neutral-700 bg-neutral-900 w-full drop-shadow-sm max-w-2xl mx-auto overflow-hidden">
      <div className="p-3 border-b-2 border-neutral-700 bg-neutral-950 text-white">
        <h3 className="font-black uppercase tracking-widest text-xs text-neutral-300">Interactive Data Fit</h3>
      </div>
      
      <div className="p-4 pb-0">
        <div className="w-full aspect-[10/5] border-2 border-neutral-700 relative bg-neutral-950 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible preserve-3d" preserveAspectRatio="none">
            {/* Grid */}
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#544d4d" strokeWidth="0.3"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
            
            {/* The Model Fit Line */}
            <motion.path 
              animate={{ d: getPath(), stroke: getThemeColor() }}
              transition={{ 
                type: "spring", 
                stiffness: 60, 
                damping: 14, 
                mass: 1 
              }}
              fill="none" 
              strokeWidth="2.5" 
            />
            
            {/* Data Points */}
            {points.map((p, i) => (
              <circle 
                key={i} 
                cx={p[0]} 
                cy={p[1]} 
                r="1.0" 
                fill="#e5e5e5" 
                stroke="#0c0b0b" 
                strokeWidth="0.2" 
                className="z-10 relative"
              />
            ))}
          </svg>
          
          {/* Overlay Status */}
          <motion.div 
            animate={{ backgroundColor: getThemeColor() }}
            className="absolute top-3 right-3 border border-neutral-800 px-2 py-0.5 font-black uppercase text-[10px] tracking-widest text-white transition-colors duration-500 shadow-md"
          >
             {fit === 'underfit' ? 'High Bias' : fit === 'overfit' ? 'High Variance' : 'Optimal'}
          </motion.div>
        </div>
      </div>
      
      <div className="p-4 pt-4 flex gap-3">
        {(['underfit', 'optimal', 'overfit'] as FitType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFit(type)}
            className={`flex-1 py-3 border-2 flex items-center justify-center font-black uppercase text-[10px] md:text-xs tracking-widest transition-all duration-200
              ${fit === type 
                ? 'bg-neutral-800 text-white border-neutral-500 shadow-inner' 
                : 'bg-neutral-900 text-neutral-500 border-neutral-700 hover:bg-neutral-800 hover:text-neutral-300'
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>
      
      <div className="p-4 pt-0 border-t border-neutral-700 border-dashed mt-2 min-h-[80px]">
        <p className="text-sm md:text-sm font-medium leading-relaxed text-neutral-300">
          {fit === 'underfit' && <span><strong className="text-blue-500">High Bias (Underfit):</strong> The linear model makes overly simplistic assumptions. It completely misses the underlying periodic pattern in the data, resulting in high systematic error.</span>}
          {fit === 'optimal' && <span><strong className="text-green-500">Optimal Balance:</strong> The model captures the actual underlying sine wave structure without getting distracted by the individual noisy data points. It generalizes best.</span>}
          {fit === 'overfit' && <span><strong className="text-red-500">High Variance (Overfit):</strong> The model is so complex that it creates erratic zig-zags just to touch every single outlier point, capturing the noise instead of the signal.</span>}
        </p>
      </div>
    </div>
  );
};
