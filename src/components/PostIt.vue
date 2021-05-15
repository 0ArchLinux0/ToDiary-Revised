<template>
  <div 
    class="relative w-full flex justify-center"
    :style="{'height': `${postitH}rem`}"
  >
      <!-- background:linear-gradient(to right, #BFDBFE, #b1d4ff); -->
      <div
        v-if="!initial"
        ref="postIt"
        class="relative w-10/12 h-4/6 text-2xl px-2 z-20 flex justify-start items-center"
        :class="{'shadowShort': !initial}"
        style="text-align:left;background:linear-gradient(to right, #BFDBFE, #b1d4ff);"
        :style="{'text-decoration': completed ? 'line-through' : 'none'}"
        @click="togglePostIt"
      >
        <span>{{newMemo}}</span>
      </div>
      
      <div
        v-if="initial" 
        class="absolute w-full h-full flex justify-center"
      >
        <div
          ref="postIt"
          class="relative flex justify-start items-center w-10/12 h-4/6 text-2xl px-2 z-20"
          :class="{'shadowShort': !initial}"
          style="text-align:left;background:linear-gradient(to right, #BFDBFE, #b1d4ff);"
        >
          <textarea
            ref="ta"
            class="w-full h-full text-2xl"
            style="line-break: strict;background:transparent;"
            v-model="newMemo"
            :disabled="!initial"
            placeholder="new memo!"
            :spellcheck="false"
            type="text"
            rows=2
            maxlength="62"
          />
        </div>
        <div
          class="absolute w-10/12 h-4/6 text-2xl px-2 truncate z-10"
          style="text-align:left;background:#BFDBFE"
        >
        <!-- background:linear-gradient(to right, #BFDBFE, #b1d4ff -->
          <textarea
            class="w-full h-full text-2xl"

            style="line-break: strict;background:transparent"
            placeholder="new memo!"
            disabled
            :spellcheck="false"
            type="text"
            rows=2
            maxlength="62"
          />
        </div>
        <div
          class="absolute bg-blue-200 w-10/12 h-4/6 shadowLong"
        />
        <div
          class="absolute w-10/12 h-3 px-8 shadow1 bottom"
          :style="{'top':`${postitH * 4/6}rem`}"
        />
          <!-- style="backgroundColor:#bfd1fe;" -->
        <div
          class="absolute w-3 h-4/6 shadow2 right"
          style="left:91.6666%;"
        />
        <div
          class="absolute bg-yellow-200 w-5 h-5 "
          style="left:95%; border-radius: 50%"
          :style="{'top':`${postitH * 2/7}rem`}"
          @click="postToList"
        >
          +
        </div>
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
    },
    inputActive: {
      type: Boolean,
      default: false,
    },
    keyIdx: {
      type: Number,
      default: -1,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    postitH: {
      type: Number,
      default:4,
    }
  },
  methods: {
    limitLines() {
    },
    postToList() {
      if(!this.initial || (!this.newMemo || this.newMemo === '')) return;
      // console.log('clicked');
      this.$refs.postIt.classList.add('moveToLeft');
    },
    togglePostIt() {
      console.log('toggle '+this.keyIdx)
      this.$emit('toggletodo', this.keyIdx)
    }
  },
  mounted() {
    this.newMemo = this.body;
    if(!this.initial) {
      this.$refs.postIt.classList.add('priorityMoveToLeft');
      this.$refs.postIt.addEventListener('transitionend', () => {
        this.$emit('added');
      })
      setTimeout(() => {
        this.$refs.postIt.classList.add('postIt');
      })
    } else {
      this.$refs.postIt.addEventListener('transitionend', () => {
        this.$emit('addToList', this.newMemo);
        this.newMemo = ''
        this.$refs.postIt.classList.remove('postIt');
        this.$refs.postIt.classList.remove('moveToLeft');
        setTimeout(() => this.$refs.postIt.classList.add('postIt'));

        // console.log("!!!!!!!!")
        // console.log(this.$refs.postIt.classList)
      })
      this.$refs.postIt.classList.add('postIt');
      // this.$refs.postIt.classList.add('priorityMoveToLeft');
    }
  },
  data() {
    return {
      newMemo: '',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: none;
  line-height: 0px;
  font-size: 10px;
}
input:focus {
  line-height: 0px;
  color: grey;
}
.priorityMoveToLeft {
  right: 100vw;
  transition: ease-out 0.5s;
  /* transform: translateX(-100%); */
}
.postIt {
  right: 0%;
  transition: ease-out 0.5s;
}
.moveToLeft {
  right: 100%;
  transition: ease-out 0.5s;
  /* transform: translateX(-100%); */
}
.shadowLong {
  box-shadow: 1.5rem 1.5rem 5px grey;
}
.shadowShort {
  box-shadow: 1rem 1rem 5px grey;
}
.bottom {
  transform: skewX(45deg)  translateX(0.35rem);
  background-color: #a0cbff;
}
.right {
  transform: skewY(45deg)  translateY(0.35rem);
  background-color: #a0cbff;
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
