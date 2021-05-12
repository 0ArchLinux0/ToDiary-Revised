<template>
  <div class="flex flex-col justify-start items-center w-full h-full pt-10">
    <div 
      id="title" 
      class="flex justify-center bg-red-200 items-center text-4xl "
      style="margin-bottom: 15%"
    >
      title & 제목
    </div>
    <div
      class="bg-blue-200 w-10/12 text-2xl py-6 px-8"
      style="minHeight: 55%; text-align:left;"
    >
      body
    </div>
  </div>
</template>
<script>
// import PostIt from '../components/PostIt.vue'
export default {
  name: 'Memo',
  components: {
    // PostIt,
  },
  props: {
    msg: String
  },
  mounted() {
    console.log("memo")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
