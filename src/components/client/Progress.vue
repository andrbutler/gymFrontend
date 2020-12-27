<template>
  <div id="progress" class="card">
    <div class="card-content">
      <div class="content columns">
        <div class="card column is-half" id="last-week" v-if="!lastWeek.loading">
          <p class="card-header-title">Last Week</p>
          <p>{{ this.lastWeek.date.toDateString() }}</p>
          <b-field label="Calories">
            <b-input
              placeholder="calories"
              type="number"
              min="0"
              v-model="lastWeek.cal"
              @input.native="validateCal($event.target.validity.valid, lastWeek)"
            >
            </b-input>
          </b-field>
          <b-field label="Weight">
            <b-input
              placeholder="weight"
              type="number"
              min="0"
              v-model="lastWeek.weight"
               @input.native="validateWeight($event.target.validity.valid, lastWeek)"
            >
            </b-input>
          </b-field>
          <b-button class="is-success is-light" @click="saveProgress(lastWeek)" :disabled="!lastWeek.valid"
            >Save</b-button
          >
        </div>
        <b-skeleton size="is-large" :active="lastWeek.loading" :count="2"></b-skeleton>
        <div class="card column is-half" id="current-week" v-if="!currentWeek.loading">
          <p class="card-header-title">This Week</p>
          <p>{{ this.currentWeek.date.toDateString() }}</p>
          <b-field label="Calories">
            <b-input
              placeholder="calories"
              type="number"
              min="0"
              v-model="currentWeek.cal"
               @input.native="validateCal($event.target.validity.valid, currentWeek)"
            >
            </b-input>
          </b-field>
          <b-field label="Weight">
            <b-input
              placeholder="weight"
              type="number"
              min="0"
              v-model="currentWeek.weight"
               @input.native="validateWeight($event.target.validity.valid, currentWeek)"
            >
            </b-input>
          </b-field>
          <b-button
          :disabled="!currentWeek.valid"
            class="is-success is-light"
            @click="saveProgress(currentWeek)"
            >Save</b-button
          >
        </div>
        <b-skeleton size="is-large" :active="currentWeek.loading" :count="2"></b-skeleton>
      </div>
      <b-table :data="progress" :columns="columns" v-if="!$store.state.signedInUser.progress.loading"></b-table>
      <b-skeleton size="is-large" :active="$store.state.signedInUser.progress.loading" :count="2"></b-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentWeek: {
        id: null,
        date: null,
        cal: null,
        calValid: false,
        weight: null,
        weightValid: false,
        isNew: true,
        loading: false,
        valid: false
      },
      lastWeek: {
        id: null,
        date: null,
        cal: null,
        calValid: false,
        weight: null,
        weightValid: false,
        isNew: true,
        loading: false,
        valid: false
      },
      progress: this.$store.state.signedInUser.progress.data,
      columns: [
        { field: "week", label: "week", searchable: true, sortable: true },
        { field: "weight", label: "weight", sortable: true  },
        { field: "weeklyCalories", label: "calories", sortable: true  },
      ],
    };
  },
  created() {
    this.getDays();
  },
  methods: {
    validateWeek(week){
      if( week.weightValid && week.calValid){
        week.valid = true;
      } else {
        week.valid = false;
      }
    },
    validateWeight(e, week){
      week.weightValid = e;
      this.validateWeek(week);
    },
    validateCal(e, week){
      week.calValid = e;
      this.validateWeek(week);
    },
    getDays() {
      let day = this.$dayjs();
      this.currentWeek.date = day.day(0).toDate();
      this.lastWeek.date = day
        .day(0)
        .subtract(1, "week")
        .toDate();
      this.currentWeek.date.setHours(12);
      this.lastWeek.date.setHours(12);
      this.mapProgress(this.currentWeek);
      this.mapProgress(this.lastWeek);
    },
    mapProgress(week) {
      for (let p of this.progress) {
        let d = this.$dayjs(p.week).toDate(0);

        if (week.date.toDateString() === d.toDateString()) {
          week.id = p.progressId;
          week.cal = p.weeklyCalories;
          week.weight = p.weight;
          week.isNew = false;
          week.calValid = true;
          week.weightValid = true;
          week.valid = true;
        }
      }
    },
    saveProgress(week) {
      week.loading = true;
      if (week.isNew) {
        let d = new Date(week.date);
        d.setHours(12);
        let update = {
          weeklyCalories: week.cal,
          week: d.toISOString(),
          weight: week.weight,
          userId: this.$store.state.signedInUser.userId,
        };
        this.$store.dispatch("setLoading", {
          phase: "setLoading",
          type: "signedInUserProgress",
        });
        this.axios
          .post("/progress/new", update, {
            headers: {
              Authorization: "Bearer " + this.$store.state.authToken,
            },
          })
          .then(
            (res) => {
              console.log(res);
              this.axios
                .get("/progress/all/" + this.$store.state.signedInUser.userId, {
                  headers: {
                    Authorization: "Bearer " + this.$store.state.authToken,
                  },
                })
                .then(
                  (res) => {
                    this.$store.dispatch("fetchSignedInUserProgress", res.data);
                    this.$store.dispatch("setLoading", {
                      phase: "setLoaded",
                      type: "signedInUserProgress",
                    });
                    this.progress = this.$store.state.signedInUser.progress.data;
                    this.mapProgress(week);
                    week.loading = false;
                  },
                  (err) => {
                    this.$buefy.dialog.alert(err.response.data.message);
                    this.$store.dispatch("setLoading", {
                      phase: "setLoaded",
                      type: "signedInUserProgress",
                    });
                    week.loading = false;
                  }
                );
            },
            (err) => {
              this.$buefy.dialog.alert(err.response.data.message);
              this.$store.dispatch("setLoading", {
                phase: "setLoaded",
                type: "signedInUserProgress",
              });
              week.loading = false;
            }
          );
      } else {
        let update = {
          progressId: week.id,
          weeklyCalories: week.cal,
          weight: week.weight,
          userId: this.$store.state.signedInUser.userId,
        };
        let payload = { id: week.id, update };
        this.$store.dispatch("setLoading", {
          phase: "setLoading",
          type: "signedInUserProgress",
        });
        this.axios
          .post("/progress/update/" + week.id, update, {
            headers: {
              Authorization: "Bearer " + this.$store.state.authToken,
            },
          })
          .then(
            (res) => {
              this.$store.dispatch("updateSignedInUserProgress", payload);
              this.$store.dispatch("setLoading", {
                phase: "setLoaded",
                type: "signedInUserProgress",
              });
              console.log(res);
              this.progress = this.$store.state.signedInUser.progress.data;
              this.mapProgress(week);
              week.loading = false;
            },
            (err) => {
              this.$buefy.dialog.alert(err.response.data.message);
              this.$store.dispatch("setLoading", {
                phase: "setLoaded",
                type: "signedInUserProgress",
              });
              week.loading = false;
            }
          );
      }
    },
  },
};
</script>
