<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import logo from '../../assets/img/logokokok-removebg-preview.png';
import footerLogo from '../../assets/img/logohuay.png';

const deviceMovementStore = UseDeviceMovementStore();

onMounted(async () => {
  if (!deviceMovementStore.response_detail_data) {
    await deviceMovementStore.fetchDeviceMovementDetails();
  }
});

const response_data = computed(() => {
  return (
    deviceMovementStore.response_detail_data?.device_movement_details ?? []
  );
});

const headers = ref([
  { title: "ລຳດັບ", value: "no", align: "center", width: "80px" },
  { title: "ລະຫັດຜູ້ຂາຍ", value: "agency", align: "center" },
  { title: "ເລກ S/N ໂຕເຄື່ອງ", value: "pos_no", align: "center" },
  { title: "ສະຖານະເຄື່ອງ", value: "status", align: "center" },
]);

const formatNumber = (num: number | string | undefined | null): string => {
  if (!num && num !== 0) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const addLaoFontWebLink = () => {
  const existingLink = document.head.querySelector('link[href*="phetsarath"]');
  if (!existingLink) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://db.onlinewebfonts.com/c/938a9833b7244d806eca3349487c68ba?family=Phetsarath+OT';
    document.head.appendChild(link);
  }
};

const exportToPDF = async () => {

  addLaoFontWebLink();
  
  
  const element = document.getElementById('receipt-content');
  if (!element) {
    console.error('Receipt content not found');
    alert('ບໍ່ພົບເນື້ອຫາໃບຮັບເງິນ');
    return;
  }
  
  
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @font-face {
      font-family: 'Phetsarath OT';
      src: url('https://db.onlinewebfonts.com/t/938a9833b7244d806eca3349487c68ba.woff2') format('woff2'),
           url('https://db.onlinewebfonts.com/t/938a9833b7244d806eca3349487c68ba.woff') format('woff');
    }
    #receipt-content * {
      font-family: 'Phetsarath OT', 'Saysettha OT', 'Noto Sans Lao', sans-serif !important;
    }
  `;
  document.head.appendChild(styleElement);
  

  const footerElement = document.createElement('div');
  footerElement.classList.add('pdf-footer');
  footerElement.style.color = 'green';
  footerElement.style.textAlign = 'left'; 
  footerElement.style.marginTop = '20px';
  footerElement.style.paddingTop = '10px';
  footerElement.style.borderTop = '1px solid #eee';
  footerElement.style.fontSize = '12px';
  
  
  const existingFooter = element.querySelector('.pdf-footer');
  if (!existingFooter) {
    element.appendChild(footerElement);
  }
  

  const options = {
    margin: [10, 10, 60, 10],  
    filename: 'ໃບມອບຮັບເຄື່ອງ.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2.5,
      useCORS: true,
      letterRendering: true,
      allowTaint: true,
      
      onclone: function(document) {

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://db.onlinewebfonts.com/c/938a9833b7244d806eca3349487c68ba?family=Phetsarath+OT';
        document.head.appendChild(link);
        
       
        const contents = document.querySelectorAll('.page-container');
        contents.forEach(content => {
          if (content) {
            content.style.fontFamily = "'Phetsarath OT', 'Saysettha OT', 'Noto Sans Lao', sans-serif";
            content.style.paddingBottom = '60px'; 
            
          
            const allElements = content.querySelectorAll('*');
            allElements.forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.fontFamily = "'Phetsarath OT', 'Saysettha OT', 'Noto Sans Lao', sans-serif";
              }
            });
            
            
            const footers = content.querySelectorAll('.footer-section');
            footers.forEach(footer => {
              if (footer instanceof HTMLElement) {
                footer.style.borderTop = '2px solid #eee';
                footer.style.paddingTop = '15px';
                footer.style.marginTop = '20px';
                footer.style.fontWeight = '500';
              }
            });
          }
        });
      }
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    }
  };

  try {
    
    const pdf = await html2pdf().from(element).set(options).toPdf().get('pdf');
    
   
    const totalPages = pdf.internal.getNumberOfPages();
    
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor(108, 98, 96);  
      
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
     
      const footerPositionY = pageHeight - 25; 
      
      try {
        
        pdf.addFont('https://db.onlinewebfonts.com/t/938a9833b7244d806eca3349487c68ba.ttf', 'Phetsarath', 'normal');
        pdf.setFont('Phetsarath');
      } catch (e) {
        console.warn('ບໍ່ສາມາດໃຊ້ addFont ສຳລັບຟອນລາວ, ຈະໃຊ້ການສ້າງຮູບພາບແທນ');
      }
      
     
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        
        canvas.width = pageWidth * 3;
        canvas.height = 150;
        
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
       
        const img = new Image();
        img.src = footerLogo; 
        
        
        await new Promise((resolve) => {
          img.onload = resolve;
        
          setTimeout(resolve, 1000);
        });
        
        try {
      
          ctx.drawImage(img, 10, 10, 50, 50); 
        } catch (e) {
          console.error('ບໍ່ສາມາດແຕ້ມຮູບພາບໃສ່ canvas:', e);
        }
        
        
        ctx.fillStyle = '#566573';
        ctx.font = '12px "Phetsarath OT", "Saysettha OT", "Noto Sans Lao", sans-serif';
        
      
        const footerLines = [
          'ກະຊວງການເງິນ ບໍລິສັດລັດວິສາຫະກິດ ຫວຍພັດທະນາ',
          'ຕົວແທນຈຳໜ່າຍຫວຍພັດທະນາ ກ໊ອກ ກ໊ອກ Lottery',
          'ບ້ານ ໜອງບອນ ເມືອງ ໄຊເສດຖາ ນະຄອນຫຼວງວຽງຈັນ',
          'ໂທ:020 9588 2229'
        ];
        
       
        const textStartX = 80; 
        
       
        footerLines.forEach((line, index) => {
          ctx.fillText(line, textStartX, 20 + (index * 15));
        });
        
       
        const imgData = canvas.toDataURL('image/png');
        
        try {
         
          const imgWidth = pageWidth - 20;
          const imgHeight = 40; 
          
          pdf.addImage(imgData, 'PNG', 15, footerPositionY, imgWidth, imgHeight);
        } catch (e) {
          console.error('ບໍ່ສາມາດເພີ່ມຮູບພາບ footer:', e);
        }
      }
    }
    
   
    pdf.save();
    
  
    document.head.removeChild(styleElement);
    if (!existingFooter) {
      element.removeChild(footerElement);
    }
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('ເກີດຂໍ້ຜິດພາດໃນການສ້າງ PDF: ' + error.message);
    
   
    document.head.removeChild(styleElement);
    if (!existingFooter) {
      element.removeChild(footerElement);
    }
  }
};
</script>

<template>
  <v-container fluid class="pa-4 pa-md-16">
    <v-row>
      <v-col cols="12" class="d-flex justify-end mb-4">
        <v-btn
          color="primary"
          prepend-icon="mdi-file-pdf-box"
          @click="exportToPDF"
        >
          Export ເປັນ PDF
        </v-btn>
      </v-col>

      <div id="receipt-content" class="page-container">
        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <v-col cols="12" md="6">
              <v-row align="center">
                <v-col cols="3">
                  <v-img
                    :width="140"
                    aspect-ratio="16/9"
                    cover
                    :src="logo"
                  ></v-img>
                </v-col>
                <v-col cols="9" style="font-size: 13px;">
                  <p class="mb-0">ບໍລິສັດລັດ ວິສາຫະກິດ ຫວຍພັດທະນາ</p>
                  <p class="mb-0">ຕົວແທນຈຳໜ່າຍ ຫວຍພັດທະນາ</p>
                  <p>ກ໊ອກ ກ໊ອກ Lottery</p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" class="text-end">
              <p class="mb-0">ເລກທີ:.....................</p>
              <p class="mb-0">ລົງວັນທີ:.....................</p>
            </v-col>
          </v-col>

          <v-col cols="12">
            <div class="d-flex justify-center">
              <h2 class="text-decoration-underline font-weight-bold text-center">
                ໃບມອບຮັບເຄື່ອງ
              </h2>
            </div>
            <p>
              ລາຍການເຄື່ອງຈຳໜ່າຍຫວຍ ມີດັ່ງຕາຕະລາງລຸ່ມນີ້:
            </p>
            <v-table class="border" density="compact" style="font-size: 12px;">
              <thead>
                <tr style="background-color: cornflowerblue;">
                  <th v-for="header in headers" :key="header.value" class="text-center pa-4 border" :style="{ width: header.width }">
                    {{ header.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in response_data"
                  :key="index"
                  class="border"
                >
                  <td class="text-center border pa-4"><b>{{ index + 1 }}</b></td>
                  <td class="text-center border pa-4">
                    {{ item.agency?.agent_code ?? 'N/A' }}
                  </td>
                  <td class="text-center border pa-4">{{ item.pos_no }}</td>
                  <td class="text-center border pa-4">
                    <v-chip
                      :color="item.status === 1 ? 'green' : 'red'"
                      size="small"
                      class="text-white"
                    >
                      {{ item.status === 1 ? 'ໃຊ້ງານປົກກະຕິ' : 'ອຸປະກອນມີປັນຫາ' }}
                    </v-chip>
                  </td>
                </tr>
                
                <tr v-if="response_data.length === 0" v-for="n in 5" :key="`empty-${n}`" class="border">
                  <td class="text-center border pa-4"><b>{{ n }}</b></td>
                  <td class="text-center border pa-4">CPS-05</td>
                  <td class="text-center border pa-4">28100202{{ n }}</td>
                  <td class="text-center border pa-4">
                    <v-chip color="green" size="small" class="text-white">
                      ໃຊ້ງານປົກກະຕິ
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col cols="12" class="mt-6">
            <p style="font-size: 15px;">
              ຂ້າພະເຈົ້າໄດ້ຮັບເຄື່ອງຈຳໜ່າຍຫວຍທີ່ໄດ້ລະບຸໄວ້ຂ້າງເທີງນີ້ຄົບຖ້ວນ ແລະ
              ຍິນດີຮັບຜິດຊອບທຸກການເຄື່ອນໄຫວການຈຳໜ່າຍທັງໝົດທີ່ເກີດຂື້ນຫຼັງຈາກນີ້
              ຂ້າພະເຈົ້າຈະຮັກສາ ແລະ ນຳໃຊ້ອຸປະກອນຢ່າງລະມັດລະວັງ ແລະ
              ຖ້າຫາກເກີດເຫດເປເພ ທີ່ເກີດຈາກການນຳໃຊ້ ບໍ່ລະມັດລະວັງ ຂ້າພະເຈົ້າຍິນດີ
              ຊົດໃຊ່ຄ່າເສຍຫາຍທຸກປະການ.
            </p>
          </v-col>

          <v-col cols="12" class="d-flex mt-6">
            <v-col cols="6" class="text-left">
              <p class="mb-0 signature-label">ຕົວແທນແມ່ມອບ</p>
              
            </v-col>
            <v-col cols="6" class="text-right">
              <p class="mb-0 signature-label">ຜູ້ມອບໃນນາມບໍລິສັດ</p>
              
            </v-col>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </v-container>
</template>

<style scoped>
@import url('https://db.onlinewebfonts.com/c/938a9833b7244d806eca3349487c68ba?family=Phetsarath+OT');

.border {
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.page-container {
  margin-bottom: 40px;
  position: relative;
  width: 100%;
  max-width: 210mm; 
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  
  font-family: 'Phetsarath OT', 'Saysettha OT', 'Noto Sans Lao', sans-serif !important;
}

.signature-label {
  font-size: 15px;
}

.signature-line {
  border-bottom: 1px solid black;
  margin-top: 50px;
  width: 80%;
}

.text-green {
  color: green;
}

.footer-section {
  line-height: 1.4;
  border-top: 2px solid #eee;
  padding-top: 15px;
  margin-top: 20px;
  color: #007e33;
  text-align: left;
  
  font-family: 'Phetsarath OT', 'Saysettha OT', 'Noto Sans Lao', sans-serif !important;
  font-weight: 500;
}

@media print {
  .border {
    border: 1px solid #000 !important;
  }

  .page-container {
    margin: 0;
    padding: 10mm;
    box-shadow: none;
  }

  .v-container {
    padding: 0 !important;
  }
}

@media screen and (max-width: 600px) {
  .page-container {
    padding: 20px;
  }

  .v-table {
    font-size: 10px !important;
  }
}
</style>