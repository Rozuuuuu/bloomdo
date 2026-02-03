import React from 'react';
import { FilterType } from '../../types/todo.types';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All Tasks' },
    { id: 'focused', label: 'Focused' },
    { id: 'shared', label: 'Shared' },
    { id: 'archives', label: 'Archives' },
  ];

  return (
    <div className="sticky top-[73px] z-40 bg-off-white/95 dark:bg-background-dark/95 backdrop-blur-md transition-colors">
      <div className="flex border-b border-border-warm dark:border-white/10 px-5 gap-8 overflow-x-auto no-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 shrink-0 transition-colors ${activeFilter === filter.id
                ? 'border-golden-yellow text-chocolate-brown dark:text-ivory'
                : 'border-transparent text-chocolate-brown/40 dark:text-ivory/40 hover:text-chocolate-brown/70 dark:hover:text-ivory/70'
              }`}
            onClick={() => onFilterChange(filter.id)}
          >
            <p className={`text-sm ${activeFilter === filter.id ? 'font-bold' : 'font-semibold'
              }`}>
              {filter.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;