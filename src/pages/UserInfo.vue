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

      <MyButton @click="openUser">Edit user</MyButton>
      <MyButton class="btn_list"><router-link to="/">Back</router-link></MyButton>
    </div>
  </div>

  <EventList :events="events"/>

  <div class="list">
    <MyButton @click="openEvent">Create Event</MyButton>
  </div>

  <MyModal v-if="showModal"
           @hideModal="closeModal">
    <UserForm v-if="showUserForm"
              text="Edit user"
              :user="user"
              @saveUser="editUser"/>
    <EventForm v-else-if="showEventForm"
               text="Add event"
               @saveEvent="addEvent"/>

  </MyModal>
</template>

<script>
import UserForm from "@/components/UserForm";
import {getUserService, updateUserService} from "@/api/user";
import {addEventService, getEventsService} from "@/api/event";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";

export default {
  name: "UserInfo",
  data() {
    return {
      user: null,
      events: [],
      loaded: false,
      showModal: false,
      showAlert: false,
      message: '',
      status: '',
      showUserForm: false,
      showEventForm: false
    }
  },
  methods: {
    openUser() {
      this.showModal = true;
      this.showUserForm = true;
    },
    openEvent() {
      this.showModal = true;
      this.showEventForm = true;
    },
    closeModal() {
      this.showModal = false;
      this.showUserForm = false;
      this.showEventForm = false;
    },
    closeAlert() {
      this.showAlert = false;
    },
    async getUser() {
      const id = this.$route.params.id;
      const fetchedUser = await getUserService(`user/${id}`);
      this.user = fetchedUser.data;
      this.loaded = true;
    },
    async getEvents() {
      const id = this.$route.params.id;
      const fetchedEvents = await getEventsService(`${id}/events`);
      this.events = fetchedEvents.data;
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
    },
    addEvent(title, description, startDate, endDate) {
      this.closeModal();
      const id = this.$route.params.id;
      addEventService(`${id}/event`, {title, description, startDate, endDate})
          .then(response => {
            this.getEvents();
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
    this.getEvents();
  },
  computed: {
    fullName () {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
  },
  components: {
    EventForm,
    EventList,
    UserForm
  }
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
  .btn_list {
    margin: 0 15px;
  }
  .list {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
</style>