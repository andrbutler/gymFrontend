(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a3708"],{"01d5":function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"card",attrs:{id:"admin-settings"}},[a("div",{staticClass:"card-content columns"},[a("div",{staticClass:"card column is-full",attrs:{id:"password"}},[a("p",{staticClass:"card-header-title"},[s._v("Update Password")]),a("b-field",{attrs:{label:"Password"}},[a("b-input",{attrs:{type:"password",maxlength:"36",minlength:"6",placeholder:"password","password-reveal":"",id:"password",required:""},nativeOn:{input:function(t){return s.validatePassword(t.target.validity.valid)}},model:{value:s.password,callback:function(t){s.password=t},expression:"password"}})],1),a("b-button",{staticClass:"is-success is-light",attrs:{disabled:!s.passwordValid},on:{click:function(t){return s.updatePassword()}}},[s._v("Save")])],1)])])},r=[],i={data:function(){return{password:null,passwordValid:!1}},methods:{validatePassword:function(s){this.passwordValid=s},updatePassword:function(){var s=this,t={username:this.$store.state.signedInUser.userName,password:this.password,passwordValid:!1,email:this.$store.state.signedInUser.email,role:this.$store.state.signedInUser.userRole,joinDate:this.$store.state.signedInUser.joinDate,status:this.$store.state.signedInUser.status,fName:this.$store.state.signedInUser.firstName,lName:this.$store.state.signedInUser.lastName};this.axios.post("/users/update/pass/"+this.$store.state.signedInUser.userId,t,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){s.$buefy.dialog.alert("password successfully updated!"),s.password=null,s.passwordValid=!1,console.log(t)}),(function(t){s.$buefy.dialog.alert(t.response.data.message)}))}}},d=i,n=a("2877"),o=Object(n["a"])(d,e,r,!1,null,null,null);t["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d0a3708.6153c8b1.js.map