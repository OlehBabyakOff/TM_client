<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarNav>
      <MDBNavbarBrand>Thinkmobiles</MDBNavbarBrand>
      <MDBDropdown v-model="dropdown2">
        <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown2 = !dropdown2"
        >Email</MDBDropdownToggle
        >
        <MDBDropdownMenu>
          <MDBDropdownItem href="#">Exit</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavbarNav>
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

  export default {
    name: "Navbar",
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

</style>