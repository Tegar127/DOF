import React from 'react';

export default function TabSwitcher({ activeTab, onSwitch }) {
  return (
    <div className="py-2">
      <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200 relative">
        <button
          onClick={() => onSwitch('nota')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'nota'
              ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5 scale-[1.02]'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          <span>📝</span> Nota Dinas
        </button>
        <button
          onClick={() => onSwitch('sppd')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'sppd'
              ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5 scale-[1.02]'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          <span>✈️</span> SPPD
        </button>
      </div>
    </div>
  );
}
