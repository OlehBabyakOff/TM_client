<template>
  <MyAlert v-if="showAlert"
           :message="message"
           :status="status"
           @closeAlert="closeAlert"/>
  <AuthForm :form-name="formName"
            @auth="registration"/>
</template>

<script>
import {postAuth} from "@/api/auth";
import AuthForm from "@/components/AuthForm";

export default {
  name: "Registration",
  data() {
    return {
      formName: 'Registration',
      message: '',
      status: '',
      showAlert: false
    }
  },
  components: {
    AuthForm
  },
  methods: {
    registration(email, password) {
      postAuth('registration', {email, password})
          .then(response => {
            this.message = response.data.message;
            this.status = response.status;
            this.showAlert = true;
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
  }
}
</script>

<style scoped>

</style>