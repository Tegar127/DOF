import React from 'react';

export default function DynamicList({ items, onChange, placeholder, label, onAdd, onRemove }) {
  return (
    <div className="space-y-3">
      {label && <label className="label-modern">{label}</label>}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 group animate-fadeIn">
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              className="input-modern"
              placeholder={placeholder || "Isi poin..."}
            />
             <button
                type="button"
                onClick={() => onRemove(index)}
                className="w-10 flex-none border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors duration-200 flex items-center justify-center"
                title="Hapus baris"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 hover:text-blue-700 transition-colors flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Tambah Baris
      </button>
    </div>
  );
}
