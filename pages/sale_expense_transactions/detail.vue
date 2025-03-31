<script lang="ts" setup>
const expenseTypeStore = UseExpenseTypeStore();
const globalStore = UseGlobalStore();
const route = useRoute();
const id = route?.query?.id?.toString() ?? null;

const response_data = computed(() => {
  return expenseTypeStore.response_get_detail;
});

definePageMeta({
  middleware: "auth",
});

onMounted(() => {
  expenseTypeStore.GetDetailData(id);
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" flat min-height="50vh" v-if="response_data !== null">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="'ຂໍ້ມູນລາຍຈ່າຍ'" />
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="3">
              <GlobalCardTitle
                :title="'ສ້າງວັນທີ'"
                :text="FormatDatetime(response_data?.created_at)"
              />
            </v-col>
            <v-col cols="3">
              <GlobalCardTitle
                :title="'ປະເພດລາຍຈ່າຍ'"
                :text="response_data?.expense_type?.name ?? 'N/A'"
              />
            </v-col>

            <v-col cols="3">
              <GlobalCardTitle
                :title="'ຕົວແທນ'"
                :text="response_data?.agency?.fullname ?? 'N/A'"
              />
            </v-col>

            <v-col cols="3">
              <GlobalCardTitle
                :title="'ງວດວັນທີ'"
                :text="FormatDate(response_data?.sale_date)"
              />
            </v-col>

            <v-col cols="3">
              <GlobalCardTitle
                :title="'ຈຳນວນເງິນ'"
                :text="formatnumber(response_data?.amount ?? 0)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <GlobalOverlayLoading :loading="globalStore.loading_overlay" />
  </section>
</template>
