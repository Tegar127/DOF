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
    <div className="w-full lg:w-[400px] xl:w-[450px] bg-white flex flex-col border-r border-gray-200 shadow-xl z-20 h-full relative font-sans">
      <div className="pt-8 px-6 pb-6 bg-gradient-to-b from-white to-gray-50/50">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">📄</span>
          Document Gen
        </h1>
        <p className="text-sm text-slate-500 mt-2 font-medium">Buat dokumen dinas profesional dengan mudah.</p>
      </div>

      <div className="px-6 pb-2">
        <TabSwitcher activeTab={activeTab} onSwitch={onSwitchTab} />
      </div>

      <div className="px-6 flex-grow overflow-y-auto custom-scrollbar pb-6">
        <div className="space-y-6 mt-4">
           {/* Document Number Card */}
           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group focus-within:ring-2 focus-within:ring-blue-500/20">
                <label className="label-modern text-slate-600 group-focus-within:text-blue-600 transition-colors">Nomor Dokumen</label>
                <div className="relative mt-2">
                  <input 
                      type="text" 
                      value={data.docNumber || ''} 
                      onChange={(e) => onChange({...data, docNumber: e.target.value})}
                      className="input-modern bg-slate-50 border-slate-200 pl-10 font-medium" 
                      placeholder="Contoh: 123/ASD/2023" 
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    #
                  </div>
                </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                 <div className="h-px bg-gray-200 flex-1"></div>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Formulir</span>
                 <div className="h-px bg-gray-200 flex-1"></div>
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
      </div>

      <div className="p-6 bg-white/80 backdrop-blur-md border-t border-gray-200/60 flex flex-col gap-3 z-10">
        <button 
            onClick={onDownload} 
            className="btn-primary group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="relative z-10">Download PDF</span>
        </button>
        <button 
            onClick={onReset} 
            className="btn-secondary text-slate-500 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Reset Form</span>
        </button>
      </div>
    </div>
  );
}
