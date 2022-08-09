<template>
  <div v-if="loaded">
    <MyAlert v-if="showAlert"
             :message="message"
             :status="status"
             @closeAlert="closeAlert"/>

    <div class="card">
      <div class="container">
        <h4><b>Full name:</b> {{fullName}}</h4>
        <p><b>Email: </b> {{user.email}}</p>
        <p><b>Phone number: </b> {{user.phoneNumber}}</p>
        <MyButton @click="openUser">Edit user</MyButton>
        <MyButton class="btn_list"><router-link to="/" style="color: teal">Back</router-link></MyButton>
      </div>
    </div>

    <div class="list">
      <MyInput v-model="search"
               placeholder="Search by title..."/>
      <MySelect v-model="sort"
                :options="sortOptions"/>
    </div>

    <EventList :events="sortAndSearch"
               @deleteEvent="deleteEvent"/>

    <div class="list">
      <MyButton @click="openEvent">Create Event</MyButton>
    </div>

    <div class="pagination">
      <MyButton :class="this.currentPage === page ? 'current' : null"
                v-for="page in totalPages"
                :key="page"
                @click="changePage(page)">{{page}}</MyButton>
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
  </div>
  <MySpinner v-else/>
</template>

<script>
import UserForm from "@/components/UserForm";
import {getUserService, updateUserService} from "@/api/user";
import {addEventService, getEventsService, deleteEventService} from "@/api/event";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";

export default {
  name: "UserInfo",
  data() {
    return {
      user: null,
      events: [],
      totalPages: 0,
      currentPage: 1,
      limit: 5,
      loaded: false,
      showModal: false,
      showAlert: false,
      message: '',
      status: '',
      showUserForm: false,
      showEventForm: false,
      search: '',
      sort: '',
      sortOptions: [
        {value: 'title', name: 'Title'},
        {value: 'description', name: 'Description'},
        {value: 'startDate', name: 'Start date'},
        {value: 'endDate', name: 'End date'}
      ],
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
      const fetchedEvents = await getEventsService(`${id}/events?page=${this.currentPage}&limit=${this.limit}`);
      this.events = fetchedEvents.data.events;
      this.totalPages = fetchedEvents.data.total;
      this.currentPage = fetchedEvents.data.current;
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
    },
    deleteEvent(eventId) {
      const userId = this.$route.params.id;
      deleteEventService(`${userId}/event/${eventId}`)
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
    },
    changePage(page) {
      this.currentPage = page;
      this.getEvents();
    }
  },
  beforeCreate() {
    if (this.$store.state.isAuth != true) {
      this.$router.push('/login');
    }
  },
  mounted() {
    this.getUser();
    this.getEvents();
  },
  computed: {
    fullName () {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    sortEvents() {
      return [...this.events].sort((prev, next) => {
        return prev[this.sort]?.localeCompare(next[this.sort]);
      });
    },
    sortAndSearch() {
      return this.sortEvents.filter(event => event.title.includes(this.search));
    }
  },
  components: {
    EventForm,
    UserForm,
    EventList
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