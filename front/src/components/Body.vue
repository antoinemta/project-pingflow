<template>
  <section class="row body">
    
    <div class="col-xl-4 infosSearchedBody pb-5 bg-info">
     
      <div class="col-sm-8 pb-5">
        <div class="col-12 text-center titleLeft"><span>Lorem Ipsum</span></div>
        <div class="col-12">
      <div class="col-12 py-4 border text-center">
        <img class="w-25" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/langfr-225px-Flag_of_France.svg.png" />

      </div>
      <div class="col-12 border text-center">
        Lorem Ipsum

      </div>
      <div class="col-12 border text-center">
        Lorem Ipsum

      </div>
      <div class="col-12 border text-center">
        Lorem Ipsum

      </div>
      <div class="col-12 border text-center">
        Lorem Ipsum

      </div>
      <div class="col-12 border text-center">
        Lorem Ipsum

      </div>
      <div class="col-12 border text-center">
        Lorem Ipsum

      </div>
      </div>
      <div class="col-12 d-flex justify-content-center">
          <button class="btn btn-success w-50 mt-4">add</button>
        </div>      
      </div>
    </div>
    <div class="col-xl-8 bg-success">
      <div class="col-12 py-5 border containerMap">

           <div id="map" class="border"></div>
      </div>
      <div class="col-12 containerForm border">
        <div class="col-12 h-50 border">
        <input type="text" class="h-100 w-100 inputComment" />
        </div>
        <div class="col-12 pt-4 text-center border"><button class="btn btn-danger btn-lg">Post it</button></div>
      </div>
     
    </div> 
    <!-- FAVORITES
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
  </div>-->
  <!-- LOGIN
  <div class="col-12 inputsGroupLog">

    <div class="col-3 border">
      <div class="col-12 text-center">
      aze
    </div>
    <div class="col-12 text-center py-3 px-5">
      <input type="text" class="w-100" />
    </div>
    <div class="col-12 text-center py-3 px-5">
      <input type="text" class="w-100" />
    </div>
    <div class="col-12 text-center py-3 px-5">
      <button>connection</button>
    </div>
  </div>
</div> -->
 </section>
</template>



<script>

import io from "socket.io-client";
import L from "leaflet";


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
    map:null,
    markerGroup:null,
    marker:null,
    socket:null
    }
  },
  methods:{
      initMap:function () {

      /* This is an calling to server to recup the data */
      this.socket.emit("fetchCity",{postalCode:this.searched,country:this.selected});
    }
  },
  mounted() {
    /* Connection to server created */
    
    this.socket = io.connect('http://localhost:8081');

    /* We wait the callback there */
    this.socket.on('fetchCityResponse',(data)=>{
          this.city= data.city;
          this.country= data.country;
          this.state= data.state;
          let lat= data.lat;
          let lng = data.lng;
          this.markerGroup.removeLayer(this.marker)
          this.marker = L.marker([lat,lng]).addTo(this.markerGroup);
          this.map.setView([lat, lng], 16);


    });
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
