import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// Т.к. у нас нет API с пользователями, подготовим Vuex для таких запросов ниже, а пользователей будем пока-что брать просто из константы users:
const users = [
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    location: "Mexico, Cancun",
    title: "Brunch this weekend?",
    score: 5,
    subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
    location: "Iran, Bagdad",
    title: 'Summer BBQ',
    subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
    country: "USA",
    location: "USA, 1st Street",
    title: "Oui oui",
    score: 25,
    subtitle:
      '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
    country: "Russia",
    location: "Russia, Lenin Street",
    title: "Birthday gift",
    score: 15,
    subtitle:
      '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  {
    avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    country: "USA",
    location: "USA, 2nd Street",
    title: "Recipe to try",
    score: 30,
    subtitle:
      '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
]

export default new Vuex.Store({
  state: {
    users: [],
    filters: {
      country: null,
      score: null
    },
    loading: false
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setFilters(state, filters) {
      state.filters = filters;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('setLoading', true);
      try {
        const response = await axios.get('https://reqres.in/api/users');
        commit('setUsers', users, response);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        commit('setLoading', false);
      }
    },
    updateFilters({ commit }, filters) {
      commit('setFilters', filters);
    }
  },
  getters: {
    filteredUsers(state) {
      return state.users.filter(user => {
        let matchesCountry = state.filters.country ? user.country === state.filters.country : true;
        let matchesScore = state.filters.score ? eval(`${user.score} ${state.filters.score}`) : true;
        return matchesCountry && matchesScore;
      });
    }
  }
});
