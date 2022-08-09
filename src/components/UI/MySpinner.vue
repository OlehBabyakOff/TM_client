<template>
  <span class="loader"></span>
</template>

<script>
export default {
  name: "MySpinner"
}
</script>

<style scoped>
.loader {
  width: 50px;
  height: 50px;
  border: 5px solid teal;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  position: fixed;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>