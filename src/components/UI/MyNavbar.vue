<template>
  <MDBNavbar class="navbar_main" expand="lg" container>
    <MDBNavbarNav>
      <MDBNavbarBrand class="navbar_brand">Management system</MDBNavbarBrand>
    </MDBNavbarNav>
    <MDBDropdown v-model="dropdown2">
      <MDBDropdownToggle v-if="$store.state.isAuth" tag="a" class="nav-link" @click="dropdown2 = !dropdown2"
      >{{$store.state.user.email}}</MDBDropdownToggle
      >
      <MDBDropdownMenu>
        <MDBDropdownItem href="#" @click="logout">Exit</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  </MDBNavbar>
</template>

<script>
  import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';
  import {mapActions} from "vuex";

  export default {
    name: "Navbar",
    methods: {
      ...mapActions({
        signOut: 'signOut'
      }),
      logout() {
        this.signOut()
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
      }
    },
    components: {
      MDBNavbar,
      MDBNavbarToggler,
      MDBNavbarBrand,
      MDBNavbarNav,
      MDBNavbarItem,
      MDBCollapse,
      MDBDropdown,
      MDBDropdownToggle,
      MDBDropdownMenu,
      MDBDropdownItem,
    },
    setup() {
      const dropdown2 = ref(false);
      return {
        dropdown2,
      };
    },
  };
</script>

<style scoped>
.navbar_main {
  background-color: teal;
}
.navbar_brand {
  color: #fff;
}
.nav-link {
  color: white;
  text-decoration: none;
}
</style>