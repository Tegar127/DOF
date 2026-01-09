<script setup>
import { ref, reactive, onMounted, computed } from 'vue';

const formData = reactive({
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

const basisItems = ref([{ value: '' }]);

const setTodayDate = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const adjustedDate = new Date(today.getTime() - (offset * 60 * 1000));
  formData.dateInput = adjustedDate.toISOString().split('T')[0];
  // Auto-fill year for document number
  formData.docNumYear = today.getFullYear();
};

onMounted(() => {
  setTodayDate();
});

const addBasisItem = () => {
  basisItems.value.push({ value: '' });
};

const removeBasisItem = (index) => {
  basisItems.value.splice(index, 1);
};

const formattedDate = computed(() => {
  if (!formData.dateInput) return '...';
  const dateObj = new Date(formData.dateInput);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObj.toLocaleDateString('id-ID', options);
});

// Computed property for the full document number
const fullDocumentNumber = computed(() => {
  const seq = formData.docNumSeq || '.....';
  const month = formData.docNumMonth || '.....';
  const year = formData.docNumYear || '........';
  return `ND-${seq}/PR.04.01/E/${month}/${year}`;
});

const resetForm = () => {
  formData.docNumSeq = '';
  formData.docNumMonth = '';
  formData.recipient = '';
  formData.sender = '';
  formData.attachment = '';
  formData.subject = '';
  formData.mainContent = '';
  formData.location = '';
  formData.position = '';
  formData.division = '';
  formData.signerName = '';
  setTodayDate();
  basisItems.value = [{ value: '' }];
};

const pdfContent = ref(null);

const downloadPDF = async () => {
  // Use global html2pdf from CDN
  if (!window.html2pdf) {
    alert('Library html2pdf belum siap. Mohon tunggu atau refresh halaman.');
    return;
  }

  const element = pdfContent.value;
  
  // Wait for images to load
  const images = element.getElementsByTagName('img');
  const promises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve; // Continue even if image fails
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
      logging: true, // Enable logging for debugging
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  window.html2pdf().set(opt).from(element).save()
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
</script>

<template>
  <div class="flex flex-col lg:flex-row h-screen overflow-hidden text-left">
    <!-- Input Sidebar -->
    <div class="w-full lg:w-1/3 bg-white p-6 overflow-y-auto border-r border-gray-200 shadow-lg z-10">
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-xl font-bold text-gray-800">Input Data</h2>
      </div>

      <form @submit.prevent class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Nomor Nota Dinas</label>
          <div class="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 p-2 border rounded">
            <span>ND-</span>
            <input type="text" v-model="formData.docNumSeq" class="w-16 p-1 border rounded text-center focus:ring-blue-500 focus:border-blue-500" placeholder="001">
            <span>/PR.04.01/E/</span>
            <input type="text" v-model="formData.docNumMonth" class="w-12 p-1 border rounded text-center" placeholder="X">
            <span>/</span>
            <input type="text" v-model="formData.docNumYear" class="w-16 p-1 border rounded text-center" placeholder="2025">
          </div>
          <p class="text-xs text-gray-500">Format: ND-[No]/PR.04.01/E/[Bulan]/[Tahun]</p>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Kepada Yth.</label>
            <input type="text" v-model="formData.recipient" class="w-full p-2 border rounded" placeholder="Sekretaris Perusahaan">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Dari</label>
            <input type="text" v-model="formData.sender" class="w-full p-2 border rounded" placeholder="Kepala Divisi Menpo">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Lampiran</label>
            <input type="text" v-model="formData.attachment" class="w-full p-2 border rounded" placeholder="1 (Satu) Berkas">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Hal</label>
            <textarea v-model="formData.subject" rows="2" class="w-full p-2 border rounded" placeholder="Penyampaian Dokumen..."></textarea>
          </div>
        </div>

        <hr class="my-4">

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Berdasarkan (Poin-poin)</label>
          <div class="space-y-2 mb-2">
            <div v-for="(item, index) in basisItems" :key="index" class="flex gap-2">
              <input type="text" v-model="item.value" class="w-full p-2 border rounded" :placeholder="'Poin ' + (index + 1) + '...'">
              <button v-if="basisItems.length > 1" @click="removeBasisItem(index)" type="button" class="px-3 border rounded text-red-500 hover:bg-red-50">&times;</button>
            </div>
          </div>
          <button type="button" @click="addBasisItem" class="text-sm flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg>
            Tambah Poin
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Paragraf Utama</label>
          <textarea v-model="formData.mainContent" rows="5" class="w-full p-2 border rounded" placeholder="Sehubungan dengan dasar tersebut di atas..."></textarea>
        </div>

        <hr class="my-4">

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Lokasi</label>
            <input type="text" v-model="formData.location" class="w-full p-2 border rounded" placeholder="Jakarta">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Tanggal</label>
            <input type="date" v-model="formData.dateInput" class="w-full p-2 border rounded">
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Jabatan (Baris 1 - Bold)</label>
          <input type="text" v-model="formData.position" class="w-full p-2 border rounded" placeholder="KEPALA DIVISI">
          
          <label class="block text-sm font-medium text-gray-700">Divisi (Baris 2 - Bold)</label>
          <input type="text" v-model="formData.division" class="w-full p-2 border rounded" placeholder="MANAJEMEN PORTOFOLIO">
          
          <label class="block text-sm font-medium text-gray-700">Nama Penandatangan</label>
          <input type="text" v-model="formData.signerName" class="w-full p-2 border rounded" placeholder="TEUKU RAHMATSYAH">
        </div>
        
        <div class="pt-6 pb-12 flex flex-col gap-3 relative bg-white z-20">
          <button type="button" @click="downloadPDF" class="w-full flex justify-center items-center gap-2 bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 shadow-md transition text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            DOWNLOAD PDF
          </button>
          <button type="button" @click="resetForm" class="w-full flex justify-center items-center gap-2 bg-white text-gray-700 border border-gray-300 p-3 rounded-lg font-bold hover:bg-gray-50 transition text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            RESET ALL
          </button>
        </div>
      </form>
    </div>

    <!-- Preview Area -->
    <div class="w-full lg:w-2/3 bg-gray-200 overflow-y-auto p-8 flex justify-center relative">
      <div ref="pdfContent" class="paper">
        <div class="flex items-center mb-4">
          <!-- Logo updated to a reliable placeholder to prevent 404 errors -->
          <img src="https://placehold.co/100x100/png?text=LOGO" alt="Logo" class="h-14 mr-4" crossorigin="anonymous">
        </div>

        <div class="paper-header">
          <h1 class="font-bold text-lg uppercase" style="letter-spacing: 1px;">NOTA DINAS</h1>
          <p>NOMOR <span class="font-medium">{{ fullDocumentNumber }}</span></p>
        </div>

        <table class="info-table w-full mb-6">
          <tr>
            <td style="width: 100px;">Kepada</td>
            <td style="width: 20px;">:</td>
            <td>Yth. <span :class="{'pdf-text-gray': !formData.recipient}">{{ formData.recipient || '...' }}</span></td>
          </tr>
          <tr>
            <td>Dari</td>
            <td>:</td>
            <td><span :class="{'pdf-text-gray': !formData.sender}">{{ formData.sender || '...' }}</span></td>
          </tr>
          <tr>
            <td>Lampiran</td>
            <td>:</td>
            <td><span :class="{'pdf-text-gray': !formData.attachment}">{{ formData.attachment || '...' }}</span></td>
          </tr>
          <tr>
            <td>Hal</td>
            <td>:</td>
            <td class="font-bold"><span :class="{'pdf-text-gray': !formData.subject}">{{ formData.subject || '...' }}</span></td>
          </tr>
        </table>

        <div class="mb-4">
          <p class="mb-2">Berdasarkan:</p>
          <ol class="list-decimal ml-10 space-y-1 text-justify leading-relaxed">
            <template v-if="basisItems.some(i => i.value.trim())">
              <li v-for="(item, index) in basisItems.filter(i => i.value.trim())" :key="index" class="pl-2 mb-1">
                {{ item.value }}
              </li>
            </template>
            <li v-else class="list-none pdf-text-gray">...</li>
          </ol>
        </div>

        <div class="mb-8 text-justify leading-relaxed">
          <p style="white-space: pre-wrap;" :class="{'pdf-text-gray': !formData.mainContent}">{{ formData.mainContent || '...' }}</p>
        </div>

        <p class="mb-8">Demikian disampaikan dan untuk dijadikan periksa.</p>

        <div class="signature-section">
          <p class="mb-1">
            <span :class="{'pdf-text-gray': !formData.location}">{{ formData.location || '...' }}</span>, 
            <span>{{ formattedDate }}</span>
          </p>
          <p class="font-bold uppercase mb-0 leading-tight">
            <span :class="{'pdf-text-gray': !formData.position}">{{ formData.position || '...' }}</span>
          </p>
          <p class="font-bold uppercase mb-16 leading-tight">
            <span :class="{'pdf-text-gray': !formData.division}">{{ formData.division || '...' }}</span>
          </p>
          <p class="font-bold uppercase underline">
            <span :class="{'pdf-text-gray': !formData.signerName}">{{ formData.signerName || '...' }}</span>
          </p>
        </div>

        <div style="clear: both;"></div>
        <table class="paraf-box dont-break">
          <tr>
            <td colspan="2" class="text-center font-bold pdf-bg-gray">BD-MLI</td>
          </tr>
          <tr>
            <td rowspan="2" class="text-center align-middle" style="width: 50%;">Paraf</td>
            <td class="text-center">Budi A.</td>
          </tr>
          <tr>
            <td class="text-center" style="height: 30px;"> </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
/* Styles moved to style.css */
</style>
