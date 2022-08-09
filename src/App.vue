<template>
  <Navbar v-if="$store.state.isAuth"/>
  <MDBContainer>
    <router-view/>
  </MDBContainer>
</template>

<script>
  import { MDBContainer } from 'mdb-vue-ui-kit';
  import {mapActions} from "vuex";

  export default {
    components: {
      MDBContainer
    },
    methods: {
      ...mapActions({
        checkAuth: "checkAuth"
      }),
      check() {
        this.checkAuth();
      }
    },
    beforeMount() {
      if (localStorage.getItem('token')) {
        this.check();
      }
    }
  }
</script>

<style>

</style>
