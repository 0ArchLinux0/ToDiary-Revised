<template>
  <div 
    class="flex flex-col justify-start items-center w-full"
    style="padding-top: 10%"  
  >
    <div
      v-for="(menu, idx) in menus"
      class="pointer w-1/4"
      :key="`menu-${idx}`"
      @click="move(menu)"
    >
      <div
        class="mb-10"
      >
        <PostIt
          :body="menu"
          :completed="false"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PostIt from '../components/PostIt.vue'
export default {
  name: 'Home',
  components: {
    PostIt,
  },
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
