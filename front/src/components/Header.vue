<template>
  <header class="row bg-dark text-white py-4">
    <div class="col-md-6">
    <div class="row">
      <div class="col-md-6 textAlignRight pr-5"><h1>Find your city !</h1></div>
      
      <div class="col px-5"><input class="w-100"></div>
      </div>
    </div>
    <div class="col px-0 pr-5 textAlignRight">
      <span v-if="!connected" class="pr-3">Connect you !</span>
      <span v-if="connected">Go to your favorites</span>
      <input type="text" class="ml-2" v-if="!connected" />
      <input type="password" class="ml-3" v-if="!connected" />
      <button class="btn btn-success ml-4" v-if="!connected" @click="connect">Go</button>
      <button class="btn btn-success ml-4" v-if="!connected" @click="registration">Log in</button>
      <button class="btn btn-success ml-4" v-if="connected">See favorites</button>
      <button class="btn btn-success ml-4" v-if="connected" @click="connect">Log out</button>
    </div>
  </header>
</template>

<script>
  export default {
  name: 'Header',
  props:{
    connected:Boolean
  },
  methods:{
    registration: function(){
      this.$emit('registration')
    },
    connect: function(){
      this.$emit('connect');
    }
  }
}



</script>


<style scoped>
header{
  min-height:10vh;
}

.textAlignRight{
  text-align:right;
}

.textAlignCenter
{
  text-align:center;
}

@media (max-width: 800px) {
  .textAlignRight {
  text-align:center;
  }
}


</style>
