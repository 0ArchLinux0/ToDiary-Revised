<template>
  <div class="flex flex-col justify-start items-center w-full h-full pt-10">
    <!-- <a href="/todo"> Todo </a>
    <a href="/memo"> Memo </a> -->
    <div
      v-for="(menu, idx) in menus"
      class="pointer"
      :key="`menu-${idx}`"
      @click="move(menu)"
    >
      {{menu}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  methods: {
    move(menu) {
      this.$router.push({ path: `/${menu}` })
    }
  },
  mounted() {
    console.log("memo")
  },
  data() {
    return {
      menus: ["todo", "memo"]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
