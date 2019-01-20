<template>
  <section class="row body">
   <div class="col-12">
     <div class="col-12 text-center py-4">
      <span class="titleFavoritesPage">Your favorite</span>
     </div>
   <div class="col-12 px-5">
    <div class="row d-flex justify-content-center px-5">
      <div class="col-1 m-3 px-0 border">
        <div class="col-12 py-2 p-3">
          <img class="w-100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/langfr-225px-Flag_of_France.svg.png" />
        </div>
        <div class="col-12 contentBlockFavorite px-2">Lorem ipsum</div>
          <div class="col-12 text-center py-2">
            <button class="btn btn-success mb-1 py-1 px-2">delete</button>
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
    logVue: Boolean
  },
  data(){return{
    
    }
  },
  methods:{
     
  },
  mounted() {
   
  },
  updated(){
     
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
