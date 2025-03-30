<script lang="ts" setup>
const dashboardStore = UseDashboardStore();

const responseSaleData = computed(() => {
  return dashboardStore.response_graph_data.filter((d) => d.type === "expense");
});

const series = computed(() => {
  return [
    {
      data:
        responseSaleData.value.length > 0 ? responseSaleData.value[0].data : [],
    },
  ];
});

const chartOptions = computed(() => {
  return {
    chart: {
      height: 350,
      type: "bar",
      fontFamily: "NotoSansLao",
      events: {},
    },
    //   colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "28%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories:
        responseSaleData.value.length > 0
          ? responseSaleData.value[0].categories.map((d) => {
              return GetCommissionOrExpenseTypeLabel(d) ?? "N/A";
            })
          : [],
      labels: {
        style: {
          // colors: colors,
          fontSize: "11px",
        },
      },
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
            Expense in month
          </div>
          <v-divider></v-divider>
        </v-col>

        <v-col cols="12">
          <div id="chart">
            <apexchart
              type="bar"
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
