<script setup lang="ts">
const props = defineProps({
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const zoom = 12;

const marker = `pin-l+ff0000(${props.longitude},${props.latitude})`; // 'ff0000' is red

const mapUrl = computed(() => {
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${marker}/${props.longitude},${props.latitude},${zoom}/600x400?access_token=${MAPBOX_ACCESS_TOKEN}`;
});
</script>

<template>
  <div>
    <v-img
      :src="mapUrl"
      alt="Vientiane, Laos"
      class="static-map"
      @click="
        openPath(
          `https://www.google.com/maps/search/?api=1&query=17.99319,102.6641`
        )
      "
    />
  </div>
</template>

<style scoped>
.static-map {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
}
</style>
