<template>
  <div id="schedule">
    <section id="live" v-if="!$store.state.liveClasses.loading">
      <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">
            This Week's Live Classes
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content columns">
            <div
              class="card column"
              v-for="(day, index) in currentWeek"
              :key="index"
            >
              <header class="card-header">
                <p class="card-header-title">
                  {{ day.date.toDateString() }}
                </p>
              </header>
              <div class="card-content">
                <ul
                  v-for="liveClass in day.liveClasses"
                  :key="liveClass.exerciseId"
                >
                  <a :href="liveClass.exampleLink">
                    {{ liveClass.exerciseName }} --
                    {{ new Date(liveClass.classTime).toTimeString().slice(0,5)
                    }}
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>
    </section>
     <b-skeleton size="is-large" :active="$store.state.liveClasses.loading" :count="2"></b-skeleton>
    <section id="prior">
      <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">
            Last Week
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="card" v-for="(day, index) in lastWeek" :key="index">
            <header class="card-header">
              <p class="card-header-title">
                {{ day.date.toDateString() }}
              </p>
            </header>
            <div class="card-content">
              <p class="has-text-weight-semibold">Exercises</p>
              <ul v-for="e in day.exercises" :key="e.scheduleId">
                <p>set: {{ e.setNumber }}</p>
                <p>
                  <a :href="e.exerciseInfo.exampleLink">{{
                    e.exerciseInfo.exerciseName
                  }}</a>
                  reps: {{ e.reps }}
                </p>
                <div id="feedback-control" v-show="e.difficultyFeedback == 0">
                  <b-field :id="e.scheduleId">
                    <b-select placeholder="Difficulty Feedback" v-model="e.difficultyValue">
                      <option
                        v-for="(value, key) in difficultes"
                        :value="value"
                        :key="key"
                      >
                        {{ key }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-button class='is-success is-light' 
                  @click="giveDifficultyFeedback(e.scheduleId, {
                    exerciseDate: e.exerciseDate, 
                    difficultyFeedback: e.difficultyValue,
                    exerciseId: e.exerciseId, userId: e.userId}), e.difficultyFeedback = e.difficultyValue"> 
                    Submit Feedback</b-button>
                </div>
              </ul>
              <p class="has-text-weight-semibold">Meals</p>
              <ul v-for="m in day.meals" :key="m.scheduleId">
                <p>
                  {{ m.mealType }} :
                  <a :href="m.mealInfo.recipeLink">{{ m.mealInfo.mealName }}</a>
                  calories: {{ m.mealInfo.calories }}
                </p>
              </ul>
            </div>
          </div>
        </div>
      </b-collapse>
    </section>
    <section id="current">
      <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">
            This Week
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="card" v-for="(day, index) in currentWeek" :key="index">
            <header class="card-header">
              <p class="card-header-title">
                {{ day.date.toDateString() }}
              </p>
            </header>
            <div class="card-content">
              <p class="has-text-weight-semibold">Exercises</p>
              <ul v-for="e in day.exercises" :key="e.scheduleId">
                <p>set: {{ e.setNumber }}</p>
                <p>
                  <a :href="e.exerciseInfo.exampleLink">{{
                    e.exerciseInfo.exerciseName
                  }}</a>
                  reps: {{ e.reps }}
                </p>
                <div id="feedback-control" v-show="e.difficultyFeedback == 0">
                  <b-field :id="e.scheduleId">
                    <b-select placeholder="Difficulty Feedback" v-model="e.difficultyValue">
                      <option
                        v-for="(value, key) in difficultes"
                        :value="value"
                        :key="key"
                      >
                        {{ key }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-button class='is-success is-light' 
                  @click="giveDifficultyFeedback(e.scheduleId, {
                    exerciseDate: e.exerciseDate, 
                    difficultyFeedback: e.difficultyValue,
                    exerciseId: e.exerciseId, userId: e.userId}), e.difficultyFeedback = e.difficultyValue"> 
                    Submit Feedback</b-button>
                </div>
              </ul>
              <p class="has-text-weight-semibold">Meals</p>
              <ul v-for="m in day.meals" :key="m.scheduleId">
                <p>
                  {{ m.mealType }} :
                  <a :href="m.mealInfo.recipeLink">{{ m.mealInfo.mealName }}</a>
                  calories: {{ m.mealInfo.calories }}
                </p>
              </ul>
            </div>
          </div>
        </div>
      </b-collapse>
    </section>
    <section id="upcomming">
      <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">
            Next Week
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="card" v-for="(day, index) in nextWeek" :key="index">
            <header class="card-header">
              <p class="card-header-title">
                {{ day.date.toDateString() }}
              </p>
            </header>
            <div class="card-content">
              <p class="has-text-weight-semibold">Exercises</p>
              <ul v-for="e in day.exercises" :key="e.scheduleId">
                <p>set: {{ e.setNumber }}</p>
                <p>
                  <a :href="e.exerciseInfo.exampleLink">{{
                    e.exerciseInfo.exerciseName
                  }}</a>
                  reps: {{ e.reps }}
                </p>
              </ul>
              <p class="has-text-weight-semibold">Meals</p>
              <ul v-for="m in day.meals" :key="m.scheduleId">
                <p>
                  {{ m.mealType }} :
                  <a :href="m.mealInfo.recipeLink">{{ m.mealInfo.mealName }}</a>
                  calories: {{ m.mealInfo.calories }}
                </p>
              </ul>
            </div>
          </div>
        </div>
      </b-collapse>
    </section>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  data() {
    return {
      currentDay: null,
      currentWeek: [],
      lastWeek: [],
      nextWeek: [],
      difficultes: { easy: 1, normal: 2, difficult: 3 },
      difficultyValue: 0
    };
  },
  created() {
    this.getDays();
  },
  methods: {
    getDays() {
      let day = this.$dayjs();

      for (let i = 0; i < 7; i++) {
        this.currentWeek.push({
          date: day.day(i).toDate(),
          exercises: [],
          meals: [],
          liveClasses: [],
        });
        this.currentWeek[i].date.setHours(0, 0, 0, 0, 0);
        this.nextWeek.push({
          date: day
            .day(i)
            .add(1, "week")
            .toDate(),
          exercises: [],
          meals: [],
          liveClasses: [],
        });
        this.nextWeek[i].date.setHours(0, 0, 0, 0, 0);
        this.lastWeek.push({
          date: day
            .day(i)
            .subtract(1, "week")
            .toDate(),
          exercises: [],
          meals: [],
          liveClasses: [],
        });
        this.lastWeek[i].date.setHours(0, 0, 0, 0, 0);
      }
      this.currentDay = day.toDate();
      this.currentDay.setHours(0, 0, 0, 0, 0);
      this.filterSchedules(this.lastWeek);
      this.filterSchedules(this.currentWeek);
      this.filterSchedules(this.nextWeek);
    },
    filterSchedules(week) {
      for (let day of week) {
        for (let exerciseSchedule of this.$store.state.signedInUser
          .exerciseSchedules.data) {
          //let d = new Date(exerciseSchedule.exerciseDate);
          let d = this.$dayjs(exerciseSchedule.exerciseDate).toDate();
          if (day.date.toDateString() === this.maintainUTCDate(d).toDateString()) {
            let e = this.mapExercises(exerciseSchedule);
            day.exercises.push(e);
          }
        }
        for (let liveClass of this.$store.state.liveClasses.data) {
          //let d = new Date(liveClass.classTime);
          let d = this.$dayjs(liveClass.classTime).toDate();
          if (day.date.toDateString() === d.toDateString()) {
            let l = liveClass;
            day.liveClasses.push(l);
          }
        }
        for (let mealSchedule of this.$store.state.signedInUser.mealSchedules
          .data) {
          //let d = new Date(mealSchedule.mealDate);
          let d = this.$dayjs(mealSchedule.mealDate).toDate();
          if (day.date.toDateString() === this.maintainUTCDate(d).toDateString()) {
            let m = this.mapMeals(mealSchedule);
            day.meals.push(m);
          }
        }
      }
    },
    mapMeals(schedule) {
      for (let m of this.$store.state.meals.data) {
        if (m.mealId == schedule.mealId) {
          schedule.mealInfo = m;
        }
      }
      return schedule;
    },
    mapExercises(schedule) {
      for (let e of this.$store.state.exercises.data) {
        if (e.exerciseId == schedule.exerciseId) {
          schedule.exerciseInfo = e;
          schedule.difficultyValue = schedule.difficultyFeedback;
        }
      }
      return schedule;
    },
    giveDifficultyFeedback(scheduleId, update) {
      let payload = { id: scheduleId, update};
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "signedInUserExerciseSchedules",
      });
      this.axios
        .post("/exercise_schedules/update/feedback/" + scheduleId,
          update,
          {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          }
        })
        .then(
          (res) => {
            this.$store.dispatch("updateExerciseDifficulty", payload);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "signedInUserExerciseSchedules",
            });
            console.log(res);
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "signedInUserExerciseSchedules",
            });
          }
        );
    },
    maintainUTCDate(d) {
      return new Date(d.getTime() + d.getTimezoneOffset() * 60000);
    }
  },
};
</script>
