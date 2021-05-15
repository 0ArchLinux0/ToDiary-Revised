<template>
  <div 
    class="fixed w-full"
  >
    <div 
      id="topMenuBar"
      class="w-full flex justify-center text-xl bg-yellow-3"
    >
      <div class="absolute left-5">
        <router-link to="/contact">Contact</router-link>
      </div>
      <router-link to="/">Home</router-link>
      <div class="absolute right-5">
        <router-link to="/login">Login</router-link>
      </div>
      <!-- <button class="absolute left-5" @click="navigate('Contact')">Contact</button> -->
      <!-- <button @click="navigate('Home')">Home</button> -->
      <!-- <button class="absolute right-5" @click="navigate('Login')">Login</button> -->
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
    navigate(name) {
      this.$router.push({ name: `${name}` });
    },
  },
  mounted() {
    // console.log("memo")
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
