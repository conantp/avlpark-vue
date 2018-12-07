<script>
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;
const moment = require('moment-timezone');

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: [],
  data: () => ({
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            // unit: 'day',
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  }),
  mounted() {
    console.log('chart update');
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>
</style>
