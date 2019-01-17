<template>
  <section class="row body">
    <span class="d-none">{{ searched }}{{ selected }}</span>
    <div class="col-12"  v-if="connected">
      <div class="col-12 mt-4 mb-3 d-flex justify-content-center py-2">
        <h1>{{country}}</h1>
      </div>
    <div class="col-12 d-flex justify-content-center py-2">
      <h4>{{state}}</h4>
    </div>
    <div class="col-12 d-flex justify-content-center py-2">
      <h6>{{city}}</h6>
    </div>
    
    <div class="col-12 containerMap">
      <div id="map"></div>
    </div>  
    <div class="col-12 d-flex justify-content-center mt-5">
      Join this city into your favorites ! <button class="ml-3 btn btn-success">Go</button>
    </div> 
  </div>
  <div class="col-12 containerLogin" v-else>
    <div class="col-3 border px-5 pb-5 textAlignCenter">
      <div class="col-12 mb-4 pt-3">Log in</div>
      <input class="col-12 mb-4" type="text" />
      <input class="col-12 mb-4" type="text" />
      <button class="btn btn-success">Go</button>
    </div>
  </div>
</section>

</template>



<script>

import io from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {

  name: 'Body',
  props: {
    connected:Boolean,
    searched:String,
    selected:String
  },
  data(){return{
    country:"",
    city:"",
    state:"",
    lat:0,
    lng:0,
    map:null
    }
  },
  methods:{
      initMap:function () {

      /* This is a api to recup the datas of city */

      fetch(`http://api.zippopotam.us/${this.selected}/${this.searched}`)
      .then(results => results.json())
      .then(data => {
        this.city=data.places[0]['place name'];
        this.country=data.country;
        this.state=data.places[0].state;
        let lat = data.places[0].latitude;
        let lng = data.places[0].longitude; 
        this.map.setView([lat, lng], 16);
        L.marker([lat, lng]).addTo(this.map);
    });
    }
  },
  mounted() {
    
    const socket = io.connect('http://localhost:8081');
    this.map =  L.map('map');
    L.tileLayer(
        "http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}",
        {
        maxZoom: 20
        }
      ).addTo(this.map);
      this.map.setView([0, 0], 1.5);
  },
  updated(){
     this.initMap()
  }

}


</script>


<style scoped>

.textAlignCenter{
  text-align:center;
}
.body {
 height:80vh;
}
.containerMap{
  height:50%;
  display:flex;
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
  height:100%;
}
</style>
