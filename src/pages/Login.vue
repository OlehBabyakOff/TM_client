<template>
  <div v-if="!$store.state.isAuth">
    <MyAlert v-if="showAlert"
             :message="message"
             :status="status"
             @closeAlert="closeAlert"/>
    <AuthForm :form-name="formName"
              @auth="login">
      <div class='spacing'>don`t have an account? <span class='highlight'><router-link style="color: white" to="/registration">Sign Up</router-link></span></div>
    </AuthForm>
  </div>
  <MyInfo v-else text="You are already signed in!">
    <MyButton>
      <router-link style="color: teal" to="/">back to main page</router-link>
    </MyButton>
  </MyInfo>
</template>

<script>
import AuthForm from "@/components/AuthForm";
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      formName: 'Sign In',
      message: '',
      status: '',
      showAlert: false,

    }
  },
  components: {
    AuthForm
  },
  methods: {
    ...mapActions({
      signIn: 'signIn'
    }),
    fillAlert(message, status, showAlert) {
      this.message = message;
      this.status = status;
      this.showAlert = showAlert;
    },
    login(email, password) {
      this.signIn({email, password})
          .then(response => {
            this.$router.push('/');
            this.fillAlert(response.data.message, response.status, true);
          })
          .catch(error => {
            this.fillAlert(error.response.data, error.response.status, true);
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