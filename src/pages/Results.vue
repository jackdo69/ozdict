<template>
<q-page class="flex bg-light-blue-10">
    <div class="main">
      <div      
        class="definition"
        v-for="(result, key) in getResults"
        :key="key">
            <div class="text-h4 text-weight-bold">{{result.word}}</div> <br />
           <div class="text-body1">{{result.definition}}</div> <br />
            E.g:<div class="text-body2 text-italic">{{result.example}}</div> <br />
            <div class="text-right">By: <small>{{result.author}} {{result.written_on | subStr}}</small></div>
            
            </div>
                 
      
  </div>
</q-page>
  
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            results: []
        }
    },

    computed: {
        ...mapGetters('results', ['getResults'])
    },
    filters: {
        subStr(str) {
            return str.substring(0,10)
        }
    }
    
}
</script>

<style>
.searchIcon {
  cursor: pointer;
  background-color: #01579b;
  color: white;
  padding: 20px;
}


.definition {
    background-color: antiquewhite;
    box-shadow: 0px 2px 2px grey;
    margin: 20px auto;
    width: 70%;
    padding: 10px;
    border: 1px solid rgb(218, 211, 211);
}
</style>