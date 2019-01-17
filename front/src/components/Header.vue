<template>
  <header class="row bg-dark text-white py-4">
      <div class="col-lg-2 textAlignRight pr-5"><h2>Find your city !</h2></div>
      <div class="col-lg-4 px-5"><input type="text" class="w-50 mr-3" v-model="searched" />Pays :<select class="widthSelect ml-2" v-model="countrySearched" @change="selection"><option>fr</option><option>us</option></select><button class="btn btn-success ml-4 mt-2" @click="search">Search</button></div>
    <div class="col px-0 pr-5 textAlignRight">
      <span class="pr-3">Connect you !</span>
      <span>Go to your favorites</span>
      <input type="text" class="ml-2" />
      <input type="password" class="ml-3" />
      <button class="btn btn-success ml-4 mb-2 mt-2">Go</button>
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
      searched:"",
      countrySearched:"fr"
    }
  },
  methods:{
    connect: function(){
      this.$emit('connect');
    },
    search: function(){
      this.$emit('search',this.searched);
    },
    selection:function(){
      this.$emit('selection',this.countrySearched);
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

.widthSelect{
  width:8%;
}

@media (max-width: 800px) {
  .textAlignRight {
  text-align:center;
  }
}
</style>
