<template>
    <v-container>
        <h3>
            ໜ້າສະແເດງຂໍ້ມູນອຸປະກອນ / Detail of device
        </h3>
        <v-divider></v-divider>
    <v-col cols="12">
        <v-row>
            <v-col cols="12" md="3">
                <label for="id"><p  class="ml-2">ລະຫັດ POS / Pos No</p></label>
                <v-text-field
                id="id"
                density="compact"
                class="pa-2"
                color="primary"
                variant="outlined"
                lreadonly
                outlined
                dense
                >POS-001</v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <label for="code" ><p class="ml-2">ລະຫັດ IMEI / IMEI Code</p></label>
                <v-text-field
                id="code"
                density="compact"
                class="pa-2"
                color="primary"
                readonly
                variant="outlined"
                dense
                >1234</v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <label for="exdate" ><p class="ml-2">ຫຼ້າສຸດຢູ່ກັບໃຜ / Lastest owner</p></label>
                <v-text-field
                id="exdate"
                density="compact"
                class="pa-2"
                color="primary"
                readonly
                variant="outlined"
                dense
                >Binh xayxana</v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <label for="create" ><p class="ml-2">ຄົນສ້າງຂໍ້ມູນ / Create by user</p></label>
                <v-text-field
                id="create"
                density="compact"
                class="pa-2"
                color="primary"
                readonly
                variant="outlined"
                dense
                >Binh xayxana</v-text-field>
            </v-col>
        </v-row>
    </v-col>
    <v-col cols="12">
        <v-row>
            <v-col cols="12" md="6">
                <h3>ຕຳແໜ່ງຫຼ້າສຸດ / Lastest location</h3>
                <v-divider></v-divider>
                <div class="mt-4">
                    <v-img src="../../public/image/map.png" style="width: 90%;"></v-img>
                </div>

            </v-col>
            <v-col cols="12" md="6">
                <h3>ປະຫວັດການກະຈາຍອຸປະກອນ / History of device managements</h3>
                <v-divider></v-divider>
                <v-data-table-virtual
                :headers="headers"
                :items="items"
                item-key="name"
                class="elevation-1 mt-4"
                ></v-data-table-virtual>
            </v-col>
        </v-row>
    </v-col>
    </v-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            headers: [
                {
                    title: 'ລຳດັບ',
                    align: 'start',
                    sortable: false,
                    value: 'no',
                },
                { title: 'ວັນທີ', value: 'date' },
                { title: 'ປະເພດ', value: 'type' },
                { title: 'ເຈົ້າ່ຂອງປະຈຸບັນ', value: 'create' },
                { title: 'ຄົນກະຈາຍ', value: 'userbranch' },
            ],
            items: [
                { no: '1', date: '13/12/2000', type: 'mini printer', create: 'Binh xayxana', userbranch: 'Binh xayxana' },
                { no: '2', date: '13/12/2000', type: 'mini printer', create: 'Binh xayxana', userbranch: 'Binh xayxana' },
                
              
            ],
        }
    },
})
</script>