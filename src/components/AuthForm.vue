<template>
  <form @submit.prevent>
    <h2>{{formName}}</h2>
    <MyInput v-model="email"/>
    <MyInput v-model="password"/>
    <MyButton @click="auth">{{formName}}</MyButton>
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
      this.email = '';
      this.password = '';
    }
  }

}
</script>

<style scoped>

</style>