import React from 'react';
import DynamicList from './DynamicList';

export default function SppdInputs({ data, onChange, onListChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5 animate-fadeIn">
        <div>
            <label className="label-modern">Menimbang</label>
            <textarea
                value={data.sppdWeigh || ''}
                onChange={(e) => handleChange('sppdWeigh', e.target.value)}
                rows="3"
                className="input-modern resize-y"
                placeholder="bahwa dalam rangka..."
            ></textarea>
        </div>

        <DynamicList
            label="Mengingat (List)"
            items={data.sppdRemember || ['']}
            onChange={(idx, val) => onListChange('sppdRemember', idx, val)}
            onAdd={() => onListChange('sppdRemember', null, null, 'add')}
            onRemove={(idx) => onListChange('sppdRemember', idx, null, 'remove')}
            placeholder="Peraturan..."
        />

        <div className="border-t border-gray-100 my-2"></div>
        
        <div>
            <label className="label-modern">Kepada</label>
            <input
                type="text"
                value={data.sppdTo || ''}
                onChange={(e) => handleChange('sppdTo', e.target.value)}
                className="input-modern"
                placeholder="Nama & Jabatan"
            />
        </div>

        <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50 space-y-3">
            <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2">
                Detail Perintah
            </h4>
            
            <div>
                <label className="label-modern text-blue-700">Poin 1: Kegiatan</label>
                <input
                    type="text"
                    value={data.sppdTask || ''}
                    onChange={(e) => handleChange('sppdTask', e.target.value)}
                    className="input-modern"
                    placeholder="Melaksanakan kegiatan..."
                />
            </div>
            
            <div>
                <label className="label-modern text-blue-700">Poin 2: Detail Perjalanan</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                        type="text"
                        value={data.sppdDest || ''}
                        onChange={(e) => handleChange('sppdDest', e.target.value)}
                        className="input-modern"
                        placeholder="Tujuan"
                    />
                    <input
                        type="text"
                        value={data.sppdTransport || ''}
                        onChange={(e) => handleChange('sppdTransport', e.target.value)}
                        className="input-modern"
                        placeholder="Transportasi"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <span className="text-xs font-semibold text-gray-500 mb-1 block">Berangkat</span>
                        <input
                            type="date"
                            value={data.sppdDateGo || ''}
                            onChange={(e) => handleChange('sppdDateGo', e.target.value)}
                            className="input-modern"
                        />
                    </div>
                    <div>
                        <span className="text-xs font-semibold text-gray-500 mb-1 block">Kembali</span>
                        <input
                            type="date"
                            value={data.sppdDateBack || ''}
                            onChange={(e) => handleChange('sppdDateBack', e.target.value)}
                            className="input-modern"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="label-modern text-blue-700">Poin 3, 4, 5 (Standar/Edit)</label>
                <div className="space-y-2">
                    <textarea
                        value={data.sppdFunding || ''}
                        onChange={(e) => handleChange('sppdFunding', e.target.value)}
                        rows="2"
                        className="input-modern resize-none"
                        placeholder="Biaya dibebankan..."
                    ></textarea>
                    <textarea
                        value={data.sppdReport || ''}
                        onChange={(e) => handleChange('sppdReport', e.target.value)}
                        rows="2"
                        className="input-modern resize-none"
                        placeholder="Melaporkan pelaksanaan..."
                    ></textarea>
                    <textarea
                        value={data.sppdClose || ''}
                        onChange={(e) => handleChange('sppdClose', e.target.value)}
                        rows="1"
                        className="input-modern resize-none"
                        placeholder="Melaksanakan dengan tanggung jawab."
                    ></textarea>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div>
                <label className="label-modern">Lokasi</label>
                <input
                    type="text"
                    value={data.sppdLoc || ''}
                    onChange={(e) => handleChange('sppdLoc', e.target.value)}
                    className="input-modern"
                    placeholder="Lokasi"
                />
            </div>
            <div>
                <label className="label-modern">Tanggal TTD</label>
                <input
                    type="date"
                    value={data.sppdSignDate || ''}
                    onChange={(e) => handleChange('sppdSignDate', e.target.value)}
                    className="input-modern"
                />
            </div>
        </div>
        
        <div className="space-y-3">
            <div>
                <label className="label-modern">Jabatan Penandatangan</label>
                <input
                    type="text"
                    value={data.sppdSignPos || ''}
                    onChange={(e) => handleChange('sppdSignPos', e.target.value)}
                    className="input-modern"
                    placeholder="DIREKTUR UTAMA"
                />
            </div>
            <div>
                <label className="label-modern">Nama Penandatangan</label>
                <input
                    type="text"
                    value={data.sppdSignName || ''}
                    onChange={(e) => handleChange('sppdSignName', e.target.value)}
                    className="input-modern"
                    placeholder="Nama Lengkap"
                />
            </div>
        </div>

        <DynamicList
            label="Tembusan"
            items={data.sppdCC || ['']}
            onChange={(idx, val) => onListChange('sppdCC', idx, val)}
            onAdd={() => onListChange('sppdCC', null, null, 'add')}
            onRemove={(idx) => onListChange('sppdCC', idx, null, 'remove')}
            placeholder="Direksi..."
        />
    </div>
  );
}
