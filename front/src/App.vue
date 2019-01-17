<template>
  <div class="container-fluid">
    <Header @connect="connect" @search="search" @selection="selection"/>
    <Body :connected="connected" :searched="searched" :selected="selected"/>
    <Footer />
  </div>
</template>

<!-- I haven't yet used the routes, 
so I use props to change components . -->

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
      connected:true,
      searched:"",
      selected:"fr"
    }
  }
  ,
  methods:{
   connect:function (){
     this.connected=false
   },
   search:function(event){
     this.connected=true
      this.searched=event
   },
   selection:function(event){
     this.selected=event
     
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
