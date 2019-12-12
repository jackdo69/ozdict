<template>
  <q-layout view="hHh Lpr fff">
    <q-header
      v-if="headerState"
      elevated>
      <div class="q-pa-md row">
        <router-link
           
          style="text-decoration:none"
          to="/"><div
          @click="backToIndex"
          clickable
          style="cursor:pointer"
          class="text-h6 text-grey-11 text-center">ozdic.com</div></router-link>
        
        <q-input
          v-on:keyup.enter="handleSearch"
          class="inputHeader"
          v-model="search"
          filled
          placeholder="Search in Collocation dictionary..."
        >
          <template v-slot:append>
            <router-link to="/results" style="text-decoration:none">
              <q-icon @click="handleSearch" class="searchIconHeader" name="search" />
            </router-link>
            
          </template>
        </q-input>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {axios} from "boot/axios";
import EventBus from 'boot/event-bus'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      search: "",
      results: [],
      headerState: false
    };
  },

  mounted() {
    EventBus.$on('searched', () => {
      this.headerState = true 
    }) 
  },

  methods: {
    ...mapActions('results', ['loadResults','clearResults']),
    backToIndex() {
      console.log('triggered');
      this.search = '';
      this.headerState = false
    },
    handleSearch() {
      
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

<style scoped>
.inputHeader {
  margin-left: 5em;
  background-color: rgb(238, 234, 234);
  width: 40%;
  height: 2.5em;
  padding: none;
}

.searchIconHeader {
  cursor: pointer;
}
</style>
