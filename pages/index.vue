<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <section class="pa-6">
    <v-row>
      <v-col cols="12">
        <div style="font-size: 18px" class="font-weight-black">
          Welcome xayxana MANIVONG
        </div>
      </v-col>

      <v-col cols="12">
        <DashboardMainCard />
      </v-col>

      <v-col cols="12" md="6">
        <DashboardMainSaleCard />
      </v-col>

      <v-col cols="12" md="6">
        <DashboardMainExpenseCard />
      </v-col>
    </v-row>
  </section>
</template>
