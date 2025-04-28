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
  { title: "ລ/ດ", value: "no" },
  { title: "ລະຫັດຕົວແທນ", value: "agency" },
  { title: "ເລກ S/N ໂຕເຄື່ອງ", value: "pos_no" },
  { title: "ສະຖານະເຄື່ອງ", value: "status" },
]);

const formatnumber = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

const exportToPDF = () => {

  const element = document.getElementById('receipt-content');
  
 
  const options = {
    margin: 10,
    filename: 'ໃບມອບຮັບເຄື່ອງ.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  
  html2pdf().from(element).set(options).save();
};
</script>
<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-end mb-4">
     
      <v-btn 
        color="error" 
        prepend-icon="mdi-file-pdf-box" 
        @click="exportToPDF"
      >
        Export ເປັນ PDF
      </v-btn>
    </v-col>
    
 
    <div id="receipt-content">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="2"> 
            <v-img
              :width="100"
              aspect-ratio="16/9"
              cover
              src="../../assets/img/logokokok-removebg-preview.png"
            ></v-img>
          </v-col>
          <v-col cols="12" md="10" class="text-end">
            <div class="">
              <p>ເລກທີ:....................</p>
              <p>ລົງວັນທີ:......................</p>
            </div>
          </v-col>
          <v-col cols="12" class="text-center">
            <h3 class="text-decoration-underline">ໃບມອບຮັບເຄື່ອງ</h3>
            <p class="d-flex justify-start"> 
              ຂໍ້ມູນອຸປະກອນໃນລາຍການ ({{ formatnumber(response_data.length) }})
              ລາຍການ
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-data-table 
          :headers="headers" 
          :items="response_data"
          :items-per-page="-1"
          hide-default-footer
        >
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:item.agency="{ item }">
            {{ item.agency?.agent_code ?? "N/A" }}
          </template>
          <template v-slot:item.status="{item}">
            <v-chip :color="item.status === 1 ? 'green' : 'red'" small>
              {{ item.status === 1 ? 'ໃຊ້ງານປົກກະຕິ' : 'ອຸປະກອນມີປັນຫາ' }}
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" class="text-center">
        <p>ຂ້າພະເຈົ້າໄດ້ຮັບເຄື່ອງຈຳໜ່າຍຫວຍທີ່ໄດ້ລະບຸໄວ້ຂ້າງເທີງນີ້ ຄົບຖ້ວນ ແລະ ຍິນດີຮັບຜິດຊອບທຸກການເຄື່ອນ
        ໄຫວການຈຳໜ່າຍທັງໝົດທີ່ເກີດຂື້ນຫຼັງຈາກນີ້ ຂ້າພະເຈົ້າຈະຮັກສາ ແລະ ນຳໃຊ້ອຸປະກອນຢ່າງລະມັດລະວັງ ແລະ ຖ້າຫາກເກີດເຫດເປເພ ທີ່ເກີດຈາກການນຳໃຊ້ ບໍ່ລະມັດລະວັງ ຂ້າພະເຈົ້າຍິນດີ ຊົດໃຊ້ຄ່າເສຍຫາຍທຸກປະການ.</p>
      </v-col>
      <v-col cols="12" class="text-center">
        <p>ຕົວແທນແມ່ຫວຍຜູ້ມອບໃນນາມບໍລິສັດ</p>
      </v-col>
      <v-row>  <v-col cols="12" md="6">
        <p>ກະຊວງການເງີນ ບໍລິສັດລັດວິສາຫະກິດ ຫວຍພັດທະນາ</p>
        <p>ຕົວແທນຈຳໜ່າຍຫວຍພັດທະນາ ກ໊ອກ ກ໊ອກ Lottery</p>
        <p>ບ້ານ ໜອງບອນ ເມືອງ ໄຊເສດຖາ ນະຄອນຫຼວງວຽງຈັນ</p>
        <p>ໂທ:020 9588 2229</p>
      </v-col>
      <v-col cols="12" md="6">
        <p>ບໍລິສັດລັດ ວິສາຫະກິດ ຫວຍພັດທະນາຕົວແທນຈຳໜ່າຍ ຫວຍພັດທະນາ ກ໊ອກ ກ໊ອກ Lottery</p>
      </v-col></v-row>
    
    </div>
  </v-row>
</template>