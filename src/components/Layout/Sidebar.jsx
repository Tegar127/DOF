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
    <div className="w-full lg:w-[400px] xl:w-[450px] bg-white flex flex-col border-r border-gray-200/60 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-20 h-full relative font-sans">
      <div className="pt-6 px-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Document Generator</h1>
        <p className="text-sm text-gray-500 mt-1">Buat dokumen dinas dengan mudah.</p>
      </div>

      <TabSwitcher activeTab={activeTab} onSwitch={onSwitchTab} />

      <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
        <div className="space-y-6">
           <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <label className="label-modern text-blue-800">Nomor Dokumen</label>
                <input 
                    type="text" 
                    value={data.docNumber || ''} 
                    onChange={(e) => onChange({...data, docNumber: e.target.value})}
                    className="input-modern bg-white border-blue-200 focus:ring-blue-500/30" 
                    placeholder="Contoh: 123/ASD/2023" 
                />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
                Detail Dokumen
              </h3>
              
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
      </div>

      <div className="p-6 bg-white border-t border-gray-100 flex flex-col gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
            onClick={onDownload} 
            className="btn-primary"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download PDF</span>
        </button>
        <button 
            onClick={onReset} 
            className="btn-secondary"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset Form</span>
        </button>
      </div>
    </div>
  );
}
