<template>
  <MDBTable v-if="events.length">
    <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="event in events" :key="event._id">
      <td>{{event.title}}</td>
      <td>{{event.description}}</td>
      <td>{{new Date(event.startDate).toLocaleDateString('en-En', {day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit',})}}</td>
      <td>{{new Date(event.endDate).toLocaleDateString('en-En', {day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit',})}}</td>
    </tr>
    </tbody>
  </MDBTable>
  <h1 v-else>Empty table</h1>
</template>

<script>
  import {MDBTable} from 'mdb-vue-ui-kit';

  export default {
    name: "EventList",
    props: {
      events: Array
    },
    components: {
      MDBTable,
    }
  }
</script>

<style scoped>

</style>