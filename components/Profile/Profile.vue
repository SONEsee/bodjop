<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3 class="">ລາຍລະອຽດຂໍ້ມູນຜູ້ໃຊ້ງານ</h3>
          <v-divider></v-divider>
        </v-col>
      </v-row>
  
      <v-line></v-line>
  
      <v-container>
      <div class="d-flex justify-end">
        <p>ສະຖານະ: <v-chip disabled>ເປີດໃຊ້ງານ</v-chip></p>
      </div>
      <v-row>
        <v-col cols="12" md="4" class="d-flex align-center justify-center">
          <div class="d-flex text-center align-center">
            <v-col cols="12" class="d-flex justify-center align-center">
              <v-avatar
                size="150"
                class="mx-auto d-flex align-center"
                color="grey lighten-2"
              >
                <!-- <img src="" alt="Profile Picture" /> -->
              </v-avatar>
            </v-col>
            <v-col cols="12">
          
            </v-col>
          </div>
        </v-col>
  
        <v-col cols="12" md="8" class="mt-12 mb-12">
          <v-row style="font-size: 90%">
            <v-col cols="12" md="4">
              <label for="name">ຊື່ ແລະ ນາມສະກຸນ / Fullname</label>
              <v-text-field
                readonly
                id="name"
                density="compact"
                variant="outlined"
                >xayxana MANIVONG</v-text-field
              >
  
              <label for="code">ລະຫັດຕົວແທນ / Agency code</label>
              <v-text-field
                readonly
                id="code"
                density="compact"
                variant="outlined"
                >BINH1</v-text-field
              >
              <label for="districts">ເມືອງ / Districts</label>
              <v-text-field
                readonly
                id="districts"
                density="compact"
                :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                variant="outlined"
                >ເມືອງຈັນທະບູລີ</v-text-field
              >
              
            </v-col>
  
            <v-col cols="12" md="4">
              <label for="nickname">ຊື່ຫຼິ້ນ / Nickname</label>
              <v-text-field
                readonly
                id="nickname"
                density="compact"
                variant="outlined"
                >Binh</v-text-field
              >
  
              <label for="role">ສິດການເຂົ້າໃຊ້ງານ / Role access</label>
              <v-text-field
                readonly
                id="role"
                density="compact"
                variant="outlined"
                >ຕົວແທນລະດັບແຂວງ</v-text-field
              >
              <label for="villages">ບ້ານ / Villages</label>
              <v-text-field
                readonly
                id="villages"
                density="compact"
                :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                variant="outlined"
                >ໂພນສະຫວ່າງ</v-text-field
              >
              
            </v-col>
  
            <v-col cols="12" md="4">
              <label for="phone">ເບີໂທລະສັບ / phone number</label>
              <v-text-field
                id="phone"
                readonly
                density="compact"
                variant="outlined"
                >2056009989</v-text-field
              >
              <label for="provinces">ແຂວງ / Provinces</label>
              <v-text-field
                id="provinces"
                readonly
                density="compact"
                :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                variant="outlined"
                >2056009989</v-text-field
              >
              <label for="username">ຊື້ຜູ້ໃຊ້ງານ / Username</label>
              <v-text-field
                id="username"
                readonly
                density="compact"
                variant="outlined"
                >binh</v-text-field
              >
  
              
            </v-col>
          </v-row>
        </v-col>
      </v-row>
  
      </v-container>
    </v-container>
  </template>
  
  <script lang="ts" setup>
 
  </script>
  
  <style scoped>
  .text-h5 {
    margin-bottom: 16px;
  }
  .text-field-black-label .v-label {
    color: #000000 !important;
  }
  .hide-file-icon .v-input__control .v-icon {
    display: none;
  }
  </style>
  