<template>
  <MDBTable>
    <thead>
    <tr>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone number</th>
      <th scope="col">Events count</th>
      <th scope="col">Next event date</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    </tbody>
  </MDBTable>
</template>

<script>
import {MDBTable} from 'mdb-vue-ui-kit';

export default {
  name: "UserItem",
  components: {
    MDBTable,
  }
}
</script>

<style scoped>
</style>