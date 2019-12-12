<template>
  <q-page class="flex bg-light-blue-10">

    <div class="wrapper">
      <div class="q-gutter-lg">
        <router-link to="/" style="text-decoration:none">
          <div class="text-h3 text-grey-11 text-center">ozdic.com</div>
        </router-link>
        <q-input
          v-on:keyup.enter="handleSearch"
          class="bg-cyan-1"
          v-model="search"
          filled
          placeholder="Search in Urban dictionary..."
        >
          <template v-slot:append>
            <router-link 
              style="text-decoration:none"
              to="/results"><q-icon
              clickable
              to="/results"
              @click="handleSearch"
              class="searchIcon"
              name="search" /></router-link>
            
          </template>
        </q-input>
      </div>
    </div>
    
  </q-page>
</template>

<script>

import {axios} from "boot/axios";
import EventBus from 'boot/event-bus'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      search: "",
      results: []
    };
  },
  methods: {
    ...mapActions('results', ['loadResults','clearResults']),

    handleSearch() {
      EventBus.$emit('searched')
      this.$router.push({path: '/results'})
      const axios = require("axios");

      axios({
        method: "GET",
        url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":
            "mashape-community-urban-dictionary.p.rapidapi.com",
          "x-rapidapi-key": "ba1a4bc518msh13bf91982ba0f20p162cb4jsn79563a4b3071"
        },
        params: {
          term: this.search
        }
      })
        .then(response => {
          this.results = [...response.data.list];
          let definition = this.results[0].definition 
          this.clearResults()
          this.loadResults(this.results)
          
          
        })
        .catch(error => {
          console.log(error);
          
        });
    }
  }
};
</script>

<style>
.searchIcon {
  cursor: pointer;
  background-color: #01579b;
  color: white;
  padding: 20px;
}

.wrapper {
  margin: 20em auto;
  width: 60%;
}
</style>
