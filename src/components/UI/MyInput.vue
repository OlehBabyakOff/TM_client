<template>
  <input :type="inputType" :value="modelValue" @input="updateValue" :placeholder="placeholder">
</template>

<script>
  export default {
    name: "MyInput",
    props: {
      modelValue: [String, Number],
      placeholder: [String, Number],
      inputType: {
        type: String,
        default: () => 'text'
      }
    },
    methods: {
      updateValue(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  };
</script>

<style scoped>
  input {
    width: 100%;
    border: 1px solid grey;
    padding: 5px 10px;
    margin-top: 15px;
  }
</style>