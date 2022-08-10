<template>
  <div v-if="!$store.state.isAuth">
    <MyAlert v-if="showAlert"
             :message="message"
             :status="status"
             @closeAlert="closeAlert"/>
    <AuthForm :form-name="formName"
              @auth="registration">
      <div class='spacing'>already have an account? <span class='highlight'><router-link style="color: white" to="/login">Sign In</router-link></span></div>
    </AuthForm>
  </div>
  <MyInfo v-else text="You are already signed in!">
    <MyButton>
      <router-link style="color: teal" to="/">back to main page</router-link>
    </MyButton>
  </MyInfo>
</template>

<script>
import {postAuth} from "@/api/auth";
import AuthForm from "@/components/AuthForm";

export default {
  name: "Registration",
  data() {
    return {
      formName: 'Sign Up',
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
            this.$router.push('/login');
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
}
</script>

<style scoped>
.highlight {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  cursor: pointer;
  transition: color .2s ease;
}

.highlight:hover {
  color: #fff;
  transition: color .2s ease;
}

.spacing {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 120px;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.65)
}
</style>