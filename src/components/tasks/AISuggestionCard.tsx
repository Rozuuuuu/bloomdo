import React from 'react';

interface AISuggestionCardProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
}

const AISuggestionCard: React.FC<AISuggestionCardProps> = ({
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="p-5">
      <div className="bg-chocolate-brown rounded-xl p-5 shadow-sm text-off-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-golden-yellow text-[18px]">
            auto_awesome
          </span>
          <p className="text-[11px] font-bold uppercase tracking-widest text-off-white/60">
            AI Smart Suggestion
          </p>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-off-white/70 text-sm mt-0.5">{description}</p>
          </div>
          
          <button 
            onClick={onAction}
            className="btn-primary"
          >
            <span>{actionText}</span>
            <span className="material-symbols-outlined text-sm">play_arrow</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionCard;