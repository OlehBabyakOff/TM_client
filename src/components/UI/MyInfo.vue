<template>
  <div class="container">
    <div class="text_container">
      <h1 class="text">{{text}}</h1>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
  props: {
    text: String
  }
}
</script>

<style scoped>
.container {
  height: auto;
  min-height: 100%;
}

.text_container {
  text-align: center;
  width: 800px;
  margin-left: -400px;
  position: absolute;
  top: 30%;
  left: 50%;
}

.text {
  margin: 0 0 20px 0;
  font-size: 30px;
  line-height: 20px;
  font-weight: bold;
}
</style>