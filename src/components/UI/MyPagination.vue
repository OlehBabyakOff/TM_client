<template>
  <div class="pagination">
    <MyButton v-for="page in totalPages"
              :key="page"
              :class="this.currentPage == page ? 'current' : null"
              @click="changePage(page)">{{ page }}
    </MyButton>
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    totalPages: [String, Number],
    currentPage: [String, Number]
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    }
  }
}
</script>

<style scoped>
.pagination {
  display: inline-block;
}
.current {
  background-color: teal;
  color: #fff;
}
.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}
</style>