<template>
  <v-container>
    <div class="text-center mb-5">
      <v-avatar color="surface-variant" size="100"></v-avatar>
    </div>
    <h5 class="text-center mb-5">ເຂົ້າສູ່ລະບົບ 32 Lottery</h5>
    <div class="d-flex justify-center">
      <v-form style="width: 50%" class="text-center" @submit.prevent="handleLogin">
        <label for="username" class="d-flex text-start">ຊື່ຜູ້ໃຊ້ງານ / Username</label>
        <v-text-field
          id="username"
          v-model="username"
          label="ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"
          density="compact"
          variant="outlined"
        ></v-text-field>

        <label for="password" class="d-flex text-start">ລະຫັດຜ່ານ / Password</label>
        <v-text-field
          id="password"
          v-model="password"
          :type="visible ? 'text' : 'password'"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="toggleVisibility"
          label="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
          density="compact"
          variant="outlined"
        ></v-text-field>

        <v-btn class="mt-4" color="primary" variant="elevated" @click="handleLogin">
          ເຂົ້າສູ່ລະບົບ
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script lang="ts">
import Swal from 'sweetalert2';
import { ref } from 'vue';

export default {
  name: 'Login',
  setup() {
    const username = ref('');
    const password = ref('');
    const visible = ref(false);

    const toggleVisibility = () => {
      visible.value = !visible.value;
    };

    const handleLogin = () => {
      if (!username.value || !password.value) {
        Swal.fire({
          icon: 'error',
          title: 'ຜິດພາດ',
          text: 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ ແລະ ລະຫັດຜ່ານ!',
        });
        return;
      }

      Swal.fire({
        title: 'ກຳລັງເຂົ້າສູ່ລະບົບ',
        html: 'ກະລຸນາລໍຖ້າ <b></b> ວິທີ',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          let timerInterval = setInterval(() => {
            if (b) {
              b.textContent = String(Math.ceil(Swal.getTimerLeft() / 1000));
            }
          }, 100);
        },
        willClose: () => {
          clearInterval();
        },
      }).then(() => {
       
        Swal.fire({
          icon: 'success',
          title: 'ສໍາເລັດ',
          text: 'ເຂົ້າລະບົບສໍາເລັດ!',
        });
      });
    };

    return {
      username,
      password,
      visible,
      toggleVisibility,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.d-flex {
  display: flex;
}
.text-start {
  text-align: start;
}
</style>
