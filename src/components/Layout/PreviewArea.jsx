import React from 'react';
import NotaPreview from '../Documents/NotaPreview';
import SppdPreview from '../Documents/SppdPreview';

export default function PreviewArea({ activeTab, data, contentRef }) {
  return (
    <div className="w-full lg:w-2/3 bg-gray-500 overflow-y-auto p-8 flex justify-center">
        <div ref={contentRef} className="paper relative">
             <div className="flex items-center mb-2">
                <img src="https://pensiun.asabri.co.id/resources/img/logo_asa.png" alt="ASABRI Logo" className="h-16 mb-2" />
            </div>

            {activeTab === 'nota' && <NotaPreview data={data} />}
            {activeTab === 'sppd' && <SppdPreview data={data} />}
        </div>
    </div>
  );
}
