<template>
  <section class="row body">
    <!--<div class="col-12" v-if="!registred">
    <div id="map"></div>
    </div>-->
    <div class="col-12" v-if="searched">
      <div class="col-12 d-flex justify-content-center">
        {{country}}
      </div>
      <div class="col-12 d-flex justify-content-center">
        {{city}}
      </div>
      <div class="col-12 d-flex justify-content-center">
        {{state}}
      </div>
    </div>
    <div class="col-12 containerMap">
    <div id="map"></div>
     
    </div>  
    <div class="col-12 bg-success">
        {{state}}
      </div> 
   
  </section>
</template>

<script>

import L from "leaflet";


export default {

  
  
  name: 'Body',
  props: {
    registred:Boolean,
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
        alert(data);
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

.body {
 height:80vh;
}

.containerMap{
  height:50%;
  display:flex;
  padding-left:17%;
  padding-right:17%;

}

#map
{
  width:100%;
  height:100%;
}
</style>
