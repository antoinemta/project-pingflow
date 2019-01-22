<template>
  <div class="container-fluid">
    <Header :loged="loged" :socketHeader="socket" @login="login" @backHome="backHome" @deco="deco" />
    <Body :detail="detail" :socketBody="socket" :logVue="logVue" :loged="loged" :favorites="favorites" :token="token" />
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
const token = localStorage.getItem("token");

  

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
      logVue: true,
      loged: false,
      detail:false,
      token: token,
      favorites:[]
    }
  }
  ,
  methods:{
    login:function() {
      
      this.detail=false;
      this.logVue=false;
      
    },
    backHome:function(){
      this.logVue=true;
      this.detail=false;
    },
    deco:function(){
      this.loged=false;
      this.detail=false;
      this.favorites=[];
      localStorage.removeItem('token');
    }
  }
  ,mounted(){
   
  if (this.token){
    socket.emit('check',this.token);
  }

  socket.on('recupToken',(token, favorites)=>{
    localStorage.setItem('token',token)
    this.loged=true;
    this.favorites=favorites;
    this.token=token;
  });
    
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
