import React from 'react';
import NotaPreview from '../Documents/NotaPreview';
import SppdPreview from '../Documents/SppdPreview';
import logoAsa from '../../assets/logo_asa.png';

export default function PreviewArea({ activeTab, data, contentRef }) {
  return (
    <div className="w-full lg:flex-1 bg-slate-50/80 overflow-y-auto p-6 lg:p-16 flex justify-center relative shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.5]" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        <div className="z-10 w-full flex justify-center pb-32 pt-2">
            <div ref={contentRef} className="paper ring-1 ring-black/5 shadow-2xl">
                 <div className="flex items-center mb-2">
                    <img 
                        src={logoAsa} 
                        alt="ASABRI Logo" 
                        className="h-16 mb-2"
                    />
                </div>

                {activeTab === 'nota' && <NotaPreview data={data} />}
                {activeTab === 'sppd' && <SppdPreview data={data} />}
            </div>
        </div>
    </div>
  );
}
