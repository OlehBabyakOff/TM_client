<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="">Select a sort field</option>
    <option v-for="option in options"
            :key="option.value"
            :value="option.value">{{option.name}}</option>
  </select>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    modelValue: String,
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
  select {
    width: 20%;
    border: 1px solid grey;
    padding: 5px 10px;
    margin-top: 15px;
    margin-left: 10px;
  }
</style>