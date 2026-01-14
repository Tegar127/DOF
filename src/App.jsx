import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import PreviewArea from './components/Layout/PreviewArea';
import html2pdf from 'html2pdf.js';

function App() {
  const [activeTab, setActiveTab] = useState('nota');
  const [data, setData] = useState({
    docNumber: '',
    notaBasis: [''],
    sppdRemember: [''],
    sppdCC: [''],
  });
  
  useEffect(() => {
     const today = new Date().toISOString().split('T')[0];
     setData(prev => ({
         ...prev,
         notaDate: today,
         sppdSignDate: today
     }));
  }, []);

  const handleListChange = (listName, index, value, action) => {
    setData(prev => {
        const list = [...(prev[listName] || [])];
        if (action === 'add') {
            list.push('');
        } else if (action === 'remove') {
            list.splice(index, 1);
        } else {
            list[index] = value;
        }
        return { ...prev, [listName]: list };
    });
  };

  const contentRef = useRef(null);

  const handleDownload = () => {
    const element = contentRef.current;
    if (!element) {
        alert("Terjadi kesalahan: Konten dokumen tidak ditemukan.");
        return;
    }

    const fileName = activeTab === 'nota' ? 'Nota_Dinas.pdf' : 'Surat_Perintah_SPPD.pdf';
    
    // Helper to generate PDF
    const generate = () => {
        try {
            // Temporary style adjustments for better PDF rendering
            const originalMinHeight = element.style.minHeight;
            const originalTransition = element.style.transition;
            const originalBoxShadow = element.style.boxShadow;
            
            element.style.minHeight = 'unset';
            element.style.transition = 'none'; // Disable transitions to prevent rendering artifacts
            element.style.boxShadow = 'none'; // Remove shadow to prevent artifacts and color issues

            const opt = {
                margin: 0,
                filename: fileName,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true, 
                    allowTaint: true,
                    logging: false
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(element).save().then(() => {
                // Restore styles
                element.style.minHeight = originalMinHeight;
                element.style.transition = originalTransition;
                element.style.boxShadow = originalBoxShadow;
            }).catch(err => {
                console.error("PDF Generation Error:", err);
                alert("Gagal membuat PDF. Silakan coba lagi.");
                element.style.minHeight = originalMinHeight;
                element.style.transition = originalTransition;
                element.style.boxShadow = originalBoxShadow;
            });
        } catch (e) {
            console.error("Setup Error:", e);
        }
    };

    const images = element.getElementsByTagName('img');
    
    if(images.length > 0) {
        const img = images[0];
        if (img.complete) {
            generate();
        } else {
            // Wait for image load with timeout fallback
            let isGenerated = false;
            
            const onComplete = () => {
                if (!isGenerated) {
                    isGenerated = true;
                    generate();
                }
            };

            img.onload = onComplete;
            img.onerror = onComplete; // Generate anyway even if image fails
            
            // Fallback timeout after 2 seconds
            setTimeout(onComplete, 2000);
        }
    } else {
        generate();
    }
  };

  const handleReset = () => {
      if(confirm("Reset semua input?")) {
        const today = new Date().toISOString().split('T')[0];
        setData({
            docNumber: '',
            notaBasis: [''],
            sppdRemember: [''],
            sppdCC: [''],
            notaDate: today,
            sppdSignDate: today
        });
      }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        onSwitchTab={setActiveTab}
        data={data}
        onChange={setData}
        onListChange={handleListChange}
        onDownload={handleDownload}
        onReset={handleReset}
      />
      <PreviewArea 
        activeTab={activeTab} 
        data={data}
        contentRef={contentRef}
      />
    </div>
  );
}

export default App;