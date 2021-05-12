<template>
  <div 
    class="relative w-full flex justify-center"
    :style="{'height': `${postitH}rem`}"
  >
      <div
        class="absolute bg-blue-200 w-10/12 h-4/6 text-2xl px-2 shadow truncate"
        style="text-align:left;"
      >
        <!-- <input
          class="w-full h-full"
          type="text"
          v-model="newMemo"
        /> -->
        <textarea
          ref="ta"
          class="w-full h-full text-2xl bg-blue-200"
          style="line-break: strict;"
          v-model="newMemo"
          placeholder="new memo!"
          :spellcheck="false"
          type="text"
          rows=2
          maxlength="62"
          @keydown="limitLines($event)"
        />
      </div>
      <div
        class="absolute bg-blue-200 w-10/12 h-3 px-8 shadow1 bottom"
        style="backgroundColor:#bfd1fe;"
        :style="{'top':`${postitH * 4/6}rem`}"
      />
      <div
        class="absolute bg-blue-200 w-3 h-4/6 shadow2 right"
        style="left:91.6666%;backgroundColor:#bfd1fe;"
      />
      <div
        v-if="initial"
        class="absolute bg-yellow-200 w-5 h-5 "
        style="left:95%; border-radius: 50%"
        :style="{'top':`${postitH * 2/7}rem`}"
        @click="postToList"
      >
        +
      </div>
    </div>
</template>
<script>
export default {
  name: 'PostIt',
  props: {
    body: {
      type: String,
      default: ''
    },
    initial: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    limitLines() {
      console.log(this.$refs.ta.value.split('/(\r\n|\n|\r)/gm'))
    },
    postToList() {
      this.$emit('addToList', this.newMemo)
    },
  },
  mounted() {
    this.newMemo = this.body;
  },
  data() {
    return {
      postitH: 6,
      newMemo: '',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  /* background-color: transparent; */
  /* outline: none; */
  border: none;
  /* line-height: normal; */
  line-height: 0px;
  font-size: 10px;
  /* spellcheck: false; */
}
input:focus {
  line-height: 0px;
  color: grey;
}
.shadow {
  box-shadow: 1.5rem 1.5rem 5px grey;
}
/* .shadow1 { */
  /* box-shadow: 9px 12px 5px grey; */
/* } */
/* .shadow2 { */
  /* box-shadow: 9px 12px 5px grey; */
/* } */
.bottom {
  transform: skewX(45deg)  translateX(0.35rem);
}
.right {
  transform: skewY(45deg)  translateY(0.35rem);
}
textarea {
  resize: none;
}
::-webkit-scrollbar {
  width: 6px;
  border-radius: 4px;
  cursor: pointer;
  background-color: none;
  opacity: 0.1
}
::-webkit-scrollbar-button {
  display: none;
}
::-webkit-scrollbar-thumb {
  /* overflow: overlay; */
  height: 2px;
  opacity: 0;
  background-color: rgb(122, 168, 221);
  border-radius: 4px;
}
</style>
