<template>
  <MyAlert v-if="showAlert"
           :message="message"
           :status="status"
           @closeAlert="closeAlert"/>
  <UserItem :users="users"
            @deleteUser="deleteUser"/>
  <MyButton @click="openModal">Create User</MyButton>

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
import UserItem from "@/components/UserItem";
import UserForm from "@/components/UserForm";
import {getUsersService, saveUserService, deleteUserService} from "@/api/user";

export default {
  name: 'HomeView',
  data() {
    return {
      users: [],
      totalPages: 0,
      currentPage: 1,
      limit: 1,
      showModal: false,
      showAlert: false,
      message: '',
      status: '',
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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
    closeAlert() {
      this.showAlert = false;
    },
    changePage(page) {
      this.currentPage = page;
      this.fillTable();
    }
  },
  mounted() {
    this.fillTable();
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
  color: red;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}
</style>
