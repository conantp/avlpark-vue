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
        row.dataLong = {};
        row.dataWeek = {};
        row.dataMonth = {};
        row.available = parseInt(row.available);

        const existingDeckIndex = state.decks.findIndex(deck => deck.name == row.name);

        const existingDeck = state.decks.find(deck => deck.name === row.name);
        // console.log(row.available, existingDeck);
        if (existingDeck) {
          existingDeck.available = row.available;
          existingDeck.last_modified = row.last_modified;
          Vue.set(state.decks, existingDeckIndex, existingDeck);
        } else {
          state.decks.push(row);
        }
      });

      // state.decks = state.decks.sort((a, b) => a.name > b.name);
    },
    SOCKET_CONNECT: (state, status) => {
      console.log('socket connect', status);
      state.connect = true;
    },
    SOCKET_KEENUPDATE: (state, input) => {
      Object.entries(input).forEach(([index, row]) => {
        const existingDeckIndex = state.decks.findIndex(deck => deck.name == index);

        if (existingDeckIndex != -1) {
          const temp = state.decks[existingDeckIndex];
          // temp.available = parseInt(temp.available) + 1;

          const newData = [];

          Object.entries(row).forEach(([index2, row2]) => {
            const amoment = moment.utc(index2, 'MM-DD-YYYYTHH:mm:ss');
            // amoment.add(2, 'hour');
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
    SOCKET_KEENLONGUPDATE: (state, input) => {
      Object.entries(input).forEach(([index, row]) => {
        const existingDeckIndex = state.decks.findIndex(deck => deck.name == index);

        if (existingDeckIndex != -1) {
          const temp = state.decks[existingDeckIndex];
          // temp.available = parseInt(temp.available) + 1;

          const newData = [];

          Object.entries(row).forEach(([index2, row2]) => {
            const amoment = moment.utc(index2, 'MM-DD-YYYYTHH:mm:ss');
            // amoment.add(2, 'hour');
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

          temp.dataLong = newDataStuff;
          // console.log('data', temp.dataLong);
          Vue.set(state.decks, existingDeckIndex, temp);
          state.decks.splice();
        }
      });
    },
    SOCKET_KEENWEEKUPDATE: (state, input) => {
      console.log('keen week');
      Object.entries(input).forEach(([index, row]) => {
        const existingDeckIndex = state.decks.findIndex(deck => deck.name == index);

        if (existingDeckIndex != -1) {
          const temp = state.decks[existingDeckIndex];
          // temp.available = parseInt(temp.available) + 1;

          const newData = [];

          Object.entries(row).forEach(([index2, row2]) => {
            const amoment = moment.utc(index2, 'MM-DD-YYYYTHH:mm:ss');
            // amoment.add(2, 'hour');
            newData.push({ x: amoment.toDate(), y: row2 });
          });

          const newDataStuff = {
            //   // labels: ['A', 'B', 'C'],
            datasets: [
              {
                label: 'Spaces Available',
                backgroundColor: '#e87d06',
                data: newData,
                showLine: true,
                spanGaps: false,
              }],
          };

          temp.dataWeek = newDataStuff;
          // console.log('data', temp.dataLong);
          Vue.set(state.decks, existingDeckIndex, temp);
          state.decks.splice();
        }
      });
    },
    SOCKET_KEENMONTHUPDATE: (state, input) => {
      console.log('go123');
      Object.entries(input).forEach(([index, row]) => {
        const existingDeckIndex = state.decks.findIndex(deck => deck.name == index);

        if (existingDeckIndex != -1) {
          const temp = state.decks[existingDeckIndex];
          // temp.available = parseInt(temp.available) + 1;

          const newData = [];

          Object.entries(row).forEach(([index2, row2]) => {
            const amoment = moment.utc(index2, 'MM-DD-YYYYTHH:mm:ss');
            // amoment.add(2, 'hour');
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

          temp.dataMonth = newDataStuff;
          // console.log('data', temp.dataLong);
          Vue.set(state.decks, existingDeckIndex, temp);
          state.decks.splice();
        }
      });
    },
  },
  actions: {},
});
