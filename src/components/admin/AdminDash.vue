<template>
  <div id="admin-dash" class="container">
    <nav class="level is-mobile">
      <b-button
        class="level-item level-left"
        type="is-dark"
        tag="router-link"
        :to="{ path: '/dash/admin/clients' }"
      >
        clients
      </b-button>
      <b-button
        class="level-item level-left"
        type="is-dark"
        tag="router-link"
        :to="{ path: '/dash/admin/exercises' }"
      >
        exercises
      </b-button>
      <b-button
        class="level-item level-left"
        type="is-dark"
        tag="router-link"
        :to="{ path: '/dash/admin/meals' }"
      >
        meals
      </b-button>
      <b-button
        class="level-item level-left"
        type="is-dark"
        tag="router-link"
        :to="{ path: '/dash/admin/presets' }"
      >
        presets
      </b-button>
      <b-button
        class="level-item level-left"
        type="is-dark"
        tag="router-link"
        :to="{ path: '/dash/admin/settings' }"
      >
        settings
      </b-button>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AdminDash",
  created() {
    this.fetchPresets();
    this.fetchPresetSchedules();
    this.fetchAddresses();
    this.fetchUsers();
  },
  methods: {
    fetchPresets() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "presets",
      });
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
    fetchPresetSchedules() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "presetSchedules",
      });
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
      fetchUsers() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "users",
      });
      this.axios
        .get("/users/all", {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchUsers", res.data);

            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "users",
            });
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "users",
            });
          }
        );
    },
          fetchAddresses() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "addresses",
      });
      this.axios
        .get("/addresses/all", {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchAddresses", res.data);

            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "addresses",
            });
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "addresses",
            });
          }
        );
    },
  },
};
</script>
