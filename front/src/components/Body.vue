<template>
  <Home :socketHome="socketBody" v-if="logVue"/>
</template>



<script>


import Home from './Home.vue'

export default {

  name: 'Body',
  components:{
    Home
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
