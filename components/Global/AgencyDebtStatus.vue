<script lang="ts" setup>
const props = defineProps({
  status: {
    type: Number,
    required: true,
    default: 1,
  },
});

const list_status = ref({
  1: "ຊຳລະຍັງບໍ່ສຳເລັດ",
  2: "ຊຳລະຍັງບໍ່ຄົບ",
  3: "ຊຳລະສຳເລັດແລ້ວ",
} as { [key: number]: string });

const statusColor = ref({
  1: "warning",
  2: "primary",
  3: "success",
} as { [key: number]: string });
</script>
<template>
  <div v-if="props.status !== null">
    <v-chip :color="statusColor[props.status]" variant="outlined">{{
      list_status[props.status]
    }}</v-chip>
  </div>
</template>
