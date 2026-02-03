import React from 'react';

interface DependencyNodeProps {
  node: {
    id: string;
    title: string;
    status: 'completed' | 'active' | 'locked' | 'scheduled';
  };
  onClick: () => void;
  style?: React.CSSProperties;
}

const DependencyNode: React.FC<DependencyNodeProps> = ({ node, onClick, style }) => {
  const getNodeStyles = () => {
    switch (node.status) {
      case 'completed':
        return {
          bg: 'bg-white dark:bg-dark-bg',
          border: 'border-2 border-white/20 dark:border-white/20',
          icon: 'task_alt',
          iconColor: 'text-leaf-green dark:text-leaf-green',
          textColor: 'text-deep-brown dark:text-node-cream/60',
          statusText: 'SUCCESS',
          statusColor: 'text-leaf-green dark:text-leaf-green',
        };
      case 'active':
        return {
          bg: 'bg-sun-yellow dark:bg-dark-bg',
          border: 'border-4 border-deep-brown dark:border-sun-yellow',
          icon: 'psychology',
          iconColor: 'text-deep-brown dark:text-sun-yellow',
          textColor: 'text-deep-brown dark:text-white',
          statusText: 'Active Flow',
          statusColor: 'text-amber-700 dark:text-sun-yellow',
        };
      case 'locked':
        return {
          bg: 'bg-stone-100 dark:bg-dark-bg',
          border: 'border border-deep-brown/30 dark:border-locked-amber',
          icon: 'lock',
          iconColor: 'text-stone-400 dark:text-locked-amber',
          textColor: 'text-stone-400 dark:text-locked-amber',
          statusText: '',
          statusColor: '',
        };
      default: // scheduled
        return {
          bg: 'bg-white dark:bg-dark-bg',
          border: 'border border-deep-brown/30 dark:border-white/20',
          icon: 'schedule',
          iconColor: 'text-stone-400 dark:text-node-cream/60',
          textColor: 'text-deep-brown/60 dark:text-node-cream/40',
          statusText: '',
          statusColor: '',
        };
    }
  };

  const styles = getNodeStyles();

  return (
    <div 
      className="absolute flex flex-col items-center gap-2 cursor-pointer"
      style={style}
      onClick={onClick}
    >
      <div className={`${styles.bg} ${styles.border} ${node.status === 'active' ? 'shadow-lg shadow-amber-200 dark:shadow-[0_0_25px_rgba(253,184,19,0.2)]' : 'shadow-sm'} rounded-full flex items-center justify-center relative`}
        style={{ 
          width: node.status === 'active' ? '80px' : '56px', 
          height: node.status === 'active' ? '80px' : '56px' 
        }}
      >
        {node.status === 'active' && (
          <>
            <div className="absolute inset-0 rounded-full bg-sun-yellow/20 dark:bg-sun-yellow/10 scale-125"></div>
            <div className="absolute -top-2 -right-2 bg-sun-yellow text-deep-brown text-[10px] font-black px-2 py-0.5 rounded-md shadow-lg z-20">
              LIVE
            </div>
          </>
        )}
        <span className={`material-symbols-outlined ${styles.iconColor} relative z-10`}
          style={{ fontSize: node.status === 'active' ? '36px' : '22px' }}
        >
          {styles.icon}
        </span>
      </div>
      
      <div className="text-center">
        <p className={`${styles.textColor} ${node.status === 'active' ? 'text-sm font-bold' : 'text-[12px] font-medium'}`}>
          {node.title}
        </p>
        {styles.statusText && (
          <p className={`${styles.statusColor} text-[11px] font-semibold uppercase tracking-wider`}>
            {styles.statusText}
          </p>
        )}
      </div>
    </div>
  );
};

export default DependencyNode;