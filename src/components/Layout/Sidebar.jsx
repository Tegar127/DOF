import React from 'react';
import TabSwitcher from '../Forms/TabSwitcher';
import NotaInputs from '../Forms/NotaInputs';
import SppdInputs from '../Forms/SppdInputs';

export default function Sidebar({ 
  activeTab, 
  onSwitchTab, 
  data, 
  onChange, 
  onListChange, 
  onDownload, 
  onReset 
}) {
  return (
    <div className="w-full lg:w-1/3 bg-white p-0 flex flex-col border-r border-gray-200 shadow-lg z-10 h-full">
      <TabSwitcher activeTab={activeTab} onSwitch={onSwitchTab} />

      <div className="p-6 overflow-y-auto flex-grow">
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Input Data</h2>
        
        <div className="space-y-4">
           <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nomor Dokumen</label>
                <input 
                    type="text" 
                    value={data.docNumber || ''} 
                    onChange={(e) => onChange({...data, docNumber: e.target.value})}
                    className="w-full p-2 border rounded" 
                    placeholder=".../..." 
                />
            </div>

            {activeTab === 'nota' && (
                <NotaInputs 
                    data={data} 
                    onChange={onChange} 
                    onListChange={onListChange}
                />
            )}
            
            {activeTab === 'sppd' && (
                <SppdInputs 
                    data={data} 
                    onChange={onChange} 
                    onListChange={onListChange}
                />
            )}
        </div>
      </div>

      <div className="p-4 bg-white border-t flex flex-col gap-2">
        <button 
            onClick={onDownload} 
            className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 shadow flex justify-center items-center gap-2"
        >
            <span>DOWNLOAD PDF</span>
        </button>
        <button 
            onClick={onReset} 
            className="w-full bg-white text-gray-700 border py-2 rounded font-bold hover:bg-gray-100 flex justify-center items-center gap-2 text-sm"
        >
            <span>RESET ALL</span>
        </button>
      </div>
    </div>
  );
}
