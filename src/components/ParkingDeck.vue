<template>
  <div class="parking-deck">
    <div class='parking-deck-spaces'>
      <h2><animated-counter :value="parseInt(deck.available)"></animated-counter></h2>
      <p>spaces available</p>
    </div>
    <div class='parking-deck-name'>
      <img v-if="deck.name != '11 Sears Alley' && deck.name != 'College Street'" alt="City of Asheville" src="../assets/avl.svg" />
      <img v-if="deck.name == '11 Sears Alley' || deck.name == 'College Street'" alt="Buncombe County"  src="../assets/bc.png" />
      <h1>{{ deck.name }}</h1>
    </div>
  </div>
</template>

<script>
import AnimatedCounter from './AnimatedCounter.vue';

export default {
  name: "ParkingDeck",
  props: {
    deck: Object,
  },
  components: {
    AnimatedCounter
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  margin: 0;
  padding: 0;
}
.parking-deck{
  background: #21ce6b;
  /*width: 31.3%;*/
  /*float: left;*/
  /*margin: 1%;*/
  /*padding: 20px;*/
  /*margin: 5px;*/
  margin-top: 10px;
  margin-right: 5px;
  margin-left: 5px;
  padding-bottom: 5px;
}

.parking-deck-spaces{
  padding: 5px 5px 5px 5px;
  text-align: left;
  color: white;
  /*line-height: 20px;*/
  font-weight: bold;
  h2{
    /*line-height: 3rem;*/
    font-size: 36px;
    font-weight: bolder;
    line-height: 30px;
    margin: 0;
    padding: 0;
    color: white;
  }


  p{
    padding: 0;
    margin: 0;
    font-weight: medium;
    font-size: 16px;
    /*font-size: 2em;*/
  }
}

.parking-deck-name{
  padding: 0 5px 0px 5px;
  display: flex;

  h1{
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    /*margin-bottom: -10px;*/
    /*height: 35px;*/
    align-self: flex-end;
  }

  img{
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

h3{
  color: white;
}

p{
  margin: 0;
}
h1{
  color: #304153;
}
</style>
