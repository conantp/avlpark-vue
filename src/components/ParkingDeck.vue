<template>
  <div
    :class="{ low: deck.available < 10, medium: deck.available < 25 }"
    class="parking-deck"
    @click="toggleCharts()"
  >
    <RouterLink :to="deckLink">
      <div class="parking-deck-spaces">
        <h2>
          <AnimatedCounter :value="parseInt(deck.available)" />
        </h2>
        <p>spaces available</p>
      </div>
      <div class="parking-deck-name">
        <img
          :src="deckImage"
        >

        <h1>{{ deck.name }}</h1>
      </div>
    </RouterLink>

    <!-- <div class="chart-outer">
      <Transition name="bounce">
        <div
          v-show="showChart"
          class="chart-container"
        >
          <ParkingDeckChart
            :chart-data="deck.data"
          />
        </div>
      </Transition>
    </div> -->
  </div>
</template>

<script>
import ParkingDeckChart from './ParkingDeckChart.vue';
import AnimatedCounter from './AnimatedCounter.vue';
import BC_IMAGE from '../assets/bc.png';
import AVL_IMAGE from '../assets/avl.svg';

const moment = require('moment-timezone');

export default {

  name: 'ParkingDeck',
  components: {
    AnimatedCounter,
    ParkingDeckChart,
  },
  props: {
    deck: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    deckLink() {
      return encodeURI(`/deck/${this.deck.name}`);
    },
    showChart() {
      return false;
      // return this.$store.state.showCharts;
    },
    deckImage() {
      if (this.deck.name === '11 Sears Alley' || this.deck.name === 'College Street') {
        return BC_IMAGE;
      }

      return AVL_IMAGE;
    },
  },
  methods: {
    toggleCharts() {
      this.$store.commit('changeShowCharts');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    height: 0;
    transform: translateY(-100px);
  }
  100% {
    height: 160px;
    transform: translateY(0);
  }
}

.chart-outer{
  overflow: hidden;
}
.chart-container > div{
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  height: 150px;
  background: rgba(255,255,255,0.6);
}
h1 {
  margin: 0;
  padding: 0;
}
.parking-deck {
  &.medium {
    background: #e87d06;
  }

  &.low {
    background: #e84a34;
  }
  background: #21ce6b;
  /*width: 31.3%;*/
  /*float: left;*/
  /*margin: 1%;*/
  /*padding: 20px;*/
  /*margin: 5px;*/
  margin-top: 5px;
  margin-right: 2.5px;
  margin-left: 2.5px;
  padding-bottom: 2.5px;
}

.parking-deck-spaces {
  padding: 5px 5px 5px 5px;
  text-align: left;
  color: white;
  /*line-height: 20px;*/
  font-weight: bold;
  h2 {
    /*line-height: 3rem;*/
    font-size: 36px;
    font-weight: bolder;
    line-height: 30px;
    margin: 0;
    padding: 0;
    color: white;
  }

  p {
    padding: 0;
    margin: 0;
    font-weight: medium;
    font-size: 16px;
    /*font-size: 2em;*/
  }
}

.parking-deck-name {
  padding: 0 5px 0px 5px;
  display: flex;

  h1 {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    /*margin-bottom: -10px;*/
    /*height: 35px;*/
    align-self: flex-end;
  }

  img {
    margin-right: 5px;
    /*display: block;*/
    float: left;
    max-width: 35px;
    /*padding-bottom: 5px;*/
    height: 30px;
    /*height: 35px;*/
    /*display: inline-block;*/
    align-self: flex-end;
    display: flex;
  }
}

h3 {
  color: white;
}

p {
  margin: 0;
}
h1 {
  color: #304153;
}
</style>
