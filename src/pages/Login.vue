<template>
  <MyAlert v-if="showAlert"
           :message="message"
           :status="status"
           @closeAlert="closeAlert"/>
  <AuthForm :form-name="formName"
            @auth="login"/>
</template>

<script>
import AuthForm from "@/components/AuthForm";
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      formName: 'Login',
      message: '',
      status: '',
      showAlert: false
    }
  },
  components: {
    AuthForm
  },
  methods: {
    ...mapActions({
      signIn: 'signIn'
    }),
    login(email, password) {
      this.signIn({email, password})
          .then(response => {
            this.message = response.data.message;
            this.status = response.status;
            this.showAlert = true;
            this.$router.push('/');
          })
          .catch(error => {
            this.message = error.response.data;
            this.status = error.response.status;
            this.showAlert = true;
          });
    },
    closeAlert() {
      this.showAlert = false;
    }
  },
  beforeCreate() {
    if (this.$store.state.isAuth == true) {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>