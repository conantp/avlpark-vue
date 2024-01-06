import Vue from 'vue';
import Vuex from 'vuex';

const moment = require('moment-timezone');

Vue.use(Vuex);

function processEntries(state, input, target) {
  Object.entries(input).forEach(([index, row]) => {
    const existingDeckIndex = state.decks.findIndex(deck => deck.name === index);

    if (existingDeckIndex !== -1) {
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

      if (target === 'dataWeek') {
        newDataStuff.datasets[0].showLine = true;
        newDataStuff.datasets[0].spanGaps = false;
      }

      temp[target] = newDataStuff;
      // console.log('data', temp.dataLong);
      // console.log(Vue, state);
      Vue.set(state.decks, existingDeckIndex, temp);
      state.decks.splice();
    }
  });
}

async function getDataWithoutSocket(state){
  console.log("update without socket");
  var data_sources = [
        {
          url: "https://s3.amazonaws.com/avl-parking-decks/spaces.json",
          last_modified: false
        },
        {
          url: "https://s3.amazonaws.com/bc-parking-decks/164College",
          last_modified: false
        },
        {
          url: "https://s3.amazonaws.com/bc-parking-decks/40Coxe",
          last_modified: false
        }
      ];

      for (var i = 0; i < data_sources.length; i++) {
        var data_source = data_sources[i];
        var data = await fetch(data_source.url);

        // Get the response data
        var input = await data.json();

        Object.entries(input.decks).forEach(([index, row]) => {
          row.data = {};
          row.dataLong = {};
          row.dataWeek = {};
          row.dataMonth = {};
          row.available = parseInt(row.available, 10);

          const existingDeckIndex = state.decks.findIndex(deck => deck.name === row.name);

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
      }
};

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

      // PRC 01.2024
      return;

      Object.entries(input.decks).forEach(([index, row]) => {
        row.data = {};
        row.dataLong = {};
        row.dataWeek = {};
        row.dataMonth = {};
        row.available = parseInt(row.available, 10);

        const existingDeckIndex = state.decks.findIndex(deck => deck.name === row.name);

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
    SOCKET_CONNECT: async (state, status) => {
      console.log('socket connect', status);
      state.connect = true;

      getDataWithoutSocket(state);
      // Call getDataWithoutSocket every 15 seconds
      setInterval(function(){ getDataWithoutSocket(state); }, 15000);

    },
    SOCKET_KEENUPDATE: (state, input) => {
      console.log('keen update 123');
      // processEntries(state, input, 'data');
    },
    SOCKET_KEENLONGUPDATE: (state, input) => {
      // processEntries(state, input, 'dataLong');
    },
    SOCKET_KEENWEEKUPDATE: (state, input) => {
      console.log('keen week');
      // processEntries(state, input, 'dataWeek');
    },
    SOCKET_KEENMONTHUPDATE: (state, input) => {
      console.log('go123');
      // processEntries(state, input, 'dataMonth');
    },
    SOCKET_KEENTHREEMONTHUPDATE: (state, input) => {
      // processEntries(state, input, 'dataThreeMonth');
    },
  },

  actions: {},
});
