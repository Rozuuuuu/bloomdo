import React from 'react';
import DependencyNode from './DependencyNode';

interface Dependency {
  id: string;
  title: string;
  status: 'completed' | 'active' | 'locked' | 'scheduled';
  position: { x: number; y: number };
  dependencies?: string[];
}

interface DependencyMapProps {
  dependencies: Dependency[];
  onNodeClick: (nodeId: string) => void;
}

const DependencyMap: React.FC<DependencyMapProps> = ({ dependencies, onNodeClick }) => {
  // Actually use the dependencies parameter
  const visibleDependencies = dependencies.slice(0, 4); // Show first 4
  
  // Define static positions for nodes (fallback if dependencies don't have positions)
  const nodePositions = [
    { x: 40, y: 80 },   // Top-left
    { x: 190, y: 260 }, // Center-top
    { x: 40, y: 460 },  // Bottom-left
    { x: 340, y: 480 }, // Bottom-right
  ];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-cream-bg dark:bg-dark-dep-bg">
      {/* Header */}
      <header className="flex items-center bg-white/90 dark:bg-dark-dep-bg/80 backdrop-blur-md px-4 py-3 border-b border-orange-100 dark:border-white/5 z-20">
        <button 
          onClick={() => window.history.back()}
          className="flex size-10 items-center justify-start text-leaf-green dark:text-dep-node-cream/80"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios</span>
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-[17px] font-bold tracking-tight text-deep-brown dark:text-white">
            Sunflower Task Flow
          </h1>
          <p className="text-[11px] font-bold text-sun-yellow dark:text-dark-dep-yellow uppercase tracking-widest">
            Q3 Strategy Garden
          </p>
        </div>
        <div className="flex w-10 items-center justify-end">
          <button className="flex items-center justify-center text-leaf-green dark:text-dep-node-cream/80">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </header>

      {/* Status Filters */}
      <div className="flex gap-2 p-4 bg-white dark:bg-dark-dep-bg/40 border-b border-orange-50 dark:border-white/5 overflow-x-auto no-scrollbar z-20">
        {[
          { id: 'active', label: 'In Progress', color: 'sun-yellow', bg: 'amber-50', border: 'sun-yellow/30' },
          { id: 'completed', label: 'Completed', color: 'leaf-green', bg: 'green-50', border: 'leaf-green/20' },
          { id: 'scheduled', label: 'Scheduled', color: 'gray-400', bg: 'gray-50', border: 'gray-200' },
        ].map((filter) => (
          <div 
            key={filter.id}
            className={`flex h-8 items-center gap-2 rounded-full bg-${filter.bg} dark:bg-${filter.id === 'active' ? 'sun-yellow/10' : 'white/5'} px-3 border border-${filter.border} dark:border-${filter.id === 'active' ? 'sun-yellow/40' : 'white/10'}`}
          >
            <div className={`w-2 h-2 rounded-full bg-${filter.color} dark:${filter.id === 'active' ? 'bg-sun-yellow shadow-[0_0_8px_#FDB813]' : 'bg-node-cream/40'}`}></div>
            <span className={`text-xs font-medium text-${filter.color === 'sun-yellow' ? 'amber-800' : filter.color} dark:text-${filter.id === 'active' ? 'sun-yellow' : 'node-cream/60'} uppercase tracking-wider`}>
              {filter.label}
            </span>
          </div>
        ))}
      </div>

      {/* Map Canvas */}
      <main className="flex-1 relative overflow-hidden">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(#EFEBE9 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        ></div>

        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <path 
            d="M 80 140 L 190 260" 
            fill="none" 
            stroke="#FDB813" 
            strokeLinecap="round" 
            strokeWidth="3"
            className="glow-path"
          ></path>
          <path 
            d="M 200 340 L 100 460" 
            fill="none" 
            opacity="0.5" 
            stroke="#D7CCC8" 
            strokeDasharray="4" 
            strokeWidth="2"
          ></path>
          <path 
            d="M 200 340 L 300 480" 
            fill="none" 
            opacity="0.5" 
            stroke="#D7CCC8" 
            strokeDasharray="4" 
            strokeWidth="2"
          ></path>
        </svg>

        {/* Dynamic Nodes */}
        <div className="relative w-full h-full">
          {visibleDependencies.map((node, index) => {
            const position = node.position || nodePositions[index] || { x: 100, y: 100 };
            return (
              <DependencyNode
                key={node.id}
                node={node}
                onClick={() => onNodeClick(node.id)} // Use the onNodeClick prop
                style={{
                  position: 'absolute',
                  top: `${position.y}px`,
                  left: `${position.x}px`,
                }}
              />
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 right-4 flex flex-col gap-3">
          <button 
            onClick={() => console.log('Add node')}
            className="w-12 h-12 rounded-2xl bg-sun-yellow shadow-[0_0_20px_rgba(253,184,19,0.3)] flex items-center justify-center text-deep-brown"
          >
            <span className="material-symbols-outlined font-bold">add</span>
          </button>
          <button 
            onClick={() => console.log('Recenter')}
            className="w-12 h-12 rounded-2xl bg-dark-bg/80 backdrop-blur-md shadow-lg flex items-center justify-center text-node-cream border border-white/10"
          >
            <span className="material-symbols-outlined">recenter</span>
          </button>
        </div>
      </main>

      {/* Bottom Panel */}
      <section className="bg-[#1A1614] rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.6)] px-6 pt-3 pb-10 z-30 border-t border-white/5">
        <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-8"></div>
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-sun-yellow uppercase tracking-widest">
                In Sequence
              </span>
              <div className="h-[1px] flex-1 bg-white/10"></div>
            </div>
            <h3 className="text-white text-2xl font-black">Architecture Flow</h3>
            <p className="text-node-cream/40 text-xs mt-1">
              {visibleDependencies.length} nodes, {visibleDependencies.filter(n => n.status === 'active').length} active
            </p>
          </div>
          <button 
            onClick={() => console.log('Show details')}
            className="bg-sun-yellow text-deep-brown font-black text-xs py-3 px-8 rounded-xl shadow-lg shadow-sun-yellow/10 active:scale-95 transition-transform uppercase tracking-wider"
          >
            Details
          </button>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] font-bold text-node-cream/40 uppercase mb-3 tracking-tighter">
              Velocity
            </p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-black text-node-cream">84%</span>
              <span className="text-leaf-green text-[10px] font-bold mb-1">+12</span>
            </div>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] font-bold text-node-cream/40 uppercase mb-3 tracking-tighter">
              Status
            </p>
            <span className="text-lg font-black text-sun-yellow">Active</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DependencyMap;