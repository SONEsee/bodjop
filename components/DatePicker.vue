<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const emits = defineEmits(["onSetDate"]);
const props = defineProps({
  date: {
    default: new Date(),
    type: [Date, null],
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const datepicker = computed({
  get() {
    return props.date;
  },
  set(value) {
    emits("onSetDate", value);
  },
});
</script>

<template>
  <VueDatePicker
    :time-picker="false"
    :clearable="true"
    v-model="datepicker"
    :format="UseGetFormatDatePicker"
    :required="props.required"
    :teleport="true"
    :teleport-center="false"
    @date-update="$emit('onSetDate', $event)"
  ></VueDatePicker>
</template>
