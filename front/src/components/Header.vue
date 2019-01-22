<template>
  <header class="row bg-dark">
     <div class="col-xl-3 py-3 bg-success logoHeader"  @click="switchComponent('home')">
       Lorem Ipsum !
     </div>
      <div class="col-xl-4 bg-danger pr-5">
        <div class="row py-3 inputsGroupSearchHeader">
          <div class="col-md-6 border">
            <input type="text" class="w-100 my-1" placeholder="Tape a country" v-model="countrySearched" />
          </div>
          <div class="col-md-3 border">
            <input type="submit" class="btn btn-success w-100" @click='sendSearch'/>
          </div>
        </div>
       </div>
     <div class="col-xl-5 bg-dark d-flex justify-content-center">
       <div class="col-md-10"> 
        <div class="row py-3 inputsGroupSearchHeader">
          <div class="col-md-4 pr-3 pl-0 border" v-if="!loged">
            <input type="text" class="w-100 my-1" placeholder="pseudonyme" v-model="userLog.pseudonyme" />
          </div>
          <span class="pr-3 text-danger" v-if="reponseMessage.inputPseu">Pseudonyme inexistant</span>
          <div class="col-md-4 pl-0 pr-3 border" v-if="!loged">
            <input type="password" class="w-100 my-1" placeholder="password" v-model="userLog.password" />
          </div>
          <span class="pr-3 text-danger"  v-if="reponseMessage.inputPass">Mot de passe incorect</span>
          <div class="col-md-2 my-1 px-2 border" v-if="!loged">
            <input type="submit" value="Log in" class="btn btn-success w-100" @click="conex" />
          </div>
          <div class="col-md-2 my-1 px-2 border" v-else>
            <input type="submit" value="Favorites" class="btn btn-success w-100"  @click="switchComponent('favorites')"/>
          </div>
          <div class="col-md-2 my-1 px-2 border" v-if="!loged">
            <input type="submit" value="Log up" class="btn btn-success w-100" @click="switchComponent('registration')" />
          </div>
          <div class="col-md-2 my-1 px-2 border" v-else>
            <input type="submit" value="Deco" class="btn btn-success w-100" @click="switchComponent('deco')" />
          </div>
          
          </div>
        </div>
     </div>
  </header>
</template>


<script>
  export default {
  name: 'Header',
  props:{
    socketHeader:Object,
    loged:Boolean
  },
  data(){
    return{
      countrySearched:"",
      userLog:{pseudonyme:"",
      password:""},
      reponseMessage:{inputPseu:false,
      inputPass:false
      }
    }
  },
  methods:{
    switchComponent:function(event){
      this.userLog.pseudonyme="";
      this.userLog.password="";
      this.$emit('switchComponent',event)
    },
    sendSearch:function() {
      this.socketHeader.emit('countrySearched',this.countrySearched);
    },
    conex:function(){
      this.reponseMessage.inputPseu=false;
      this.reponseMessage.inputPass=false;
      this.socketHeader.emit('login',this.userLog);
    }
  },
  mounted(){
    this.socketHeader.on('falseLog',(res)=>{
      this.reponseMessage=res;
    });
  }
}
</script>


<style scoped>
header{
  min-height:10vh;
}

.inputsGroupSearchHeader
{
  display:flex;
  justify-content:center;
  align-items:center;
  height:100%;
}

.logoHeader{
  color:white;
  font-size:2.0em;
  font-weight:bold;
  display:flex;
  align-items:center;
  justify-content:center;
}

.textAlignRight{
  text-align:right;
}

.textAlignCenter
{
  text-align:center;
}

.widthSelect{
  width:11%;
}
</style>
