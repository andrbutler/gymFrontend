<template>
  <div id="clients" class="box">
    <div v-if="!isManaging" id="clientSelector">
      <b-table
        :data="filteredUsers"
        :columns="userColumns"
        :selected.sync="selectedClientToManage"
        sticky-header
        scrollable
        v-if="!$store.state.users.loading"
      ></b-table>
      <b-skeleton
        size="is-large"
        :active="$store.state.users.loading"
        :count="2"
      ></b-skeleton>
      <b-button
        :disabled="!(selectedClientToManage.userId > 0)"
        class="is-link"
        @click="selectClient()"
        >Manage Client</b-button
      >
    </div>
    <div v-if="isManaging" id="clientEditor">
      <b-button class="is-warning" @click="exitManagement()"
        >Exit Client Management</b-button
      >
      <b-tabs
        type="is-boxed"
        expanded
        v-if="!$store.state.selectedUser.loading"
      >
        <b-tab-item label="exercise schedules">
          <div class="block">
            <b-field class="subtile" label="Assign Preset to Client">
              <b-switch type="is-danger" v-model="presetModeEnabled"></b-switch>
            </b-field>
            <h4>(warning this will delete all unsaved edits)</h4>
            <div class="columns">
              <b-datepicker
                class="column"
                :min-date="new Date()"
                v-if="presetModeEnabled"
                v-model="presetStartDate"
              >
              </b-datepicker>
              <b-select
                class="column"
                required
                v-if="presetModeEnabled"
                v-model="selectedPresetId"
                @input.native="validatePreset($event.target.validity.valid)"
              >
                <option
                  v-for="(key, value) in presetList"
                  :key="key"
                  :value="value"
                  >{{ key }}</option
                >
              </b-select>
              <b-button
                class="is-danger column"
                v-if="presetModeEnabled"
                @click="assignPreset()"
                :disabled="!presetValid"
                >Assign Preset</b-button
              >
            </div>
          </div>
          <div class="block columns">
            <b-button
              class="is-danger column is-full"
              @click="saveExerciseSchedulesHandler()"
              >Save All Changes</b-button
            >
          </div>
          <div v-if="!$store.state.selectedUser.exerciseSchedules.loading">
            <b-table
              :columns="exerciseScheduleColumns"
              :data="mappedExerciseSchedules"
              :selected.sync="selectedExerciseSchedule"
              @click="
                (e) => {
                  this.updatedExerciseSchedule = {
                    ...e,
                    exerciseValid: true,
                    repsValid: true,
                    setValid: true,
                    valid: true,
                  };
                  this.isNewExerciseSchedule = false;
                }
              "
              sticky-header
            >
            </b-table>
            <div class="box columns is-multiline" id="updateExerciseSchedule">
              <b-field class="column is-full">
                <b-switch
                  @input="
                    (e) => {
                      if (e) {
                        this.updatedExerciseSchedule = {
                          exerciseValid: false,
                          repsValid: false,
                          exerciseDate: new Date(),
                          changed: true,
                          setValid: false,
                          valid: false,
                        };
                        this.selectedExerciseSchedule = null;
                      }
                    }
                  "
                  :disabled="isNewExerciseSchedule"
                  v-model="isNewExerciseSchedule"
                  type="is-dark"
                  >Schedule New Exercise</b-switch
                >
              </b-field>
              <b-field label="Date" class="column is-half">
                <b-datepicker
                  v-model="updatedExerciseSchedule.exerciseDate"
                ></b-datepicker>
              </b-field>
              <b-field label="Select Exercise" class="column is-half">
                <b-select
                  required
                  placeholder="please select an exercise"
                  v-model="updatedExerciseSchedule.exerciseId"
                  @input.native="
                    validateExercise($event.target.validity.valid);
                    updatedExerciseSchedule.exerciseName =
                      exerciseList[$event.target.value];
                  "
                >
                  <option
                    v-for="(key, value) in exerciseList"
                    :key="key"
                    :value="value"
                    >{{ key }}</option
                  >
                </b-select>
              </b-field>
              <b-field label="Set Number" class="column is-two-fifths">
                <b-input
                  placeholder="set number"
                  required
                  type="number"
                  min="1"
                  max="10"
                  v-model="updatedExerciseSchedule.setNumber"
                  @input.native="
                    validateSetNumber($event.target.validity.valid)
                  "
                >
                </b-input>
              </b-field>
              <b-field label="Reps" class="column is-two-fifths">
                <b-input
                  placeholder="reps"
                  required
                  type="number"
                  min="1"
                  max="999"
                  v-model="updatedExerciseSchedule.reps"
                  @input.native="validateReps($event.target.validity.valid)"
                >
                </b-input>
              </b-field>
              <b-field label=" " class="column is-one-fifth" grouped>
                <b-button
                  :disabled="!updatedExerciseSchedule.valid"
                  @click="saveExerciseSchedule()"
                  class="is-success"
                >
                  Save Schedule
                </b-button>
                <b-button
                  class="is-danger is-vcentered"
                  @click="
                    deleteSelectedExerciseSchedule(selectedExerciseSchedule)
                  "
                  >Delete</b-button
                >
              </b-field>
            </div>
          </div>
          <b-loading
            :is-full-page="false"
            :active="$store.state.selectedUser.exerciseSchedules.loading"
            :can-cancel="false"
          >
          </b-loading>
        </b-tab-item>
        <b-tab-item label="meal schedules">
          <div class="block columns">
            <b-button
              class="is-danger column is-full"
              @click="saveMealSchedulesHandler()"
              >Save All Changes</b-button
            >
          </div>
          <div v-if="!$store.state.selectedUser.mealSchedules.loading">
            <b-table
              :columns="mealScheduleColumns"
              :data="mappedMealSchedules"
              :selected.sync="selectedMealSchedule"
              @click="
                (e) => {
                  this.updatedMealSchedule = {
                    ...e,
                    mealValid: true,
                    typeValid: true,
                    valid: true,
                  };
                  this.isNewMealSchedule = false;
                }
              "
              sticky-header
            >
            </b-table>
            <div class="box columns is-multiline" id="updateMealSchedule">
              <b-field class="column is-full">
                <b-switch
                  @input="
                    (e) => {
                      if (e) {
                        this.updatedMealSchedule = {
                          mealValid: false,
                          typeValid: false,
                          mealDate: new Date(),
                          changed: true,
                          valid: false,
                        };
                        this.selectedMealSchedule = null;
                      }
                    }
                  "
                  :disabled="isNewMealSchedule"
                  v-model="isNewMealSchedule"
                  type="is-dark"
                  >Schedule New Meal</b-switch
                >
              </b-field>
              <b-field label="Date" class="column is-half">
                <b-datepicker
                  v-model="updatedMealSchedule.mealDate"
                ></b-datepicker>
              </b-field>
              <b-field label="Select Meal" class="column is-half">
                <b-select
                  required
                  placeholder="please select a meal"
                  v-model="updatedMealSchedule.mealId"
                  @input.native="
                    validateMeal($event.target.validity.valid);
                    updatedMealSchedule.mealName =
                      mealList[$event.target.value];
                  "
                >
                  <option
                    v-for="(key, value) in mealList"
                    :key="key"
                    :value="value"
                    >{{ key }}</option
                  >
                </b-select>
              </b-field>

              <b-field label="Type" class="column is-two-thirds">
                <b-select
                  required
                  placeholder="please select meal type"
                  v-model="updatedMealSchedule.mealType"
                  @input.native="validateMealType($event.target.validity.valid)"
                >
                  <option value="BREAKFAST">Breakfast</option>
                  <option value="LUNCH">Lunch</option>
                  <option value="DINNER">Dinner</option>
                  <option value="SNACK">Snack</option>
                </b-select>
              </b-field>
              <b-field label=" " class="column is-one-third" grouped>
                <b-button
                  :disabled="!updatedMealSchedule.valid"
                  @click="saveMealSchedule()"
                  class="is-success"
                >
                  Save Schedule
                </b-button>
                <b-button
                  class="is-danger is-vcentered"
                  @click="deleteSelectedMealSchedule(selectedMealSchedule)"
                  >Delete</b-button
                >
              </b-field>
            </div>
          </div>
          <b-loading
            :is-full-page="false"
            :active="$store.state.selectedUser.mealSchedules.loading"
            :can-cancel="false"
          >
          </b-loading>
        </b-tab-item>
        <b-tab-item label="payments">
          <div v-if="!$store.state.selectedUser.payments.loading">
            <b-table
              :columns="paymentColumns"
              :selected.sync="selectedPayment"
              @click="
                (e) => {
                  this.updatedPayment = {
                    ...e,
                    dueDate: maintainUTCDate(new Date(e.dueDate)),
                    transactionDate: e.transactionDate
                      ? maintainUTCDate(new Date(e.transactionDate))
                      : new Date(),
                    amountDueValid: true,
                    changed: false,
                    valid: true,
                    isPaid: e.transactionDate ? true : false,
                  };
                  isNewPayment = false;
                }
              "
              :data="$store.state.selectedUser.payments.data"
              sticky-header
            >
            </b-table>
            <div class="box columns is-multiline" id="updatePayment">
              <b-field class="column is-full">
                <b-switch
                  @input="
                    (e) => {
                      if (e) {
                        this.updatedPayment = {
                          amountDueValid: false,
                          changed: false,
                          valid: false,
                          isPaid: false,
                        };
                        this.selectedPayment = null;
                      }
                    }
                  "
                  :disabled="isNewPayment"
                  v-model="isNewPayment"
                  type="is-dark"
                  >Create New Payment</b-switch
                >
              </b-field>
              <b-field label="Due Date" class="column is-half">
                <b-datepicker v-model="updatedPayment.dueDate"></b-datepicker>
              </b-field>
              <b-field label="Date Paid" class="column is-half">
                <b-switch :disabled="isNewPayment" v-model="updatedPayment.isPaid">Paid</b-switch>
                <b-datepicker
                  v-model="updatedPayment.transactionDate"
                  :disabled="!updatedPayment.isPaid"
                ></b-datepicker>
              </b-field>
              <b-field label="Amount Due" class="column is-half">
                <b-input
                  placeholder="amount due"
                  required
                  type="number"
                  min="0"
                  max="9999"
                  v-model="updatedPayment.amountDue"
                  @input.native="
                    validateAmountDue($event.target.validity.valid)
                  "
                >
                </b-input>
              </b-field>

              <b-field label=" " class="column is-one-half">
                <b-button
                  :disabled="!updatedPayment.valid"
                  @click="savePayment()"
                  class="is-success"
                >
                  Save Schedule
                </b-button>
              </b-field>
            </div>
          </div>
          <b-loading
            :is-full-page="false"
            :active="$store.state.selectedUser.payments.loading"
            :can-cancel="false"
          >
          </b-loading>
        </b-tab-item>
        <b-tab-item label="info">
          <div class="columns is-multiline">
            <div class="column is-one-third">
              <h2 class="has-text-weight-semibold">Email:</h2>
              <p>{{ $store.state.selectedUser.email }}</p>
            </div>
            <div class="column is-one-third">
              <h2 class="has-text-weight-semibold">Name:</h2>
              <p>
                {{ $store.state.selectedUser.firstName }}
                {{ $store.state.selectedUser.lastName }}
              </p>
            </div>
            <div class="column is-one-third">
              <h2 class="has-text-weight-semibold">Height:</h2>
              <p>{{ $store.state.selectedUser.height }}</p>
            </div>
            <div class="column is-one-third">
              <h2 class="has-text-weight-semibold">Phone:</h2>
              <p>{{ $store.state.selectedUser.phoneNumber }}</p>
            </div>
            <div class="column is-one-third">
              <h2 class="has-text-weight-semibold">username:</h2>
              <p>{{ $store.state.selectedUser.userName }}</p>
            </div>
            <div class="column is-one-third">
              <h2 class="has-text-weight-semibold">Status:</h2>
              <p>{{ $store.state.selectedUser.status }}</p>
            </div>
            <div class="column is-full">
              <h2 class="has-text-weight-semibold">Address:</h2>
              <p>
                {{ $store.state.address.address1 }} 
                {{ $store.state.address.address2 }}
              </p>
            </div>
            <div class="column is-full">
              <p>
                {{ $store.state.address.city }},{{
                  $store.state.address.stateName
                }}-{{ $store.state.address.country }}
                {{ $store.state.address.postCode }}
              </p>
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="reports">
          <div
            v-if="
              !$store.state.selectedUser.progress.loading &&
                !$store.state.selectedUser.exerciseSchedules.loading
            "
          >
            <b-field label="Select Report Type">
              <b-select v-model="reportType">
                <option value="progress">Weekly Progress</option>
                <option value="difficulty">Exercise Difficulty Feedback</option>
              </b-select>
            </b-field>
            <b-table
              :columns="progressColumns"
              :data="$store.state.selectedUser.progress.data"
              v-if="reportType == 'progress'"
              sticky-header
            >
            </b-table>
            <b-table
              :columns="difficultyColumns"
              :data="filteredDifficulty"
              v-if="reportType == 'difficulty'"
              sticky-header
            >
            </b-table>
          </div>
          <b-loading
            :is-full-page="false"
            :active="$store.state.selectedUser.progress.loading"
            :can-cancel="false"
          >
          </b-loading>
        </b-tab-item>
      </b-tabs>
      <b-skeleton
        size="is-large"
        :active="$store.state.selectedUser.loading"
        :count="2"
      ></b-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filteredUsers: [],
      isManaging: false,
      mealTypeSortValue: {
        BREAKFAST: 0,
        LUNCH: 1,
        DINNER: 2,
        SNACK: 3,
      },
      userColumns: [
        {
          field: "username",
          label: "username",
          searchable: true,
          sortable: true,
          centered: true,
        },
        {
          field: "email",
          label: "email",
          searchable: true,
          sortable: true,
          centered: true,
        },
        {
          field: "fname",
          label: "first name",
          searchable: true,
          sortable: true,
          centered: true,
        },
        {
          field: "lname",
          label: "last name",
          searchable: true,
          sortable: true,
          centered: true,
        },
        {
          field: "status",
          label: "status",
          searchable: true,
          sortable: true,
          centered: true,
        },
        {
          field: "phone",
          label: "phone number",
          searchable: true,
          sortable: true,
          centered: true,
        },
        {
          field: "joinDate",
          label: "join date",
          searchable: true,
          sortable: true,
          centered: true,
        },
      ],
      selectedClientToManage: {},
      paymentColumns: [
        {
          field: "dueDate",
          label: "Due",
          searchable: true,
          sortable: true,
        },
        {
          field: "amountDue",
          label: "Amount",
          searchable: true,
          sortable: true,
        },
        {
          field: "transactionDate",
          label: "Paid On",
          searchable: true,
          sortable: true,
        },
      ],
      progressColumns: [
        {
          field: "week",
          label: "Week Of",
          searchable: true,
          sortable: true,
        },
        { field: "weight", label: "Weight", sortable: true, centered: true },
        {
          field: "weeklyCalories",
          label: "Calories",
          sortable: true,
          centered: true,
        },
      ],
      difficultyColumns: [
        {
          field: "exerciseDate",
          label: "Date",
          searchable: true,
          sortable: true,
        },
        { field: "setNumber", label: "Set", centered: true },
        { field: "reps", label: "Reps", centered: true },
        {
          field: "difficultyFeedback",
          label: "Difficulty Feedback",
          sortable: true,
          centered: true,
        },
      ],
      exerciseScheduleColumns: [
        {
          field: "exerciseDate",
          label: "Date",
          searchable: true,
          sortable: true,
        },
        { field: "setNumber", label: "Set", centered: true },
        { field: "reps", label: "Reps", centered: true },
        {
          field: "exerciseName",
          label: "Exercise",
          sortable: true,
          searchable: true,
        },
      ],
      mealScheduleColumns: [
        {
          field: "mealDate",
          label: "Date",
          searchable: true,
          sortable: true,
        },
        {
          field: "mealType",
          label: "Type",
          sortable: true,
          searchable: true,
        },
        {
          field: "mealName",
          label: "Meal",
          sortable: true,
          searchable: true,
        },
      ],

      mappedExerciseSchedules: [],
      filteredDifficulty: [],
      presetList: {},
      exerciseList: {},
      mealList: {},
      mappedMealSchedules: [],
      mealSchedulesToDelete: [],
      mealSchedulesToUpdate: [],
      exerciseSchedulesToDelete: [],
      exerciseSchedulesToUpdate: [],
      reportType: "difficulty",
      selectedExerciseDate: new Date(),
      selectedMealDate: new Date(),
      selectedExerciseSchedule: {},
      selectedMealSchedule: {},
      selectedPayment: {},
      updatedExerciseSchedule: {
        exerciseValid: false,
        repsValid: false,
        exerciseDate: new Date(),
        changed: true,
        setValid: false,
        valid: false,
      },
      updatedMealSchedule: {
        mealValid: false,
        typeValid: false,
        mealDate: new Date(),
        changed: true,
        valid: false,
      },
      updatedPayment: {
        dueDate: new Date(),
        transactionDate: new Date(),
        amountDueValid: false,
        changed: true,
        valid: false,
        isPaid: false,
      },
      isNewMealSchedule: true,
      isNewExerciseSchedule: true,
      isNewPayment: true,
      selectedPresetId: null,
      presetValid: false,
      presetStartDate: new Date(),
      presetModeEnabled: false,
    };
  },
  created() {
    this.filterUsers();
    this.filterPresetList();
    this.filterExerciseList();
    this.filterMealList();
  },
  methods: {
    filterUsers() {
      for (let u of this.$store.state.users.data) {
        if (u.role !== "ROLE_ADMIN") {
          this.filteredUsers.push(u);
        }
      }
    },
    filterPresetList() {
      for (let p of this.$store.state.presets.data) {
        this.presetList[p.presetId] = p.presetName;
      }
    },
    filterExerciseList() {
      for (let e of this.$store.state.exercises.data) {
        if (e.exerciseType !== "LIVE") {
          this.exerciseList[e.exerciseId] = e.exerciseName;
        }
      }
    },
    filterMealList() {
      for (let m of this.$store.state.meals.data) {
        this.mealList[m.mealId] = m.mealName;
      }
    },
    validateExerciseSchedule() {
      if (
        this.updatedExerciseSchedule.exerciseValid &&
        this.updatedExerciseSchedule.repsValid &&
        this.updatedExerciseSchedule.setValid
      ) {
        this.updatedExerciseSchedule.valid = true;
      } else {
        this.updatedExerciseSchedule.valid = false;
      }
    },
    validateMealSchedule() {
      if (
        this.updatedMealSchedule.mealValid &&
        this.updatedMealSchedule.typeValid
      ) {
        this.updatedMealSchedule.valid = true;
      } else {
        this.updatedMealSchedule.valid = false;
      }
    },
    validatePayment() {
      if (this.updatedPayment.amountDueValid) {
        this.updatedPayment.valid = true;
      } else {
        this.updatedPayment.valid = false;
      }
    },
    validatePreset(e) {
      this.presetValid = e;
    },
    validateMeal(e) {
      this.updatedMealSchedule.mealValid = e;
      this.validateMealSchedule();
    },
    validateMealType(e) {
      this.updatedMealSchedule.typeValid = e;
      this.validateMealSchedule();
    },
    validateExercise(e) {
      this.updatedExerciseSchedule.exerciseValid = e;
      this.validateExerciseSchedule();
    },
    validateReps(e) {
      this.updatedExerciseSchedule.repsValid = e;
      this.validateExerciseSchedule();
    },
    validateSetNumber(e) {
      this.updatedExerciseSchedule.setValid = e;
      this.validateExerciseSchedule();
    },
    validateAmountDue(e) {
      this.updatedPayment.amountDueValid = e;
      this.validatePayment();
    },
    selectClient() {
      let update = {
        username: this.selectedClientToManage.username,
        userId: this.selectedClientToManage.userId,
        addressId: this.selectedClientToManage.addressId,
        role: this.selectedClientToManage.role,
        email: this.selectedClientToManage.email,
        fname: this.selectedClientToManage.fname,
        height: this.selectedClientToManage.height,
        joinDate: this.selectedClientToManage.joinDate,
        lname: this.selectedClientToManage.lname,
        phone: this.selectedClientToManage.phone,
        status: this.selectedClientToManage.status,
      };
      this.$store.dispatch("selectedUserInfo", update);
      this.fetchAddress();
      this.fetchExerciseSchedules();
      this.fetchMealSchedules();
      this.fetchPayments();
      this.fetchProgress();
      this.isManaging = true;
    },
    exitManagement() {
      this.selectedClientToManage = {};
      this.$store.dispatch("resetSelectedUser");
      this.isManaging = false;
      this.mappedExerciseSchedules = new Array();
      this.filteredDifficulty = new Array();
      this.mappedMealSchedules = new Array();
      this.mealSchedulesToDelete = new Array();
      this.mealSchedulesToUpdate = new Array();
      this.exerciseSchedulesToDelete = new Array();
      this.exerciseSchedulesToUpdate = new Array();
      this.selectedExerciseDate = new Date();
      this.selectedMealDate = new Date();
      this.selectedExerciseSchedule = null;
      this.selectedMealSchedule = null;
      this.selectedPayment = null;
      this.selectedPresetId = null;
      this.updatedExerciseSchedule = {
        exerciseValid: false,
        repsValid: false,
        exerciseDate: new Date(),
        changed: true,
        setValid: false,
        valid: false,
      };
      this.updatedMealSchedule = {
        mealValid: false,
        typeValid: false,
        mealDate: new Date(),
        changed: true,
        valid: false,
      };
      this.updatedPayment = {
        dueDate: new Date(),
        transactionDate: new Date(),
        amountDueValid: false,
        changed: true,
        valid: false,
        isPaid: false,
      };
      this.isNewMealSchedule= true;
      this.isNewExerciseSchedule= true;
      this.isNewPayment= true;
  
      this.presetValid= false;
      this.presetStartDate= new Date();
      this.presetModeEnabled= false;
    },
    fetchMealSchedules() {
      this.mappedMealSchedules = new Array();
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "selectedUserMealSchedules",
      });
      this.axios
        .get("/meal_schedules/all/" + this.selectedClientToManage.userId, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchSelectedUserMealSchedules", res.data);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "selectedUserMealSchedules",
            });
            this.mapMealSchedules();
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "selectedUserMealSchedules",
            });
          }
        );
    },
    fetchAddress() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "address",
      });
      this.axios
        .get("/addresses/" + this.selectedClientToManage.addressId, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchAddress", res.data);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "address",
            });
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "address",
            });
          }
        );
    },
    fetchExerciseSchedules() {
      this.mappedExerciseSchedules = new Array();
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "selectedUserExerciseSchedules",
      });
      this.axios
        .get("/exercise_schedules/all/" + this.selectedClientToManage.userId, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch(
              "fetchSelectedUserExerciseSchedules",
              res.data
            );
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "selectedUserExerciseSchedules",
            });
            this.filterDifficulty();
            this.mapExerciseSchedules();
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "selectedUserExerciseSchedules",
            });
          }
        );
    },
    fetchProgress() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "selectedProgress",
      });
      this.axios
        .get("/progress/all/" + this.selectedClientToManage.userId, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchSelectedUserProgress", res.data);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "selectedUserProgress",
            });
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "selectedUserProgress",
            });
          }
        );
    },
    fetchPayments() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "selectedPayments",
      });
      this.axios
        .get("/payments/all/" + this.selectedClientToManage.userId, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchSelectedUserPayments", res.data);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "selectedUserPayments",
            });
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "selectedUserPayments",
            });
          }
        );
    },
    filterDifficulty() {
      this.filteredDifficulty = new Array();
      for (let s of this.$store.state.selectedUser.exerciseSchedules.data) {
        if (s.difficultyFeedback > 0) {
          let x = { ...s };
          x.exerciseDate = new Date(s.exerciseDate).toDateString();
          this.filteredDifficulty.push(x);
        }
      }
    },
    mapExerciseSchedules() {
      for (let schedule of this.$store.state.selectedUser.exerciseSchedules
        .data) {
        schedule = this.mapExercise(schedule);
        this.mappedExerciseSchedules.push(schedule);
      }
      this.sortExerciseSchedules();
    },
    mapExercise(schedule) {
      for (let e of this.$store.state.exercises.data) {
        if (e.exerciseId === schedule.exerciseId) {
          schedule = {
            ...schedule,
            exerciseName: e.exerciseName,
            exerciseDate: this.maintainUTCDate(new Date(schedule.exerciseDate)),
            changed: false,
          };
        }
      }
      return schedule;
    },
    mapMealSchedules() {
      for (let schedule of this.$store.state.selectedUser.mealSchedules.data) {
        schedule = this.mapMeal(schedule);
        this.mappedMealSchedules.push(schedule);
      }
      this.sortMealSchedules();
    },
    mapMeal(schedule) {
      for (let m of this.$store.state.meals.data) {
        if (m.mealId === schedule.mealId) {
          schedule = {
            ...schedule,
            mealName: m.mealName,
            mealDate: this.maintainUTCDate(new Date(schedule.mealDate)),
            changed: false,
          };
        }
      }
      return schedule;
    },
    saveExerciseSchedule() {
      if (this.isNewExerciseSchedule) {
        this.addNewExerciseSchedule();
      } else {
        this.updateSelectedExerciseSchedule();
      }
      this.sortExerciseSchedules();
    },
    sortExerciseSchedules() {
      this.mappedExerciseSchedules.sort((a, b) => {
        if (
          new Date(a.exerciseDate).toDateString() !==
          new Date(b.exerciseDate).toDateString()
        ) {
          return a.exerciseDate - b.exerciseDate;
        } else {
          return a.setNumber - b.setNumber;
        }
      });
    },
    updateSelectedExerciseSchedule() {
      this.selectedExerciseSchedule.changed = true;
      this.selectedExerciseSchedule.exerciseDate = this.updatedExerciseSchedule.exerciseDate;
      this.selectedExerciseSchedule.exerciseId = this.updatedExerciseSchedule.exerciseId;
      this.selectedExerciseSchedule.exerciseName = this.updatedExerciseSchedule.exerciseName;
      this.selectedExerciseSchedule.reps = this.updatedExerciseSchedule.reps;
      this.selectedExerciseSchedule.setNumber = this.updatedExerciseSchedule.setNumber;
      this.updatedExerciseSchedule = {
        exerciseValid: false,
        repsValid: false,
        exerciseDate: new Date(),
        changed: true,
        setValid: false,
        valid: false,
      };
      this.selectedExerciseSchedule = null;
      this.isNewExerciseSchedule = true;
    },
    addNewExerciseSchedule() {
      this.mappedExerciseSchedules.push({
        changed: true,
        difficultyFeedback: 0,
        exerciseDate: this.updatedExerciseSchedule.exerciseDate,
        exerciseId: this.updatedExerciseSchedule.exerciseId,
        exerciseName: this.updatedExerciseSchedule.exerciseName,
        reps: this.updatedExerciseSchedule.reps,
        scheduleId: null,
        setNumber: this.updatedExerciseSchedule.setNumber,
        userId: this.$store.state.selectedUser.userId,
      });
      this.updatedExerciseSchedule = {
        exerciseValid: false,
        repsValid: false,
        exerciseDate: new Date(),
        changed: true,
        setValid: false,
        valid: false,
      };
      this.selectedExerciseSchedule = null;
      this.isNewExerciseSchedule = true;
    },
    deleteSelectedExerciseSchedule(s) {
      let index = this.mappedExerciseSchedules.indexOf(s);
      this.mappedExerciseSchedules.splice(index, 1);
      if (s.scheduleId) {
        this.exerciseSchedulesToDelete.push(s.scheduleId);
      }
      this.updatedExerciseSchedule = {
        exerciseValid: false,
        repsValid: false,
        exerciseDate: new Date(),
        changed: true,
        setValid: false,
        valid: false,
      };
      this.selectedExerciseSchedule = null;
      this.isNewExerciseSchedule = true;
    },
    saveExerciseSchedulesHandler() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "selectedUserExerciseSchedules",
      });
      this.deleteExerciseSchedules();

      for (let s of this.mappedExerciseSchedules) {
        if (s.changed) {
          let update = {
            difficultyFeedback: s.difficultyFeedback,
            exerciseDate: s.exerciseDate.toISOString(),
            exerciseId: s.exerciseId,
            reps: s.reps,
            scheduleId: s.scheduleId,
            setNumber: s.setNumber,
            userId: s.userId,
          };
          this.exerciseSchedulesToUpdate.push(update);
        }
      }
      this.updateExerciseSchedules();
      this.$store.dispatch("setLoading", {
        phase: "setLoaded",
        type: "selectedUserExerciseSchedules",
      });
    },
    updateExerciseSchedules() {
      if (this.exerciseSchedulesToUpdate.length > 0) {
        this.axios
          .post(
            "/exercise_schedules/groupUpdate",
            this.exerciseSchedulesToUpdate,
            {
              headers: {
                Authorization: "Bearer " + this.$store.state.authToken,
              },
            }
          )
          .then(
            (res) => {
              console.log(res);
              this.updatedExerciseSchedule = {
                exerciseValid: false,
                repsValid: false,
                exerciseDate: new Date(),
                changed: true,
                setValid: false,
                valid: false,
              };
              this.selectedExerciseSchedule = null;
              this.isNewExerciseSchedule = true;
              this.exerciseSchedulesToUpdate = new Array();
            },
            (err) => {
              this.$buefy.dialog.alert(err.response.data.message);
              this.$store.dispatch("setLoading", {
                phase: "setLoaded",
                type: "selectedUserExerciseSchedules",
              });
            }
          );
      } else {
        this.updatedExerciseSchedule = {
          exerciseValid: false,
          repsValid: false,
          exerciseDate: new Date(),
          changed: true,
          setValid: false,
          valid: false,
        };
        this.selectedExerciseSchedule = null;
        this.isNewExerciseSchedule = true;

        this.exerciseSchedulesToUpdate = new Array();
      }
    },
    deleteExerciseSchedules() {
      if (this.exerciseSchedulesToDelete.length > 0) {
        this.axios
          .post(
            "/exercise_schedules/groupDelete/",
            this.exerciseSchedulesToDelete,
            {
              headers: {
                Authorization: "Bearer " + this.$store.state.authToken,
              },
            }
          )
          .then(
            (res) => {
              console.log(res);
              this.exerciseSchedulesToDelete = new Array();
            },
            (err) => {
              this.$buefy.dialog.alert(err.response.data.message);
              this.$store.dispatch("setLoading", {
                phase: "setLoaded",
                type: "selectedUserExerciseSchedules",
              });
            }
          );
      }
    },
    assignPreset() {
      let update = {
        startDate: this.presetStartDate.toISOString(),
        presetId: this.selectedPresetId,
        userId: this.$store.state.selectedUser.userId,
      };

      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "selectedUserExerciseSchedules",
      });
      this.axios
        .post("/exercise_schedules/newFromPreset", update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            this.fetchExerciseSchedules();
            this.updatedExerciseSchedule = {
              exerciseValid: false,
              repsValid: false,
              exerciseDate: new Date(),
              changed: true,
              setValid: false,
              valid: false,
            };
            this.selectedExerciseSchedule = null;
            this.isNewExerciseSchedule = true;
            this.exerciseSchedulesToDelete = new Array();
            this.exerciseSchedulesToUpdate = new Array();
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "selectedUserExerciseSchedules",
            });
          }
        );
    },

    saveMealSchedule() {
      if (this.isNewMealSchedule) {
        this.addNewMealSchedule();
      } else {
        this.updateSelectedMealSchedule();
      }
      this.sortMealSchedules();
    },
    sortMealSchedules() {
      this.mappedMealSchedules.sort((a, b) => {
        if (
          new Date(a.mealDate).toDateString() !==
          new Date(b.mealDate).toDateString()
        ) {
          return a.mealDate - b.mealDate;
        } else {
          return (
            this.mealTypeSortValue[a.mealType] -
            this.mealTypeSortValue[b.mealType]
          );
        }
      });
    },
    updateSelectedMealSchedule() {
      this.selectedMealSchedule.changed = true;
      this.selectedMealSchedule.mealDate = this.updatedMealSchedule.mealDate;
      this.selectedMealSchedule.mealType = this.updatedMealSchedule.mealType;
      this.selectedMealSchedule.mealName = this.updatedMealSchedule.mealName;
      this.selectedMealSchedule.mealId = this.updatedMealSchedule.mealId;

      this.updatedMealSchedule = {
        mealValid: false,
        typeValid: false,
        mealDate: new Date(),
        changed: true,
        valid: false,
      };
      this.selectedMealSchedule = null;
      this.isNewMealSchedule = true;
    },
    addNewMealSchedule() {
      this.mappedMealSchedules.push({
        changed: true,
        mealDate: this.updatedMealSchedule.mealDate,
        mealId: this.updatedMealSchedule.mealId,
        mealName: this.updatedMealSchedule.mealName,
        mealType: this.updatedMealSchedule.mealType,
        scheduleId: null,
        userId: this.$store.state.selectedUser.userId,
      });
      this.updatedMealSchedule = {
        mealValid: false,
        typeValid: false,
        mealDate: new Date(),
        changed: true,
        valid: false,
      };
      this.selectedMealSchedule = null;
      this.isNewMealSchedule = true;
    },
    deleteSelectedMealSchedule(s) {
      let index = this.mappedMealSchedules.indexOf(s);
      this.mappedMealSchedules.splice(index, 1);
      if (s.scheduleId) {
        this.mealSchedulesToDelete.push(s.scheduleId);
      }
      this.updatedMealSchedule = {
        mealValid: false,
        typeValid: false,
        mealDate: new Date(),
        changed: true,
        valid: false,
      };
      this.selectedMealSchedule = null;
      this.isNewMealSchedule = true;
    },
    saveMealSchedulesHandler() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "selectedUserMealSchedules",
      });
      this.deleteMealSchedules();

      for (let s of this.mappedMealSchedules) {
        if (s.changed) {
          let update = {
            mealDate: s.mealDate.toISOString(),
            mealId: s.mealId,
            mealType: s.mealType,
            scheduleId: s.scheduleId,
            userId: s.userId,
          };
          this.mealSchedulesToUpdate.push(update);
        }
      }
      this.updateMealSchedules();
      this.$store.dispatch("setLoading", {
        phase: "setLoaded",
        type: "selectedUserMealSchedules",
      });
    },
    updateMealSchedules() {
      if (this.mealSchedulesToUpdate.length > 0) {
        this.axios
          .post("/meal_schedules/groupUpdate", this.mealSchedulesToUpdate, {
            headers: {
              Authorization: "Bearer " + this.$store.state.authToken,
            },
          })
          .then(
            (res) => {
              console.log(res);
              this.updatedMealSchedule = {
                mealValid: false,
                typeValid: false,
                mealDate: new Date(),
                changed: true,
                valid: false,
              };
              this.selectedMealSchedule = null;
              this.isNewMealSchedule = true;
              this.mealSchedulesToUpdate = new Array();
            },
            (err) => {
              this.$buefy.dialog.alert(err.response.data.message);
              this.$store.dispatch("setLoading", {
                phase: "setLoaded",
                type: "selectedUserExerciseSchedules",
              });
            }
          );
      } else {
        this.updatedMealSchedule = {
          mealValid: false,
          typeValid: false,
          mealDate: new Date(),
          changed: true,
          valid: false,
        };
        this.selectedMealSchedule = null;
        this.isNewMealSchedule = true;

        this.mealSchedulesToUpdate = new Array();
      }
    },

    deleteMealSchedules() {
      if (this.mealSchedulesToDelete.length > 0) {
        this.axios
          .post("/meal_schedules/groupDelete/", this.mealSchedulesToDelete, {
            headers: {
              Authorization: "Bearer " + this.$store.state.authToken,
            },
          })
          .then(
            (res) => {
              console.log(res);
              this.mealSchedulesToDelete = new Array();
            },
            (err) => {
              this.$buefy.dialog.alert(err.response.data.message);
              this.$store.dispatch("setLoading", {
                phase: "setLoaded",
                type: "selectedUserMealSchedules",
              });
            }
          );
      }
    },

    savePayment() {
      if (this.isNewPayment) {
        this.addNewPayment();
      } else {
        this.updatePayment();
      }
    },
    addNewPayment() {
      let update = {
        amountDue: this.updatedPayment.amountDue,
        status: "1",
        dueDate: this.updatedPayment.dueDate.toISOString(),
        userId: this.$store.state.selectedUser.userId,
      };

      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "selectedUserPayments",
      });
      this.axios
        .post("/payments/new", update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            this.axios
              .get("/payments/all/" + this.$store.state.selectedUser.userId, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.authToken,
                },
              })
              .then(
                (res) => {
                  this.$store.dispatch("fetchSelectedUserPayments", res.data);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "payments",
                  });

                  this.updatedPayment = {
                    dueDate: new Date(),
                    transactionDate: new Date(),
                    amountDueValid: false,
                    changed: true,
                    valid: false,
                    isPaid: false,
                  };
                  this.selectedPayment = null;
                  this.isNewPayment = true;
                },
                (err) => {
                  this.$buefy.dialog.alert(err.response.data.message);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "payments",
                  });
                }
              );
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "payments",
            });
          }
        );
    },
    //to do
    updatePayment() {
      let transactionDatecheck = null;
      if(this.updatedPayment.isPaid){
        transactionDatecheck = this.updatedPayment.transactionDate.toISOString();
      }
      console.log(transactionDatecheck);
      let update = {
        amountDue: this.updatedPayment.amountDue,
        status: this.updatedPayment.isPaid ? "0" : "1",
        dueDate: this.updatedPayment.dueDate.toISOString(),
        transactionDate: transactionDatecheck,
        userId: this.$store.state.selectedUser.userId,
      };
      let id = this.updatedPayment.paymentId;
      this.axios
        .post("/payments/update/" + id, update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            this.$store.dispatch("updateSelectedUserPayments", {
              paymentId: id,
              dueDate: update.dueDate.slice(0,10),
              transactionDate: transactionDatecheck ? transactionDatecheck.slice(0, 10) : null,
              status: update.status,
              userId: update.userId,
              amountDue: update.amountDue
            });
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "payments",
            });
            this.updatedPayment = {
              dueDate: new Date(),
              transactionDate: new Date(),
              amountDueValid: false,
              changed: true,
              valid: false,
              isPaid: false,
            };
            this.selectedPayment = null;
            this.isNewPayment = true;
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "payments",
            });
          }
        );
    },
    maintainUTCDate(d) {
      return new Date(d.getTime() + d.getTimezoneOffset() * 60000);
    },
  },
};
</script>
