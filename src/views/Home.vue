<template>
  <div class="home">
    <button @click="goToProfile" class="create">Create Tweet</button>
    <tweet-stream :tweets="tweets" />
  </div>
</template>

<script>
// @ is an alias to /src

import TweetStream from '@/components/TweetStream.vue'

export default {
  name: 'home',
  components: {
    TweetStream
  },
  computed: {
    tweets() {
      return this.$store.state.tweets;
    }
  },
  async created() {
    await this.$store.dispatch("getAllTweets");
  },
  methods: {
    goToProfile() {
      this.$router.push('profile');
    }
  }
}
</script>

<style scoped>
.home {
  margin-top: 40px;
  
}

.create {
    background-color: skyblue;
    border-style: none;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 24pt;
}

.create:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

</style>
