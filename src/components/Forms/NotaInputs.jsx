import React from 'react';
import DynamicList from './DynamicList';

export default function NotaInputs({ data, onChange, onListChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          value={data.notaTo || ''}
          onChange={(e) => handleChange('notaTo', e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Kepada (Yth...)"
        />
        <input
          type="text"
          value={data.notaFrom || ''}
          onChange={(e) => handleChange('notaFrom', e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Dari"
        />
        <input
          type="text"
          value={data.notaAtt || ''}
          onChange={(e) => handleChange('notaAtt', e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Lampiran"
        />
        <textarea
          value={data.notaSubject || ''}
          onChange={(e) => handleChange('notaSubject', e.target.value)}
          rows="2"
          className="w-full p-2 border rounded"
          placeholder="Hal / Perihal"
        ></textarea>
      </div>

      <hr />
      
      <DynamicList
        label="Berdasarkan (Poin)"
        items={data.notaBasis || ['']}
        onChange={(idx, val) => onListChange('notaBasis', idx, val)}
        onAdd={() => onListChange('notaBasis', null, null, 'add')}
        onRemove={(idx) => onListChange('notaBasis', idx, null, 'remove')}
        placeholder="Poin..."
      />

      <label className="block text-sm font-medium text-gray-700 mt-2">Isi Paragraf</label>
      <textarea
        value={data.notaContent || ''}
        onChange={(e) => handleChange('notaContent', e.target.value)}
        rows="4"
        className="w-full p-2 border rounded"
        placeholder="Sehubungan dengan..."
      ></textarea>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          value={data.notaLoc || ''}
          onChange={(e) => handleChange('notaLoc', e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Lokasi (Jakarta)"
        />
        <input
          type="date"
          value={data.notaDate || ''}
          onChange={(e) => handleChange('notaDate', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <input
        type="text"
        value={data.notaPos || ''}
        onChange={(e) => handleChange('notaPos', e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Jabatan"
      />
      <input
        type="text"
        value={data.notaDiv || ''}
        onChange={(e) => handleChange('notaDiv', e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Divisi"
      />
      <input
        type="text"
        value={data.notaName || ''}
        onChange={(e) => handleChange('notaName', e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Nama Penandatangan"
      />
    </div>
  );
}
