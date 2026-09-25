import { StrictMode } from 'react';
import { Bullseye } from './components/Bullseye';
import { ErrorCurve } from './components/ErrorCurve';
import { ModelFitSimulator } from './components/ModelFitSimulator';
import { ConceptTabs } from './components/ConceptTabs';

export default function App() {
  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col font-sans text-neutral-100 overflow-hidden relative">
      <header className="p-8 border-b-2 border-neutral-700 flex flex-col md:flex-row md:justify-between md:items-end gap-6 bg-neutral-900 z-10 w-full">
        <div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">Bias-Variance Tradeoff</h1>
          <p className="mt-2 text-sm font-medium tracking-widest uppercase text-neutral-400">Machine Learning Fundamentals</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500"></div>
            <span className="text-xs font-bold uppercase text-neutral-300">Bias</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500"></div>
            <span className="text-xs font-bold uppercase text-neutral-300">Variance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neutral-100"></div>
            <span className="text-xs font-bold uppercase text-neutral-300">Total Error</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        
        {/* Introduction Section */}
        <section className="border-b-2 border-neutral-700 bg-neutral-900 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-5xl">
            <h2 className="text-3xl font-black uppercase mb-4 tracking-tighter text-white">Introduction</h2>
            <p className="text-base md:text-lg font-medium leading-relaxed border-l-4 border-neutral-500 pl-6 text-neutral-300">
              In machine learning, every model faces a central challenge: perform perfectly on known training data, or generalize effectively to new, unseen data. You rarely get to have both. This push-and-pull is the <strong className="text-white">Bias-Variance Tradeoff</strong>. Navigating this tradeoff is the ultimate key to building predictive models that actually work in the real world.
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-neutral-700">
          <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-neutral-700 p-6 bg-neutral-800 flex flex-col justify-between">
            <div className="mb-6">
              <h2 className="text-2xl font-black uppercase mb-4 text-white">Core Concepts</h2>
              <ConceptTabs />
            </div>
            
            <div className="bg-neutral-950 border border-neutral-700 text-neutral-100 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">The Goal</p>
              <p className="text-sm font-medium leading-snug">Find the optimal complexity that balances these two competing forces to minimize total error.</p>
            </div>
          </div>
          <div className="lg:col-span-7 bg-neutral-900 relative p-8 flex items-center justify-center">
            <div className="absolute top-4 left-4 text-[10px] font-mono uppercase text-neutral-500">Visualization 01: Interactive Sandbox</div>
            <ModelFitSimulator />
          </div>
        </section>

        {/* The Target Analogy */}
        <section className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-neutral-700 bg-neutral-900">
          <div className="lg:col-span-3 border-b-2 lg:border-b-0 lg:border-r-2 border-neutral-700 p-6 bg-red-950 flex flex-col justify-center">
            <h2 className="text-2xl font-black uppercase mb-3 text-white">The Target Analogy</h2>
            <p className="text-xs font-medium leading-relaxed mb-6 text-red-100/80">
              Imagine shooting arrows at a target. The bullseye is the true value we want to predict. Our model shoots multiple arrows (predictions on different sets).
            </p>
            <div className="w-full h-16 border border-neutral-700 bg-neutral-900 grid grid-cols-5 gap-1 p-2">
              <div className="bg-red-500 opacity-20 h-full"></div>
              <div className="bg-red-500 opacity-40 h-full"></div>
              <div className="bg-red-500 opacity-60 h-full"></div>
              <div className="bg-red-500 opacity-40 h-full"></div>
              <div className="bg-red-500 opacity-20 h-full"></div>
            </div>
          </div>
          <div className="lg:col-span-9 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Bullseye title="Low Bias, Low Var" bias="low" variance="low" />
              <Bullseye title="Low Bias, High Var" bias="low" variance="high" />
              <Bullseye title="High Bias, Low Var" bias="high" variance="low" />
              <Bullseye title="High Bias, High Var" bias="high" variance="high" />
            </div>
          </div>
        </section>

        {/* The Tradeoff Curve */}
        <section className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 bg-neutral-800 relative p-8 flex items-center justify-center border-b-2 lg:border-b-0 border-neutral-700 lg:border-r-2">
            <div className="absolute top-4 left-4 text-[10px] font-mono uppercase text-neutral-500">Visualization 02: Error vs Complexity</div>
            <div className="w-full max-w-3xl">
              <ErrorCurve />
            </div>
          </div>
          <div className="lg:col-span-4 p-6 bg-green-950/30 flex flex-col justify-center border-t-2 lg:border-t-0 border-neutral-700 lg:col-start-9 overflow-y-auto max-h-[500px]">
            <h2 className="text-2xl font-black uppercase mb-4 text-white">The Tradeoff Curve</h2>
            
            <p className="text-xs font-medium leading-relaxed mb-6 text-neutral-300">
              The curve demonstrates the fundamental tension in machine learning. As you increase model complexity (e.g., deeper network, higher polynomial degree):
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-neutral-900 border border-neutral-700 p-3 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-red-500 text-white px-2 py-1 uppercase text-[10px] tracking-widest font-black">Bias</span>
                  <span className="text-[10px] font-bold text-red-400 bg-red-950/50 px-1 border border-red-900">Decreases ↓</span>
                </div>
                <p className="text-[11px] font-medium leading-relaxed text-neutral-400">The model capacity grows, so it makes fewer assumptions and can adapt to complex structures in the data.</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-700 p-3 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-green-500 text-white px-2 py-1 uppercase text-[10px] tracking-widest font-black">Variance</span>
                  <span className="text-[10px] font-bold text-green-400 bg-green-950/50 px-1 border border-green-900">Increases ↑</span>
                </div>
                <p className="text-[11px] font-medium leading-relaxed text-neutral-400">The model becomes highly sensitive. It starts mapping the inherent noise in the training data rather than the true underlying pattern.</p>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-700 text-white p-4 mb-6">
              <p className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-2">Mathematical View</p>
              <code className="text-[11px] font-mono block font-bold mb-3 text-neutral-200">Error = Bias² + Var + ε</code>
              <p className="text-[10px] font-medium leading-relaxed text-neutral-400">
                The <strong className="text-neutral-200">ε (Epsilon)</strong> represents irreducible error from unobserved variables or fundamental randomness. No model can perform better than ε.
              </p>
            </div>

            <p className="text-[11px] font-medium leading-relaxed bg-neutral-900 border border-neutral-700 p-3 border-l-4 border-l-neutral-400 text-neutral-300">
              <strong className="text-white">Finding the Sweet Spot:</strong> Data scientists use techniques like <em className="text-neutral-200">Cross-Validation</em>, <em className="text-neutral-200">Regularization (L1/L2)</em>, and <em className="text-neutral-200">Ensemble Methods</em> to navigate this curve and settle at the absolute minimum of the Total Error.
            </p>
          </div>
        </section>

        {/* Methods Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 bg-neutral-900">
          <div className="lg:col-span-12 p-8 border-b-2 border-neutral-700 bg-neutral-950 text-white">
             <h2 className="text-3xl font-black uppercase tracking-tighter">Managing the Tradeoff</h2>
             <p className="text-sm font-medium text-neutral-400 mt-2 tracking-widest uppercase">Techniques to find the optimal balance</p>
          </div>
          <div className="lg:col-span-4 p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-neutral-700 flex flex-col bg-neutral-900">
            <div className="mb-4">
              <span className="bg-neutral-950 text-white border-2 border-neutral-600 px-2 py-1 uppercase text-[10px] font-black tracking-widest">Method 01</span>
            </div>
            <h3 className="text-xl font-black uppercase mb-4 text-white underline underline-offset-4 decoration-neutral-600">Cross-Validation</h3>
            <p className="text-sm font-medium leading-relaxed text-neutral-300">
              Splits the dataset into multiple training and testing folds (like k-fold). It provides a more reliable estimate of model performance on unseen data, helping detect overfitting during training.
            </p>
          </div>
          <div className="lg:col-span-4 p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-neutral-700 bg-neutral-800 flex flex-col">
            <div className="mb-4">
              <span className="bg-neutral-950 text-white border-2 border-neutral-600 px-2 py-1 uppercase text-[10px] font-black tracking-widest">Method 02</span>
            </div>
            <h3 className="text-xl font-black uppercase mb-4 text-white underline underline-offset-4 decoration-neutral-600">Regularization</h3>
            <p className="text-sm font-medium leading-relaxed text-neutral-300">
              Introduces a mathematical penalty for complexity (e.g., L1 Lasso, L2 Ridge). It discourages the model from learning highly fluctuating weights, intentionally increasing bias slightly to massively reduce variance.
            </p>
          </div>
          <div className="lg:col-span-4 p-8 flex flex-col bg-neutral-700 border-b-2 border-neutral-700 lg:border-b-0">
            <div className="mb-4">
              <span className="bg-neutral-950 text-white border-2 border-neutral-500 px-2 py-1 uppercase text-[10px] font-black tracking-widest">Method 03</span>
            </div>
            <h3 className="text-xl font-black uppercase mb-4 text-white underline underline-offset-4 decoration-neutral-500">Feature Selection</h3>
            <p className="text-sm font-medium leading-relaxed text-neutral-200">
              Removes irrelevant, noisy, or redundant features from the dataset. Fewer features result in a simpler model hypothesis space, which directly decreases variance and prevents the model from memorizing random details.
            </p>
          </div>
        </section>

        {/* Importance Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 bg-neutral-900 border-t-2 border-neutral-700">
          <div className="lg:col-span-4 p-8 lg:border-r-2 border-neutral-700 bg-neutral-900 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute -right-12 -top-12 w-32 h-32 bg-neutral-800 rounded-full border-2 border-neutral-700 opacity-50 pointer-events-none"></div>
             <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-red-900/20 border-2 border-neutral-700 rotate-45 opacity-50 pointer-events-none"></div>
             
             <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 relative z-10 text-white">Why It Matters</h2>
             <p className="text-sm font-medium leading-relaxed relative z-10 text-neutral-300">
               Understanding the Bias-Variance Tradeoff is not just an academic exercise. It is the defining framework that guides every practical machine learning decision.
             </p>
          </div>
          <div className="lg:col-span-8 p-8 bg-neutral-800 border-t-2 lg:border-t-0 border-neutral-700">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <li className="flex items-start gap-4">
                <div className="w-3 h-3 bg-neutral-200 mt-1 shrink-0 border border-neutral-700"></div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest mb-1 text-neutral-100">Diagnosing Errors</h4>
                  <p className="text-xs font-medium leading-relaxed text-neutral-400">Helps pinpoint whether poor performance is due to a simplistic model (underfitting) or memorized noise (overfitting).</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-3 h-3 bg-red-500 mt-1 shrink-0 border border-neutral-700"></div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest mb-1 text-neutral-100">Hyperparameter Tuning</h4>
                  <p className="text-xs font-medium leading-relaxed text-neutral-400">Provides the theoretical foundation for optimizing parameters like tree depth, learning rate, or regularization strength.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-3 h-3 bg-green-500 mt-1 shrink-0 border border-neutral-700"></div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest mb-1 text-neutral-100">Model Selection</h4>
                  <p className="text-xs font-medium leading-relaxed text-neutral-400">Guides the choice between different algorithms (e.g., Linear Regression vs. Random Forest) based on dataset complexity.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-3 h-3 bg-neutral-200 rounded-full mt-1 shrink-0 border border-neutral-700"></div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest mb-1 text-neutral-100">Data Strategy</h4>
                  <p className="text-xs font-medium leading-relaxed text-neutral-400">Indicates next steps: high variance suggests needing more training data, while high bias means you need better features.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1 shrink-0 border border-neutral-700"></div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest mb-1 text-neutral-100">Generalization</h4>
                  <p className="text-xs font-medium leading-relaxed text-neutral-400">Ensures the ultimate goal is achieved: building a model that performs optimally on unseen, real-world data.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1 shrink-0 border border-neutral-700"></div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest mb-1 text-neutral-100">Resource Efficiency</h4>
                  <p className="text-xs font-medium leading-relaxed text-neutral-400">Prevents wasting computational power and money on training overly complex models that yield diminishing returns.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

      </main>
      
      <footer className="bg-neutral-950 text-white p-6 grid grid-cols-1 border-t-2 border-neutral-700 z-10 w-full relative">
        <div className="flex flex-col items-center justify-center">
          <span className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-1">Observation</span>
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-300">To learn is to balance.</p>
        </div>
      </footer>
    </div>
  );
}