<script setup>
import { onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";

const mapContainer = ref(null);

onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [102.6365, 17.9768], // Set initial coordinates (Longitude, Latitude)
    zoom: 12,
    interactive: false,
  });

  new mapboxgl.Marker()
    .setLngLat([102.6365, 17.9768]) // [Longitude, Latitude]
    // .setPopup(new mapboxgl.Popup().setHTML("<h3>Hanoi, Vietnam</h3>")) // Optional: Add popup
    .addTo(map);

  // Add zoom & rotation controls
  map.addControl(new mapboxgl.NavigationControl());
});
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
  pointer-events: none;
}
</style>
