<template>
  <v-container>
    <h3>ແກ້ໄຂຂໍ້ມູນປະເພດລາຍຈ່າຍ / Edit expense type</h3>
    <v-divider></v-divider>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="6" class="mt-4">
          <v-row>
            <v-col cols="12" md="6">
              <label for="id"><p class="ml-2">ຊື່ພາສາລາວ / Name</p></label>
              <v-text-field
                id="id"
                density="compact"
                class="pa-2"
                color="primary"
                variant="outlined"
                label="ກະລຸນາປ້ອນຊື່ພາສາລາວ / Name"
                outlined
                dense
              ></v-text-field
            ></v-col>
            <v-col cols="12" md="6">
              <label for="code"
                ><p class="ml-2">ຊື່ພາສາອັງກິດ / Name English</p></label
              >
              <v-text-field
                id="code"
                density="compact"
                class="pa-2"
                color="primary"
                label="ກະລຸນາປ້ອນຊື່ພາສາອັງກິດ / Name English"
                variant="outlined"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <div class="d-flex justify-center">
      <v-btn color="primary" class="rounded-lg" style="width: 10%"
        ><p class="pa-2">ບັນທຶກ</p></v-btn
      >
      <v-btn color="error" class="rounded-lg ml-6" style="width: 10%"
        ><p class="pa-2">ຍົກເລິກ</p></v-btn
      >
    </div>
  </v-container>
</template>
