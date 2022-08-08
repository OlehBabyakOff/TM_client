<template>
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

  <div class="pagination">
    <MyButton :class="this.currentPage === page ? 'current' : null"
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)">{{page}}</MyButton>
  </div>

  <MyModal v-if="showModal"
           @hideModal="closeModal">
  <UserForm text="Add to database"
            @saveUser="saveUser"/>
  </MyModal>
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
    fillTable() {
      getUsersService(`users?page=${this.currentPage}&limit=${this.limit}`)
          .then(response => {
            this.users = response.data.users;
            this.totalPages = response.data.total;
            this.currentPage = response.data.current;
          });
    },
    saveUser(firstName, lastName, email, phoneNumber) {
      this.closeModal();
      saveUserService('user', {firstName, lastName, email, phoneNumber})
          .then(response => {
            this.message = response.data.message;
            this.status = response.status;
            this.showAlert = true;
            this.fillTable();
          })
          .catch(error => {
            this.message = error.response.data;
            this.status = error.response.status;
            this.showAlert = true;
          });
    },
    deleteUser(id) {
      deleteUserService(`user/${id}`)
          .then(response => {
            this.message = response.data.message;
            this.status = response.status;
            this.showAlert = true;
            this.fillTable();
          })
          .catch(error => {
            this.message = error.response.data;
            this.status = error.response.status;
            this.showAlert = true;
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
  .pagination {
    display: inline-block;
  }
  .current {
    color: black;
  }
  .pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }
  .list {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
</style>
