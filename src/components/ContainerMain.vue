<template>
  <div 
    class="fixed w-full"
  >
    <div 
      id="topMenuBar"
      class="w-full flex justify-center text-xl bg-white"
    >
      <button class="absolute left-5" @click="toHome()">Contact</button>
      <button @click="toHome()">Home</button>
      <button class="absolute right-5" @click="toHome()">Login</button>
    </div>
    <router-view
      :mobile="mobile"
    />
  </div>
</template>
<script>
export default {
  name: 'ContainerMain',
  props: {
    msg: String
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/' });
    },
  },
  mounted() {
    console.log("memo")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  border: none;
  outline: none;
  user-select: none;
}
</style>
