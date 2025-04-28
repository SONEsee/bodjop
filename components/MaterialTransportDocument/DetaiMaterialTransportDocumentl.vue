<script lang="ts" setup>
import { ref, computed } from 'vue';
import html2pdf from 'html2pdf.js';

const deviceMovementStore = UseDeviceMovementStore();

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

const formatnumber = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

const exportToPDF = () => {

  const element = document.getElementById('receipt-content');
  
  
  const footerContent = `
    <div style="text-align: center; font-size: 10px; color: red;">
      <p style="margin: 0">ກະຊວງການເງີນ ບໍລິສັດລັດວິສາຫະກິດ ຫວຍພັດທະນາ</p>
      <p style="margin: 0">ຕົວແທນຈຳໜ່າຍຫວຍພັດທະນາ ກ໊ອກ ກ໊ອກ Lottery</p>
      <p style="margin: 0">ບ້ານ ໜອງບອນ ເມືອງ ໄຊເສດຖາ ນະຄອນຫຼວງວຽງຈັນ</p>
      <p style="margin: 0">ໂທ:020 9588 2229</p>
    </div>
  `;
  
 
  const options = {
    margin: [10, 10, 45, 10], 
    filename: 'ໃບມອບຮັບເຄື່ອງ.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    footer: {
      height: '28mm',
      contents: {
        default: footerContent 
      }
    }
  };
  
 
  html2pdf().from(element).set(options).save();
};
</script>

<template>
  <v-container class="pa-16">
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
              <v-row>
                <v-col cols="3">
                  <v-img
                    flat
                    :width="140"
                    aspect-ratio="16/9"
                    cover
                    src="../../assets/img/logokokok-removebg-preview.png"
                  ></v-img>
                </v-col>
                <v-col cols="7 mt-3" style="font-size: 13px;">
                  <p class="mb-0">ບໍລິສັດລັດ ວິສາຫະກິດ ຫວຍພັດທະນາ</p>
                  <p class="mb-0">ຕົວແທນຈຳໜ່າຍ ຫວຍພັດທະນາ</p>
                  <p>ກ໊ອກ ກ໊ອກ Lottery</p>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="12" md="6" class="text-end">
              <div>
                <p class="mb-0">ເລກທີ:.....................</p>
                <p class="mb-0">ລົງວັນທີ:.....................</p>
              </div>
            </v-col>
          </v-col>

          <v-col cols="12">
            <div class="d-flex justify-center">
              <h2 class="text-decoration-underline font-weight-bold text-center">
                ໃບມອບຮັບເຄື່ອງ
              </h2>
            </div>
            <p class="">
              ລາຍການເຄື່ອງຈຳໜ່າຍຫວຍ  ມີດັ່ງຕາຕະລາງລຸ່ມນີ້:
            </p>
            <v-table class="border" density="compact" style="font-size: 12px;">
              <thead>
                <tr style="background-color: cornflowerblue;">
                  <th class="text-center pa-2 border" style="width: 5%;">ລຳດັບ</th>
                  <th class="text-center pa-2 border" style="width: 15%;">ລະຫັດຜູ້ຂາຍ</th>
                  <th class="text-center pa-2 border" style="width: 15%;">ເລກ S/N ໂຕເຄື່ອງ</th>
                  <th class="text-center pa-2 border" style="width: 15%;">ສະຖານະເຄື່ອງ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in response_data"
                  :key="index"
                  class="border"
                >
                  <td class="text-center border"><b>{{ index + 1 }}</b></td>
                  <td class="text-center border">
                    {{ item.agency?.agent_code ?? "N/A" }}
                  </td>
                  <td class="text-center border">{{ item.pos_no }}</td>
                  <td class="text-center border">
                    <v-chip
                      :color="item.status === 1 ? 'green' : 'red'"
                      size="small"
                      class="text-white"
                    >
                      {{ item.status === 1 ? "ໃຊ້ງານປົກກະຕິ" : "ອຸປະກອນມີປັນຫາ" }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col cols="12" class="mt-6">
            <p class="" style="font-size: 15px;">
              ຂ້າພະເຈົ້າໄດ້ຮັບເຄື່ອງຈຳໜ່າຍຫວຍທີ່ໄດ້ລະບຸໄວ້ຂ້າງເທີງນີ້ຄົບຖ້ວນ ແລະ
              ຍິນດີຮັບຜິດຊອບທຸກການເຄື່ອນໄຫວການຈຳໜ່າຍທັງໝົດທີ່ເກີດຂື້ນຫຼັງຈາກນີ້
              ຂ້າພະເຈົ້າຈະຮັກສາ ແລະ ນຳໃຊ້ອຸປະກອນຢ່າງລະມັດລະວັງ ແລະ
              ຖ້າຫາກເກີດເຫດເປເພ ທີ່ເກີດຈາກການນຳໃຊ້ ບໍ່ລະມັດລະວັງ ຂ້າພະເຈົ້າຍິນດີ
              ຊົດໃຊ້ຄ່າເສຍຫາຍທຸກປະການ.
            </p>
          </v-col>

          

          <v-col cols="12" class="d-flex mt-6">
            <v-col cols="6" class="text-left">
              <p class=" mb-0" style="font-size: 15px;">ຕົວແທນແມ່ມອບ</p>
              <div style="height: 80px"></div>
            </v-col>
            <v-col cols="6" class="text-right">
              <p class=" mb-0" style="font-size: 15px;">ຜູ້ມອບໃນນາມບໍລິສັດ</p>
              <div style="height: 80px"></div>
            </v-col>
          </v-col>
        </v-row>
        <div class="text-grey">
          <p style="font-size:12px;">ກະຊວງການເງິນ ບໍລິສັດລັດວິສາຫະກິດ ຫວຍພັດທະນາ</p>
          <p style="font-size:12px;">ຕົວແທນຈຳໜ່າຍຫວຍພັດທະນາ ກ໊ອກ ກ໊ອກ Lottery</p>
          <p style="font-size:12px;">ບ້ານ ໜອງບອນ ເມືອງ ໄຊເສດຖາ ນະຄອນຫຼວງວຽງຈັນ</p>
          <p style="font-size:12px;">ໂທ:020 9588 2229</p>
        </div>
        <global-text-title-line color="green" />
         
      </div>
    </v-row>
  </v-container>
</template>

<style scoped>
.border {
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
}

@media print {
  .border {
    border: 1px solid #000 !important;
  }
}

.page-container {
  margin-bottom: 40px;
  position: relative;
}
</style>