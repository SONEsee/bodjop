<script lang="ts" setup>
const headers = ref([
  { title: "ລຳດັບ", key: "no", sortable: false },
  { title: "ຮູບພາບ", key: "image", sortable: false,  },
  { title: "ລະຫັດຕົວແທນ / Agency code", key: "agency_no", sortable: false },
  { title: "ຊື່ ແລະ ນາມສະກຸນ / Fullname", key: "full_name", sortable: false },
  { title: "ເບີໂທລະສັບ / phone number", key: "phone_number", sortable: false },
  { title: "ສະຖານະ", key: "status", sortable: false },
  { title: "", key: "actions", sortable: false },
]);
const data = ref([
  {
    agency_no: "ລະຫັດຕົວແທນ",
    full_name: "ຊື່ ແລະ ນາມສະກຸນ",
    phone_number: "ເບີໂທລະສັບ",
  },
  {
    agency_no: "ລະຫັດຕົວແທນ",
    full_name: "ຊື່ ແລະ ນາມສະກຸນ",
    phone_number: "ເບີໂທລະສັບ",
  },
  {
    agency_no: "ລະຫັດຕົວແທນ",
    full_name: "ຊື່ ແລະ ນາມສະກຸນ",
    phone_number: "ເບີໂທລະສັບ",
  },
]);
</script>
<template>
  <div class="pa-6">
    <v-card elevation="0" tile class="d-flex flex-wrap" width="100%">
      <v-col cols="12" class="pt-6 d-flex justify-space-between">
        <h3>ໜ້າຈັດການຂອງຕົວແທນ / Agency's homepage</h3>
        <v-btn color="primary" elevation="0">
          <v-icon class="mr-2"> mdi-plus</v-icon>
          ເພີ່ມຂໍ້ມູນຂອງຕົວແທນ
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="data">
          <template v-slot:item.no="{ item, index }">
            {{ index + 1 }}
          </template>

          <template v-slot:item.image="{ item, index }">
            <v-card
              width="70"
              height="70"
              color="grey-lighten-3"
              elevation="0"
              tile
              class="my-2"
            >
            </v-card>
          </template>

        

          <template v-slot:item.status="{ item }">
            <v-chip color="green"> Active </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" color="primary">  mdi-eye </v-icon>
            <v-icon size="small" color="red"> mdi-delete </v-icon>
          </template>

          <template v-slot:bottom>
            <div class="d-flex flex-wrap justify-space-between pt-2">
              <div style="width: 180px">
                <label> ຈຳນວນລາຍການທີ່ສະແດງ</label>
                <v-select variant="outlined" density="compact"></v-select>
              </div>

              <div>
                <v-pagination
                  class="text-black"
                  :total-visible="8"
                  length="15"
                ></v-pagination>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-card>
  </div>
</template>
