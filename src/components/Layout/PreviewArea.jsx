import React from 'react';
import NotaPreview from '../Documents/NotaPreview';
import SppdPreview from '../Documents/SppdPreview';

export default function PreviewArea({ activeTab, data, contentRef }) {
  return (
    <div className="w-full lg:flex-1 bg-slate-100/50 overflow-y-auto p-4 lg:p-12 flex justify-center relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="z-10 w-full flex justify-center pb-20">
            <div ref={contentRef} className="paper">
                 <div className="flex items-center mb-2">
                    <img src="https://pensiun.asabri.co.id/resources/img/logo_asa.png" alt="ASABRI Logo" className="h-16 mb-2" />
                </div>

                {activeTab === 'nota' && <NotaPreview data={data} />}
                {activeTab === 'sppd' && <SppdPreview data={data} />}
            </div>
        </div>
    </div>
  );
}
