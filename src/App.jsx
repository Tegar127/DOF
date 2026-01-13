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
    const fileName = activeTab === 'nota' ? 'Nota_Dinas.pdf' : 'Surat_Perintah_SPPD.pdf';
    
    const images = element.getElementsByTagName('img');
    const generate = () => {
        element.style.minHeight = 'unset';
        const opt = {
            margin: 0,
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true, 
                allowTaint: true 
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save().then(() => {
            element.style.minHeight = '';
        });
    };

    if(images.length > 0 && !images[0].complete) {
        images[0].onload = generate;
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