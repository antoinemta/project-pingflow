<template>
  <section class="row body">
  <div class="col-12 inputsGroupLog">

    <div class="col-3 border">
      <div class="col-12 text-center">
      Lorem Ipsum
    </div>
    <div class="col-12 text-center py-3 px-5">
      <input type="text" class="w-100" v-model="user.pseudonyme" />
    </div>
    <div class="col-12 text-center py-3 px-5">
      <input type="text" class="w-100" v-model="user.password" />
    </div>
    <div class="col-12 text-center py-3 px-5">
      <input type="text" class="w-100" v-model="user.passwordVerif" />
    </div>
    <div class="col-12 text-center py-3 px-5">
      <button @click="sendLog">connection</button>
    </div>
  </div>
</div> 
 </section>
</template>



<script>



export default {

  name: 'Registration',
  props: {
    socketRegistration: Object
  },
  data(){return{
    user:{
      pseudonyme:"",
      password:"",
      passwordVerif:""
    }
    }
  }

  ,
  methods:{
      sendLog:function() {
        if (this.user.password==this.user.passwordVerif){
          this.socketRegistration.emit('sendLog',this.user);
      }
      else{
        alert('passwords differents');
      }
      }
    
  },
  mounted(){
  
  }

}


</script>


<style scoped>


.inputsGroupLog{
  display:flex;
  justify-content:center;
  align-items:center;
}

.titleLeft
{
  padding-bottom:11vh;
}

.titleFavoritesPage{
  font-size:2.5em;
  font-weight:bold;
}

.infosSearchedBody
{
  display:flex;
  justify-content:center;
  align-items:center;
}

.contentBlockFavorite{
  word-wrap:break-word;
  text-align:center;
}

.textAlignCenter{
  text-align:center;
}

.body {
 min-height:80vh;
}

.containerForm{
  padding-left:6%;
  padding-right:6%;
  height:40%;
}

.containerMap{
  height:60%;
  display:flex;
  align-items:center;
  padding-left:17%;
  padding-right:17%;

}
.containerLogin{

  display:flex;
  justify-content: center;
  align-items: center;
}

#map
{
  width:100%;
  height:90%;
}

@media (max-width: 800px) {
  .containerForm{
    height: 40vh;
  }

  .containerMap{
    height:60vh;
  }
}

</style>
