<template>
  <Doughnut
    class="donut"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Doughnut } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "DoughnutChart",
  components: {
    Doughnut,
  },
  props: {
    colors: Array,
    data: Array,
    grosor: Number,
    chartId: {
      type: String,
      default: "doughnut-chart",
      data: Array,
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 230,
    },
    height: {
      type: Number,
      default: 230,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        //labels: ["Usuarios registrados", "Usuarios verificados"],
        datasets: [
          {
            backgroundColor: this.colors,
            hoverBackgroundColor: this.colors,
            data: this.data,
            spacing: 3,
            borderRadius: 15,
          },
        ],
      },
      chartOptions: {
        cutout: this.grosor,
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
<style scoped></style>
