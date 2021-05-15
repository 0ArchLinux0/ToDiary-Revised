<template>
  <div class="flex flex-col justify-start items-center w-full h-full pt-10">
    <div 
      id="title" 
      class="flex justify-center items-center text-4xl "
      style="margin-bottom: 10%"
    >
      Contact
    </div>
    <div
      class="bg-blue-100 rounded-lg w-10/12 text-2xl py-6 px-8 flex flex-col justify-center items-center"
      style="minHeight: 55%; text-align:left;"
    >
      <ul>Email: bluebluerize900@gmail.com</ul>
      <ul>Tel: (+81)080-9003-7413</ul>
      <ul>Site: <a href="https://0archlinux0.github.io/">
        https://0archlinux0.github.io/</a></ul>
      <ul>Git: https://github.com/0ArchLinux0</ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Contact',
  components: {
    // PostIt,
  },
  props: {
    msg: String
  },
  mounted() {
    // console.log("memo")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: green;
}
a:hover {
  color:lightgreen;
}
</style>
