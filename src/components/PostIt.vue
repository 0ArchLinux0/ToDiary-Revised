<template>
  <div 
    class="relative w-full flex justify-center"
    :style="{'height': `${postitH}rem`}"
    @click="togglePostIt"
  >
    <!-- @touchstart.prevent.self="togglePostIt" -->
      <!-- background:linear-gradient(to right, #BFDBFE, #b1d4ff); -->
      <div
        v-if="!initial"
        ref="postIt"
        class="relative w-10/12 h-4/6 text-2xl px-2 z-20 flex items-center gradient overflowClass wheel"
        :class="{
          'shadowShort': !initial,
          'justify-start': !textCenter,
          'justify-center': textCenter
        }"
        :style="{'text-decoration': completed ? 'line-through' : 'none'}"
        style="white-space:nowrap;"
      >
        <span>{{newMemo}}</span>
      </div>
      <div
        v-if="!initial"
        class="absolute w-full"
      >
        <div
          class="absolute bg-blue-300 w-5 h-5 rounded-lg flex justify-center items-center"
          style="right:95%;"
          :style="{
            'top':`${postitH * 1/7}rem`,
            'text-decoration': completed ? 'line-through' : 'none'
          }"
        >
          <!-- :class="{'lineThrough': completed}" -->
          {{keyIdx}}
        </div>
        <div
          class="absolute bg-yellow-300 w-5 h-5 "
          style="left:95%; border-radius: 50%"
          :style="{
            'top':`${postitH * 2/7}rem`,
          }"
          @click.stop="emitDelete(keyIdx)"
        >
         -
        </div>
      </div>
      
      <div
        v-if="initial" 
        class="relative w-full h-full flex justify-center"
      >
        <div
          ref="postIt"
          class="relative flex items-center w-10/12 h-4/6 text-2xl px-2 z-20 gradient"
          :class="{
          'shadowShort': !initial,
          'justify-start': !textCenter,
          'justify-center': textCenter
        }"
        >
        <!-- style="line-break: strict; -->
          <textarea
            ref="ta"
            class="w-full h-full text-2xl wheel overflowClass pt-1"
            style="background:transparent;white-space:nowrap;vertical-align:center"
            v-model="newMemo"
            :disabled="disabled"
            :placeholder="body"
            :spellcheck="false"
            type="text"
            rows=2
            maxlength="110"
            @keydown.enter.exact.prevent
            @keydown.enter="postToList"
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
            :maxlength="maxInput"
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
          v-if="!preventDefalut"
          class="absolute bg-red-300 w-5 h-5 "
          style="left:95%; border-radius: 50%"
          :style="{
            'top':`${postitH * 2/7}rem`,
          }"
          @click="postToList"
        >
            <!-- 'border-radius': `${buttonName ? 10 : 50}%` -->
          <!-- {{ buttonName ? buttonName : '+' }} -->
          +
        </div>
      </div>
    </div>
    <div v-if="initial" class="relative w-full">
     <div 
      class="absolute" 
      style="right:8.333%"
      :style="{'color': textAreaFull ? 'red' : 'black'}"
    >
       ({{ length }}/{{ maxInput }})
     </div>
    </div>
</template>
<script>
// import { bus } from '../main'
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
    // inputActive: {
    //   type: Boolean,
    //   default: false,
    // },
    keyIdx: {
      type: Number,
      default: -1,
    },
    preventDefalut: {
      type: Boolean,
      default: false,
    },
    maxInput: {
      type: Number,
      default: 62,
    },
    buttonName: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    postitH: {
      type: Number,
      default:4,
    },
    textCenter: {
      type: Boolean,
      default: false,
    },
    textConfirmed: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    textAreaFull() {
      return this.length == 110;
    }
  },
  watch: {
    newMemo(newVal) {
      // console.log(newVal.length);
      this.length = newVal.length;
      if(this.textConfirmed === true) this.$emit('textchanged');
    }
  },
  emits: ['delete', 'toggletodo', 'getBody', 'added', 'addToList'],
  // emits: {
  //   // No validation
  //   click: null,
    

  //   // Validate submit event
  //   submit: ({ email, password }) => {
  //     if (email && password) {
  //       return true
  //     } else {
  //       console.warn('Invalid submit event payload!')
  //       return false
  //     }
  //   }
  // },
  methods: {
    limitLines() {
    },
    emitDelete(keyIdx) {
      this.$emit('delete', keyIdx);
    },
    postToList() {
      // console.log('called');
      if(!this.initial || (!this.newMemo || this.newMemo === '') ) return;
      // console.log('clicked');
      this.$refs.postIt.classList.add('moveToLeft');
      this.disabled = true;
    },
    togglePostIt() {
      console.log('toggle')
      if(this.keyIdx == -1) return;
      // console.log('toggle '+this.keyIdx)
      this.$emit('toggletodo', this.keyIdx)
    },
    submit() {
      this.postToList();
      this.$emit('getBody', this.newMemo);
      //this.newMemo = '';
    },

  },
  mounted() {
    // this.isMobile =this.$store.getters["AccountModule/mobile"]
    if(!this.initial) {
      this.newMemo = this.body;
      this.newMemo = 'mounted';
      // this.$refs.postIt.classList.add('priorityMoveToLeft');
      this.$refs.postIt.classList.add('fromLeftToRight');
      // this.$refs.postIt.addEventListener('transitionend', () => {
      //   this.$emit('added');
      // })
      // setTimeout(() => {
      //   // this.newMemo = 'set timeout'
      //   this.$refs.postIt.classList.add('postIt');
      // },5)
    } else {
      this.$refs.postIt.addEventListener('transitionend', () => {
        this.disabled = false;
        this.$refs.postIt.classList.remove('postIt');
        this.$refs.postIt.classList.remove('moveToLeft');
        // console.log(this.newMemo);
        this.$emit('addToList', this.newMemo);
        this.newMemo = '';
        setTimeout(() => this.$refs.postIt.classList.add('postIt'));

        // console.log(this.$refs.postIt.classList)
      })
      this.$refs.postIt.classList.add('postIt');
      // this.$refs.postIt.classList.add('priorityMoveToLeft');
    }
    this.$refs.postIt.addEventListener('wheel', event => {
      const toLeft  = 
        event.deltaY < 0 && this.$refs.postIt.scrollLeft > 0
      const toRight = 
        event.deltaY > 0 && 
        this.$refs.postIt.scrollLeft < this.$refs.postIt.scrollWidth - this.$refs.postIt.clientWidth
      if (toLeft || toRight) {
        event.preventDefault()
        this.$refs.postIt.scrollLeft += event.deltaY
      }
    })
    // console.log(bus);
    // bus.$on('submit', () => {
      // this.postToList();
      // console.log('bus on submit');
    // })
  },
  // beforeUnmount() {
    // bus.$off('submit');
  // },
  data() {
    return {
      newMemo: '',
      disabled: false,
      length: 0,
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
.fromLeftToRight {
  animation: leftToRight 0.5s ease-out 1;
  transition: ease-out 0.5s;
  /* transform: translateX(-100%); */
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
/* .lineThrough {
  text-decoration: line-through;
  text-decoration-color: rgb(247, 132, 132);
} */
.gradient {
  text-align:left;
  /* background:linear-gradient(30deg, #BFDBFE, #9cc9ff); */
  background:linear-gradient(30deg, #bad8fc, #9cc9ff);
  /* background:linear-gradient(45deg, #9cc9ff, #BFDBFE); */
}
.overflowClass {
  overflow: auto;
  overflow-y: hidden;
}
/* .overflowClass:focus {
  overflow: auto;
  overflow-y: hidden;
} */
textarea {
  resize: none;
}
::-webkit-scrollbar {
  width: 6px;
  height: 9px;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgb(197, 220, 245);
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
.pallete {
  transform: skewY(45deg)  translateY(0.35rem);
  background-color: #7ab6ff;
  background-color: #a0cbff;
}
@keyframes leftToRight {
  from { right: 100vw; }
  to { right: 0; }
}
@keyframes rightToLeft {
  from { right: 0; }
  to { right: 100vw; }
}
</style>
