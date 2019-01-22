<template>
  <Detail :country="country" :token="token" :socketDetail="socketBody" v-if="loged && detail"/>
  <Home :token="token" :favorites="favorites" :socketHome="socketBody" v-else-if="logVue && !detail"/>
  <Registration :socketRegistration="socketBody" v-else-if="!logVue && !loged && !detail"/>
  <Favorites :token="token" :favorites="favorites" :socketFavorites="socketBody" @detail="detailFonc" v-else/>
</template>



<script>


import Home from './Home.vue'
import Registration from './Registration.vue'
import Favorites from './Favorites.vue'
import Detail from './Detail.vue'

export default {

  name: 'Body',
  components:{
    Home,
    Registration,
    Favorites,
    Detail
  },
  props: {
    socketBody: Object,
    logVue: Boolean,
    loged:Boolean,
    favorites:Object,
    token:String,
    detail:Boolean
  },
  data(){return{
      country:""
    }
  },
  methods:{
    detailFonc:function (event) {
      this.detail=true;
      this.country=event;
      
      
    }
      
  },
  mounted() {

  },
  updated(){
     
  }

}


</script>


<style scoped>


</style>
