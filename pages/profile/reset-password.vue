<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
</script>
<template>
  <section class="pa-6" style="width: 100%">
    <v-card flat min-height="95vh" class="d-flex flex-wrap justify-center">
      <ProfileResetPassword />
    </v-card>
  </section>
</template>
