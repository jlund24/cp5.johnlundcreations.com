<template>
<div id="content">
    
    <div class="tweet-container">
        <div class="tweet" v-for="tweet in tweets" v-bind:key="tweet._id">
        <!-- <img :src="photo.path" /> -->
        
        <div class="tweetDate">
        <span class="username" v-if="tweet.user.name">{{tweet.user.name}} </span>
        {{formatDate(tweet.created)}}
        </div>
        <div class="tweet-text">{{tweet.text}}</div>
        </div>
    </div>
    
  
    
    
  </div>

</template>

<script>
import moment from 'moment';

export default {
  name: 'TweetStream',
  props: {
    tweets: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    
  },
  
}
</script>

<style scoped>

.tweet {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  
  border-radius: 5px;
  /* margin: auto; */
  /* width: 50%; */
  background-color: white;
  text-align: left;
  padding: 10px;
  margin-bottom: 15px;
  
}

.tweet-container {
    margin: auto;
    width: 50%;
}

.tweet:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

#content {
    text-align: center;
    width: 100%;
    
}

.username {
    font-weight: bold;
    font-size: 14pt;
    color: black;
    padding-right: 10px;
}

.tweetDate {
    color: gray;
    font-size: 10pt;
    margin-bottom: 10px;
}


</style>