<template>
  <MDBTable v-if="users.length">
    <thead>
    <tr>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone number</th>
      <th scope="col">Event count</th>
      <th scope="col">Next event date</th>
      <th scope="col">Delete</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user._id">
      <td class="user_link"
          @click="userPage(user._id)">{{user.firstName}}</td>
      <td>{{user.lastName}}</td>
      <td>{{user.email}}</td>
      <td>{{user.phoneNumber}}</td>
      <td>{{user.events.length || 'empty'}}</td>
      <td>{{'empty'}}</td>
      <td><MyButton @click="deleteUser(user._id)">Delete user</MyButton></td>
    </tr>
    </tbody>
  </MDBTable>
  <h1 v-else>Empty table</h1>
</template>

<script>
import {MDBTable} from 'mdb-vue-ui-kit';

export default {
  name: "UserItem",
  data() {
    return {
    }
  },
  props: {
    users: Array,
  },
  methods: {
    deleteUser(id) {
      this.$emit('deleteUser', id);
    },
    userPage(id) {
      this.$router.push(`/user/${id}`);
    }
  },
  components: {
    MDBTable,
  }
}
</script>

<style scoped>
  .user_link {
    cursor: pointer;
    color: teal;
  }
</style>