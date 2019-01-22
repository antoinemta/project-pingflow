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

        </div>      
      </div>
    </div>
    <div class="col-xl-8 bg-success">
      <div class="col-12 py-5 border containerMap">
         <div id="map" class="border"></div>
      </div>
      <div class="col-12 containerForm border">
        <div class="col-12 h-50 border">
        <input type="text" class="h-100 w-100 inputComment" :placeholder="comment"  v-model="commentModif"/>
        </div>
        <div class="col-12 pt-4 text-center border"><button class="btn btn-danger btn-lg" @click="changeComment">Post it</button></div>
      </div>
     </div>
  </section>
</template>


<script>

import L from "leaflet";

export default {

  name: 'Detail',
  props: {
    socketDetail: Object,
    favorites:Object,
    token:String,
    country:String
  },
  data(){return{
    countrySelec:{
    token:this.token,
    country:this.country,
    capital:"",
    region:"",
    population:0,
    money:"",
    flag:"",
    lat:0,
    lng:0},
    map:null,
    markerGroup:null,
    marker:null,
    comment:"",
    commentModif:""
    
    }
  },
  methods:{
      initMap:function () {

      /* This is an calling to server to recup the data */
      
    },
    changeComment:function(){
      this.comment=this.commentModif;

      this.socketDetail.emit('modifComment',this.comment, this.countrySelec.country, this.countrySelec.token);

    }
  },
  mounted() {
    this.socketDetail.emit('fetchCountry',this.country,this.token);
    /* Connection to server created */
    this.socketDetail.on('recupFetch',(res)=>
    {
        this.countrySelec.country=res[0].country;
        this.countrySelec.capital=res[0].capital;
        this.countrySelec.region=res[0].continent;
        this.countrySelec.population=res[0].population;
        this.countrySelec.money=res[0].money;
        this.countrySelec.flag=res[0].flag;
        this.countrySelec.lat=res[0].lat;
        this.countrySelec.lng=res[0].lng;
        this.comment=res[0].comment;
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
