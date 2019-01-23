<template>
  <section class="row body">
   <div class="col-12">
     <div class="col-12 text-center py-4">
      <span class="titleFavoritesPage">Your favorite</span>
     </div>
    <div class="col-12 px-5">
    <div class="row d-flex justify-content-center px-5">

      <div class="col-xl-1 col-lg-2 col-md-3 col-sm-4 m-3 px-0 bg-light border" v-for="favorite in this.favorites">
        <div  class="col-12 py-2 p-3">
          <img :id="favorite.country" class="w-100" :src="favorite.flag"  @click="switchDetail"/>
        </div>
        <div class="col-12 contentBlockFavorite px-2">{{ favorite.country }}</div>
          <div class="col-12 text-center py-2">
            <button :id="favorite.country" class="btn btn-success mb-1 py-1 px-2" @click="deleteCountry">delete</button>
          </div>
        </div>
      </div>

    </div>
   </div>
  </section>
 </template>



<script>

export default {

  name: 'Favorites',
  props: {
    socketFavorites: Object,
    logVue: Boolean,
    favorites:Array,
    token:String
  },
  methods:{
    deleteCountry:function(event) {
      this.socketFavorites.emit('deleteCountry',event.target.id,this.favorites,this.token)
    },
    switchDetail:function(event){ 
      this.socketFavorites.emit('fetchCountry',event.target.id,this.token);
    }  
  }
}

</script>



<style scoped>

.body {
 min-height:80vh;
 background:url('background.jpg');
 background-size:100% 100%;
}

.titleFavoritesPage{
  font-size:2.5em;
  font-weight:bold;
}
.contentBlockFavorite{
  word-wrap:break-word;
  text-align:center;
}



</style>
