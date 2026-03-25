import React from 'react';

export const TabToggle = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2 p-1 bg-slate-800 rounded-lg inline-flex border border-slate-700">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40'
              : 'text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabToggle;
