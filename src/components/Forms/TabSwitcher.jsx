import React from 'react';

export default function TabSwitcher({ activeTab, onSwitch }) {
  return (
    <div className="p-6 pb-0">
      <div className="flex bg-gray-100 p-1.5 rounded-xl">
        <button
          onClick={() => onSwitch('nota')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
            activeTab === 'nota'
              ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
          }`}
        >
          Nota Dinas
        </button>
        <button
          onClick={() => onSwitch('sppd')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
            activeTab === 'sppd'
              ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
          }`}
        >
          Surat Perintah
        </button>
      </div>
    </div>
  );
}
