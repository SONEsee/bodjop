<script lang="ts" setup>
import axios from "@/helpers/axios";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
    default: false,
  },

  user_id: {
    type: [String, null],
    required: true,
    default: null,
  },
});

const emits = defineEmits(["closeDialog"]);
const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const loading = ref(false);
const form = ref();
const request = ref({
  new_password: null as string | null,
  confirm_password: null as string | null,
});

async function submitForm() {
  try {
    const { valid } = await form.value.validate();
    if (valid) {
      loading.value = true;
      const res = await axios.put(
        `/api/v1/agency/update-password/${props.user_id}`,
        {
          ...request.value,
        }
      );
      if (res.status === 200) {
        loading.value = false;
        await onCloseDialog();
        CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ",
        });
      }
    }
  } catch (error) {
    console.error(error);
    await onCloseDialog();
    DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
}

async function onCloseDialog() {
  emits("closeDialog", false);
}
</script>
<template>
  <div class="text-center pa-4">
    <v-dialog :model-value="props.dialog" width="auto" persistent>
      <v-form ref="form" @submit.prevent="submitForm">
        <v-card
          width="500"
          prepend-icon="mdi-update"
          title="ລີເຊັດລະຫັດຜ່ານ"
          class=""
        >
          <v-row class="pa-4">
            <v-col cols="12">
              <label>ລະຫັດຜ່ານໃໝ່</label>
              <v-text-field
                variant="outlined"
                hide-details="auto"
                density="comfortable"
                :rules="[(v: string) => !!v || 'This field is required']"
                v-model="request.new_password"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="
                  isNewPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="
                  isNewPasswordVisible = !isNewPasswordVisible
                "
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <label>ຢືນຢັນລະຫັດຜ່ານ</label>
              <v-text-field
                variant="outlined"
                hide-details="auto"
                density="comfortable"
                :rules="[(v: string) => !!v || 'This field is required']"
                v-model="request.confirm_password"
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="
                  isConfirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="
                  isConfirmPasswordVisible = !isConfirmPasswordVisible
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <template v-slot:actions>
            <div class="d-flex flex-wrap">
              <div class="mr-3">
                <v-btn
                  color="primary"
                  variant="flat"
                  type="submit"
                  :loading="loading"
                >
                  <div>ບັນທຶກ</div>
                </v-btn>
              </div>

              <div>
                <v-btn @click="onCloseDialog" :loading="loading">
                  <div>ຍົກເລີກ</div>
                </v-btn>
              </div>
            </div>
          </template>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>
