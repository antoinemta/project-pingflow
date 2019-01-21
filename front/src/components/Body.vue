<template>
  <Home :socketHome="socketBody" v-if="logVue"/>
  <Registration :socketRegistration="socketBody" v-else-if="!logVue && !loged"/>
  <Favorites v-else/>
</template>



<script>


import Home from './Home.vue'
import Registration from './Registration.vue'
import Favorites from './Favorites.vue'

export default {

  name: 'Body',
  components:{
    Home,
    Registration,
    Favorites
  },
  props: {
    socketBody: Object,
    logVue: Boolean,
    loged:Boolean
  },
  data(){return{
    
    }
  },
  methods:{
      
  },
  mounted() {

  },
  updated(){
     
  }

}


</script>


<style scoped>


</style>
