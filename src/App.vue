<template>
  <div v-if="!$store.state.loaded">
    <MySpinner/>
  </div>
  <div v-else>
    <Navbar v-if="$store.state.isAuth && $store.state.user"/>
    <MDBContainer>
      <router-view/>
    </MDBContainer>
  </div>
</template>

<script>
  import { MDBContainer } from 'mdb-vue-ui-kit';
  import {mapActions, mapMutations} from "vuex";

  export default {
    components: {
      MDBContainer
    },
    methods: {
      ...mapActions({
        checkAuth: "checkAuth"
      }),
      ...mapMutations({
        setLoaded: "setLoaded"
      }),
      check() {
        this.checkAuth();
      }
    },
    created() {
      if (localStorage.getItem('token')) {
        this.check();
      } else {
        this.setLoaded(true);
      }
    }
  }
</script>

<style>

</style>
