<template>
    <v-container>
        <h3>
            ໜ້າສະແດງຂໍ້ມູນປະເພດລາຍຈ່າຍ / Detail Expense type
        </h3>
        <v-divider></v-divider>
    <v-col cols="12" class="mt-4">
        <v-row>
            <v-col cols="12" md="3 ">
                <label for="id"><p  class="ml-2">ຊື່ພາສາລາວ / Name</p></label>
                <v-text-field
                id="id"
                density="compact"
                class="pa-2"
                color="primary"
                variant="outlined"
            readonly
                outlined
                dense
                >sone</v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <label for="code" ><p class="ml-2">ຊື່ພາສາອັງກິດ / Name English</p></label>
                <v-text-field
                id="code"
                density="compact"
                class="pa-2"
                color="primary"
                readonly
                variant="outlined"
                dense
                >sone</v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <label for="exdate" ><p class="ml-2">ຄົນສ້າງ / Create by user</p></label>
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
           
        </v-row>
    </v-col>
    
    </v-container>
</template>
<script lang="ts">

</script>