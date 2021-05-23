<template>
  <div 
    class="flex flex-col justify-start items-center w-full"
    style="padding-top: 16%"  
  >
    <div
      v-for="(menu, idx) in menus"
      class="pointer w-1/2"
      :key="`menu-${idx}`"
      @click="move(menu)"
    >
      <div
        class="mb-10"
      >
        <PostIt
          :body="menu"
          :postitH="6"
          :keyIdx="idx+1"
          :textCenter="true"
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
      // if(user)
      if(menu == 'memo(will be ready soon...)') return;
      this.$router.push({ path: `/${menu}` })
    }
  },
  mounted() {
    // console.log(this.$route.params);
    if(this.$route.params.pushedAfter === 'registered') {
      // console.log("pushed from register page");
      this.congratulate = true;
    }
    // console.log('store');
    // console.log(this.$store.getters["AccountModule/userInfo"])
    // console.log();
  },
  data() {
    return {
      // menus: ["todo", "memo","todo", "memo","todo", "memo","todo", "memo","todo", "memo","todo", "memo","todo", "memo","todo", "memo","todo", "memo",]
      menus: ["todo", "memo(will be ready soon...)"],
      congratulate: false,
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
