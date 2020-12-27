<template>
  <div id="#dash">
    <AdminDash v-if="$store.getters.isAdmin" />
    <ClientDash v-else />
  </div>
</template>

<script>
import AdminDash from "@/components/admin/AdminDash.vue";
import ClientDash from "@/components/client/ClientDash.vue";
//import store from '@/store/index.js';
export default {
  name: "Dash",
  components: {
    AdminDash,
    ClientDash,
  },
  created() {
    this.fetchExercises();
    this.fetchLiveClasses();
    this.fetchMeals();
  },
  methods: {
    fetchExercises() {
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "exercises",
      });
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
    fetchLiveClasses() {
      this.$store.dispatch("setLoading", { phase: "setLoading", type: "live" });
      this.axios
        .get("/exercises/live", {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchLiveClasses", res.data);

            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "live",
            });
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "live",
            });
          }
        );
    },
    fetchMeals(){
        this.$store.dispatch('setLoading',{phase: 'setLoading', type:'meals'});
        this.axios.get("/meals/all", {
        headers: {
          Authorization: "Bearer " + this.$store.state.authToken,
        },
      }).then(
        (res) => {
          this.$store.dispatch('fetchMeals', res.data);
          this.$store.dispatch('setLoading',{phase: 'setLoaded', type:'meals'});
        },
        (err) => {
          this.$buefy.dialog.alert(err.response.data.message);
          this.$store.dispatch('setLoading',{phase: 'setLoaded', type: 'meals'});
        }
        
      );
      }
  },
};
</script>
