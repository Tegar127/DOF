import React from 'react';
import { getIndoDate } from '../../utils/dateUtils';

export default function SignatureSection({ loc, date, pos, div, name, isSppd = false }) {
  return (
    <div className="signature-section mt-[30px] float-right text-center w-[280px]">
      {isSppd ? (
          <>
            <p className="mb-1">Dikeluarkan di <span>{loc || '...'}</span></p>
            <p className="mb-1">pada tanggal <span>{getIndoDate(date)}</span></p>
            <p className="font-bold uppercase mb-0">DIREKSI,</p>
            <p className="font-bold uppercase mb-16">{pos || '...'}</p>
          </>
      ) : (
          <>
            <p className="mb-1"><span>{loc || '...'}</span>, <span>{getIndoDate(date)}</span></p>
            <p className="font-bold uppercase mb-0">{pos || '...'}</p>
            <p className="font-bold uppercase mb-16">{div || '...'}</p>
          </>
      )}
      
      <p className="font-bold uppercase underline">{name || '...'}</p>
    </div>
  );
}
