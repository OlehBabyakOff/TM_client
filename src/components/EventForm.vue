<template>
  <h1>{{text}}</h1>
  <MyInput v-model="title"
           placeholder="Title"/>
  <MyInput v-model="description"
           placeholder="Description"/>
  <MyInput v-model="startDate"
           placeholder="Start Date"
           inputType="datetime-local"/>
  <MyInput v-model="endDate"
           placeholder="End Date"
           inputType="datetime-local"/>
  <MyButton class="btn_form" @click="saveEvent">Save Event</MyButton>
</template>

<script>
export default {
  name: "EventForm",
  props: {
    text: [String, Number]
  },
  data() {
    return {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    }
  },
  methods: {
    saveEvent() {
      this.$emit('saveEvent', this.title, this.description, this.startDate, this.endDate);
      this.clearForm();
    },
    clearForm() {
      this.title = '';
      this.description = '';
      this.startDate = '';
      this.endDate = '';
    }
  }
}
</script>

<style scoped>
  .btn_form {
    margin: 15px 0;
  }
</style>