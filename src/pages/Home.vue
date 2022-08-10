<template>
  <div v-if="$store.state.isAuth && $store.state.user">
    <div v-if="loaded">
      <MyAlert v-if="showAlert"
               :message="message"
               :status="status"
               @closeAlert="closeAlert"/>

      <div class="list">
        <MyInput v-model="search"
                 placeholder="Search by name..."/>
        <MySelect v-model="sort"
                  :options="sortOptions"/>
      </div>

      <UserItem :users="sortAndSearch"
                @deleteUser="deleteUser"/>

      <div class="list">
        <MyButton @click="openModal">Create User</MyButton>
      </div>

      <MyPagination :totalPages="totalPages"
                    :currentPage="currentPage"
                    @changePage="changePage"/>

      <MyModal v-if="showModal"
               @hideModal="closeModal">
        <UserForm text="Add to database"
                  @saveUser="saveUser"/>
      </MyModal>
    </div>
    <MySpinner v-else/>
  </div>
  <MyInfo v-else text="You must be logged in to access this page!">
    <MyButton>
      <router-link style="color: teal" to="/login">back to login page</router-link>
    </MyButton>
  </MyInfo>
</template>

<script>
import UserItem from "@/components/UserList";
import UserForm from "@/components/UserForm";
import {getUsersService, saveUserService, deleteUserService} from "@/api/user";

export default {
  name: 'HomeView',
  data() {
    return {
      users: [],
      loaded: false,
      totalPages: 0,
      currentPage: 1,
      limit: 5,
      showModal: false,
      showAlert: false,
      message: '',
      status: '',
      search: '',
      sort: '',
      sortOptions: [
        {value: 'firstName', name: 'First name'},
        {value: 'lastName', name: 'Last name'},
        {value: 'email', name: 'Email'},
        {value: 'phoneNumber', name: 'Phone number'},
        {value: 'eventCount', name: 'Event count'},
        {value: 'nextEventDate', name: 'Next event date'},
      ],
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    closeAlert() {
      this.showAlert = false;
    },
    fillUserResponse(users, totalPages, currentPage) {
      this.users = users;
      this.totalPages = totalPages;
      this.currentPage = currentPage;
    },
    fillAlert(message, status, showAlert) {
      this.message = message;
      this.status = status;
      this.showAlert = showAlert;
    },
    fillTable() {
      getUsersService(`users?page=${this.currentPage}&limit=${this.limit}`)
          .then(response => {
            this.fillUserResponse(response.data.users, response.data.total, response.data.current);
            this.loaded = true;
          });
    },
    saveUser(firstName, lastName, email, phoneNumber) {
      this.closeModal();
      saveUserService('user', {firstName, lastName, email, phoneNumber})
          .then(response => {
            this.fillAlert(response.data.message, response.status, true);
            this.fillTable();
          })
          .catch(error => {
            this.fillAlert(error.response.data, error.response.status, true);
          });
    },
    deleteUser(id) {
      deleteUserService(`user/${id}`)
          .then(response => {
            this.fillAlert(response.data.message, response.status, true);
            this.fillTable();
          })
          .catch(error => {
            this.fillAlert(error.response.data, error.response.status, true);
          });
    },
    changePage(page) {
      this.currentPage = page;
      this.fillTable();
    }
  },
  mounted() {
    this.fillTable();
  },
  computed: {
    sortUsers() {
      return [...this.users].sort((prev, next) => {
        return prev[this.sort]?.localeCompare(next[this.sort]);
      });
    },
    sortAndSearch() {
      return this.sortUsers.filter(user => user.firstName.includes(this.search));
    }
  },
  components: {
    UserItem,
    UserForm
  }
}
</script>

<style scoped>
.list {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
</style>
