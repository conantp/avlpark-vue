<template>
  <div class="home container">
    <a href="/">
      <img
        class="site-logo"
        alt="AVLPark logo"
        src="../assets/logo.png"
      >
    </a>
    <!-- <h1>AVLPark</h1> -->
    <hr>
    <div class="about">
      <h1>About AVLPark</h1>
      <p>
        AVLPark helps you find a parking spot and one of Asheville's downtown parking decks. The City and County have both provided a real-time data feed, updated every minute. We pull this information at regular intervals, and send it to <a href="https://data.avlpark.com">our custom data endpoint</a> for storage in a SQL database. This will allow us to view historical trends and visualize the data in different ways.
      </p>
    </div>
    <hr>
  </div>
</template>
<style scoped lang="scss">
h1{
	margin-bottom: 20px;
}
p{
	max-width: 50%;
	margin: 0 auto;
	line-height: 1.5em;
	text-align: left;
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
