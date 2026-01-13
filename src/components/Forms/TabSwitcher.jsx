import React from 'react';

export default function TabSwitcher({ activeTab, onSwitch }) {
  return (
    <div className="flex p-4 bg-gray-50 border-b gap-2">
      <button
        onClick={() => onSwitch('nota')}
        className={`flex-1 py-2 px-4 rounded font-bold border transition ${
          activeTab === 'nota'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300'
        }`}
      >
        Nota Dinas
      </button>
      <button
        onClick={() => onSwitch('sppd')}
        className={`flex-1 py-2 px-4 rounded font-bold border transition ${
          activeTab === 'sppd'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300'
        }`}
      >
        Surat Perintah
      </button>
    </div>
  );
}
