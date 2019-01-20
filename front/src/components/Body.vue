<template>
  <Home :socketHome="socketBody" v-if="logVue"/>
  <Registration :socketRegistration="socketBody" v-else-if="!logVue"/>
</template>



<script>


import Home from './Home.vue'
import Registration from './Registration.vue'

export default {

  name: 'Body',
  components:{
    Home,
    Registration
  },
  props: {
    socketBody: Object,
    logVue: Boolean
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
