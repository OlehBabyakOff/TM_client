<template>
  <h1>{{text}}</h1>
  <MyInput v-model="firstName" placeholder="First name"/>
  <MyInput v-model="lastName" placeholder="Last name"/>
  <MyInput v-model="email" placeholder="Email"/>
  <MyInput v-model="phoneNumber" placeholder="Phone number"/>
  <MyButton @click="saveUser">Save User</MyButton>
</template>

<script>
export default {
  name: "CreateUserForm",
  props: {
    text: [String, Number],
    user: Object
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    }
  },
  methods: {
    saveUser() {
      this.$emit('saveUser', this.firstName, this.lastName, this.email, this.phoneNumber);
      this.clearFields();
    },
    clearFields() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.phoneNumber = '';
    },
    insertData() {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.phoneNumber = this.user.phoneNumber;
    }
  },
  mounted() {
    if (this.user) {
      this.insertData();
    }
  }
}
</script>

<style scoped>

</style>