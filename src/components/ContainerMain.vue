<template>
  <div 
    class="fixed w-full h-10"
  >
    <button @click="toHome()">home</button>
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
