<template>
<div>
  <div v-if="user">
    <div class="header">
    
        <h1>{{user.name}}</h1>
        <a href="#" @click="logout" id="logout-button"><button>Logout</button></a>
      
      <div>
        
      </div>
    </div>
    <div class="make-tweet">
      <form @submit.prevent="addTweet">
        <textarea class="tweet-edit-box" v-model="text" placeholder="Your tweet"></textarea>
        <br>
        <button type="submit" class="post-button">Post</button>
      </form>
    </div>
    <h2>My Tweets</h2>
    <tweet-stream :tweets="tweets" />
  </div>
  <div v-else>
    <p>If you would like to post a tweet, please register for an account or login.</p>
    <router-link to="/register" class="button">Register</router-link> or
    <router-link to="/login" class="button">Login</router-link>
  </div>
</div>
</template>

<script>

import TweetStream from '@/components/TweetStream.vue'

export default {
  name: 'profile',
  components: {
    TweetStream,
  },
  data() {
    return {
      show: false,
      text: ""
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    tweets() {
      
      return this.$store.state.tweets;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyTweets");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    async addTweet() {
      try {
        

        this.error = await this.$store.dispatch("addTweet", {text: this.text});
        if (!this.error) {
          this.text = '';
          // this.$emit('uploadFinished');
          this.error = await this.$store.dispatch("getMyTweets");
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  }
}
</script>

<style scoped>
.header {
  display: flex;
  flex-flow: row nowrap;
  margin-left: 15px;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}

#logout-button {
  font-size: 12pt;
  margin-top: 10px;
}



.post-button {
    background-color: skyblue;
    border-style: none;
    border-radius: 5px;
    margin-bottom: 30px;
    font-size: 18pt;
}

.post-button:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.tweet-edit-box {
  width: 50%;
  resize: none;
  border-style: none;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
}


</style>