import React from 'react';

export default function PaperHeader({ title, docNumber }) {
  return (
    <div className="paper-header mb-[20px] text-center">
      <h1 className="font-bold text-lg uppercase tracking-wide">{title}</h1>
      <p>NOMOR <span>{docNumber || '...'}</span></p>
    </div>
  );
}
