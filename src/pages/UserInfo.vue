<template>
  <MyAlert v-if="showAlert"
           :message="message"
           :status="status"
           @closeAlert="closeAlert"/>
  <div class="card" v-if="loaded">
    <div class="container">
      <h4><b>{{fullName}}</b></h4>
      <p>{{user.email}}</p>
      <p>{{user.phoneNumber}}</p>
      <p><router-link to="/">back</router-link></p>
      <MyButton @click="openModal">Edit user</MyButton>
    </div>
  </div>
  <MyModal v-if="showModal"
           @hideModal="closeModal">
    <UserForm text="Edit user"
              :user="user"
              @saveUser="editUser"/>
  </MyModal>
</template>

<script>
import UserForm from "@/components/UserForm";
import {getUserService, updateUserService} from "@/api/user";

export default {
  name: "UserInfo",
  data() {
    return {
      user: null,
      loaded: false,
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
    async getUser() {
      const id = this.$route.params.id;
      const fetchedUser = await getUserService(`user/${id}`);
      this.user = fetchedUser.data;
      this.loaded = true;
    },
    editUser(firstName, lastName, email, phoneNumber) {
      this.closeModal();
      updateUserService(`user/${this.user._id}`, {firstName, lastName, email, phoneNumber})
          .then(response => {
            this.getUser();
            this.message = response.data.message;
            this.status = response.status;
            this.showAlert = true;
          })
          .catch(error => {
            this.message = error.response.data;
            this.status = error.response.status;
            this.showAlert = true;
          });
    }
  },
  mounted() {
    this.getUser();
  },
  computed: {
    fullName () {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
  },
  components: {
    UserForm
  }
}
</script>

<style scoped>
  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .container {
    padding: 2px 16px;
    text-align: center;
  }
</style>