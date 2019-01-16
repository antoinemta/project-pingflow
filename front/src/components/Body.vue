<template>
  <section class="row body">
    <div class="col-12" v-if="registred">
    <div id="map"></div>
    </div>
    <div>{{ searched }}</div>
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
  }

}



</script>


<style scoped>
.body {
 height:80vh;
}

#map
{
  width:100%;
  height:100%;
}
</style>
