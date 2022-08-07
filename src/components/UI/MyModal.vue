<template>
  <div class="modal" @click="hideModal">
    <div @click.stop class="modal_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyModal",
  methods: {
    hideModal() {
      this.$emit('hideModal');
    }
  }
}
</script>

<style scoped>
  .modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
  }
  .modal_content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
  }
</style>