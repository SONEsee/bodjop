<template>
  <div style="width: 100%">
    <v-text-field
      v-model="formattedValue"
      ref="textField"
      @input="handleInput"
      @keypress="filterInput"
      :rules="rules"
      variant="outlined"
      :density="density"
      :hide-details="hide"
    ></v-text-field>
  </div>
</template>

<script>
import _ from "lodash";
import numeral from "numeral";
export default {
  props: {
    number: {
      // type: [String, Number],
      required: true,
      // default: null,
    },

    rules: {
      type: Array,
      required: true,
      default: [],
    },

    hide: {
      // type: Boolean || String,
      required: true,
      default: "auto",
    },
    density: {
      type: String,
      requried: true,
      default: "comfortable",
    },
  },

  data() {
    return {
      formattedValue: "",
      previousValue: "",
    };
  },

  watch: {
    number: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal === "" || newVal === null) {
          this.$emit("input_number", null);
          return;
        }
        this.formattedValue = this.formatValue(newVal);
      },
    },
    // number(newValue) {
    //   this.formattedValue = this.formatValue(newValue);
    // },
  },

  methods: {
    handleInput() {
      const textField = this.$refs.textField;
      const inputElement = textField.$el.querySelector("input");
      let cursorPosition = inputElement.selectionStart;
      const rawValue = inputElement.value.replace(/,/g, "");
      const formattedValue = this.formatValue(rawValue);

      this.formattedValue = formattedValue;

      this.$nextTick(() => {
        const action = this.getAction(inputElement.value);
        const formattedCursorPosition = this.getFormattedCursorPosition(
          rawValue,
          formattedValue,
          cursorPosition,
          action
        );
        inputElement.setSelectionRange(
          formattedCursorPosition,
          formattedCursorPosition
        );
      });

      this.previousValue = inputElement.value;
      this.$emit("input_number", this.parseValue(this.formattedValue));
    },

    formatValue(value) {
      const floatValue = parseFloat(value);
      return floatValue % 1 === 0
        ? numeral(floatValue).format("0,0")
        : numeral(floatValue).format("0,0.00");
    },

    parseValue(value) {
      return numeral(value).value();
    },

    getAction(currentValue) {
      if (this.previousValue.length < currentValue.length) {
        return "add";
      } else if (this.previousValue.length > currentValue.length) {
        return "delete";
      } else {
        return "unknown";
      }
    },

    getFormattedCursorPosition(
      originalValue,
      formattedValue,
      originalCursorPosition,
      action
    ) {
      const originalValueWithCommas = this.formatValue(originalValue);
      const commaCountBeforeCursor =
        originalValueWithCommas.slice(0, originalCursorPosition).match(/,/g)
          ?.length ?? 0;
      let formattedCursorPosition =
        originalCursorPosition + commaCountBeforeCursor;

      if (
        action === "delete" &&
        formattedValue[originalCursorPosition - 1] === ","
      ) {
        formattedCursorPosition -= 1;
      }

      return formattedCursorPosition;
    },

    filterInput(event) {
      const keyCode = event.keyCode || event.which;
      const char = String.fromCharCode(keyCode);
      const regex = /^[0-9,.]+$/;

      if (!regex.test(char)) {
        event.preventDefault();
      }
    },
  },
};
</script>
