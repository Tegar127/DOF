import React from 'react';
import PaperHeader from './PaperHeader';
import SignatureSection from './SignatureSection';

export default function NotaPreview({ data }) {
  return (
    <div id="previewNota">
      <PaperHeader title="NOTA DINAS" docNumber={data.docNumber} />

      <table className="info-table w-full mb-6">
        <tbody>
            <tr><td width="100">Kepada</td><td width="20">:</td><td>Yth. <span>{data.notaTo || '...'}</span></td></tr>
            <tr><td>Dari</td><td>:</td><td><span>{data.notaFrom || '...'}</span></td></tr>
            <tr><td>Lampiran</td><td>:</td><td><span>{data.notaAtt || '...'}</span></td></tr>
            <tr><td>Hal</td><td>:</td><td className="font-bold"><span>{data.notaSubject || '...'}</span></td></tr>
        </tbody>
      </table>

      <div className="mb-4">
        <p className="mb-2">Berdasarkan:</p>
        <ol className="list-numbered text-justify">
            {(data.notaBasis || []).map((item, i) => (
                <li key={i} className="mb-1 pl-1">{item || '...'}</li>
            ))}
             {(!data.notaBasis || data.notaBasis.length === 0) && <li>...</li>}
        </ol>
      </div>

      <div className="mb-8 text-justify leading-relaxed">
        <p style={{ whiteSpace: 'pre-wrap' }}>{data.notaContent || '...'}</p>
      </div>

      <p className="mb-8">Demikian disampaikan dan untuk dijadikan periksa.</p>

      <SignatureSection
        loc={data.notaLoc}
        date={data.notaDate}
        pos={data.notaPos}
        div={data.notaDiv}
        name={data.notaName}
      />

      <div style={{ clear: 'both' }}></div>
      <table className="paraf-box">
        <tbody>
            <tr><td colSpan="2" className="text-center font-bold bg-gray-100">BD-MLI</td></tr>
            <tr><td rowSpan="2" className="text-center align-middle" width="50%">Paraf</td><td className="text-center">Staff</td></tr>
            <tr><td className="text-center" height="30"> </td></tr>
        </tbody>
      </table>
    </div>
  );
}
