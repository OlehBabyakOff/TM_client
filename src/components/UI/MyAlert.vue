<template>
  <div v-bind:class="[status == 200 ? 'success' : 'error']">
    <span class="close_btn" @click="closeAlert">&times;</span>
    <strong>{{status == 200 ? 'Success!' : 'Error!'}}</strong> {{message}}
  </div>
</template>

<script>
export default {
  name: "MyAlert",
  props: {
    message: String,
    status: [String, Number]
  },
  methods: {
    closeAlert() {
      this.$emit('closeAlert')
    }
  }
}
</script>

<style scoped>
  .success {
    padding: 20px;
    background-color: #2fb986;
    color: white;
    margin-top: 15px;
  }
  .error {
    padding: 20px;
    background-color: #f44336;
    color: white;
    margin-top: 15px;
  }
  .close_btn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }

  .close_btn:hover {
    color: black;
  }
</style>