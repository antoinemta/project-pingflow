<template>
  <section class="row body">
    <div class="col-xl-4 containerDatas" >
      <div class="col-sm-8 pb-5 bg-light SquareDatas">
        <div class="col-12 text-center pt-4 titleDatas"><span>{{ countrySelected.country }}</span></div>
        <div class="col-12">
      <div class="col-12 borderBottom py-4 text-center">
        <img class="w-25" :src="this.countrySelected.flag" />

      </div>
      <div class="col-12 borderBottom text-center">
        {{ countrySelected.capital }}

      </div>
      <div class="col-12 borderBottom text-center">
        {{ countrySelected.region }}

      </div>
     
      <div class="col-12 borderBottom text-center">
        {{ countrySelected.money }}
      </div>
       <div class="col-12 borderBottom text-center">
         {{ countrySelected.population }}
      </div>
      </div>
      <div class="col-12 pb-5 d-flex justify-content-center">
          <button class="btn btn-success w-50 mt-4" @click="addData" v-if="this.loged && !this.alreadyAdded">add</button>
        </div>   
      </div>
    </div>
    <div class="col-xl-8">
      <div class="col-12 py-5 containerMap">
         <div id="map"></div>
      </div>
      <div class="col-12 containerForm">
       
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
    favorites:Array,
    token:String,
    loged:Boolean
  },
  data(){return{
    alreadyAdded:false,
    countrySelected:{
    token:this.token,
    country:"------",
    capital:"------",
    region:"------",
    population:0,
    money:"------",
    flag:"------",
    lat:0,
    lng:0
    },
    map:null,
    markerGroup:null,
    marker:null
    }
  },
  methods:{
    addData:function(){
       this.favorites.push(this.countrySelected);
       this.socketHome.emit('addCountry',this.favorites);
       this.alreadyAdded=true
    }
  },
  mounted() {
    /* Connection to server created */
        this.socketHome.on('resApi',(res, alreadyAdded)=>{
        this.alreadyAdded=alreadyAdded;
        this.countrySelected.country=res[0].name;
        this.countrySelected.capital=res[0].capital;
        this.countrySelected.region=res[0].region;
        this.countrySelected.population=res[0].population;
        this.countrySelected.money=res[0].currencies[0].name;
        this.countrySelected.flag=res[0].flag;
        this.countrySelected.lat=res[0].latlng[0];
        this.countrySelected.lng=res[0].latlng[1];
        this.markerGroup.removeLayer(this.marker);
        this.marker = L.marker([this.countrySelected.lat,this.countrySelected.lng]).addTo(this.markerGroup);
        this.map.setView([this.countrySelected.lat,this.countrySelected.lng], 1.5);
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
}

</script>


<style scoped>

.borderBottom{
  border-bottom:1px black solid;
}

.SquareDatas
{
  border:2px black solid;
}

.titleDatas
{
  padding-bottom:11vh;
}

.containerDatas
{
  display:flex;
  justify-content:center;
  align-items:center;
}

.body {
 min-height:80vh;
 background:url('background.jpg');
 background-size:100% 100%;
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

#map
{
  width:100%;
  height:90%;
  border:2px black solid;
}

@media (max-width: 800px) {
  .containerForm{
    height: 40vh;
  }

  .containerMap{
    height:60vh;
    padding-left:2px;
    padding-right:2px;
  }
}

</style>
