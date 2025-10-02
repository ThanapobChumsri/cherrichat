<template>
  <div class="h-[500px] bg-white px-2 sm:px-8 py-4">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'

const props = defineProps({
  chartData: {
    type: Object
  }
})

const data = computed(() => ({
  labels: props.chartData.labels,
  datasets: props.chartData.datasets,
}))

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    // legend: { position: 'top' },
    legend: false,
    title: { display: true, text: 'Expense (Monthly Chart)' },
  },
  scales: {
    x: { stacked: false },
    y: { beginAtZero: true },
  },
})
</script>

<style scoped></style>