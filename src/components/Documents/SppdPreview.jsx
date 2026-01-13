import React from 'react';
import PaperHeader from './PaperHeader';
import SignatureSection from './SignatureSection';
import { getIndoDate } from '../../utils/dateUtils';

export default function SppdPreview({ data }) {
  return (
    <div id="previewSppd">
        <PaperHeader title="SURAT PERINTAH PERJALANAN DINAS" docNumber={data.docNumber} />

        <table className="sppd-table">
            <tbody>
                <tr>
                    <td className="sppd-label">Menimbang</td>
                    <td className="sppd-colon">:</td>
                    <td><span>{data.sppdWeigh || '...'}</span></td>
                </tr>
            </tbody>
        </table>

        <table className="sppd-table">
            <tbody>
                <tr>
                    <td className="sppd-label">Mengingat</td>
                    <td className="sppd-colon">:</td>
                    <td>
                        <ol className="list-numbered" style={{ marginTop: 0, marginBottom: 0, paddingLeft: '15px' }}>
                             {(data.sppdRemember || []).map((item, i) => (
                                <li key={i} className="mb-1 pl-1">{item || '...'}</li>
                            ))}
                             {(!data.sppdRemember || data.sppdRemember.length === 0) && <li>...</li>}
                        </ol>
                    </td>
                </tr>
            </tbody>
        </table>

        <div className="text-center font-bold my-6">Memberi Perintah</div>

        <table className="sppd-table">
            <tbody>
                <tr>
                    <td className="sppd-label">Kepada</td>
                    <td className="sppd-colon"></td>
                    <td className="font-bold"><span>{data.sppdTo || '...'}</span></td>
                </tr>
            </tbody>
        </table>

        <table className="sppd-table">
            <tbody>
                <tr>
                    <td className="sppd-label">Untuk</td>
                    <td className="sppd-colon">:</td>
                    <td>
                        <ol className="list-numbered" style={{ marginTop: 0, paddingLeft: '15px' }}>
                            <li className="mb-2"><span>{data.sppdTask || '...'}</span></li>
                            
                            <li className="mb-2">
                                Perjalanan dinas dilaksanakan, sebagai berikut:
                                <table className="sub-table w-full mt-1">
                                    <tbody>
                                        <tr><td width="100">Tujuan</td><td width="10">:</td><td><span>{data.sppdDest || '...'}</span></td></tr>
                                        <tr><td>Berangkat</td><td>:</td><td><span>{getIndoDate(data.sppdDateGo)}</span></td></tr>
                                        <tr><td>Kembali</td><td>:</td><td><span>{getIndoDate(data.sppdDateBack)}</span></td></tr>
                                        <tr><td>Transportasi</td><td>:</td><td><span>{data.sppdTransport || '...'}</span></td></tr>
                                    </tbody>
                                </table>
                            </li>

                            <li className="mb-2 text-justify"><span>{data.sppdFunding || '...'}</span></li>
                            <li className="mb-2 text-justify"><span>{data.sppdReport || '...'}</span></li>
                            <li className="mb-2 text-justify"><span>{data.sppdClose || '...'}</span></li>
                        </ol>
                    </td>
                </tr>
            </tbody>
        </table>

        <SignatureSection
            isSppd={true}
            loc={data.sppdLoc}
            date={data.sppdSignDate}
            pos={data.sppdSignPos}
            name={data.sppdSignName}
        />

        <div style={{ clear: 'both' }}></div>
        
        <div className="mt-8 text-sm">
            <p className="font-bold underline mb-1">Tembusan:</p>
            <ol className="list-numbered" style={{ marginLeft: '15px' }}>
                 {(data.sppdCC || []).map((item, i) => (
                    <li key={i} className="mb-1 pl-1">{item || '...'}</li>
                ))}
                {(!data.sppdCC || data.sppdCC.length === 0) && <li>...</li>}
            </ol>
        </div>
    </div>
  );
}
