<template>
  <div id="app">
    <!--
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    -->
    <!-- <h1>AVLPark</h1> -->
    <RouterLink to="/">
      <img
        class="site-logo"
        alt="AVLPark logo"
        :src="getLogo"
      >
    </RouterLink>
    <!-- <h1>AVLPark</h1> -->
    <hr>
    <RouterView />
    <div class="prc-footer">
      <div>
        <a
          href="https://opencollective.com/sunshine-labs"
          class="custom-dbox-popup"
        >
          Donate
        </a>
        |
        <RouterLink to="/about">
          About
        </RouterLink> |
        <a href="https://github.com/conantp/avlpark-vue">
          GitHub
        </a> |
        <a href="https://data.avlpark.com">
          Data
        </a>
      </div>
      <div class="footer-bottom columns is-gapless is-mobile">
        <div class="column is-full-tablet is-full-mobile">
          <h4>Built with 💖 by</h4>
          <a href="https://www.sunshinelabs.org">
            <img
              src="https://www.sunshinelabs.org/wp-content/uploads/2023/02/SL-BeakerLogo.png"
            >
          </a>
        </div>
        <!-- <div class="column is-half-tablet is-half-mobile">
          <a
            href="https://itunes.apple.com/us/app/avlpark/id1445324019"
            title="Download AVLPark on the App Store"
          >
            <img
              id="appstore"
              src="/appstore.png"
              alt="Download AVLPark on the App Store"
            >
          </a>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import LOGO from './assets/logo.png';

export default {
  name: 'App',
  components: {
  },
  computed: {
    getLogo() {
      return LOGO;
    },
  },
};
</script>

<style lang="scss">
.site-logo {
  max-height: 15vh;
  /*max-width: 200px;*/
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}

#app {
  /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
}


.prc-footer {
  padding: 0;
  margin-top: 0;
  text-align: center;
}

.footer-bottom{
  div{
    align-self: center;
    justify-content: center;
  }
  a{
    text-align: center;
    display: block;
  }

  #appstore{
    max-height: 60px;
    margin-top: 15px;
  }

  img {
    display: block;
    max-width: 100%;
    max-height: 150px;
    margin: 0 auto;
  }
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
