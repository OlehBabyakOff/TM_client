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
    <tr v-for="user in computedUsers" :key="user._id">
      <td class="user_link"
          @click="userPage(user._id)">{{user.firstName}}</td>
      <td>{{user.lastName}}</td>
      <td>{{user.email}}</td>
      <td>{{user.phoneNumber}}</td>
      <td>{{user.events.length || 'Empty'}}</td>
      <td>{{user.nextEvent || 'No future events!'}}</td>
      <td><MyButton @click="deleteUser(user._id)">Delete user</MyButton></td>
    </tr>
    </tbody>
  </MDBTable>
  <h1 v-else style="text-align: center">Empty table</h1>
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
  emits: ['deleteUser'],
  methods: {
    deleteUser(id) {
      this.$emit('deleteUser', id);
    },
    userPage(id) {
      this.$router.push(`/user/${id}`);
    }
  },
  computed: {
    computedUsers() {
      this.users.forEach(user => {
        user.events.forEach(event => {
          if (new Date(event.startDate) > Date.now()) {
            user.nextEvent = new Date(event.startDate).toLocaleDateString('en-En', {day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit',});
          }
        });
      });
      return this.users;
    },
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