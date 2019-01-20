<template>
  <header class="row bg-dark">
     <div class="col-xl-3 py-3 bg-success logoHeader" @click='backHome'>
       Lorem Ipsum !
     </div>
      <div class="col-xl-4 bg-danger pr-5">
        <div class="row py-3 inputsGroupSearchHeader">
          <div class="col-md-6 border">
            <input type="text" class="w-100 my-1" placeholder="Tape a country" v-model="countrySearched" />
          </div>
          <div class="col-md-3 border">
            <input type="submit" class="btn btn-success w-100"   @click='sendSearch'/>
          </div>
        </div>
       </div>
     <div class="col-xl-5 bg-dark d-flex justify-content-center">
       <div class="col-md-10"> 
        <div class="row py-3 inputsGroupSearchHeader">
          <div class="col-md-4 pr-3 pl-0 border">
            <input type="text" class="w-100 my-1" placeholder="Tape a country" />
          </div>
          <div class="col-md-4 pl-0 pr-3 border">
            <input type="text" class="w-100 my-1" placeholder="Tape a country" />
          </div>
          <div class="col-md-2 my-1 px-2 border">
            <input type="submit" value="Log in" class="btn btn-success w-100"/>
          </div>
          <div class="col-md-2 my-1 px-2 border">
            <input type="submit" value="Log in" class="btn btn-success w-100" @click="login" />
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
    socketHeader:Object
  },
  data(){
    return{
      countrySearched:""
    }
  },
  methods:{
    sendSearch:function() {
      this.socketHeader.emit('countrySearched',this.countrySearched);
    }
    ,
    login:function(){
      this.$emit('login');
    },
    backHome:function(){
      this.$emit('backHome');
    }
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
