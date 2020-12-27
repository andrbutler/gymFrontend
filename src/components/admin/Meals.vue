<template>
  <div id="meals">
    <div class="box">
      <b-table
        v-if="!$store.state.meals.loading"
        :data="meals"
        :selected.sync="selectedMeal"
        :columns="columns"
        @click="
          (e) => {
            this.updatedMeal = {
              mealId: e.mealId,
              mealName: e.mealName,
              recipeLink: e.recipeLink,
              calories: e.calories,
              caloriesValid: true,
              nameValid: true,
              linkValid: true,
              valid: true,
            };
            this.isNew = false;
          }
        "
        focusable
        sticky-header
      >
      </b-table>
      <b-skeleton
        size="is-large"
        :active="$store.state.meals.loading"
        :count="2"
      ></b-skeleton>
    </div>
    <div class="box" id="updatedMeal">
      <b-field>
        <b-switch
          @input="
            (e) => {
              if (e) {
                this.updatedMeal = {
                  mealId: null,
                  mealName: null,
                  recipeLink: null,
                  calories: null,
                  nameValid: false,
                  caloriesValid: false,
                  linkValid: false,
                  valid: false,
                };
              }
            }
          "
          :disabled="isNew"
          v-model="isNew"
          type="is-dark"
          >New Meal</b-switch
        >
      </b-field>
      <b-field label="Name">
        <b-input
          placeholder="name"
          maxlength="120"
          v-model="updatedMeal.mealName"
          @input.native="validateName($event.target.validity.valid)"
          required
        >
        </b-input>
      </b-field>
      <b-field label="Link">
        <b-input
          placeholder="link"
          maxlength="100"
          v-model="updatedMeal.recipeLink"
          @input.native="validateLink($event.target.validity.valid)"
        >
        </b-input>
      </b-field>
      <b-field label="calories">
        <b-input
          placeholder="calories"
          type="number"
          max="9999"
          min="0"
          v-model="updatedMeal.calories"
          @input.native="validateCalories($event.target.validity.valid)"
        >
        </b-input>
      </b-field>
      <b-button
        :disabled="!updatedMeal.valid"
        class="is-success"
        @click="saveMeal()"
        >Save</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meals: this.$store.state.meals.data,
      selectedMeal: {},
      updatedMeal: {
        nameValid: false,
        linkValid: false,
        caloriesValid: false,
        valid: false,
      },
      isNew: true,
       columns: [
        { field: "mealName", label: "name", searchable: true, sortable: true },
        { field: "recipeLink", label: "link" },
        { field: "calories", label: "calories", sortable: true, searchable: true },
      ],
    };
  },
  methods: {
    validateMeal() {
      if (
        this.updatedMeal.nameValid &&
        this.updatedMeal.linkValid &&
        this.updatedMeal.caloriesValid
      ) {
        this.updatedMeal.valid = true;
      } else {
        this.updatedMeal.valid = false;
      }
    },
    validateName(e) {
      this.updatedMeal.nameValid = e;
      this.validateMeal();
    },
    validateLink(e) {
      this.updatedMeal.linkValid = e;
      this.validateMeal();
    },
    validateCalories(e) {
      this.updatedMeal.caloriesValid = e;
      this.validateMeal();
    },
    saveMeal() {
      if (this.isNew) {
        this.saveNewMeal();
      } else {
        this.updateMeal();
      }
    },
    saveNewMeal() {
      let update = {
        mealName: this.updatedMeal.mealName,
        recipeLink: this.updatedMeal.recipeLink,
        calories: this.updatedMeal.calories,
      };
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "meals",
      });
      this.axios
        .post("/meals/new", update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            this.axios
              .get("/meals/all", {
                headers: {
                  Authorization: "Bearer " + this.$store.state.authToken,
                },
              })
              .then(
                (res) => {
                  this.$store.dispatch("fetchMeals", res.data);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "meals",
                  });
                  this.meals = this.$store.state.meals.data;
                  this.updatedMeal = {
                    nameValid: false,
                    linkValid: false,
                    caloriesValid: false,
                    valid: false,
                  };
                  this.selectedMeal = {};
                  this.isNew = true;
                },
                (err) => {
                  this.$buefy.dialog.alert(err.response.data.message);
                  this.$store.dispatch("setLoading", {
                    phase: "setLoaded",
                    type: "meals",
                  });
                }
              );
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "meals",
            });
          }
        );
    },
    updateMeal() {
    let update = {
        mealName: this.updatedMeal.mealName,
        recipeLink: this.updatedMeal.recipeLink,
        calories: this.updatedMeal.calories,
      };
      let id = this.updatedMeal.mealId;
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "meals",
      });

      this.axios
        .post("/meals/update/" + id, update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            console.log(res);
            this.$store.dispatch("updateMeals", {
              mealId: id,
              ...update,
            });
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "meals",
            });
            this.exercises = this.$store.state.exercises.data;
            this.meals = this.$store.state.meals.data;
                  this.updatedMeal = {
                    nameValid: false,
                    linkValid: false,
                    caloriesValid: false,
                    valid: false,
                  };
                  this.selectedMeal = {};
                  this.isNew = true;
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "meals",
            });
          }
        );
    },
  },
};
</script>
