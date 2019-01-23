<template>
  <section class="row body">
   <div class="col-12 containerInputs">
    <div class="col-xl-3 bg-light col-md-6 border">
      <div class="col-12 text-center pt-3 titleContainerInputs">
      Sign on
    </div>
    <div class="col-12 text-center py-3 px-5">
      <input type="text" class="w-100" v-model="user.pseudonyme" />
    </div>
    <div class="col-12 text-center text-danger" v-if="response.display[0]">Pseudonyme already used</div>
    <div class="col-12 text-center py-3 px-5">
      <input type="password" class="w-100" v-model="user.password" />
    </div>
    <div class="col-12 text-center text-danger" v-if="response.display[1]">passwords differents</div>
    <div class="col-12 text-center py-3 px-5">
      <input type="password" class="w-100" v-model="user.passwordVerif" />
    </div>
    <div :class="'col-12 text-center ' +response.textColor" v-if="response.display[2]">{{ response.message }}</div>
    <div class="col-12 text-center py-3 px-5">
      <button class="btn btn-info" @click="sendRegister">connection</button>
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
    },
    response:{
      display:[false,false,false],
      textColor:"",
      message:""
    }
    }
  }
  ,
  methods:{
      sendRegister:function() {
        if (this.user.password==this.user.passwordVerif){
          this.socketRegistration.emit('sendLog',this.user);
      }
      else{
        this.response.display=[false, true, true];
        this.response.textColor="text-danger";
        this.response.message="passwords differents";
      }
    }
    
  },
  mounted(){
    this.socketRegistration.on('responseInsert',(res)=>{
        this.response=res;
    });
  }

}
</script>


<style scoped>
.containerInputs{
  display:flex;
  justify-content:center;
  align-items:center;
}

.titleContainerInputs{
  font-weight:bold;
  font-size:1.3em;
}

.body {
 min-height:80vh;
 background:url('background.jpg');
 background-size:100% 100%;
}
</style>
