import React from 'react';

interface FloatingActionButtonProps {
  onClick: () => void;
  icon?: string;
  tooltip?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon = 'add',
  tooltip = 'Add new task',
}) => {
  return (
    <div className="fixed bottom-28 right-6 z-50">
      <button
        onClick={onClick}
        className="flex size-14 items-center justify-center rounded-2xl bg-golden-yellow text-chocolate-brown shadow-lg hover:shadow-xl active:scale-95 transition-all group relative"
        aria-label={tooltip}
      >
        <span className="material-symbols-outlined text-3xl font-bold">
          {icon}
        </span>
        
        {/* Tooltip (optional) */}
        {tooltip && (
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-chocolate-brown text-off-white text-xs font-medium py-1 px-2 rounded whitespace-nowrap">
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-chocolate-brown"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;