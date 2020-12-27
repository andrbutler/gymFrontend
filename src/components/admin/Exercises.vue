<template>
  <div id="execises">
    <div class="box">
      <b-table
        v-if="!$store.state.exercises.loading"
        :data="exercises"
        :selected.sync="selectedExercise"
        @click="
          (e) => {
            this.updatedExercise = {
              exerciseId: e.exerciseId,
              exerciseName: e.exerciseName,
              exampleLink: e.exampleLink,
              exerciseType: e.exerciseType,
              classTime: new Date(e.classTime),
              nameValid: true,
              linkValid: true,
              typeValid: true,
              valid: true,
              isLive: e.exerciseType == 'LIVE',
            };
            this.isNew = false;
          }
        "
        focusable
        sticky-header
      >
        <b-table-column
          field="exerciseName"
          label="name"
          searchable
          sortable
          v-slot="props"
          >{{ props.row.exerciseName }}
        </b-table-column>
        <b-table-column field="exampleLink" label="link" v-slot="props"
          >{{ props.row.exampleLink }}
        </b-table-column>
        <b-table-column
          field="exerciseType"
          label="type"
          searchable
          sortable
          v-slot="props"
          >{{ props.row.exerciseType }}
        </b-table-column>
        <b-table-column
          field="ClassTime"
          label="time"
          searchable
          sortable
          v-slot="props"
          >{{
            props.row.classTime
              ? new Date(props.row.classTime).toDateString()
              : ""
          }}
          {{
            props.row.classTime
              ? new Date(props.row.classTime).toTimeString()
              : ""
          }}
        </b-table-column>
      </b-table>
      <b-skeleton
        size="is-large"
        :active="$store.state.exercises.loading"
        :count="2"
      ></b-skeleton>
    </div>
    <div class="box" id="updatedExercise">
      <b-field>
        <b-switch
          @input="
            (e) => {
              if (e) {
                this.updatedExercise = {
                  exerciseId: null,
                  exerciseName: null,
                  exampleLink: null,
                  exerciseType: null,
                  classTime: null,
                  nameValid: false,
                  typeValid: false,
                  linkValid: false,
                  valid: false,
                  isLive: false,
                };
              }
            }
          "
          :disabled="isNew"
          v-model="isNew"
          type="is-dark"
          >New Exercise</b-switch
        >
      </b-field>
      <b-field label="Name">
        <b-input
          placeholder="name"
          maxlength="120"
          v-model="updatedExercise.exerciseName"
          @input.native="validateName($event.target.validity.valid)"
          required
        >
        </b-input>
      </b-field>
      <b-field label="Link">
        <b-input
          placeholder="link"
          maxlength="100"
          v-model="updatedExercise.exampleLink"
          @input.native="validateLink($event.target.validity.valid)"
        >
        </b-input>
      </b-field>
      <b-field label="Exercise Type">
        <b-select
          placeholder="select an exercise type"
          required
          v-model="updatedExercise.exerciseType"
          @input="
            (e) => {
              if (e == 'LIVE') {
                this.updatedExercise.isLive = true;
              } else {
                this.updatedExercise.isLive = false;
              }
              this.updatedExercise.typeValid = true;
              validateExercise();
            }
          "
        >
          <option value="EXERCISE">exercise</option>
          <option value="LIVE">live class</option>
        </b-select>
      </b-field>
      <b-field label="time" v-show="updatedExercise.isLive">
        <b-datetimepicker
          placeholder="Select a date"
          icon="calendar-today"
          v-model="updatedExercise.classTime"
          horizontal-time-picker
          position="is-top-right"
          size="is-small"
          mobile-native
        >
        </b-datetimepicker>
      </b-field>
      <b-button
        :disabled="!updatedExercise.valid"
        class="is-success"
        @click="saveExercise()"
        >Save</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exercises: this.$store.state.exercises.data,
      selectedExercise: {},
      updatedExercise: {
        nameValid: false,
        linkValid: false,
        typeValid: false,
        isLive: false,
        valid: false,
      },
      isNew: true,
    };
  },
  methods: {
    validateExercise() {
      if (
        this.updatedExercise.nameValid &&
        this.updatedExercise.linkValid &&
        this.updatedExercise.typeValid
      ) {
        this.updatedExercise.valid = true;
      } else {
        this.updatedExercise.valid = false;
      }
    },
    validateName(e) {
      this.updatedExercise.nameValid = e;
      this.validateExercise();
    },
    validateLink(e) {
      this.updatedExercise.linkValid = e;
      this.validateExercise();
    },
    saveExercise() {
      if (this.isNew) {
        this.saveNewExercise();
      } else {
        this.updateExercise();
      }
    },
    saveNewExercise() {
      let update = {
        exerciseName: this.updatedExercise.exerciseName,
        exampleLink: this.updatedExercise.exampleLink,
        exerciseType: this.updatedExercise.exerciseType,
        classTime: null,
      };
      if (this.updatedExercise.isLive) {
        let d = new Date(this.updatedExercise.classTime);
        update.classTime = d.toISOString();
      }
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "exercises",
      });
      this.axios
        .post("/exercises/new", update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            this.axios
              .get("/exercises/all", {
                headers: {
                  Authorization: "Bearer " + this.$store.state.authToken,
                },
              })
              .then(
                (res) => {
                  this.$store.dispatch("fetchExercises", res.data);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "exercises",
                  });
                  this.exercises = this.$store.state.exercises.data;
                  this.updatedExercise = {
                    nameValid: false,
                    linkValid: false,
                    typeValid: false,
                    isLive: false,
                    valid: false,
                  };
                  this.selectedExercise = null;
                  this.isNew = true;
                },
                (err) => {
                  this.$buefy.dialog.alert(err.response.data.message);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "exercises",
                  });
                }
              );
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "exercises",
            });
          }
        );
    },
    updateExercise() {
      let update = {
        exerciseName: this.updatedExercise.exerciseName,
        exampleLink: this.updatedExercise.exampleLink,
        exerciseType: this.updatedExercise.exerciseType,
        classTime: null,
      };
      let id = this.updatedExercise.exerciseId;
      if (this.updatedExercise.isLive) {
        let d = new Date(this.updatedExercise.classTime);
        update.classTime = d.toISOString();
      }
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "exercises",
      });

      this.axios
        .post("/exercises/update/" + id, update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            this.$store.dispatch("updateExercises", {
              exerciseId: id,
              ...update,
            });
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "exercises",
            });
            this.exercises = this.$store.state.exercises.data;
            this.updatedExercise = {
              nameValid: false,
              linkValid: false,
              typeValid: false,
              isLive: false,
              valid: false,
            };
            this.selectedExercise = null;
            this.isNew = true;
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "exercises",
            });
          }
        );
    },
  },
};
</script>
