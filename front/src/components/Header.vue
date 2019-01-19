<template>
  <header class="row bg-dark">
     <div class="col-xl-3 py-3 bg-success logoHeader">
       Lorem Ipsum !
     </div>
      <div class="col-xl-5 bg-danger">
        <div class="row py-3 inputsGroupSearchHeader">
          <div class="col-md-5 border">
            <input type="text" class="w-100 my-1" placeholder="Tape a country" />
          </div>
          <div class="col-md-2 border">
            <input type="submit" class="btn btn-success w-100"/>
          </div>
        </div>
       </div>
     <div class="col-xl-4 bg-dark d-flex justify-content-center">
       <div class="col-md-10"> 
        <div class="row py-3 inputsGroupSearchHeader">
          <div class="col-md-5 pr-3 pl-0 border">
            <input type="text" class="w-100 my-1" placeholder="Tape a country" />
          </div>
          <div class="col-md-5 pl-0 pr-3 border">
            <input type="text" class="w-100 my-1" placeholder="Tape a country" />
          </div>
          <div class="col-md-2 px-0 border">
            <input type="submit" value="Log in" class="btn btn-success w-100"/>
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

@media (max-width: 800px) {
  .textAlignRight {
  text-align:center;
  }
}
</style>
