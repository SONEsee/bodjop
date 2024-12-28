<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'


const series = ref([
  {
    name: 'ເຄືອທີ່ໃຊ້ປົກກະຕິ',
    data: [80, 50, 30, 40, 100, 20],
  },
  {
    name: 'ເຄື່ອງທີປັນຫາ',
    data: [20, 30, 40, 80, 20, 80],
  },
  {
    name: 'ເຄື່ອງເພ',
    data: [44, 76, 78, 13, 43, 10],
  },
])


const chartOptions = ref({
  chart: {
    height: 350,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1,
    },
  },
  title: {
    text: 'Radar Chart - Multi ສະຖານະ',
    font: {
        family: ' Times New Roman, NotoSansLao, Arial, sans-serif',
        size: 16, 
        weight: 'normal', 
      },
  },
  stroke: {
    width: 2,
  },
  fill: {
    opacity: 0.1,
  },
  markers: {
    size: 0,
  },
  yaxis: {
    stepSize: 20,
  },
  xaxis: {
    categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
  },
})
</script>

<template>
  <div>
    <vue-apex-charts type="radar" height="350" :series="series" :options="chartOptions" />
  </div>
</template>

<style scoped>

</style>
