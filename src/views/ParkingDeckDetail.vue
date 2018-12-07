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
      <h1>
        {{ activeDeck.name }} -
        <a :href="deckMapLink">
          Get Directions
        </a>
      </h1>
      <h1>
        <animated-counter :value="activeDeck.available" />
        total spaces
      </h1>
      <small> Updated {{ last_updated.format("MMMM Do, h:mm A") }} </small>
    </div>
    <div class="columns is-multiline is-gapless is-mobile deck-container">
      <div
        class="column is-full"
      >
        <h2>Past Hour</h2>
        <ParkingDeckChart
          v-if="activeDeck"
          :chart-data="activeDeck.data"
        />
        <hr>
        <h2>Past 24 Hours</h2>
        <ParkingDeckChart
          v-if="activeDeck"
          :chart-data="activeDeck.dataLong"
        />
        <h2>Past Week</h2>
        <ParkingDeckChart
          v-if="activeDeck"
          :chart-data="activeDeck.dataWeek"
        />
        <!-- <h2>Past Month</h2> -->
        <!-- <ParkingDeckChart
          v-if="activeDeck"
          :chart-data="activeDeck.dataMonth"
        /> -->
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
    deckMapLink() {
      return `https://www.google.com/maps/search/${this.activeDeck.name},Asheville NC`;
    },
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
h2{
  font-size: 16px;
  font-weight: bold;
}
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
