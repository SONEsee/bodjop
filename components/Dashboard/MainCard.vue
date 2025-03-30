<script lang="ts" setup>
const dashboardStore = UseDashboardStore();

const response_data = computed(() => {
  return dashboardStore.response_main_card;
});
</script>

<template>
  <section>
    <v-row>
      <v-col
        cols="12"
        md="3"
        v-for="(item, index) in response_data"
        :key="`item-${index}`"
      >
        <v-card
          height="120px"
          flat
          class="rounded-lg d-flex flex-wrap align-center pa-4"
        >
          <v-icon class="ma-2" :color="item.color" variant="text" size="40">
            {{ item.icon }}</v-icon
          >

          <div class="ml-4">
            <div class="grey--text" style="font-size: 16px">
              {{ item.type }}
            </div>
            <div class="font-weight-black mt-1" style="font-size: 25px">
              {{ formatnumber(item.amount) }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
