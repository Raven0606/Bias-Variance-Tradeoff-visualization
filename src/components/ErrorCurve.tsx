import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';

const data = [
  { complexity: '1', bias2: 90, variance: 5, totalError: 95 },
  { complexity: '2', bias2: 70, variance: 8, totalError: 78 },
  { complexity: '3', bias2: 50, variance: 12, totalError: 62 },
  { complexity: '4', bias2: 30, variance: 18, totalError: 48 },
  { complexity: 'Optimal', bias2: 15, variance: 25, totalError: 40 },
  { complexity: '6', bias2: 8, variance: 38, totalError: 46 },
  { complexity: '7', bias2: 4, variance: 55, totalError: 59 },
  { complexity: '8', bias2: 2, variance: 75, totalError: 77 },
  { complexity: '9', bias2: 1, variance: 98, totalError: 99 },
];

// Custom Tooltip Component with Logic for <, =, and > Optimal
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    let bgColor = 'rgba(12, 56, 25, 0.85)'; 
    let titleText = `Complexity: ${label}`;


    if (label === 'Optimal') {
      bgColor = 'rgba(38, 145, 70, 0.85)'; 
      titleText = 'Optimal Complexity';
    } else {
      
      const num = parseInt(label as string, 10);
      if (!isNaN(num)) {
        if (num < 4) {
          bgColor = 'rgba(186, 26, 26, 0.2)'; 
          titleText = `Complexity: ${label} (Underfitting)`;
        } else if (num > 6) {
          bgColor = 'rgba(186, 26, 26, 0.2)'; 
          titleText = `Complexity: ${label} (Overfitting)`;
        }
      }
    }

    return (
      <div
        style={{
          backgroundColor: bgColor,
          border: '1px solid #968585',
          borderRadius: '4px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px',
          padding: '5px',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' 
        }}
      >
        <p style={{ margin: 0, marginBottom: '8px', borderBottom: '1px solid currentColor', paddingBottom: '4px' }}>
          {titleText}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ margin: 0, padding: '3px 0', color: entry.color }}>
            <span style={{ color: '#d4d4d4' }}>{entry.name}:</span> {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ErrorCurve: React.FC = () => {
  return (
    <div className="w-full h-[400px] relative">
      <h3 className="absolute top-0 right-0 font-black uppercase tracking-widest text-[10px] bg-neutral-950 border border-neutral-700 text-white px-2 py-1 z-10 opacity-70">
        Error vs Model Complexity
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" vertical={false} />
          
          <XAxis 
            dataKey="complexity" 
            stroke="#a3a3a3" 
            tick={{ fill: '#a3a3a3', fontWeight: 'bold' }} 
            axisLine={{ strokeWidth: 2, stroke: '#525252' }}
            tickLine={{ strokeWidth: 2, stroke: '#525252' }}
          />
          
          <YAxis 
            stroke="#a3a3a3" 
            tick={{ fill: '#a3a3a3', fontWeight: 'bold' }} 
            axisLine={{ strokeWidth: 2, stroke: '#525252' }}
            tickLine={{ strokeWidth: 2, stroke: '#525252' }}
            label={{ value: 'Error', angle: -90, position: 'insideLeft', fontWeight: 'bold', fill: '#a3a3a3' }} 
          />
          
          {/* Attach the new Custom Tooltip */}
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
          
          <Legend 
            wrapperStyle={{ color: '#d4d4d4', fontWeight: 'bold', paddingTop: '20px' }} 
            iconType="square"
          />
          
          {/* Highlight Optimal Zone */}
          <ReferenceArea x1="4" x2="6" fill="#16a34a" fillOpacity={0.15} />

          <Line 
            type="monotone" 
            dataKey="bias2" 
            name="Bias²" 
            stroke="#ef4444" 
            strokeWidth={3} 
            strokeDasharray="8 4"
            dot={{ r: 0 }} 
            activeDot={{ r: 4, fill: '#ef4444' }}
          />
          <Line 
            type="monotone" 
            dataKey="variance" 
            name="Variance" 
            stroke="#22c55e" 
            strokeWidth={3} 
            strokeDasharray="8 4"
            dot={{ r: 0 }} 
            activeDot={{ r: 4, fill: '#22c55e' }}
          />
          <Line 
            type="monotone" 
            dataKey="totalError" 
            name="Total Error" 
            stroke="#f97316" 
            strokeWidth={4} 
            dot={{ r: 4, fill: '#171717', stroke: '#f97316', strokeWidth: 2 }} 
            activeDot={{ r: 6, fill: '#f97316' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};