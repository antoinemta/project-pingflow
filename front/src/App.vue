<template>
  <div class="container-fluid">
    <Header :connected="connected" @connect="connect" @registration="registration" @search="search" />
    <Body :registred="registred" :searched="searched" />
    <Footer />
  </div>
</template>



<script>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Body,
    Footer
  },
  data(){
    return{
      connected:false,
      registred:false,
      searched:""
    }
  }
  ,
  methods:{
    registration:function(){
      this.registred=!this.registred
    },
    connect:function(){
      this.connected=!this.connected
    },
    search:function(event){
      this.searched=event
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
