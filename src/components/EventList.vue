<template>
  <MDBTable v-if="events.length">
    <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>
      <th scope="col">Status</th>
      <th scope="col">Delete</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="event in computedEvents" :key="event._id">
      <td>{{event.title}}</td>
      <td>{{event.description}}</td>
      <td>{{new Date(event.startDate).toLocaleDateString('en-En', {day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit',})}}</td>
      <td>{{new Date(event.endDate).toLocaleDateString('en-En', {day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit',})}}</td>
      <td>{{event.status}}</td>
      <td><MyButton @click="deleteEvent(event._id)">Delete</MyButton></td>
    </tr>
    </tbody>
  </MDBTable>
  <h1 v-else style="text-align: center">Empty table</h1>
</template>

<script>
  import {MDBTable} from 'mdb-vue-ui-kit';

  export default {
    name: "EventList",
    props: {
      events: Array
    },
    emits: ['deleteEvent'],
    methods: {
      deleteEvent(eventId) {
        this.$emit('deleteEvent', eventId);
      }
    },
    computed: {
      computedEvents() {
        this.events.forEach(event => {
          if (new Date(event.endDate) < Date.now()) event.status = 'Completed event!';
          if (new Date(event.startDate) <= Date.now() && new Date(event.endDate) >= Date.now()) event.status = 'Current event!';
          if (new Date(event.startDate) > Date.now()) event.status = 'Future event!';
        });
        return this.events;
      },
    },
    components: {
      MDBTable,
    }
  }
</script>

<style scoped>

</style>