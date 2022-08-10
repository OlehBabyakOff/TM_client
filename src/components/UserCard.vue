<template>
  <div class="card" v-if="loaded">
    <div class="container">
      <h4><b>{{fullName}}</b></h4>
      <p>{{user.email}}</p>
      <p>{{user.phoneNumber}}</p>
      <p><router-link to="/">back</router-link></p>
      <MyButton @click="openModal">Edit user</MyButton>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserCard",
    props: {
      user: Object,
      loaded: Boolean,
      showModal: Boolean
    },
    emits: ['setModal'],
    methods: {
      openModal() {
        this.$emit('setModal', true);
      }
    },
    computed: {
      fullName () {
        return `${this.user.firstName} ${this.user.lastName}`;
      }
    },
  }
</script>

<style scoped>
  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    margin: 15px 0;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .container {
    padding: 15px 15px;
    text-align: center;
  }
</style>