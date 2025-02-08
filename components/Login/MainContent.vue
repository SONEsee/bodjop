<template>
  <section
    style="min-height: 100vh"
    class="d-flex flex-wrap justify-center align-center"
  >
    <v-form ref="form" @submit.prevent="handleLogin">
      <v-card elevation="0" width="560px" class="pa-6">
        <v-row>
          <v-col cols="12">
            <div class="text-center">
              <v-avatar color="surface-variant" size="150"></v-avatar>
            </div>
            <h3 class="text-center">ເຂົ້າສູ່ລະບົບ 32 Lottery</h3>
          </v-col>

          <v-col cols="12">
            <label>ຊື່ຜູ້ໃຊ້ງານ / Username</label>
            <v-text-field
              v-model="username"
              density="comfortable"
              variant="outlined"
              hide-details="auto"
              :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ']"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <label>ລະຫັດຜ່ານ / Password</label>
            <v-text-field
              v-model="password"
              :type="visible ? 'text' : 'password'"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="visible = !visible"
              :rules="[(v: string) => !!v || 'Password is required']"
              density="comfortable"
              variant="outlined"
              hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="py-0 my-0">
            <v-checkbox
              label=" ຈື່ຜູ້ໃຊ້ງານ"
              hide-details
              density="compact"
              color="primary"
              v-model="isRemember"
            ></v-checkbox>
          </v-col>

          <v-col cols="12">
            <v-btn
              color="primary"
              type="submit"
              flat
              block
              height="40px"
              class="font-weight-black"
              :loading="loading"
            >
              ເຂົ້າສູ່ລະບົບ
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </section>
</template>

<script lang="ts" setup>
import axios from "@/helpers/axios";
import { UserModel } from "@/models/";
import { ref } from "vue";

const username = ref(null as string | null);
const password = ref(null);
const visible = ref(false);
const loading = ref(false);
const isRemember = ref(false);
const form = ref();

const onLoginRefetch = async () => {
  try {
    const getUsernamme = localStorage.getItem("saveusername");
    if (
      getUsernamme !== null ||
      getUsernamme === "" ||
      getUsernamme == "null"
    ) {
      username.value = getUsernamme;
      isRemember.value = true;
    }
  } catch (error) {
    console.error(error);
  }
};

const handleLogin = async () => {
  try {
    const { valid } = await form.value.validate();
    if (valid) {
      loading.value = true;
      const res = await axios.post<UserModel.UserLoginResponse>(
        "/api/v1/users/login",
        {
          username: username.value,
          password: password.value,
        }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.items.token);
        localStorage.setItem("refresh_token", res.data.items.refresh_token);
        localStorage.setItem("user", JSON.stringify(res.data.items.user));
        if (isRemember.value === true) {
          localStorage.setItem("saveusername", username?.value ?? "");
        } else {
          localStorage.removeItem("saveusername");
        }

        setTimeout(() => {
          goPath("/");
        }, 1500);
      }
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  onLoginRefetch();
});
</script>
