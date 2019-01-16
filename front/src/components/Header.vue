<template>
  <header class="row bg-dark text-white py-4">
    <div class="col-md-6">
    <div class="row">
      <div class="col-md-6 textAlignRight pr-5"><h1>Find your city !</h1></div>
      <div class="col px-5 d-flex"><input type="text" class="w-100" v-model="searched"><button class="btn btn-success ml-4" @click="search">Search</button></div>
      </div>
    </div>
    <div class="col px-0 pr-5 textAlignRight">
      <span class="pr-3">Connect you !</span>
      <span>Go to your favorites</span>
      <input type="text" class="ml-2" />
      <input type="password" class="ml-3" />
      <button class="btn btn-success ml-4">Go</button>
      <button class="btn btn-success ml-4" @click="connect">Log in</button>
    </div>
  </header>
</template>


<script>
  export default {
  name: 'Header',
  props:{
    connected:Boolean
  },
  data(){
    return{
      searched:""
    }
  },
  methods:{
    connect: function(){
      this.$emit('connect');
    },
    search: function(){
      this.$emit('search',this.searched);
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
