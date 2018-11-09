<template>
  <div class="home container">
    <img class='site-logo' alt="AVLPark logo" src="../assets/logo.png" />
    <!-- <h1>AVLPark</h1> -->
    {{ connected }}
    <small>
        {{ last_updated.format('MMMM Do, h:m A') }}
      </small>
    <h1>

      <animated-counter :value="total"></animated-counter>
      total spaces
      
    </h1>
    <div class='columns is-multiline is-gapless is-mobile deck-container'>
      <div class='column is-one-third-tablet is-half-mobile' v-for="(deck, index) in decks" :key="deck.name">
        <ParkingDeck 
          v-bind:deck="deck"
          />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AnimatedCounter from "@/components/AnimatedCounter.vue";
import ParkingDeck from "@/components/ParkingDeck.vue";
var moment = require('moment');
var moment = require('moment-timezone');

export default {
  name: "home",
  computed: {
    total() {
        return this.$store.state.decks.reduce((acc, currValue) => {
        return acc + parseInt(currValue.available);
      }, 0);
    },
    last_updated() {
      const val = this.$store.state.decks.reduce((acc, currValue) => {
        return acc > currValue.last_modified ? acc : currValue.last_modified;
      }, 0);
      return moment.utc(val).tz("America/New_York");
    },

    decks() {
      console.log("testing this");
      console.log(this.$store.state);
      return this.$store.state.decks;
    },
    connected() {
      return this.$store.state.connected;
    }
  },
  components: {
    ParkingDeck,
    AnimatedCounter
  }
};
</script>

<style scoped lang="scss">
.deck-container{
  /*max-width: 100%;*/
  margin-left: 0;
  margin-right: 0;
}
.column{
  /*border: 1px solid red;*/
}
.home{
  text-align: center;
}
.site-logo{
  max-height: 20vh;
  /*max-width: 200px;*/
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}
  img{
    /*width: 25%;*/
  }

  h1{
    font-size: 24px;
    font-weight: bold;
    /*display: none;*/
  }
</style>