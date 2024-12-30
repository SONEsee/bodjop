<template>
  <v-container>
    <h3>ເພີ່ມຂໍ້ມູນການກະຈາຍອຸປະກອນ / Device Distributions (1)</h3>
    <v-divider></v-divider>
    <div class="d-flex justify-end mt-4">
      <v-btn class="ml-3 rounded-lg" color="primary" style="width: ">
        <v-icon icon="mdi-cloud-download-outline" class="mr-2"></v-icon>
        <p>ດາວໂຫຼດຟາຍອັບໂຫຼດ</p>
      </v-btn>
      <v-btn class="ml-3 rounded-lg" color="primary" style="width: "
        ><v-icon icon="mdi-cloud-upload-outline" class="ml-2 mr-4"></v-icon>
        <p class="ml-2 mr-3">ອັບໂຫຼດຟາຍ</p></v-btn
      >
    </div>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="3">
          <label for="id"><p class="ml-2">ເລືອກອຸປະກອນ / Devices</p></label>
          <v-select
            :items="['POS-001', 'POS-002', 'POS-003']"
            placeholder="ເລືອກອຸປະກອນ"
            id="id"
            density="compact"
            class="pa-2"
            color="primary"
            variant="outlined"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <label for="code"><p class="ml-2">ຕົວແທນ / Agency</p></label>
          <v-select
            placeholder="ເລືອກຕົວແທນ"
            :items="['ຫົວໜ້າ', 'ນິ້ມ', 'ສອນ']"
            id="code"
            density="compact"
            class="pa-2"
            color="primary"
            variant="outlined"
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <label for="exdate"><p class="ml-2">ໝາຍເຫດ / Remark</p></label>
          <v-text-field
            id="exdate"
            density="compact"
            class="pa-2"
            color="primary"
            placeholder="ໝາຍເຫດ"
            variant="outlined"
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" class="pa-2">
          <v-btn color="primary" class="mt-10 rounded-lg"
            >ເພີ່ມ<v-icon icon="mdi-plus"></v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
          <v-data-table-virtual
            :headers="headers"
            :items="items"
            item-key="name"
            class="elevation-1 mt-4"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                color="info"
                class="me-2"
                size="small"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon color="error" size="small" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table-virtual>
        </v-col>
      </v-row>
    </v-col>
    <div class="mt-5 d-flex justify-center">
        <v-btn color="primary" class="ml-3 rounded-lg" style="width: 200px">
           
            <p>ບັນທຶກ</p>
        </v-btn>
        <v-btn color="error" class="ml-3 rounded-lg" style="width: 200px">
           
            <p>ຍົກເລີກ</p>
        </v-btn>

    </div>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      headers: [
        {
          title: "ລຳດັບ",
          align: "start",
          sortable: false,
          value: "no",
        },
        { title: "ລະຫັດຕົວແທນ", value: "branch" },
        { title: "ລະຫັດອຸປະກອນ  - IMEI", value: "code" },
        { title: "Action", value: "actions" },
      ],
      items: [{ no: "1", branch: "sone", code: "ht-001" }],
    };
  },
});
</script>
