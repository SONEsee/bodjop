<script lang="ts" setup>
const series = ref([
  {
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
]);

const chartOptions = ref({
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
  //   title: {
  //     text: "Product Trends by Month",
  //     align: "left",
  //   },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
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
