<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>

<style scoped>
  button {
    padding: 5px 10px;
    background: none;
    color: teal;
    border: 1px solid grey;
  }
</style>