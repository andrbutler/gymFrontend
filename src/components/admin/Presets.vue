<template>
  <div id="presets">
    <div
      class="box"
      id="presetSelector"
      v-if="
        !$store.state.presets.loading && !$store.state.presetSchedules.loading
      "
    >
      <b-field label="Preset">
        <b-select
          placeholder="select a preset"
          v-model="selectedPreset"
          @input="initUpdate()"
        >
          <option
            v-for="preset in presets"
            :key="preset.presetId"
            :value="preset"
          >
            {{ preset.presetName }}
          </option>
        </b-select>
      </b-field>
      <b-field label="New Preset">
        <b-input
          required
          v-model="newPresetName"
          maxlength="30"
          placeholder="New Preset Name"
          @input.native="validatePresetName($event.target.validity.valid)"
        ></b-input>
      </b-field>
      <b-button
        :disabled="!newPresetValid"
        class="is-success"
        @click="addPreset()"
        >Save</b-button
      >
    </div>
    <b-skeleton
      size="is-large"
      :active="
        $store.state.presets.loading || $store.state.presetSchedules.loading
      "
      :count="2"
    ></b-skeleton>
    <div
      class="box"
      id="presetEditor"
      v-if="!$store.state.presetSchedules.loading"
    >
      <div
        id="controls"
        class="columns is-multiline"
        v-if="selectedPreset.presetId"
      >
        <b-button
          class="column is-half is-success"
          @click="validateAllSchedules()"
          >Save Changes</b-button
        >
        <b-button
          class="column is-half is-danger"
          @click="confirmDeletePreset(selectedPreset.presetId)"
          >DeletePreset</b-button
        >
      </div>
      <h2 class="subtitle" v-if="selectedPreset.presetId">
        Schedule New Exercise
      </h2>
      <div class="columns is-multiline" v-if="selectedPreset.presetId">
        <b-field label="days from start" class="column">
          <b-input
            @input.native="
              validateDayFromStart($event.target.validity.valid, newSchedule)
            "
            v-model="newSchedule.dayFromStart"
            type="number"
            min="0"
            max="180"
            placeholder="days from start date"
            required
          >
          </b-input>
        </b-field>
        <b-field label="set" class="column">
          <b-input
            @input.native="
              validateSetNumber($event.target.validity.valid, newSchedule)
            "
            v-model="newSchedule.setNumber"
            type="number"
            min="1"
            max="10"
            placeholder="set"
            required
          >
          </b-input>
        </b-field>
        <b-field label="exercise" class="column is-one-quarter">
          <b-select
            @input.native="
              validateExercise($event.target.validity.valid, newSchedule)
            "
            v-model="newSchedule.exercise"
            placeholder="select exercise"
            required
          >
            <option
              v-for="exercise in filteredExercises"
              :key="exercise.exerciseId"
              :value="exercise"
            >
              {{ exercise.exerciseName }}
            </option>
          </b-select>
        </b-field>
        <b-field label="reps" class="column" grouped>
          <b-input
            @input.native="
              validateReps($event.target.validity.valid, newSchedule)
            "
            v-model="newSchedule.reps"
            type="number"
            min="1"
            max="999"
            placeholder="reps"
            required
          >
          </b-input>
          <p class="control">
            <b-button
              class="is-success is-vcentered"
              :disabled="!newSchedule.valid"
              @click="addNewSchedule(newSchedule)"
              >schedule</b-button
            >
          </p>
        </b-field>
      </div>
      <h2 class="subtitle" v-if="selectedPreset.presetId">Edit Schedules</h2>
      <div
        class="columns is-multiline"
        v-for="(schedule, index) in selectedPreset.schedules"
        :key="index"
      >
        <b-field label="days from start" class="column">
          <b-input
            disabled
            v-model="schedule.dayFromStart"
            type="number"
            min="0"
            max="180"
            placeholder="days from start date"
            required
          >
          </b-input>
        </b-field>
        <b-field label="set" class="column">
          <b-input
            @input.native="
              validateSetNumber($event.target.validity.valid, schedule)
            "
            v-model="schedule.setNumber"
            type="number"
            min="1"
            max="10"
            placeholder="set"
            required
          >
          </b-input>
        </b-field>
        <b-field label="exercise" class="column is-one-quarter">
          <b-select
            @input.native="
              validateExercise($event.target.validity.valid, schedule)
            "
            v-model="schedule.exercise"
            placeholder="select exercise"
            required
          >
            <option
              v-for="exercise in filteredExercises"
              :key="exercise.exerciseId"
              :value="exercise"
            >
              {{ exercise.exerciseName }}
            </option>
          </b-select>
        </b-field>
        <b-field label="reps" class="column" grouped>
          <b-input
            @input.native="validateReps($event.target.validity.valid, schedule)"
            v-model="schedule.reps"
            type="number"
            min="1"
            max="999"
            placeholder="reps"
            required
          >
          </b-input>
          <p class="control">
            <b-button
              class="is-danger is-vcentered"
              @click="deleteScheduleHandler(schedule)"
              >Delete</b-button
            >
          </p>
        </b-field>
      </div>
      <b-skeleton
        size="is-large"
        :active="$store.state.presetSchedules.loading"
        :count="2"
      ></b-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedPreset: {},
      presets: [],
      presetSchedulesToSave: [],
      presetSchedulesToDelete: [],
      filteredExercises: [],
      newPresetName: null,
      newPresetValid: false,
      newSchedule: {
        dayFromStart: 0,
        scheduleId: null,
        setNumber: 0,
        reps: 0,
        presetId: null,
        exerciseValid: false,
        setValid: false,
        dayFromStartValid: true,
        repsValid: false,
        valid: false,
      },
    };
  },
  created() {
    this.filterExercises();
    this.initPresets();
  },
  methods: {
    validatePresetName(e) {
      this.newPresetValid = e;
    },
    validateSchedule(s) {
      if (s.exerciseValid && s.setValid && s.dayFromStartValid && s.repsValid) {
        s.valid = true;
      } else {
        s.valid = false;
      }
      if (Object.prototype.hasOwnProperty.call(s, "changed")) {
        s.changed = true;
      }
    },
    validateDayFromStart(e, s) {
      s.dayFromStartValid = e;
      this.validateSchedule(s);
    },
    validateReps(e, s) {
      s.repsValid = e;
      this.validateSchedule(s);
    },
    validateSetNumber(e, s) {
      s.setValid = e;
      this.validateSchedule(s);
    },
    validateExercise(e, s) {
      s.exerciseValid = e;
      this.validateSchedule(s);
    },
    validateAllSchedules() {
      for (let s of this.selectedPreset.schedules) {
        if (!s.valid) {
          return this.$buefy.dialog.alert(
            "one of the scheduled exercises is invalid, please update it and try again."
          );
        }
      }
      this.updatePreset();
    },
    confirmDeletePreset(s) {
      this.$buefy.dialog.confirm({
        title: "Delete Preset?",
        message:
          "Are you sure you want to <b>delete</b> this preset? This action cannot be undone.",
        confirmText: "Delete Preset",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deletePreset(s),
      });
    },
    addNewSchedule() {
      let s = {
        dayFromStart: this.newSchedule.dayFromStart,
        scheduleId: null,
        setNumber: this.newSchedule.setNumber,
        reps: this.newSchedule.reps,
        presetId: this.selectedPreset.presetId,
        exercise: this.newSchedule.exercise,
        exerciseValid: true,
        setValid: true,
        dayFromStartValid: true,
        repsValid: true,
        changed: true,
        valid: true,
      };
      this.selectedPreset.schedules.push(s);
      this.selectedPreset.schedules.sort((a, b) => {
        if (a.dayFromStart !== b.dayFromStart) {
          return a.dayFromStart - b.dayFromStart;
        } else {
          return a.setNumber - b.setNumber;
        }
      });
      this.newSchedule = {
        dayFromStart: 0,
        scheduleId: null,
        setNumber: 0,
        reps: 0,
        presetId: null,
        exerciseValid: false,
        setValid: false,
        dayFromStartValid: true,
        repsValid: false,
        valid: false,
      };
    },
    deleteScheduleHandler(s) {
      let index = this.selectedPreset.schedules.indexOf(s);
      this.selectedPreset.schedules.splice(index, 1);
      if (s.scheduleId) {
        this.presetSchedulesToDelete.push(s.scheduleId);
      }
    },
    initUpdate() {
      this.presetSchedulesToSave = new Array();
      this.presetSchedulesToDelete = new Array();
      this.newPresetName = null;
      this.newPresetValid = false;
      this.selectedPreset.schedules.sort((a, b) => {
        if (a.dayFromStart !== b.dayFromStart) {
          return a.dayFromStart - b.dayFromStart;
        } else {
          return a.setNumber - b.setNumber;
        }
      });
    },
    filterExercises() {
      for (let e of this.$store.state.exercises.data) {
        if (e.exerciseType !== "LIVE") {
          this.filteredExercises.push(e);
        }
      }
    },
    initPresets() {
      this.presets = new Array();
      this.selectedPreset = {};
      for (let preset of this.$store.state.presets.data) {
        let p = { ...preset, schedules: [] };
        p = this.mapSchedules(p);
        this.presets.push(p);
      }
    },
    mapSchedules(preset) {
      for (let schedule of this.$store.state.presetSchedules.data) {
        if (schedule.presetId === preset.presetId) {
          schedule = this.mapExercise(schedule);
          preset.schedules.push(schedule);
        }
      }
      return preset;
    },
    mapExercise(schedule) {
      for (let e of this.$store.state.exercises.data) {
        if (e.exerciseId === schedule.exerciseId) {
          schedule = {
            dayFromStart: schedule.dayFromStart,
            scheduleId: schedule.scheduleId,
            setNumber: schedule.setNumber,
            reps: schedule.reps,
            presetId: schedule.presetId,
            exercise: { ...e },
            exerciseValid: true,
            setValid: true,
            dayFromStartValid: true,
            repsValid: true,
            changed: false,
            valid: true,
          };
        }
      }
      return schedule;
    },
    addPreset() {
      let update = {
        presetName: this.newPresetName,
      };
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "presets",
      });
      this.axios
        .post("/presets/new", update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            this.axios
              .get("/presets/all", {
                headers: {
                  Authorization: "Bearer " + this.$store.state.authToken,
                },
              })
              .then(
                (res) => {
                  this.$store.dispatch("fetchPresets", res.data);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "presets",
                  });
                  this.initPresets();
                  this.presetSchedulesToSave = new Array();
                  this.presetSchedulesToDelete = new Array();
                  this.newPresetName = null;
                  this.newPresetValid = false;
                },
                (err) => {
                  this.$buefy.dialog.alert(err.response.data.message);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "presets",
                  });
                }
              );
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "presets",
            });
          }
        );
    },
    deletePreset(id) {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "presets",
      });
      this.axios
        .post("/presets/delete/" + id, null, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            this.axios
              .get("/presets/all", {
                headers: {
                  Authorization: "Bearer " + this.$store.state.authToken,
                },
              })
              .then(
                (res) => {
                  this.$store.dispatch("fetchPresets", res.data);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "presets",
                  });
                  this.initPresets();
                  this.presetSchedulesToSave = new Array();
                  this.presetSchedulesToDelete = new Array();
                  this.newPresetName = null;
                  this.newPresetValid = false;
                },
                (err) => {
                  this.$buefy.dialog.alert(err.response.data.message);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "presets",
                  });
                }
              );
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "presets",
            });
          }
        );
    },
    updatePreset() {
      this.deleteSelectedSchedules(this.presetSchedulesToDelete);
      for (let s of this.selectedPreset.schedules) {
        if (s.changed) {
          let sSubmit = {
            dayFromStart: s.dayFromStart,
            exerciseId: s.exercise.exerciseId,
            scheduleId: s.scheduleId,
            setNumber: s.setNumber,
            reps: s.reps,
            presetId: s.presetId,
          };
          this.presetSchedulesToSave.push(sSubmit);
        }
      }
      this.updateSelectedSchedules(this.presetSchedulesToSave);
    },
    deleteSelectedSchedules(schedules) {
      if (schedules.length > 0) {
        this.$store.dispatch("setLoading", {
          phase: "setLoading",
          type: "presetSchedules",
        });
        this.axios
          .post("/preset_schedules/groupDelete/", schedules, {
            headers: {
              Authorization: "Bearer " + this.$store.state.authToken,
            },
          })
          .then(
            (res) => {
              console.log(res);
              this.axios
                .get("/preset_schedules/allschedules", {
                  headers: {
                    Authorization: "Bearer " + this.$store.state.authToken,
                  },
                })
                .then(
                  (res) => {
                    this.$store.dispatch("fetchPresetSchedules", res.data);
                    this.$store.dispatch("setLoading", {
                      phase: "setLoaded",
                      type: "presetSchedules",
                    });
                    this.initPresets();
                    this.presetSchedulesToSave = new Array();
                    this.presetSchedulesToDelete = new Array();
                    this.newPresetName = null;
                    this.newPresetValid = false;
                  },
                  (err) => {
                    this.$buefy.dialog.alert(err.response.data.message);
                    this.$store.dispatch("setLoading", {
                      phase: "setLoaded",
                      type: "presetSchedules",
                    });
                  }
                );
            },
            (err) => {
              this.$buefy.dialog.alert(err.response.data.message);
              this.$store.dispatch("setLoading", {
                phase: "setLoaded",
                type: "presetSchedules",
              });
            }
          );
      }
    },
    updateSelectedSchedules(schedules) {
      if (schedules.length > 0) {
        this.$store.dispatch("setLoading", {
          phase: "setLoading",
          type: "presetSchedules",
        });
        this.axios
          .post("/preset_schedules/groupUpdate/", schedules, {
            headers: {
              Authorization: "Bearer " + this.$store.state.authToken,
            },
          })
          .then(
            (res) => {
              console.log(res);
              this.axios
                .get("/preset_schedules/allschedules", {
                  headers: {
                    Authorization: "Bearer " + this.$store.state.authToken,
                  },
                })
                .then(
                  (res) => {
                    this.$store.dispatch("fetchPresetSchedules", res.data);
                    this.$store.dispatch("setLoading", {
                      phase: "setLoaded",
                      type: "presetSchedules",
                    });
                    this.initPresets();
                    this.presetSchedulesToSave = new Array();
                    this.presetSchedulesToDelete = new Array();
                    this.newPresetName = null;
                    this.newPresetValid = false;
                  },
                  (err) => {
                    this.$buefy.dialog.alert(err.response.data.message);
                    this.$store.dispatch("setLoading", {
                      phase: "setLoaded",
                      type: "presetSchedules",
                    });
                  }
                );
            },
            (err) => {
              this.$buefy.dialog.alert(err.response.data.message);
              this.$store.dispatch("setLoading", {
                phase: "setLoaded",
                type: "presetSchedules",
              });
            }
          );
      }
    },
  },
};
</script>
