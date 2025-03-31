<script lang="ts" setup>
const dashboardStore = UseDashboardStore();
definePageMeta({
  middleware: "auth",
});

const loadingGraph = computed(() => {
  return dashboardStore.request_graph_data.loading;
});

const userLocal = computed(() => {
  return GetUserLocalStorage();
});

onMounted(() => {
  dashboardStore.GetMainCardDashboard();
  dashboardStore.GetGraphDataDashboard();
});
</script>

<template>
  <section class="pa-6">
    <v-row>
      <v-col cols="12">
        <div style="font-size: 18px" class="font-weight-black">
          Welcome
          <span class="text-primary"> {{ userLocal?.username ?? "-" }}! </span>
        </div>
      </v-col>

      <v-col cols="12">
        <DashboardMainCard />
      </v-col>

      <v-col cols="12" md="6">
        <DashboardMainSaleCard v-if="!loadingGraph" />
        <v-skeleton-loader
          type="card"
          height="350px"
          v-else="loadingGraph"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" md="6">
        <DashboardMainExpenseCard v-if="!loadingGraph" />
        <v-skeleton-loader
          type="card"
          height="350px"
          v-else="loadingGraph === true"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </section>
</template>
