import React from 'react';

export default function DynamicList({ items, onChange, placeholder, label, onAdd, onRemove }) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 item-row">
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={placeholder || "Poin..."}
            />
             <button
                type="button"
                onClick={() => onRemove(index)}
                className="px-3 border rounded text-red-500 hover:bg-red-50"
                disabled={items.length === 1 && !item} // Optional: disable remove if only one empty item, or logic to handle it
              >
                &times;
              </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
      >
        + Tambah Poin
      </button>
    </div>
  );
}
