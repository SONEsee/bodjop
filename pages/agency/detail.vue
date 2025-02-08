<script lang="ts" setup>
const loading = ref(false);
const window = ref(0);

const windowItems = ref([
  {
    title: "ຂໍ້ມູນທົ່ວໄປ",
    value: 0,
    component: shallowRef(resolveComponent("AgencyDetailAgency")),
  },
  {
    title: "ອຸປະກອນ",
    value: 1,
    component: shallowRef(resolveComponent("AgencyDetailContentAgencyDevices")),
  },
  // {
  //   title: "ລູກທີມ",
  //   value: 2,
  //   component: shallowRef(resolveComponent("AgencyDetailContentAgencyMembers")),
  // },
]);
const route = useRoute();
const id =
  typeof route.query.id == "undefined"
    ? null
    : route.query.id?.toString() ?? null;
const agencyStore = UseAgencyStore();

const onLoadingData = async () => {
  try {
    loading.value = true;
    await agencyStore.GetDetailAgencyData(id);
    await agencyStore.GetAgenciesDeviceResponse(id);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  onLoadingData();
});
</script>

<template>
  <section class="pa-6">
    <v-card min-height="95vh" flat class="pa-6">
      <v-tabs v-model="window" align-tabs="start" color="primary">
        <!-- <v-tab :value="0" class="font-weight-black">ຂໍ້ມູນທົ່ວໄປ</v-tab> -->
        <v-tab
          v-for="(window, index) in windowItems"
          :key="`window-${index}`"
          :value="window.value"
          >{{ window.title }}</v-tab
        >
      </v-tabs>

      <v-tabs-window v-model="window">
        <v-tabs-window-item
          v-for="(window, index) in windowItems"
          :key="`window-${index}`"
          :value="window.value"
        >
          <!-- <AgencyDetailAgency /> -->
          <component :is="window.component" />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>

    <GlobalOverlayLoading :loading="loading" />
  </section>
</template>
