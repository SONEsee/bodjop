<script setup lang="ts">
import axios from "@/helpers/axios";
import notfounfimages from "@/assets/img/404.png";
const notfoundref = ref(notfounfimages);
const userStore = UseUserStore();

const agencyStore = UseAgencyStore();
const globalStore = UseGlobalStore();
const title = ref("ເພີ່ມຂໍ້ມູນຕົວແທນ");
const visible = ref(false);
const loading = ref(false);
const form = ref();
const file = ref();
const request = computed({
  get() {
    return userStore.response_detail_query_data;
  },
  set(value) {
    userStore.response_detail_query_data = value;
  },
});
const provinceChange = async (province_id: number | null) => {
  await globalStore.GetDistrictData(province_id, null);
  if (request.value !== null) {
    request.value.village.district_id = null;
    request.value.village_id = null;
  }
};
const districtChange = async (district_id: number | null) => {
  await globalStore.GetVillagesData(district_id?.toString() ?? null, null);
  if (request.value !== null) {
    request.value.village_id = null;
  }
};

const onDebounceVillage = useDebounceFn(async (value: string) => {
  await globalStore.GetVillagesData(
    request.value?.village.district_id?.toString() ?? null,
    value ?? null
  );
}, 1000);
</script>
<template>
  {{ request }}
</template>
