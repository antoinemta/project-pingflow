<template>
  <section class="row body">
    <div class="col-xl-4 infosSearchedBody pb-5 bg-info" >
      <div class="col-sm-8 pb-5">
        <div class="col-12 text-center titleLeft"><span>{{ countrySelec.country }}</span></div>
        <div class="col-12">
      <div class="col-12 py-4 border text-center">
        <img class="w-25" :src="this.countrySelec.flag" />

      </div>
      <div class="col-12 border text-center">
        {{ countrySelec.capital }}

      </div>
      <div class="col-12 border text-center">
        {{ countrySelec.region }}

      </div>
     
      <div class="col-12 border text-center">
        {{ countrySelec.money }}
      </div>
       <div class="col-12 border text-center">
         {{ countrySelec.population }}
      </div>
      </div>
      <div class="col-12 pb-5 d-flex justify-content-center">
          <button class="btn btn-success w-50 mt-4" @click="addCountry">add</button>
        </div>      
      </div>
    </div>
    <div class="col-xl-8 bg-success">
      <div class="col-12 py-5 border containerMap">
         <div id="map" class="border"></div>
      </div>
      <div class="col-12 containerForm border">
       
      </div>
     </div>
  </section>
</template>


<script>

import L from "leaflet";

export default {

  name: 'Home',
  props: {
    socketHome: Object,
    favorites:Object,
    token:String
  },
  data(){return{
    countrySelec:{
    token:this.token,
    country:"",
    capital:"",
    region:"",
    population:0,
    money:"",
    flag:"",
    lat:0,
    lng:0},
    map:null,
    markerGroup:null,
    marker:null
    
    }
  },
  methods:{
      initMap:function () {

      /* This is an calling to server to recup the data */
      
    },
    addCountry:function(){
     if (this.favorites.filter(country => country.country==this.countrySelec.country).length==0)
     {
       this.favorites.push(this.countrySelec);
       this.socketHome.emit('addCountry',this.favorites);
     }
     else{
       alert('no')
     }
    }
  },
  mounted() {
    /* Connection to server created */
    this.socketHome.on('resApi',(res)=>{
        this.countrySelec.country=res[0].name;
        this.countrySelec.capital=res[0].capital;
        this.countrySelec.region=res[0].region;
        this.countrySelec.population=res[0].population;
        this.countrySelec.money=res[0].currencies[0].name;
        this.countrySelec.flag=res[0].flag;
        this.countrySelec.lat=res[0].latlng[0];
        this.countrySelec.lng=res[0].latlng[1];
        this.markerGroup.removeLayer(this.marker);
        this.marker = L.marker([this.countrySelec.lat,this.countrySelec.lng]).addTo(this.markerGroup);
        this.map.setView([this.countrySelec.lat,this.countrySelec.lng], 1.5);
    });
    

    /* We wait the callback there */
    
    this.map =  L.map('map');
    L.tileLayer(
        "http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}",
        {
        maxZoom: 20
        }
      ).addTo(this.map);
    this.markerGroup = L.layerGroup().addTo(this.map);
    this.marker = L.marker([46,2]).addTo(this.markerGroup);
    this.map.setView([46,2], 1.5);
  },
  updated(){
     this.initMap()
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
