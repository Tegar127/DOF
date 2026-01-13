import React from 'react';
import DynamicList from './DynamicList';

export default function NotaInputs({ data, onChange, onListChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="space-y-3">
        <div>
          <label className="label-modern">Kepada</label>
          <input
            type="text"
            value={data.notaTo || ''}
            onChange={(e) => handleChange('notaTo', e.target.value)}
            className="input-modern"
            placeholder="Yth..."
          />
        </div>
        <div>
          <label className="label-modern">Dari</label>
          <input
            type="text"
            value={data.notaFrom || ''}
            onChange={(e) => handleChange('notaFrom', e.target.value)}
            className="input-modern"
            placeholder="Pejabat Pengirim"
          />
        </div>
        <div>
          <label className="label-modern">Lampiran</label>
          <input
            type="text"
            value={data.notaAtt || ''}
            onChange={(e) => handleChange('notaAtt', e.target.value)}
            className="input-modern"
            placeholder="-"
          />
        </div>
        <div>
          <label className="label-modern">Perihal</label>
          <textarea
            value={data.notaSubject || ''}
            onChange={(e) => handleChange('notaSubject', e.target.value)}
            rows="2"
            className="input-modern resize-none"
            placeholder="Isi perihal..."
          ></textarea>
        </div>
      </div>

      <div className="border-t border-gray-100 my-2"></div>
      
      <DynamicList
        label="Berdasarkan (Poin)"
        items={data.notaBasis || ['']}
        onChange={(idx, val) => onListChange('notaBasis', idx, val)}
        onAdd={() => onListChange('notaBasis', null, null, 'add')}
        onRemove={(idx) => onListChange('notaBasis', idx, null, 'remove')}
        placeholder="Isi poin dasar..."
      />

      <div>
        <label className="label-modern">Isi Paragraf</label>
        <textarea
          value={data.notaContent || ''}
          onChange={(e) => handleChange('notaContent', e.target.value)}
          rows="5"
          className="input-modern resize-y"
          placeholder="Sehubungan dengan..."
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
           <label className="label-modern">Lokasi</label>
           <input
             type="text"
             value={data.notaLoc || ''}
             onChange={(e) => handleChange('notaLoc', e.target.value)}
             className="input-modern"
             placeholder="Jakarta"
           />
        </div>
        <div>
            <label className="label-modern">Tanggal</label>
            <input
              type="date"
              value={data.notaDate || ''}
              onChange={(e) => handleChange('notaDate', e.target.value)}
              className="input-modern"
            />
        </div>
      </div>

      <div className="space-y-3">
          <div>
            <label className="label-modern">Jabatan Penandatangan</label>
            <input
              type="text"
              value={data.notaPos || ''}
              onChange={(e) => handleChange('notaPos', e.target.value)}
              className="input-modern"
              placeholder="Contoh: Kepala Divisi..."
            />
          </div>
          <div>
            <label className="label-modern">Divisi / Unit</label>
            <input
              type="text"
              value={data.notaDiv || ''}
              onChange={(e) => handleChange('notaDiv', e.target.value)}
              className="input-modern"
              placeholder="Contoh: Divisi SDM"
            />
          </div>
          <div>
            <label className="label-modern">Nama Penandatangan</label>
            <input
              type="text"
              value={data.notaName || ''}
              onChange={(e) => handleChange('notaName', e.target.value)}
              className="input-modern"
              placeholder="Nama Lengkap"
            />
          </div>
      </div>
    </div>
  );
}
