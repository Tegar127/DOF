import React, { useState, useEffect, useRef, useMemo } from 'react';
import html2pdf from 'html2pdf.js';

function App() {
  const [formData, setFormData] = useState({
    docNumSeq: '',
    docNumMonth: '',
    docNumYear: '',
    recipient: '',
    sender: '',
    attachment: '',
    subject: '',
    mainContent: '',
    location: '',
    dateInput: '',
    position: '',
    division: '',
    signerName: ''
  });

  const [basisItems, setBasisItems] = useState([{ value: '' }]);
  const pdfContentRef = useRef(null);

  const setTodayDate = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const adjustedDate = new Date(today.getTime() - (offset * 60 * 1000));
    
    setFormData(prev => ({
      ...prev,
      dateInput: adjustedDate.toISOString().split('T')[0],
      docNumYear: today.getFullYear().toString()
    }));
  };

  useEffect(() => {
    setTodayDate();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBasisChange = (index, value) => {
    const newItems = [...basisItems];
    newItems[index].value = value;
    setBasisItems(newItems);
  };

  const addBasisItem = () => {
    setBasisItems([...basisItems, { value: '' }]);
  };

  const removeBasisItem = (index) => {
    const newItems = [...basisItems];
    newItems.splice(index, 1);
    setBasisItems(newItems);
  };

  const resetForm = () => {
    setFormData({
      docNumSeq: '',
      docNumMonth: '',
      docNumYear: '',
      recipient: '',
      sender: '',
      attachment: '',
      subject: '',
      mainContent: '',
      location: '',
      dateInput: '',
      position: '',
      division: '',
      signerName: ''
    });
    setTodayDate();
    setBasisItems([{ value: '' }]);
  };

  const formattedDate = useMemo(() => {
    if (!formData.dateInput) return '...';
    const dateObj = new Date(formData.dateInput);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('id-ID', options);
  }, [formData.dateInput]);

  const fullDocumentNumber = useMemo(() => {
    const seq = formData.docNumSeq || '.....';
    const month = formData.docNumMonth || '.....';
    const year = formData.docNumYear || '........';
    return `ND-${seq}/PR.04.01/E/${month}/${year}`;
  }, [formData.docNumSeq, formData.docNumMonth, formData.docNumYear]);

  const downloadPDF = async () => {
    const element = pdfContentRef.current;
    if (!element) return;

    // Wait for images to load
    const images = element.getElementsByTagName('img');
    const promises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; 
      });
    });

    await Promise.all(promises);

    // FIX: Temporarily remove fixed constraints to allow full capture
    const originalMinHeight = element.style.minHeight;
    element.style.minHeight = 'unset';
    // Ensure overflow is visible for capture
    element.style.overflow = 'visible';
    element.style.height = 'auto';

    const opt = {
      margin: [10, 10, 10, 10], // Safe margins (mm)
      filename: `Nota_Dinas_${formData.docNumSeq || 'Draft'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        scrollX: 0,
        logging: true, 
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Use imported html2pdf or window.html2pdf as fallback
    const worker = html2pdf ? html2pdf() : (window.html2pdf ? window.html2pdf() : null);

    if (!worker) {
        alert('Library html2pdf not found.');
        return;
    }

    worker.set(opt).from(element).save()
      .then(() => {
        console.log('PDF generated successfully');
      })
      .catch(err => {
        console.error('PDF generation failed:', err);
        alert('Gagal membuat PDF. Cek console untuk detail.');
      })
      .finally(() => {
        // Restore styles
        element.style.minHeight = originalMinHeight;
        element.style.overflow = '';
        element.style.height = '';
      });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden text-left">
      {/* Input Sidebar */}
      <div className="w-full lg:w-1/3 bg-white p-6 overflow-y-auto border-r border-gray-200 shadow-lg z-10">    
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">Input Data</h2>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nomor Nota Dinas</label>
            <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 p-2 border rounded">       
              <span>ND-</span>
              <input 
                type="text" 
                name="docNumSeq"
                value={formData.docNumSeq}
                onChange={handleChange}
                className="w-16 p-1 border rounded text-center focus:ring-blue-500 focus:border-blue-500" 
                placeholder="001"
              />
              <span>/PR.04.01/E/</span>
              <input 
                type="text" 
                name="docNumMonth"
                value={formData.docNumMonth}
                onChange={handleChange}
                className="w-12 p-1 border rounded text-center" 
                placeholder="X"
              />
              <span>/</span>
              <input 
                type="text" 
                name="docNumYear"
                value={formData.docNumYear}
                onChange={handleChange}
                className="w-16 p-1 border rounded text-center" 
                placeholder="2025"
              />
            </div>
            <p className="text-xs text-gray-500">Format: ND-[No]/PR.04.01/E/[Bulan]/[Tahun]</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kepada Yth.</label>
              <input 
                type="text" 
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                className="w-full p-2 border rounded" 
                placeholder="Sekretaris Perusahaan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dari</label>
              <input 
                type="text" 
                name="sender"
                value={formData.sender}
                onChange={handleChange}
                className="w-full p-2 border rounded" 
                placeholder="Kepala Divisi Menpo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lampiran</label>
              <input 
                type="text" 
                name="attachment"
                value={formData.attachment}
                onChange={handleChange}
                className="w-full p-2 border rounded" 
                placeholder="1 (Satu) Berkas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hal</label>
              <textarea 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                rows="2" 
                className="w-full p-2 border rounded" 
                placeholder="Penyampaian Dokumen..."
              />
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Berdasarkan (Poin-poin)</label>     
            <div className="space-y-2 mb-2">
              {basisItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input 
                    type="text" 
                    value={item.value}
                    onChange={(e) => handleBasisChange(index, e.target.value)}
                    className="w-full p-2 border rounded" 
                    placeholder={'Poin ' + (index + 1) + '...'}
                  />
                  {basisItems.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeBasisItem(index)}
                      className="px-3 border rounded text-red-500 hover:bg-red-50"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button 
              type="button" 
              onClick={addBasisItem} 
              className="text-sm flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Tambah Poin
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Paragraf Utama</label>
            <textarea 
              name="mainContent"
              value={formData.mainContent}
              onChange={handleChange}
              rows="5" 
              className="w-full p-2 border rounded" 
              placeholder="Sehubungan dengan dasar tersebut di atas..."
            />
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lokasi</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded" 
                placeholder="Jakarta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal</label>
              <input 
                type="date" 
                name="dateInput"
                value={formData.dateInput}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Jabatan (Baris 1 - Bold)</label>
            <input 
              type="text" 
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-2 border rounded" 
              placeholder="KEPALA DIVISI"
            />

            <label className="block text-sm font-medium text-gray-700">Divisi (Baris 2 - Bold)</label>
            <input 
              type="text" 
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="w-full p-2 border rounded" 
              placeholder="MANAJEMEN PORTOFOLIO"
            />

            <label className="block text-sm font-medium text-gray-700">Nama Penandatangan</label>
            <input 
              type="text" 
              name="signerName"
              value={formData.signerName}
              onChange={handleChange}
              className="w-full p-2 border rounded" 
              placeholder="TEUKU RAHMATSYAH"
            />
          </div>

          <div className="pt-6 pb-12 flex flex-col gap-3 relative bg-white z-20">
            <button 
              type="button" 
              onClick={downloadPDF} 
              className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 shadow-md transition text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD PDF
            </button>
            <button 
              type="button" 
              onClick={resetForm} 
              className="w-full flex justify-center items-center gap-2 bg-white text-gray-700 border border-gray-300 p-3 rounded-lg font-bold hover:bg-gray-50 transition text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>      
              RESET ALL
            </button>
          </div>
        </form>
      </div>

      {/* Preview Area */}
      <div className="w-full lg:w-2/3 bg-gray-200 overflow-y-auto p-8 flex justify-center relative">
        <div ref={pdfContentRef} className="paper">
          <div className="flex items-center mb-4">
            {/* Logo updated to a reliable placeholder to prevent 404 errors */}
            <img src="https://placehold.co/100x100/png?text=LOGO" alt="Logo" className="h-14 mr-4" crossOrigin="anonymous" />
          </div>

          <div className="paper-header">
            <h1 className="font-bold text-lg uppercase" style={{ letterSpacing: '1px' }}>NOTA DINAS</h1>
            <p>NOMOR <span className="font-medium">{fullDocumentNumber}</span></p>
          </div>

          <table className="info-table w-full mb-6">
            <tbody>
              <tr>
                <td style={{ width: '100px' }}>Kepada</td>
                <td style={{ width: '20px' }}>:</td>
                <td>Yth. <span className={!formData.recipient ? 'pdf-text-gray' : ''}>{formData.recipient || '...'}</span></td>
              </tr>
              <tr>
                <td>Dari</td>
                <td>:</td>
                <td><span className={!formData.sender ? 'pdf-text-gray' : ''}>{formData.sender || '...'}</span></td>
              </tr>
              <tr>
                <td>Lampiran</td>
                <td>:</td>
                <td><span className={!formData.attachment ? 'pdf-text-gray' : ''}>{formData.attachment || '...'}</span></td>
              </tr>
              <tr>
                <td>Hal</td>
                <td>:</td>
                <td className="font-bold"><span className={!formData.subject ? 'pdf-text-gray' : ''}>{formData.subject || '...'}</span></td>
              </tr>
            </tbody>
          </table>

          <div className="mb-4">
            <p className="mb-2">Berdasarkan:</p>
            <ol className="list-decimal ml-10 space-y-1 text-justify leading-relaxed">
              {basisItems.some(i => i.value.trim()) ? (
                basisItems.filter(i => i.value.trim()).map((item, index) => (
                  <li key={index} className="pl-2 mb-1">
                    {item.value}
                  </li>
                ))
              ) : (
                <li className="list-none pdf-text-gray">...</li>
              )}
            </ol>
          </div>

          <div className="mb-8 text-justify leading-relaxed">
            <p style={{ whiteSpace: 'pre-wrap' }} className={!formData.mainContent ? 'pdf-text-gray' : ''}>
              {formData.mainContent || '...'}
            </p>
          </div>

          <p className="mb-8">Demikian disampaikan dan untuk dijadikan periksa.</p>

          <div className="signature-section">
            <p className="mb-1">
              <span className={!formData.location ? 'pdf-text-gray' : ''}>{formData.location || '...'}</span>,{' '}
              <span>{formattedDate}</span>
            </p>
            <p className="font-bold uppercase mb-0 leading-tight">
              <span className={!formData.position ? 'pdf-text-gray' : ''}>{formData.position || '...'}</span>  
            </p>
            <p className="font-bold uppercase mb-16 leading-tight">
              <span className={!formData.division ? 'pdf-text-gray' : ''}>{formData.division || '...'}</span>  
            </p>
            <p className="font-bold uppercase underline">
              <span className={!formData.signerName ? 'pdf-text-gray' : ''}>{formData.signerName || '...'}</span>
            </p>
          </div>

          <div style={{ clear: 'both' }}></div>
          <table className="paraf-box dont-break">
            <tbody>
              <tr>
                <td colSpan="2" className="text-center font-bold pdf-bg-gray">BD-MLI</td>
              </tr>
              <tr>
                <td rowSpan="2" className="text-center align-middle" style={{ width: '50%' }}>Paraf</td>
                <td className="text-center">Budi A.</td>
              </tr>
              <tr>
                <td className="text-center" style={{ height: '30px' }}> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;