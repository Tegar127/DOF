import React from 'react';
import DynamicList from './DynamicList';

export default function SppdInputs({ data, onChange, onListChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Menimbang</label>
            <textarea
                value={data.sppdWeigh || ''}
                onChange={(e) => handleChange('sppdWeigh', e.target.value)}
                rows="3"
                className="w-full p-2 border rounded"
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

        <hr />
        <input
            type="text"
            value={data.sppdTo || ''}
            onChange={(e) => handleChange('sppdTo', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Kepada (Nama & Jabatan)"
        />

        <div className="bg-gray-50 p-3 rounded border">
            <label className="block text-sm font-bold text-gray-700 mb-2">Detail Perintah (Untuk)</label>
            
            <label className="text-xs text-gray-500">Poin 1: Kegiatan</label>
            <input
                type="text"
                value={data.sppdTask || ''}
                onChange={(e) => handleChange('sppdTask', e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Melaksanakan kegiatan..."
            />
            
            <label className="text-xs text-gray-500">Poin 2: Detail Perjalanan</label>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                    type="text"
                    value={data.sppdDest || ''}
                    onChange={(e) => handleChange('sppdDest', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Tujuan (Denpasar)"
                />
                <input
                    type="text"
                    value={data.sppdTransport || ''}
                    onChange={(e) => handleChange('sppdTransport', e.target.value)}
                    className="p-2 border rounded w-full"
                    placeholder="Pesawat Udara"
                />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                    <span className="text-xs">Berangkat</span>
                    <input
                        type="date"
                        value={data.sppdDateGo || ''}
                        onChange={(e) => handleChange('sppdDateGo', e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <span className="text-xs">Kembali</span>
                    <input
                        type="date"
                        value={data.sppdDateBack || ''}
                        onChange={(e) => handleChange('sppdDateBack', e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            <label className="text-xs text-gray-500">Poin 3, 4, 5 (Standar/Edit)</label>
            <textarea
                value={data.sppdFunding || ''}
                onChange={(e) => handleChange('sppdFunding', e.target.value)}
                rows="2"
                className="w-full p-2 border rounded mb-1"
                placeholder="Biaya dibebankan..."
            ></textarea>
            <textarea
                value={data.sppdReport || ''}
                onChange={(e) => handleChange('sppdReport', e.target.value)}
                rows="2"
                className="w-full p-2 border rounded mb-1"
                placeholder="Melaporkan pelaksanaan..."
            ></textarea>
            <textarea
                value={data.sppdClose || ''}
                onChange={(e) => handleChange('sppdClose', e.target.value)}
                rows="1"
                className="w-full p-2 border rounded"
                placeholder="Melaksanakan dengan tanggung jawab."
            ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <input
                type="text"
                value={data.sppdLoc || ''}
                onChange={(e) => handleChange('sppdLoc', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Lokasi"
            />
            <input
                type="date"
                value={data.sppdSignDate || ''}
                onChange={(e) => handleChange('sppdSignDate', e.target.value)}
                className="w-full p-2 border rounded"
            />
        </div>
        <input
            type="text"
            value={data.sppdSignPos || ''}
            onChange={(e) => handleChange('sppdSignPos', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="DIREKTUR UTAMA"
        />
        <input
            type="text"
            value={data.sppdSignName || ''}
            onChange={(e) => handleChange('sppdSignName', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Nama Penandatangan"
        />

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
