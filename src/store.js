import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    decks: [],
    lastUpdated: false,
    connect: false
  },
  mutations: {
    addDeck(state, deck) {
      state.decks.push(deck);
    },
    SOCKET_SPACES_UPDATE: (state, status) => {
      console.log("spaces", status);
      state.connect = true;
    },
    SOCKET_SPACESUPDATE: (state, input) => {
      console.log("spaces1", input);
      console.log(input);

      state.decks = input.decks.sort((a, b) => a.name > b.name);
    },
    SOCKET_CONNECT: (state, status) => {
      console.log("socket connect", status);
      state.connect = true;
    },
    SOCKET_USER_MESSAGE: (state, message) => {
      console.log("message");
      state.message = message;
    }
  },
  actions: {}
});
