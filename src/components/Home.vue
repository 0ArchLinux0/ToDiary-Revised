<template>
  <div
    class="
      relative
      flex flex-col
      justify-around
      items-center
      w-full
      h-full
    "
    style="margin-top: 5vh"
  >
    <!-- <v-date-picker locale="en" v-model="date" /> -->
    <!-- :columns="$screens({ default: 1, lg: 3, xl: 4 })"
  :rows="$screens({ default: 1, lg: 2, xl: 3 })"
  :is-expanded="$screens({ default: true, lg: false })" -->
    <!-- <v-calendar
      ref="calendar"
      class="date-picker w-3/4 h-100"
      locale="en"
      :columns="layout.columns"
      :rows="layout.rows"
      style="height=1200px"
      v-model="date"
      :is-expanded="layout.isExpanded"
      :theme-styles='themeStyles'
      :attributes='attributes'
      @change='getEvents'
    > -->
    <v-calendar
      ref="calendar"
      class="date-picker h-100"
      locale="en"
      :theme-styles='themeStyles'
      disable-page-swipe
      :is-expanded="layout.isExpanded"
      :attributes="attributes"
      @update:from-page="update"
    >
      <!-- @dayclick='dayClicked' -->
      <!-- <v-date-picker :transition="'none'">
        <template v-slot="{ inputValue, togglePopover }">
          <input :value="inputValue"
             @click="togglePopover({ placement: 'bottom', transition: 'none', showDelay: 0, hideDelay: 0 })"
          />
        </template>
      </v-date-picker> -->
      <template v-slot:day-content="{ day, attributes }">
        <div
          class="flex flex-col h-full overflow-hidden pointer"
          @click.stop="dayClicked(day)"
        >
          <span class="text-sm z-10 text-gray-900"
            >{{ day.day }} {{ getPercentage(day) }}
          </span>
          <div class="flex-grow overflow-hidden">
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="-z-10 text-xs rounded-sm p-1 mt-0 mb-1"
              :class="attr.customData.class"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>
<script>
import AccountService from "@/services/AccountService.js";
import ContentService from "@/services/ContentService.js";
export default {
  name: "Home",
  components: {},
  props: {
    msg: String,
  },
  computed: {
    layout() {
      return this.$screens({
        // Default layout for mobile
        default: {
          columns: 1,
          rows: 1,
          isExpanded: false,
        },
        // Override for large screens
        lg: {
          columns: 1,
          rows: 1,
          isExpanded: false,
        },
      });
    },
    dateTodayArray() {
      const date = new Date();
      const temp = new Date(
        date.getTime() - date.getTimezoneOffset() * 60 * 1000
      );
      return temp.toISOString().split("T")[0].split("-");
    },
    attributes() {
      // return this.todos.map(t => ({
      //   key: `todo.${t.id}`,
      //   dot: {
      //     backgroundColor: t.color,
      //   },
      //   dates: t.date,
      //   customData: t,
      // }));
      // console.log(this.todoLists[0]);
      return this.todoLists;
      // return  [{
      //   key: "today",
      //   // highlight: '#000',
      //   highlight: true,
      //   popover: {
      //     label: 'John Birthday',

      //   },
      //   dates: new Date()
      // },
      // {
      //   highlight: true,
      //   popover: {
      //    label: ['Other event, even2']
      //   },
      //   dates: new Date(2021, 11, 13)
      // },
      // ]
    },
    userInfo() {
      return this.$store.getters["AccountModule/userInfo"];
    },
  },
  methods: {
    getPercentage(day) {
      const completedItems = this.completeStatus[day.year]?.[day.month]?.[day.day];
      return completedItems ? `(${(completedItems[0]/(completedItems[0] + completedItems[1])*100).toFixed(0)}%)` : '';
    },
    updateInfos(year, month) {
      console.log('updateinfos ' + year + ' ' + month);
      console.log(this.userInfo);
      return new Promise((resolve, reject) => {
        if (this.loadedYearMonths[year]?.[month]) {
          this.currentYearMonth = [year, month];
          resolve();
          return;
        }

        let idx = 1;
        let todoListIds;
        if (this.userInfo) {
          AccountService.getInfo(this.userInfo.oid, [
            `todoIds.${year}.${month}`,
          ])
            .then(({ data }) => {
              todoListIds = data?.todoIds?.[year]?.[month];
              console.log('todolist');
              console.log(todoListIds);
              if(!todoListIds || todoListIds.length == 0) return reject();

              this.completeStatus[year] = {};
              this.completeStatus[year][month] = {};
              const promises = [];

              for (let [day, todoListId] of Object.entries(todoListIds)) {
                day = Number(day);
                promises.push(new Promise((resolve, reject) => {
                  ContentService.getContent({
                    collection: "todos",
                    contentoid: todoListId,
                    toGrab: ["todos"],
                  }).then(({ data }) => {
                    console.log('get content');
                    console.log(data);
                    const infos = data;
                    this.completeStatus[year][month][day] = [0, 0];
                    let compleStatusCnt = this.completeStatus[year][month][day];

                    for (const todoItem of infos.todos) {
                      todoItem.completed
                        ? compleStatusCnt[0]++
                        : compleStatusCnt[1]++;

                      if(todoItem.completed) {
                        this.todoLists.push({
                          key: `key-${idx++}`,
                          dates: new Date(year, month - 1, day),
                          customData: {
                            title: todoItem.todo,
                            class: `${this.randomColor()} text-white ${
                              todoItem.completed ? "line-through" : ""
                            }`,
                          },
                        });
                        compleStatusCnt[0]++;
                      } else {
                        this.todoLists.unshift({
                          key: `key-${idx++}`,
                          dates: new Date(year, month - 1, day),
                          customData: {
                            title: todoItem.todo,
                            class: `${this.randomColor()} text-white ${
                              todoItem.completed ? "line-through" : ""
                            }`,
                          },
                        });
                        compleStatusCnt[1]++;
                      }
                      
                    }
                    resolve();
                  })
                  .catch(() => reject());
                }));
              }

              Promise.all(promises)
                .then(() => {
                  if(this.loadedYearMonths[year] == null) this.loadedYearMonths[year] = {};
                  this.loadedYearMonths[year][month] = true;
                  return resolve();
                })
                .catch(() => {
                  return reject();
                });
            })
            .catch((e) => {
              console.log(e);
              return reject();
            })
        } else return reject();
      });
    },
    dayClicked(day) {
      // console.log(day.id);
      this.$router.push({ path: `/todo/${day.id}` });
    },
    update(event) {
      console.log(event);
      console.log(this.todoLists)
      console.log(this.loadedYearMonths)
      console.log('-----')
      if(!this.userInfo) return;
      const { year, month }  = event;
      this.currentYearMonth = [year, month];  
      this.updateInfos(year, month)
        .then(() => {
          return;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    randomColor() {
      return [
        "bg-green-500",
        "bg-blue-400",
        "bg-yellow-500",
        "bg-red-300",
        "bg-purple-500",
      ][Math.floor(Math.random() * 5)];
    },
  },
  async mounted() {
    // console.log(this.$refs.calendar);
    // console.log(this.userInfo)
    if (this.$route.params.pushedAfter === "registered") {
      this.congratulate = true;
    }
    this.$refs.calendar.focusDate(
      new Date(this.dateTodayArray[0], [this.dateTodayArray[1]] - 1, [
        this.dateTodayArray[2],
      ])
    );
  },
  data() {
    return {
      themeStyles: {
        // wrapper: {
        //   background: "linear-gradient(to bottom right, #ff5050, #ff66b3)",
        //   color: "#fafafa",
        //   border: "0",
        //   borderRadius: "5px",
        //   boxShadow:
        //     "0 4px 8px 0 rgba(0, 0, 0, 0.14), 0 6px 20px 0 rgba(0, 0, 0, 0.13)",
        // },
        wrapper: { 
          background: 'linear-gradient(to bottom right, #ff5050, #ff66b3)',
          color: '#fafafa' 
        }
        // weekdays: {
        //   padding: "20px 50px 5px 50px",
        // },
      },
      congratulate: false,
      todoLists: [],
      completeStatus: {},
      currentYearMonth: [0, 0],
      loadedYearMonths: {},
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer {
  cursor: pointer;
}
/* lang="postcss" */
/* /deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
} */
</style>
<style>
.date-picker .vc-day {
  height: 11vh;
  /* width: 80px; */
  width: 8vw;
}
.vc-pane-container {
  background: linear-gradient(to bottom right, #ff5050, #ff66b3);
  color: #fafafa;
}
@media (max-width: 979px) {
  .date-picker .vc-day {
    max-height: 10vhpx;
    /* width: 80px; */
    width: 12vw;
  }
}

.date-picker .vc-weekday {
  padding-top: 30px;
  padding-bottom: 20px;
}
.date-picker .vc-day-box-center-center {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>




