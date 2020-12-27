<template>
  <div id="authenticate" class="box">
    <h1 class="content is-large">{{ loginMessage }}</h1>
    <b-field label="Username">
      <b-input
        v-model="username"
        placeholder=""
        maxlength="45"
        minlength="4"
        required
        @input.native="validateUsername($event.target.validity.valid)"
      ></b-input>
    </b-field>

    <b-field label="Password">
      <b-input
        v-model="password"
        type="password"
        maxlength="36"
        minlength="6"
        placeholder=""
        password-reveal
        required
        @input.native="validatePassword($event.target.validity.valid)"
      >
      </b-input>
    </b-field>
    <b-field v-if="isSignup" label="Email">
      <b-input
        placeholder="Email"
        v-model="email"
        type="email"
        icon="email"
        required
        @input.native="validateEmail($event.target.validity.valid)"
      >
      </b-input>
    </b-field>

    <a v-if="isSignup" @click="changeType"
      >alredy a member? click here to sign-in instead?</a
    >
    <a v-else @click="changeType"
      >not a member? click here to sign up instead</a
    >

    <div class="buttons is-right">
      <b-button
        :disabled="!authorizeValidity"
        type="is-success"
        @click="authorize"
      >
        {{ loginMessage }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailValid: false,
      username: "",
      usernameValid: false,
      password: "",
      passwordValid: false,
      isSignup: false,
      loginMessage: "Sign In",
      authorizeValidity: false,
    };
  },
  methods: {
    validateUsername(e) {
      this.usernameValid = e;
      this.setAuthorizeValidity();
    },
    validateEmail(e) {
      this.emailValid = e;
      this.setAuthorizeValidity();
    },
    validatePassword(e) {
      this.passwordValid = e;
      this.setAuthorizeValidity();
    },
    setAuthorizeValidity() {
      if (this.isSignup) {
        if (this.emailValid && this.usernameValid && this.passwordValid) {
          this.authorizeValidity = true;
        } else {
          this.authorizeValidity = false;
        }
      } else {
        if (this.usernameValid && this.passwordValid) {
          this.authorizeValidity = true;
        } else {
          this.authorizeValidity = false;
        }
      }
    },
    changeType() {
      this.isSignup = !this.isSignup;
      this.setAuthorizeValidity();
      if (this.isSignup) {
        this.loginMessage = "Sign Up";
      } else {
        this.loginMessage = "Sign In";
      }
    },

    authorize() {
      if (this.isSignup) {
        let signupRequest = {
          email: this.email,
          username: this.username,
          password: this.password,
        };
        this.axios.post("auth/signup", signupRequest).then(
          () => {
            let signInRequest = {
              username: this.username,
              password: this.password,
            };
            this.axios.post("auth/signin", signInRequest).then(
              (res) => {
                this.$store.dispatch("signIn", { token: res.data.accessToken });

                this.axios
                  .get("users/current", {
                    headers: {
                      Authorization: "Bearer " + this.$store.state.authToken,
                    },
                  })
                  .then(
                    (res) => {
                      this.$store.dispatch("userInfo", res.data);
                      this.$router.push("dash");
                    },
                    (err) => {
                      this.$buefy.dialog.alert(err.response.data.message);
                    }
                  );
              },
              (err) => {
                this.$buefy.dialog.alert(err.response.data.message);
              }
            );
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
          }
        );
      } else {
        let signInRequest = {
          username: this.username,
          password: this.password,
        };
        this.axios.post("auth/signin", signInRequest).then(
          (res) => {
            this.$store.dispatch("signIn", { token: res.data.accessToken });

            this.axios
              .get("users/current", {
                headers: {
                  Authorization: "Bearer " + this.$store.state.authToken,
                },
              })
              .then(
                (res) => {
                  this.$store.dispatch("userInfo", res.data);
                  this.$router.push("dash");
                },
                (err) => {
                  this.$buefy.dialog.alert(err.response.data.message);
                }
              );
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
          }
        );
      }
    },
  },
};
</script>
