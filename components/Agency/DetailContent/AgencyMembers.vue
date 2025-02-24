<script lang="ts" setup>
const agencyStore = UseAgencyStore();
const route = useRoute();
const loading = ref(false);
const id = route?.query?.id?.toString() ?? null;
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ຊື່ ແລະ ນາມສະກຸນ", value: "fullname" },
  { title: "ເບີໂທ", value: "tel" },
  { title: "ເປີເຊັນ", value: "percentage" },
  // { title: "ຜູ້ລົງ", value: "username" },
]);

const request = agencyStore.request_query_agency_members_data;
const response_data = computed(() => {
  return agencyStore.response_query_agency_members_data;
});

async function onLoading() {
  try {
    loading.value = true;
    await agencyStore.GetAgencyMemberList(id);
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
      <v-col cols="12" class="d-flex flex-wrap justify-end">
        <div style="width: 250px">
          <GlobalDebounceEventTextField
            :input="request.q"
            :label="'ຄົ້ນຫາ'"
            @setinput="onDebounceSet"
          />
        </div>
      </v-col>

      <v-col cols="12">
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
      </v-col>
    </v-row>
  </section>
</template>
