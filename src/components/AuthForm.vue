<template>
  <form @submit.prevent>
    <h2>{{formName}}</h2>
    <MyInput v-model="email" placeholder="Email"/>
    <MyInput v-model="password" placeholder="Password"/>
    <MyButton class="btn_form" @click="auth">{{formName}}</MyButton>
  </form>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  name: "AuthForm",
  components: {MyButton},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  props: {
    formName: String
  },
  methods: {
    auth() {
      this.$emit('auth', this.email, this.password);
      this.clearFields();
    },
    clearFields() {
      this.email = '';
      this.password = '';
    }
  }

}
</script>

<style scoped>
  .btn_form {
    margin-top: 15px;
  }
</style>