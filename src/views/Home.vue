<template>
  <div class="home container">
    <img
      class="site-logo"
      alt="AVLPark logo"
      src="../assets/logo.png"
    >
    <!-- <h1>AVLPark</h1> -->
    <hr>
    <div class="top-information">
      <h1>
        <animated-counter :value="total" />
        total spaces
      </h1>
      <small> Updated {{ last_updated.format("MMMM Do, h:m A") }} </small>
    </div>
    <div class="columns is-multiline is-gapless is-mobile deck-container">
      <div
        v-for="deck in decks"
        :key="deck.name"
        class="column is-one-third-tablet is-half-mobile"
      >
        <ParkingDeck :deck="deck" />
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
// @ is an alias to /src
import AnimatedCounter from '@/components/AnimatedCounter.vue';
import ParkingDeck from '@/components/ParkingDeck.vue';
// var moment = require('moment')
const moment = require('moment-timezone');

export default {
  name: 'Home',
  components: {
    ParkingDeck,
    AnimatedCounter,
  },
  computed: {
    total() {
      return this.$store.state.decks.reduce((acc, currValue) => acc
        + parseInt(currValue.available, 10), 0);
    },
    last_updated() {
      const val = this.$store.state.decks.reduce(
        (acc, currValue) => (acc > currValue.last_modified ? acc : currValue.last_modified), 0,
      );
      return moment.utc(val).tz('America/New_York');
    },

    decks() {
      return this.$store.state.decks;
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
