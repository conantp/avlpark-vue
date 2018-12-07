<template>
  <div class="home container">
    <router-link to="/">
      <img
        class="site-logo"
        alt="AVLPark logo"
        src="../assets/logo.png"
      >
    </router-link>


    <!-- <h1>AVLPark</h1> -->
    <hr>
    <div
      v-if="activeDeck"
      class="top-information"
    >
      <h2>
        {{ activeDeck.name }}
      </h2>
      <h1>
        <animated-counter :value="activeDeck.available" />
        total spaces
      </h1>
      <small> Updated {{ last_updated.format("MMMM Do, h:mm A") }} </small>
    </div>
    <div class="columns is-multiline is-gapless is-mobile deck-container">
      <div class="column is-full">
        <div class="chart-outer">
          <transition name="bounce">
            <div
              class="chart-container"
            >
              <ParkingDeckChart
                v-if="activeDeck"
                :chart-data="activeDeck.data"
              />
            </div>
          </transition>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import ParkingDeckChart from '@/components/ParkingDeckChart.vue';
import BC_IMAGE from '../assets/bc.png';
import AVL_IMAGE from '../assets/avl.svg';


// @ is an alias to /src
import AnimatedCounter from '@/components/AnimatedCounter.vue';
// var moment = require('moment')
const moment = require('moment-timezone');

export default {
  name: 'ParkDeckDetail',
  components: {
    AnimatedCounter,
    ParkingDeckChart,
  },
  computed: {
    activeDeck() {
      return this.$store.state.decks.find(deck => deck.name === this.$route.params.name);
    },
    last_updated() {
      return moment(this.activeDeck.last_updated);
    },
    connected() {
      return this.$store.state.connected;
    },
  },
};
</script>

<style scoped lang="scss">
hr {
  margin: 0.5em 0;
}
.top-information {
  margin-bottom: 10px;
}
.deck-container {
  /*max-width: 100%;*/
  margin-left: 0;
  margin-right: 0;
}
.column {
  /*border: 1px solid red;*/
}
.home {
  text-align: center;
}
.site-logo {
  max-height: 20vh;
  /*max-width: 200px;*/
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}
img {
  /*width: 25%;*/
}

h1 {
  font-size: 24px;
  font-weight: bold;
  /*display: none;*/
}
</style>
