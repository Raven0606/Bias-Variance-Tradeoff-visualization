import React from 'react';

interface BullseyeProps {
  bias: 'low' | 'high';
  variance: 'low' | 'high';
  title: string;
}

export const Bullseye: React.FC<BullseyeProps> = ({ bias, variance, title }) => {
  let points: [number, number][] = [];
  
  if (bias === 'low' && variance === 'low') {
    points = [[2, -2], [-3, 5], [4, 1], [-1, -4], [0, 3], [-2, -1], [5, -4], [-4, 2], [1, 5], [-3, -3]];
  } else if (bias === 'low' && variance === 'high') {
    points = [[-30, 20], [40, -10], [-10, 40], [20, 30], [-35, -25], [15, -45], [-20, -15], [30, 15], [5, -25], [-15, 10]];
  } else if (bias === 'high' && variance === 'low') {
    points = [[35, 30], [38, 33], [32, 28], [36, 25], [31, 32], [37, 29], [34, 34], [39, 27], [33, 26], [35, 31]];
  } else {
    points = [[20, 40], [45, 15], [50, 45], [15, 20], [35, 35], [25, 55], [60, 25], [40, 60], [10, 50], [55, 10]];
  }

  return (
    
    <div className="flex flex-col items-center justify-center p-6 border-2 border-black bg-white w-full h-full">
      <h3 className="mb-6 font-black uppercase tracking-widest text-[10px] text-center border-b border-black pb-2 w-full opacity-80">
        {title}
      </h3>
      <div className="w-full max-w-[140px] aspect-square">
        <svg viewBox="-80 -80 160 160" className="w-full h-full overflow-visible drop-shadow-sm">
          {/* Target Rings */}
          <circle cx="0" cy="0" r="70" fill="white" stroke="black" strokeWidth="3" />
          <circle cx="0" cy="0" r="50" fill="white" stroke="black" strokeWidth="3" />
          <circle cx="0" cy="0" r="30" fill="white" stroke="black" strokeWidth="3" />
          <circle cx="0" cy="0" r="10" fill="#16a34a" stroke="black" strokeWidth="2" />
          
          {/* Drops/Dots */}
          {points.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#dc2626" stroke="black" strokeWidth="1.5" />
          ))}
        </svg>
      </div>
      <div className="mt-6 flex flex-col items-center text-[10px] font-bold uppercase tracking-widest">
        <span className={bias === 'low' ? 'text-green-600' : 'text-red-600'}>Bias: {bias}</span>
        <span className={variance === 'low' ? 'text-green-600' : 'text-red-600'}>Var: {variance}</span>
      </div>
    </div>
  
  );
};
