<template>
  <div class="container-fluid">
    <Header :socketHeader="socket" @login="login" @backHome="backHome" />
    <Body :socketBody="socket" :logVue="logVue" />
    <Footer />
  </div>
</template>

<!-- I haven't yet used the routes, 
so I use props to change components . -->

<script>
import io from "socket.io-client";
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import Footer from './components/Footer.vue'

const socket = io.connect("http://localhost:8081");

export default {
  name: 'app',
  components: {
    Header,
    Body,
    Footer
  },
  data(){
    return{
      socket: socket,
      logVue: true
    }
  }
  ,
  methods:{
    login:function() {
      this.logVue=false;
      
    },
    backHome:function(){
      this.logVue=true;
    }
  }
  ,mounted(){
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
