<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const emits = defineEmits(["onSetMonth"]);

const props = defineProps<{
  date: {
    month: number;
    year: number;
  };
  required: boolean;
}>();

const datepicker = computed({
  get() {
    return props.date;
  },
  set(value) {
    emits("onSetMonth", value);
  },
});
</script>

<template>
  <VueDatePicker
    :time-picker="false"
    :clearable="false"
    v-model="datepicker"
    :teleport="true"
    :required="props.required"
    month-picker
    :teleport-center="false"
    @update-month-year="$emit('onSetMonth', $event)"
  ></VueDatePicker>
</template>
