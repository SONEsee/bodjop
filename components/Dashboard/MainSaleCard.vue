<script lang="ts" setup>
const dashboardStore = UseDashboardStore();

const responseSaleData = computed(() => {
  return dashboardStore.response_graph_data.filter((d) => d.type === "sales");
});
const series = computed(() => {
  return [
    {
      name: "Sales",
      data:
        responseSaleData.value.length > 0 ? responseSaleData.value[0].data : [],
    },
  ];
});

const chartOptions = computed(() => {
  return {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories:
        responseSaleData.value.length > 0
          ? responseSaleData.value[0].categories
          : [],
    },
  };
});
</script>
<template>
  <section>
    <v-card flat class="pa-4">
      <v-row>
        <v-col cols="12">
          <div style="font-size: 17px" class="font-weight-black">
            Sale in month
          </div>
          <v-divider></v-divider>
        </v-col>

        <v-col cols="12">
          <div id="chart">
            <apexchart
              type="line"
              height="350"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
