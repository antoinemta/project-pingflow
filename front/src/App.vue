<template>
  <div class="container-fluid">
    <Header @registration="registration" />
    <Body :connected="connected" />
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
      connected:true
    }
  }
  ,
  methods:{
   registration:function (){
     this.connected=false
     alert(this.connected)
     
     
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
