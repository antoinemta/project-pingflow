<template>
  <section class="row body">
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
    <div class="col-12 d-flex justify-content-center">
        Join this city into your favorites ! <button>Go</button>
      </div> 



   </div>

   <div class="col-12 containerLogin" v-else>
      

 <div class="col-3 border px-5 pb-5 textAlignCenter">
   <div class="col-12 mb-4">Log in</div>
   <input class="col-12 mb-4" type="text" />
   <input class="col-12 mb-4" type="text" />
   <button>Go</button>
</div>



   </div>
  </section>
</template>

<script>

import L from "leaflet";


export default {

  
  
  name: 'Body',
  props: {
    connected:Boolean,
    searched:String
  },
  data(){return{
    country:"",
    city:"",
    state:""
    }
  },
  mounted() {
    
    var vm = this;

    vm.map = L.map("map", {
      center: [10.0, 5.0],
      minZoom: 2,
      zoom: 2
    });
    
    var basemap = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
      }
    );

    vm.map.addLayer(basemap);

    navigator.geolocation.getCurrentPosition(position => {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      L.marker([lat, lng]).addTo(this.map);
      this.map.setView([lat, lng], 16);
    });
  },
  updated(){
   
    
    fetch("http://api.zippopotam.us/fr/59126")
      .then(results => results.json()) // conversion du résultat en JSON
      .then(data => {
      
        this.city=data.places[0]['place name']
        this.country=data.country;
        this.state=data.places[0].state;
});
 var vm = this;

    vm.map = L.map("map", {
      center: [10.0, 5.0],
      minZoom: 2,
      zoom: 2
    });
    
    var basemap = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
      }
    );

    vm.map.addLayer(basemap);

    navigator.geolocation.getCurrentPosition(position => {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      L.marker([lat, lng]).addTo(this.map);
      this.map.setView([lat, lng], 16);
    });
  }

}



</script>


<style scoped>

.ttext{
  display:flex;
  justify-content:center
}

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
