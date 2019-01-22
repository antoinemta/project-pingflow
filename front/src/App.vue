<template>
  <div class="container-fluid">
    <Header :loged="loged"
      :socketHeader="socket"
      @switchComponent="switchComponent" />
      <Body :actifComponent="actifComponent" 
      @switchComponent="switchComponent" 
      :socketBody="socket" 
      :loged="loged" 
      :favorites="favorites" 
      :token="token" />
    <Footer />
  </div>
</template>



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
      loged: false,
      token: token,
      favorites:[],
      actifComponent:"home"
    }
  }
  ,
  methods:{

    switchComponent:function(event){

      if (event=='deco'){
        this.loged=false;
        this.favorites=[];
        localStorage.removeItem('token');
      }
      this.actifComponent=event;
    }
    
  }
  ,mounted(){
   
  if (this.token){
    socket.emit('checkingToken',this.token);
  }

  socket.on('log',(token, favorites)=>{
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
