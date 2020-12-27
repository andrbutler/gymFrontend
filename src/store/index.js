import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: false,
    authToken: null,
    signedInUser: {
      userId: null,
      userName: null,
      userRole: null,
      addressId: null,
      email: null,
      status: null,
      firstName: null,
      height: null,
      joined: null,
      lastName: null,
      phoneNumber: null,
      mealSchedules: { loading: false, data: [] },
      exerciseSchedules: { loading: false, data: [] },
      progress: { loading: false, data: [] },
      payments: { loading: false, data: [] },
      loading: false,
    },
    liveClasses: {
      loading: false,
      data: [],
    },
    exercises: {
      loading: false,
      data: [],
    },
    meals: {
      loading: false,
      data: [],
    },
    address: {
      loading: false,
      addressId: null,
      address1: null,
      address2: null,
      postCode: null,
      city: null,
      country: null,
      stateName: null,
    },
    users: {
      loading: false,
      data: [],
    },
    addresses: {
      loading: false,
      data: [],
    },
    selectedUser: {
      userId: null,
      userName: null,
      userRole: null,
      addressId: null,
      email: null,
      firstName: null,
      height: null,
      joined: null,
      lastName: null,
      phoneNumber: null,
      mealSchedules: {
        loading: false,
        data: [],
      },
      exerciseSchedules: {
        loading: false,
        data: [],
      },
      progress: {
        loading: false,
        data: [],
      },
      payments: {
        loading: false,
        data: [],
      },
      loading: false,
    },
    presets: {
      loading: false,
      data: [],
    },
    presetSchedules: {
      loading: false,
      data: [],
    },
  },
  getters: {
    isAdmin: (state) => {
      if (state.signedInUser.userRole === "ROLE_ADMIN") {
        return true;
      } else {
        return false;
      }
    },
  },
  mutations: {
    setSignedIn: (state, payload) => {
      state.signedIn = true;
      state.authToken = payload.token;
    },
    setSignedOut: (state) => {
      state.signedIn = false;
      state.authToken = null;
      state.signedInUser.userId = null;
      state.signedInUser.userName = null;
      state.signedInUser.userRole = null;
      state.signedInUser.addressId = null;
      state.signedInUser.email = null;
      state.signedInUser.firstName = null;
      state.signedInUser.height = null;
      state.signedInUser.joined = null;
      state.signedInUser.lastName = null;
      state.signedInUser.phoneNumber = null;
      state.signedInUser.mealSchedules.loading = false;
      state.signedInUser.mealSchedules.data = new Array();
      state.signedInUser.exerciseSchedules.loading = false;
      state.signedInUser.exerciseSchedules.data = new Array();
      state.signedInUser.progress.loading = false;
      state.signedInUser.progress.data = new Array();
      state.signedInUser.payments.loading = false;
      state.signedInUser.payments.data = new Array();
      state.signedInUser.loading = false;
      state.liveClasses.loading = false;
      state.liveClasses.data = new Array();
      state.exercises.loading = false;
      state.exercises.data = new Array();
      state.meals.loading = false;
      state.meals.data = new Array();

      state.address.loading = false;
      state.address.addressId = null;
      state.address.address1 = null;
      state.address.address2 = null;
      state.address.postCode = null;
      state.address.city = null;
      state.address.country = null;
      state.address.stateName = null;
      state.users.loading = false;
      state.users.data = new Array();
      state.addresses.loading = false;
      state.addresses.data = new Array();
      state.selectedUser.userId = null;
      state.selectedUser.userName = null;
      state.selectedUser.userRole = null;
      state.selectedUser.addressId = null;
      state.selectedUser.email = null;
      state.selectedUser.firstName = null;
      state.selectedUser.height = null;
      state.selectedUser.joined = null;
      state.selectedUser.lastName = null;
      state.selectedUser.phoneNumber = null;
      state.selectedUser.mealSchedules.loading = false;
      state.selectedUser.mealSchedules.data = new Array();
      state.selectedUser.exerciseSchedules.loading = false;
      state.selectedUser.exerciseSchedules.data = new Array();
      state.selectedUser.progress.loading = false;
      state.selectedUser.progress.data = new Array();
      state.selectedUser.payments.loading = false;
      state.selectedUser.payments.data = new Array();
      state.presets.loading = false;
      state.presets.data = new Array();

      state.presetSchedules.loading = false;
      state.presetSchedules.data = new Array();

      //state.signedIn = false;
      //state.authToken = null;
    },
    setLoggedInUserInfo: (state, payload) => {
      state.signedInUser.userName = payload.username;
      state.signedInUser.userId = payload.userId;
      state.signedInUser.addressId = payload.addressId;
      state.signedInUser.userRole = payload.role;
      state.signedInUser.email = payload.email;
      state.signedInUser.firstName = payload.fname;
      state.signedInUser.height = payload.height;
      state.signedInUser.joined = payload.joinDate;
      state.signedInUser.lastName = payload.lname;
      state.signedInUser.phoneNumber = payload.phone;
      state.signedInUser.status = payload.status;
    },
    setSelectedUserInfo: (state, payload) => {
      state.selectedUser.userName = payload.username;
      state.selectedUser.userId = payload.userId;
      state.selectedUser.addressId = payload.addressId;
      state.selectedUser.userRole = payload.role;
      state.selectedUser.email = payload.email;
      state.selectedUser.firstName = payload.fname;
      state.selectedUser.height = payload.height;
      state.selectedUser.joined = payload.joinDate;
      state.selectedUser.lastName = payload.lname;
      state.selectedUser.phoneNumber = payload.phone;
      state.selectedUser.status = payload.status;
      if (payload.update) {
        for (let x of state.users.data) {
          if (x.userId == payload.userId) {
            x.username = payload.username;
            x.userId = payload.userId;
            x.addressId = payload.addressId;
            x.userRole = payload.role;
            x.email = payload.email;
            x.fname = payload.fname;
            x.height = payload.height;
            x.joinDate = payload.joinDate;
            x.lname = payload.lname;
            x.phoneNumber = payload.phone;
            x.status = payload.status;
          }
        }
      }
    },
    resetSelectedUser: (state) => {
      state.selectedUser.userId = null;
      state.selectedUser.userName = null;
      state.selectedUser.userRole = null;
      state.selectedUser.addressId = null;
      state.selectedUser.email = null;
      state.selectedUser.firstName = null;
      state.selectedUser.height = null;
      state.selectedUser.joined = null;
      state.selectedUser.lastName = null;
      state.selectedUser.phoneNumber = null;

      state.selectedUser.mealSchedules.loading = false;
      state.selectedUser.mealSchedules.data = new Array();

      state.selectedUser.exerciseSchedules.loading = false;
      state.selectedUser.exerciseSchedules.data = new Array();

      state.selectedUser.progress.loading = false;
      state.selectedUser.progress.data = new Array();

      state.selectedUser.payments.loading = false;
      state.selectedUser.payments.data = new Array();

      state.address.loading = false;
      state.address.addressId = null;
      state.address.address1 = null;
      state.address.address2 = null;
      state.address.postCode = null;
      state.address.city = null;
      state.address.country = null;
      state.address.stateName = null;
    },
    setExercises: (state, payload) => {
      state.exercises.data = payload;
    },
    setLoading: (state, type) => {
      if (type === "exercises") {
        state.exercises.loading = true;
      }
      if (type === "address") {
        state.address.loading = true;
      }
      if (type === "info") {
        state.signedInUser.loading = true;
      }
      if (type === "addresses") {
        state.addresses.loading = true;
      }
      if (type === "live") {
        state.liveClasses.loading = true;
      }
      if (type === "meals") {
        state.meals.loading = true;
      }
      if (type === "users") {
        state.users.loading = true;
      }
      if (type === "presets") {
        state.presets.loading = true;
      }
      if (type === "presetSchedules") {
        state.presetSchedules.loading = true;
      }
      if (type === "signedInUserMealSchedules") {
        state.signedInUser.mealSchedules.loading = true;
      }
      if (type === "signedInUserExerciseSchedules") {
        state.signedInUser.exerciseSchedules.loading = true;
      }
      if (type === "signedInUserProgress") {
        state.signedInUser.progress.loading = true;
      }
      if (type === "signedInUserPayments") {
        state.signedInUser.payments.loading = true;
      }
      if (type === "selectedUserMealSchedules") {
        state.selectedUser.mealSchedules.loading = true;
      }
      if (type === "selectedUserExerciseSchedules") {
        state.selectedUser.exerciseSchedules.loading = true;
      }
      if (type === "selectedUserProgress") {
        state.selectedUser.progress.loading = true;
      }
      if (type === "selectedUserPayments") {
        state.selectedUser.payments.loading = true;
      }
    },
    setLoaded: (state, type) => {
      if (type === "exercises") {
        state.exercises.loading = false;
      }
      if (type === "address") {
        state.address.loading = false;
      }
      if (type === "info") {
        state.signedInUser.loading = false;
      }
      if (type === "addresses") {
        state.addresses.loading = false;
      }
      if (type === "live") {
        state.liveClasses.loading = false;
      }
      if (type === "meals") {
        state.meals.loading = false;
      }
      if (type === "users") {
        state.users.loading = false;
      }
      if (type === "presets") {
        state.presets.loading = false;
      }
      if (type === "presetSchedules") {
        state.presetSchedules.loading = false;
      }
      if (type === "signedInUserMealSchedules") {
        state.signedInUser.mealSchedules.loading = false;
      }
      if (type === "signedInUserExerciseSchedules") {
        state.signedInUser.exerciseSchedules.loading = false;
      }
      if (type === "signedInUserProgress") {
        state.signedInUser.progress.loading = false;
      }
      if (type === "signedInUserPayments") {
        state.signedInUser.payments.loading = false;
      }
      if (type === "selectedUserMealSchedules") {
        state.selectedUser.mealSchedules.loading = false;
      }
      if (type === "selectedUserExerciseSchedules") {
        state.selectedUser.exerciseSchedules.loading = false;
      }
      if (type === "selectedUserProgress") {
        state.selectedUser.progress.loading = false;
      }
      if (type === "selectedUserPayments") {
        state.selectedUser.payments.loading = false;
      }
    },
    setLiveClasses: (state, payload) => {
      state.liveClasses.data = payload;
    },
    setMeals: (state, payload) => {
      state.meals.data = payload;
    },
    setUsers: (state, payload) => {
      state.users.data = payload;
    },
    setAddresses: (state, payload) => {
      state.addresses.data = payload;
    },
    setPresets: (state, payload) => {
      state.presets.data = payload;
    },
    setPresetSchedules: (state, payload) => {
      state.presetSchedules.data = payload;
    },
    setSignedInUserMealSchedules: (state, payload) => {
      state.signedInUser.mealSchedules.data = payload;
    },
    setSignedInUserExerciseSchedules: (state, payload) => {
      state.signedInUser.exerciseSchedules.data = payload;
    },
    setSignedInUserPayments: (state, payload) => {
      state.signedInUser.payments.data = payload;
    },
    setSignedInUserProgress: (state, payload) => {
      state.signedInUser.progress.data = new Array();
      state.signedInUser.progress.data = payload;
    },
    setSelectedUserMealSchedules: (state, payload) => {
      state.selectedUser.mealSchedules.data = new Array();
      state.selectedUser.mealSchedules.data = payload;
    },
    setSelectedUserExerciseSchedules: (state, payload) => {
      state.selectedUser.exerciseSchedules.data = new Array();
      state.selectedUser.exerciseSchedules.data = payload;
    },
    setSelectedUserPayments: (state, payload) => {
      state.selectedUser.payments.data = new Array();
      state.selectedUser.payments.data = payload;
    },
    setSelectedUserProgress: (state, payload) => {
      state.selectedUser.progress.data = payload;
    },
    setAddress: (state, payload) => {
      state.address.addressId = payload.addressId;
      state.address.address1 = payload.address1;
      state.address.address2 = payload.address2;
      state.address.postCode = payload.postCode;
      state.address.city = payload.cityName;
      state.address.country = payload.countryName;
      state.address.stateName = payload.stateName;
    },
    setExerciseDifficulty: (state, payload) => {
      for (let x of state.signedInUser.exerciseSchedules.data) {
        if (x.scheduleId == payload.id) {
          x.difficutlyFeedback = payload.feedback;
        }
      }
    },
    updateSignedInUserProgress: (state, payload) => {
      for (let x of state.signedInUser.progress.data) {
        if (x.progressId == payload.id) {
          x.weeklyCalories = payload.update.weeklyCalories;
          x.weight = payload.update.weight;
        }
      }
    },
    updateExercises: (state, payload) => {
      for (let x of state.exercises.data) {
        if (x.exerciseId == payload.exerciseId) {
          x.exerciseName = payload.exerciseName;
          x.exampleLink = payload.exampleLink;
          x.classTime = payload.classTime;
          x.exerciseType = payload.exerciseType;
        }
      }
    },
    updateSelectedUserPayments: (state, payload) => {
      for (let x of state.selectedUser.payments.data) {
      
        if (x.paymentId == payload.paymentId) {
          
          x.amountDue = payload.amountDue;
          x.status = payload.status;
          x.dueDate = payload.dueDate;
          x.transactionDate = payload.transactionDate;
        }
      }
    },
    updateMeals: (state, payload) => {
      for (let x of state.meals.data) {
        if (x.mealId == payload.mealId) {
          x.mealName = payload.mealName;
          x.recipeLink = payload.recipeLink;
          x.calories = payload.calories;
        }
      }
    },
  },
  actions: {
    signIn: (context, payload) => {
      context.commit("setSignedIn", payload);
    },
    signOut: (context) => {
      context.commit("setSignedOut");
    },
    userInfo: (context, payload) => {
      context.commit("setLoggedInUserInfo", payload);
    },
    selectedUserInfo: (context, payload) => {
      context.commit("setSelectedUserInfo", payload);
    },
    resetSelectedUser: (context) => {
      context.commit("resetSelectedUser");
    },
    setLoading: (context, payload) => {
      if (payload.phase === "start") {
        context.commit("setLoading", payload.type);
      }
      if (payload.phase === "finish") {
        context.commit("setLoaded", payload.type);
      }
    },
    fetchExercises: (context, payload) => {
      context.commit("setExercises", payload);
    },
    fetchUsers: (context, payload) => {
      context.commit("setUsers", payload);
    },
    fetchAddresses: (context, payload) => {
      context.commit("setAddresses", payload);
    },
    fetchLiveClasses: (context, payload) => {
      context.commit("setLiveClasses", payload);
    },
    fetchPresets: (context, payload) => {
      context.commit("setPresets", payload);
    },
    fetchPresetSchedules: (context, payload) => {
      context.commit("setPresetSchedules", payload);
    },
    fetchMeals: (context, payload) => {
      context.commit("setMeals", payload);
    },
    fetchSignedInUserMealSchedules: (context, payload) => {
      context.commit("setSignedInUserMealSchedules", payload);
    },
    fetchAddress: (context, payload) => {
      context.commit("setAddress", payload);
    },
    fetchSignedInUserExerciseSchedules: (context, payload) => {
      context.commit("setSignedInUserExerciseSchedules", payload);
    },
    fetchSignedInUserPayments: (context, payload) => {
      context.commit("setSignedInUserPayments", payload);
    },
    fetchSignedInUserProgress: (context, payload) => {
      context.commit("setSignedInUserProgress", payload);
    },
    updateExerciseDifficulty: (context, payload) => {
      context.commit("setExerciseDifficulty", payload);
    },
    updateSignedInUserProgress: (context, payload) => {
      context.commit("updateSignedInUserProgress", payload);
    },
    fetchSelectedUserMealSchedules: (context, payload) => {
      context.commit("setSelectedUserMealSchedules", payload);
    },
    fetchSelectedUserExerciseSchedules: (context, payload) => {
      context.commit("setSelectedUserExerciseSchedules", payload);
    },
    fetchSelectedUserPayments: (context, payload) => {
      context.commit("setSelectedUserPayments", payload);
    },
    fetchSelectedUserProgress: (context, payload) => {
      context.commit("setSelectedUserProgress", payload);
    },
    updateSelectedUserPayments: (context, payload) => {
      context.commit("updateSelectedUserPayments", payload);
    },
    updateSelectedUserProgress: (context, payload) => {
      context.commit("updateSelectedUserProgress", payload);
    },
    updateExercises: (context, payload) => {
      context.commit("updateExercises", payload);
    },
    updateMeals: (context, payload) => {
      context.commit("updateMeals", payload);
    },
  },
  modules: {},
});
