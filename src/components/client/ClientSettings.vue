<template>
  <div id="clientSettings" class="card">
    <div class="card-content columns">
      <div class="card column is-one-third" id="Address" v-if="!$store.state.address.loading">
        <p class="card-header-title">Address</p>
        <b-field label="Address 1">
          <b-input
            placeholder="address 1"
            type="text"
            maxlength="50"
            v-model="address.address1"
            @input.native="validateAddress1($event.target.validity.valid)"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Address 2">
          <b-input
            placeholder="address 2"
            type="text"
            maxlength="50"
            v-model="address.address2"
            @input.native="validateAddress2($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-field label="Post Code">
          <b-input
            placeholder="Post Code"
            type="text"
            maxlength="20"
            v-model="address.postCode"
            @input.native="validatePostCode($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-field label="City">
          <b-input
            placeholder="city"
            type="text"
            maxlength="85"
            v-model="address.city"
            @input.native="validateCity($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-field label="State">
          <b-input
            placeholder="state"
            type="text"
            maxlength="25"
            v-model="address.stateName"
            @input.native="validateStateName($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-field label="Country">
          <b-input
            placeholder="country"
            type="text"
            maxlength="60"
            v-model="address.country"
            @input.native="validateCountry($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-button :disabled="!address.valid" class="is-success is-light" @click="updateAddress()"
          >Save</b-button
        >
      </div>
       <b-skeleton size="is-large" :active="$store.state.address.loading" :count="2"></b-skeleton>
      <div class="card column is-one-third" id="userDetails" v-if="!$store.state.signedInUser.loading">
        <p class="card-header-title">User Details</p>
        <b-field label="First Name">
          <b-input
            placeholder="first name"
            type="text"
            maxlength="30"
            v-model="userDetails.firstName"
            @input.native="validateFirstName($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-field label="Last Name">
          <b-input
            placeholder="last name"
            type="text"
            maxlength="30"
            v-model="userDetails.lastName"
            @input.native="validateLastName($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-field label="Height">
          <b-input
            placeholder="Height"
            type="text"
            maxlength="7"
            v-model="userDetails.height"
            @input.native="validateHeight($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-field label="Phone">
          <b-input
            placeholder="phone"
            type="phone"
            maxlength="10"
            v-model="userDetails.phone"
            @input.native="validatePhone($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-field label="email">
          <b-input
            placeholder="email"
            type="email"
            maxlength="200"
            v-model="userDetails.email"
            @input.native="validateEmail($event.target.validity.valid)"
          >
          </b-input>
        </b-field>
        <b-button :disabled="!userDetails.valid" class="is-success is-light" @click="updateDetails()"
          >Save</b-button
        >
      </div>
      <div class="card column is-one-third" id="password">
        <p class="card-header-title">Update Password</p>
        <b-field label="Password">
          <b-input
            v-model="password"
            type="password"
            maxlength="36"
            minlength="6"
            placeholder="password"
            password-reveal
            required
            @input.native="validatePassword($event.target.validity.valid)"
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
      passwordValid: false,
      address: null,
      userDetails: {
        firstName: null,
        firstNameValid: true,
        lastName: null,
        lastNameValid: true,
        phone: null,
        phoneValid: true,
        height: null,
        heightValid: true,
        email: null,
        emailValid: true,
        valid: true
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.address = {...this.$store.state.address, address1Valid: false, address2Valid: true, 
      postCodeValid: true, cityValid: true, stateNameValid: true, countryValid: true, valid: true};
      this.userDetails.firstName = this.$store.state.signedInUser.firstName;
      this.userDetails.lastName = this.$store.state.signedInUser.lastName;
      this.userDetails.phone = this.$store.state.signedInUser.phoneNumber;
      this.userDetails.height = this.$store.state.signedInUser.height;
      this.userDetails.email = this.$store.state.signedInUser.email;
    },
    validateUserDetails(){
      if(this.userDetails.firstNameValid && this.userDetails.lastNameValid && this.userDetails.phoneValid
      && this.userDetails.heightValid && this.userDetails.emailValid){
        this.userDetails.valid = true;
      } else {
        this.userDetails.valid = false;
      }
    },
    validateAddress() {
       if(this.address.address1Valid && this.address.address2Valid && this.address.postCodeValid && this.address.cityValid && 
       this.address.stateNameValid && this.address.countryValid){
        this.address.valid = true;
      } else {
        this.address.valid = false;
      }
    },
    validatePassword(e){
      this.passwordValid = e;
    },
    validateAddress1(e){
      this.address.address1Valid = e;
      this.validateAddress();
    },
    validateAddress2(e){
      this.address.address2Valid = e;
      this.validateAddress();
    },
    validatePostCode(e){
      this.address.postCodeValid = e;
      this.validateAddress();
    },
    validateCity(e){
      this.address.cityValid = e;
      this.validateAddress();
    },
    validateStateName(e){
      this.address.stateNameValid = e;
      this.validateAddress();
    },
    validateCountry(e){
      this.address.countryValid = e;
      this.validateAddress();
    },
    validateFirstName(e){
      this.userDetails.firstNameValid = e;
      this.validateUserDetails();
    },
    validateLastName(e){
      this.userDetails.lastNameValid = e;
      this.validateUserDetails();
    },
    validatePhone(e){
      this.userDetails.phoneValid = e;
      this.validateUserDetails();
    },
    validateHeight(e){
      this.userDetails.heightValid = e;
      this.validateUserDetails();
    },
    validateEmail(e){
      this.userDetails.emailValid = e;
      this.validateUserDetails();
    },
    updateAddress() {
      let update = {
        address1: this.address.address1,
        address2: this.address.address2,
        postCode: this.address.postCode,
        userId: this.$store.state.signedInUser.userId,
        cityName: this.address.city,
        countryName: this.address.country,
        stateName: this.address.stateName
      };
      let payload = {
        addressId: this.$store.state.address.addressId,
        ...update
      };
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "address",
      });
      this.axios
        .post("/addresses/update/", update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("fetchAddress", payload);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "address",
            });
            console.log(res);
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
    updatePassword() {
      let update = {
        username: this.$store.state.signedInUser.userName,
        password: this.password,
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
            console.log(res);
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
          }
        );
    },
    updateDetails() {
      let update = {
        username: this.$store.state.signedInUser.userName,
        password: null,
        addressId: this.$store.state.signedInUser.addressId,
        email: this.userDetails.email,
        role: this.$store.state.signedInUser.userRole,
        joinDate: this.$store.state.signedInUser.joined,
        status: this.$store.state.signedInUser.status,
        fname: this.userDetails.firstName,
        lname: this.userDetails.lastName,
        height: this.userDetails.height,
        phone: this.userDetails.phone,
      };
      let payload = {
        userId: this.$store.state.signedInUser.userId,
        ...update,
      };
      this.$store.dispatch("setLoading", {
        phase: "setLoading",
        type: "info",
      });
      this.axios
        .post("/users/update/" + payload.userId, update, {
          headers: {
            Authorization: "Bearer " + this.$store.state.authToken,
          },
        })
        .then(
          (res) => {
            this.$store.dispatch("userInfo", payload);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "info",
            });
            console.log(res);
          },
          (err) => {
            this.$buefy.dialog.alert(err.response.data.message);
            this.$store.dispatch("setLoading", {
              phase: "setLoaded",
              type: "info",
            });
          }
        );
    },
  },
};
</script>
