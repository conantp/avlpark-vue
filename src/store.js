import Vue from 'vue';
import Vuex from 'vuex';

const moment = require('moment-timezone');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    decks: [],
    lastUpdated: false,
    connect: false,
    showCharts: false,
  },
  mutations: {
    addDeck(state, deck) {
      state.decks.push(deck);
    },
    changeShowCharts(state) {
      state.showCharts = !state.showCharts;
    },
    SOCKET_SPACES_UPDATE: (state, status) => {
      console.log('spaces', status);
      state.connect = true;
    },
    SOCKET_SPACESUPDATE: (state, input) => {
      console.log('spaces1', input);

      Object.entries(input.decks).forEach(([index, row]) => {
        row.data = {};

        const existingDeckIndex = state.decks.findIndex(deck => deck.name == row.name);

        const existingDeck = state.decks.find(deck => deck.name === row.name);
        // console.log(row.available, existingDeck);
        if (existingDeckIndex != -1) {
          const temp = state.decks[existingDeckIndex];

          temp.available = parseInt(state.decks[existingDeckIndex].available);
          Vue.set(state.decks, existingDeckIndex, temp);
        } else {
          state.decks.push(row);
        }
      });

      state.decks = state.decks.sort((a, b) => a.name > b.name);
    },
    SOCKET_CONNECT: (state, status) => {
      console.log('socket connect', status);
      state.connect = true;
    },
    SOCKET_KEENUPDATE: (state, input) => {
      Object.entries(input).forEach(([index, row]) => {
        const existingDeckIndex = state.decks.findIndex(deck => deck.name == index);
        console.log('test', existingDeckIndex);
        if (existingDeckIndex != -1) {
          const temp = state.decks[existingDeckIndex];
          // temp.available = parseInt(temp.available) + 1;

          const newData = [];

          Object.entries(row).forEach(([index2, row2]) => {
            const amoment = moment.utc(index2, 'MM-DD-YYYYTHH:mm:ss');
            newData.push({ x: amoment.toDate(), y: row2 });
          });

          const newDataStuff = {
            //   // labels: ['A', 'B', 'C'],
            datasets: [
              {
                label: 'Spaces Available',
                backgroundColor: '#e87d06',
                data: newData,
              }],
          };

          temp.data = newDataStuff;

          Vue.set(state.decks, existingDeckIndex, temp);
          state.decks.splice();
        }
      });
    },
  },
  actions: {},
});
