<script lang="ts" setup>
const series = ref([
  {
    data: [21, 22, 10, 28, 16],
  },
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: "bar",
    fontFamily: "NotoSansLao",
    events: {
      //   click: function (chart, w, e) {
      //     // console.log(chart, w, e)
      //   },
    },
  },
  //   colors: colors,
  plotOptions: {
    bar: {
      columnWidth: "45%",
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
    categories: ["ອາກອນ", "Jake", "Amber", "Peter", "Lily"],
    labels: {
      style: {
        // colors: colors,
        fontSize: "12px",
      },
    },
  },
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
