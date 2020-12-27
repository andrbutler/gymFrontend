<template>
  <div id="client-dash" class="container">
    <nav class="level is-mobile">
      <b-button
        class="level-item level-left"
        type="is-link"
        tag="router-link"
        :to="{ path: '/dash/client/schedule' }"
      >
        schedules
      </b-button>
      <b-button
        class="level-item level-left"
        type="is-link"
        tag="router-link"
        :to="{ path: '/dash/client/progress' }"
      >
        progress
      </b-button>
      <b-button
        class="level-item level-left"
        type="is-link"
        tag="router-link"
        :to="{ path: '/dash/client/payments' }"
      >
        payments
      </b-button>
      <b-button
        class="level-item level-left"
        type="is-link"
        tag="router-link"
        :to="{ path: '/dash/client/settings' }"
      >
        settings
      </b-button>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "ClientDash",
 
  created() {
    this.fetchAddress();
    this.fetchMealSchedules();
    this.fetchExerciseSchedules();
    this.fetchProgress();
    this.fetchPayments();
  },
  methods: {
    fetchMealSchedules() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "signedInUserMealSchedules",
      });
      this.axios
        .get("/meal_schedules/all/" + this.$store.state.signedInUser.userId, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchSignedInUserMealSchedules", res.data);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "signedInUserMealSchedules",
            });
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "signedInUserMealSchedules",
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
        .get("/addresses/" + this.$store.state.signedInUser.addressId, {
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
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "signedInUserExerciseSchedules"
      });
      this.axios
        .get(
          "/exercise_schedules/all/" + this.$store.state.signedInUser.userId,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.authToken,
            },
          }
        )
        .then(
          (res) => {
            this.$store.dispatch(
              "fetchSignedInUserExerciseSchedules",
              res.data
            );
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "signedInUserExerciseSchedules"
            });
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "signedInUserExerciseSchedules"
            });
          }
        );
    },
    fetchProgress() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "signedInUserProgress",
      });
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
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "signedInUserProgress",
            });
          }
        );
    },
    fetchPayments() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "signedInUserPayments",
      });
      this.axios
        .get("/payments/all/" + this.$store.state.signedInUser.userId, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchSignedInUserPayments", res.data);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "signedInUserPayments",
            });
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "signedInUserPayments",
            });
          }
        );
    }
  },
};
</script>
