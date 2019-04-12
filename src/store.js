import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: [],
    user: null,
  },
  mutations: {
    setTweets(state, tweets) {
      state.tweets = tweets;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllTweets(context) {
      try {
        let response = await axios.get("/api/tweets/all");
        context.commit('setTweets', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getMyTweets(context) {
      try {
        let response = await axios.get("/api/tweets");
        context.commit('setTweets', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async addTweet(context, data) {
      try {
        await axios.post('/api/tweets', data);
        return "";

      } catch(error) {
        return error.response.data.message;
      }
    }
  }
})
