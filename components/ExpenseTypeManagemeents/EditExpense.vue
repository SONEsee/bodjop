<template>
  <v-container>
    <h3>{{ isEdit ? 'ແກ້ໄຂປະເພດລາຍຈ່າຍ' : 'ເພີ່ມປະເພດລາຍຈ່າຍໃໝ່' }}</h3>
    <v-divider class="mb-4"></v-divider>

    <v-form @submit.prevent="handleSubmit" ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.name"
            :rules="[v => !!v || 'ກະລຸນາປ້ອນຊື່ພາສາລາວ']"
            label="ຊື່ພາສາລາວ"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.name_en"
            :rules="[v => !!v || 'Please enter English name']"
            label="ຊື່ພາສາອັງກິດ"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12">
          <v-btn
            color="primary"
            type="submit"
            :loading="loading"
            class="mr-4"
          >
            {{ isEdit ? 'ແກ້ໄຂ' : 'ບັນທຶກ' }}
          </v-btn>
          <v-btn @click="goBack">
            ຍົກເລີກ
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/helpers/axios';
import type { ExpenseCreateModel } from '@/models/';

const route = useRoute();
const router = useRouter();
const form = ref();
const loading = ref(false);

const isEdit = computed(() => !!route.query.id);

const formData = ref({
  name: '',
  name_en: '',
});

const getExpenseType = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authorization token is missing');

    const response = await axios.get<ExpenseCreateModel.ExpenseDetailResponse>(
      `/api/v1/expense-types/detail/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log('response', response);

    if (response.status === 200) {
      formData.value = {
        name: response.data.name,
        name_en: response.data.name_en,
      };
    }
  } catch (err) {
    console.error('Failed to fetch expense type:', err);

  }
};

const handleSubmit = async () => {
  if (!form.value?.validate()) return;
  
  loading.value = true;
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authorization token is missing');

    const url = isEdit.value
      ? `/api/v1/expense-types/update/${route.query.id}`
      : '/api/v1/expense-types/create';

    const method = isEdit.value ? 'put' : 'post';

    const response = await axios[method](
      url,
      formData.value,
      
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
console.log('responseeeee', formData.value);
    if (response.status === 200) {
      
      goBack();
    }
  } catch (err) {
    console.error('Failed to save expense type:', err);
   
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push('/expense-types');
};

onMounted(() => {
  if (route.query.id) {
    getExpenseType(route.query.id as string);
  }
});
</script>
Last edited just now