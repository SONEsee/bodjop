<script lang="ts" setup>
import axios from "@/helpers/axios";

const form = ref();
const loading = ref(false);
const request = ref({
  new_password: null,
  confirm_password: null,
});

const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

async function onSubmitForm() {
  try {
    const { valid } = await form.value.validate();
    if (valid) {
      loading.value = true;
      const res = await axios.post("/api/v1/users/update-password", {
        ...request.value,
      });
      if (res.status === 200) {
        const successNotification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
        });
        if (successNotification.isConfirmed) {
          delayGoPath("/profile");
        } else {
          delayGoPath("/profile");
        }
      }
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <section class="pt-12">
    <v-form ref="form" @submit.prevent="onSubmitForm()">
      <div style="width: 400px">
        <v-row>
          <v-col cols="12">
            <label> ລະຫັດຜ່ານໃໝ່ / New password </label>
            <v-text-field
              variant="outlined"
              hide-details="auto"
              density="comfortable"
              :rules="[(v: string) => !!v || 'This field is required']"
              v-model="request.new_password"
              :append-inner-icon="
                isNewPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
              "
              :type="isNewPasswordVisible ? 'text' : 'password'"
              @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="pt-3">
            <label> ຢືນຢັນລະຫັດຜ່ານ / Confirm password </label>
            <v-text-field
              variant="outlined"
              hide-details="auto"
              density="comfortable"
              :rules="[(v: string) => !!v || 'This field is required']"
              v-model="request.confirm_password"
              :append-inner-icon="
                isConfirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
              "
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              @click:append-inner="
                isConfirmPasswordVisible = !isConfirmPasswordVisible
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="pt-3">
            <v-btn
              color="primary"
              block
              class="font-weight-black"
              flat
              :loading="loading"
              type="submit"
              >ບັນທຶກ</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-form>
  </section>
</template>
