import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type TabId = 'bias' | 'variance' | 'underfit' | 'overfit' | 'curve';

export const ConceptTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('bias');

  const tabs = [
    { id: 'bias', label: 'Bias' },
    { id: 'variance', label: 'Variance' },
    { id: 'underfit', label: 'Underfit' },
    { id: 'overfit', label: 'Overfit' },
    { id: 'curve', label: 'Tradeoff' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'bias':
        return (
          <div>
            <h3 className="text-red-500 text-xl font-black uppercase mb-3 underline underline-offset-4 decoration-red-900">Bias</h3>
            <p className="text-sm leading-relaxed font-medium text-neutral-300">
              Bias is the error introduced by approximating a real-world problem with a simplified model. High bias means the model makes strong assumptions about the data and fails to capture the underlying patterns, leading to systematic errors.
            </p>
            <div className="mt-4 p-3 bg-red-950/30 border border-red-900/50">
              <p className="text-xs font-bold text-red-400">Result: <span className="uppercase text-red-300">Underfitting</span></p>
            </div>
          </div>
        );
      case 'variance':
        return (
          <div>
            <h3 className="text-green-500 text-xl font-black uppercase mb-3 underline underline-offset-4 decoration-green-900">Variance</h3>
            <p className="text-sm leading-relaxed font-medium text-neutral-300">
              Variance is the error introduced by the model's sensitivity to small fluctuations in the training set. High variance means the model pays too much attention to the training data, capturing random noise as if it were a true pattern.
            </p>
            <div className="mt-4 p-3 bg-green-950/30 border border-green-900/50">
              <p className="text-xs font-bold text-green-400">Result: <span className="uppercase text-green-300">Overfitting</span></p>
            </div>
          </div>
        );
      case 'underfit':
        return (
          <div>
            <h3 className="text-white text-xl font-black uppercase mb-3 underline underline-offset-4 decoration-neutral-600">Underfitting</h3>
            <p className="text-sm leading-relaxed font-medium mb-3 text-neutral-300">
              Underfitting occurs when a model is too simple to learn the underlying structure of the data. It suffers from <strong className="text-white">high bias</strong> and low variance.
            </p>
            <p className="text-sm leading-relaxed font-medium text-neutral-300">
              An underfit model performs poorly on both the training data and new, unseen data because it simply cannot represent the true relationship.
            </p>
          </div>
        );
      case 'overfit':
        return (
          <div>
            <h3 className="text-white text-xl font-black uppercase mb-3 underline underline-offset-4 decoration-neutral-600">Overfitting</h3>
            <p className="text-sm leading-relaxed font-medium mb-3 text-neutral-300">
              Overfitting happens when a model is too complex and learns the training data too well, including its noise and outliers. It suffers from <strong className="text-white">high variance</strong> and low bias.
            </p>
            <p className="text-sm leading-relaxed font-medium text-neutral-300">
              An overfit model performs perfectly on training data but fails spectacularly when making predictions on new data because it memorized rather than generalized.
            </p>
          </div>
        );
      case 'curve':
        return (
          <div>
            <h3 className="text-white text-xl font-black uppercase mb-3 underline underline-offset-4 decoration-neutral-600">The Tradeoff</h3>
            <p className="text-sm leading-relaxed font-medium mb-3 text-neutral-300">
              The tradeoff curve illustrates the relationship between model complexity and prediction error. As complexity increases, bias strictly decreases while variance strictly increases.
            </p>
            <p className="text-sm leading-relaxed font-medium text-neutral-300">
              The optimal model is found at the "sweet spot" where total error (Bias² + Variance + Noise) is minimized, balancing the two competing forces.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900 border-2 border-neutral-700 drop-shadow-sm w-full overflow-hidden">
      <div className="flex flex-wrap border-b-2 border-neutral-700 bg-neutral-950">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
            className={`flex-1 min-w-[70px] py-3 px-2 text-[10px] font-black uppercase tracking-widest border-r-2 border-neutral-700 last:border-r-0 transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-neutral-800 text-white' 
                : 'hover:bg-neutral-800/50 text-neutral-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 flex-1 flex flex-col justify-center min-h-[220px] bg-gradient-to-br from-black to-neutral-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};