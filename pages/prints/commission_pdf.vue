<script lang="ts" setup>
const printStore = UsePrintStore();
const route = useRoute();
const id = route?.query?.id?.toString() ?? null;

definePageMeta({
  layout: "no-nav",
});

onMounted(() => {
  printStore.getInvoicePrint(id);
});
</script>

<template>
  <PrintsCommissionPdf v-if="printStore.invoice_detail !== null" />
</template>
