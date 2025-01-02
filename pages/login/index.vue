<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  setup() {
    definePageMeta({
      layout: "login",
    });
  }
});
</script>

<template>
  <section
    style="min-height: 100vh"
    class=""
  >
    <Login />
  </section>
</template>