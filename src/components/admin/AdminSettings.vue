<template>
  <div id="admin-settings" class="card">
    <div class="card-content columns">
      <div class="card column is-full" id="password">
        <p class="card-header-title">Update Password</p>
        <b-field label="Password">
          <b-input
            v-model="password"
            type="password"
            maxlength="36"
            minlength="6"
            placeholder="password"
            password-reveal
            id ="password"
            @input.native="validatePassword($event.target.validity.valid)"
            required
          >
          </b-input>
        </b-field>
        <b-button :disabled="!passwordValid" class="is-success is-light" @click="updatePassword()"
          >Save</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: null,
      passwordValid: false
    };
  },
  methods: {
    validatePassword(e){
      this.passwordValid = e;
    },
    updatePassword() {
      let update = {
        username: this.$store.state.signedInUser.userName,
        password: this.password,
        passwordValid: false,
        email: this.$store.state.signedInUser.email,
        role: this.$store.state.signedInUser.userRole,
        joinDate: this.$store.state.signedInUser.joinDate,
        status: this.$store.state.signedInUser.status,
        fName: this.$store.state.signedInUser.firstName,
        lName: this.$store.state.signedInUser.lastName,
      };
      this.axios
        .post(
          "/users/update/pass/" + this.$store.state.signedInUser.userId,
          update,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.authToken,
            },
          }
        )
        .then(
          (res) => {
            this.$buefy.dialog.alert("password successfully updated!");
            this.password = null;
            this.passwordValid = false;
            console.log(res);
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
          }
        );
    },
  },
};
</script>
