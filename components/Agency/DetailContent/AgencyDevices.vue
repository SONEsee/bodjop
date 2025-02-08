<script lang="ts" setup>
const agencyStore = UseAgencyStore();
const route = useRoute();
const loading = ref(false);
const id = route?.query?.id?.toString() ?? null;
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "POS No.", value: "device.pos_no" },
  { title: "IMEI", value: "device.imei" },
  { title: "ກະຈາຍວັນທີ", value: "created_at" },
  { title: "ການຈັດການ", value: "actions" },
]);

const request = agencyStore.agency_device_request;
const response_data = computed(() => {
  return agencyStore.agency_devices_response;
});

async function onLoading() {
  try {
    loading.value = true;
    await agencyStore.GetAgenciesDeviceResponse(id);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function onSelectionChange(selection: number) {
  request.limit = selection;
  await onLoading();
}

async function onPageChange(page: number) {
  request.page = page;
  await onLoading();
}

async function onDebounceSet(input: string | null) {
  request.q = input;
  await onLoading();
}
</script>

<template>
  <section class="pa-4">
    <v-row>
      <v-col
        cosl="12"
        class="d-flex flex-wrap justify-space-between align-center"
      >
        <div class="d-flex flex-wrap">
          <h4>
            ອຸປະກອນ ({{
              formatnumber(response_data?.pagination?.total_count ?? 0)
            }})
          </h4>
          <h4 class="text-red ml-3">
            * ອຸປະກອນໝາຍເຖິງທາງຫ້ອງການໄດ້ກະຈາຍໃຫ້ຕົວແທນນັ້ນໆ *
          </h4>
        </div>

        <div style="width: 250px">
          <GlobalDebounceEventTextField
            :input="request.q"
            label="ຄົ້ນຫາ"
            @setinput="onDebounceSet"
          />
        </div>
      </v-col>

      <v-data-table
        :headers="headers"
        :items="response_data?.list_data ?? []"
        density="comfortable"
        :items-per-page="request.limit"
        hide-default-footer
        :loading="loading"
      >
        <template v-slot:item.no="{ index }">
          {{ index + (request.page - 1) * request.limit + 1 }}
          
        </template>

        <template v-slot:item.created_at="{ item }">
          {{ FormatDatetime(item.created_at) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <div>
            <v-btn
              color="primary"
              variant="text"
              icon="mdi-eye"
              size="small"
              @click="openPath(`/devices/detail?id=${item.device_id}`)"
            ></v-btn>
          </div>
        </template>

        <template v-slot:bottom>
          <GlobalTablePaginations
            :page="request.page"
            :limit="request.limit"
            :totalpage="response_data?.pagination?.total_page ?? 1"
            @onSelectionChange="onSelectionChange"
            @onPagechange="onPageChange"
          />
        </template>
      </v-data-table>
    </v-row>
  </section>
</template>
