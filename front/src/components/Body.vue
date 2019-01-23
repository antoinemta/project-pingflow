<template>
  <Detail :countrySelected="countrySelected" :token="token" :country="country"  :socketDetail="socketBody" v-if="this.actifComponent=== 'detail'"/>
  <Home :token="token" :loged="loged" :favorites="favorites" :socketHome="socketBody" v-else-if="this.actifComponent=== 'home'" />
  <Favorites :token="token" :favorites="favorites" :socketFavorites="socketBody" @switchDetail="switchDetail" v-else-if="this.actifComponent==='favorites'" />
  <Registration :socketRegistration="socketBody" v-else/>
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
    favorites:Array,
    token:String,
    actifComponent:String,
    countrySelected:Object
  },
  data(){return{
      country:""
    }
  },
  mounted(){
    
  }

}
</script>



<style scoped>
</style>
