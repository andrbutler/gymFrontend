(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56c0e8f8"],{"159b":function(e,t,s){var a=s("da84"),l=s("fdbc"),i=s("17c2"),d=s("9112");for(var c in l){var r=a[c],n=r&&r.prototype;if(n&&n.forEach!==i)try{d(n,"forEach",i)}catch(u){n.forEach=i}}},1779:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"box",attrs:{id:"clients"}},[t.isManaging?t._e():a("div",{attrs:{id:"clientSelector"}},[t.$store.state.users.loading?t._e():a("b-table",{attrs:{data:t.filteredUsers,columns:t.userColumns,selected:t.selectedClientToManage,"sticky-header":"",scrollable:""},on:{"update:selected":function(e){t.selectedClientToManage=e}}}),a("b-skeleton",{attrs:{size:"is-large",active:t.$store.state.users.loading,count:2}}),a("b-button",{staticClass:"is-link",attrs:{disabled:!(t.selectedClientToManage.userId>0)},on:{click:function(e){return t.selectClient()}}},[t._v("Manage Client")])],1),t.isManaging?a("div",{attrs:{id:"clientEditor"}},[a("b-button",{staticClass:"is-warning",on:{click:function(e){return t.exitManagement()}}},[t._v("Exit Client Management")]),t.$store.state.selectedUser.loading?t._e():a("b-tabs",{attrs:{type:"is-boxed",expanded:""}},[a("b-tab-item",{attrs:{label:"exercise schedules"}},[a("div",{staticClass:"block"},[a("b-field",{staticClass:"subtile",attrs:{label:"Assign Preset to Client"}},[a("b-switch",{attrs:{type:"is-danger"},model:{value:t.presetModeEnabled,callback:function(e){t.presetModeEnabled=e},expression:"presetModeEnabled"}})],1),a("h4",[t._v("(warning this will delete all unsaved edits)")]),a("div",{staticClass:"columns"},[t.presetModeEnabled?a("b-datepicker",{staticClass:"column",attrs:{"min-date":new Date},model:{value:t.presetStartDate,callback:function(e){t.presetStartDate=e},expression:"presetStartDate"}}):t._e(),t.presetModeEnabled?a("b-select",{staticClass:"column",attrs:{required:""},nativeOn:{input:function(e){return t.validatePreset(e.target.validity.valid)}},model:{value:t.selectedPresetId,callback:function(e){t.selectedPresetId=e},expression:"selectedPresetId"}},t._l(t.presetList,(function(e,s){return a("option",{key:e,domProps:{value:s}},[t._v(t._s(e))])})),0):t._e(),t.presetModeEnabled?a("b-button",{staticClass:"is-danger column",attrs:{disabled:!t.presetValid},on:{click:function(e){return t.assignPreset()}}},[t._v("Assign Preset")]):t._e()],1)],1),a("div",{staticClass:"block columns"},[a("b-button",{staticClass:"is-danger column is-full",on:{click:function(e){return t.saveExerciseSchedulesHandler()}}},[t._v("Save All Changes")])],1),t.$store.state.selectedUser.exerciseSchedules.loading?t._e():a("div",[a("b-table",{attrs:{columns:t.exerciseScheduleColumns,data:t.mappedExerciseSchedules,selected:t.selectedExerciseSchedule,"sticky-header":""},on:{"update:selected":function(e){t.selectedExerciseSchedule=e},click:function(t){e.updatedExerciseSchedule=Object.assign({},t,{exerciseValid:!0,repsValid:!0,setValid:!0,valid:!0}),e.isNewExerciseSchedule=!1}}}),a("div",{staticClass:"box columns is-multiline",attrs:{id:"updateExerciseSchedule"}},[a("b-field",{staticClass:"column is-full"},[a("b-switch",{attrs:{disabled:t.isNewExerciseSchedule,type:"is-dark"},on:{input:function(t){t&&(e.updatedExerciseSchedule={exerciseValid:!1,repsValid:!1,exerciseDate:new Date,changed:!0,setValid:!1,valid:!1},e.selectedExerciseSchedule=null)}},model:{value:t.isNewExerciseSchedule,callback:function(e){t.isNewExerciseSchedule=e},expression:"isNewExerciseSchedule"}},[t._v("Schedule New Exercise")])],1),a("b-field",{staticClass:"column is-half",attrs:{label:"Date"}},[a("b-datepicker",{model:{value:t.updatedExerciseSchedule.exerciseDate,callback:function(e){t.$set(t.updatedExerciseSchedule,"exerciseDate",e)},expression:"updatedExerciseSchedule.exerciseDate"}})],1),a("b-field",{staticClass:"column is-half",attrs:{label:"Select Exercise"}},[a("b-select",{attrs:{required:"",placeholder:"please select an exercise"},nativeOn:{input:function(e){t.validateExercise(e.target.validity.valid),t.updatedExerciseSchedule.exerciseName=t.exerciseList[e.target.value]}},model:{value:t.updatedExerciseSchedule.exerciseId,callback:function(e){t.$set(t.updatedExerciseSchedule,"exerciseId",e)},expression:"updatedExerciseSchedule.exerciseId"}},t._l(t.exerciseList,(function(e,s){return a("option",{key:e,domProps:{value:s}},[t._v(t._s(e))])})),0)],1),a("b-field",{staticClass:"column is-two-fifths",attrs:{label:"Set Number"}},[a("b-input",{attrs:{placeholder:"set number",required:"",type:"number",min:"1",max:"10"},nativeOn:{input:function(e){return t.validateSetNumber(e.target.validity.valid)}},model:{value:t.updatedExerciseSchedule.setNumber,callback:function(e){t.$set(t.updatedExerciseSchedule,"setNumber",e)},expression:"updatedExerciseSchedule.setNumber"}})],1),a("b-field",{staticClass:"column is-two-fifths",attrs:{label:"Reps"}},[a("b-input",{attrs:{placeholder:"reps",required:"",type:"number",min:"1",max:"999"},nativeOn:{input:function(e){return t.validateReps(e.target.validity.valid)}},model:{value:t.updatedExerciseSchedule.reps,callback:function(e){t.$set(t.updatedExerciseSchedule,"reps",e)},expression:"updatedExerciseSchedule.reps"}})],1),a("b-field",{staticClass:"column is-one-fifth",attrs:{label:" ",grouped:""}},[a("b-button",{staticClass:"is-success",attrs:{disabled:!t.updatedExerciseSchedule.valid},on:{click:function(e){return t.saveExerciseSchedule()}}},[t._v(" Save Schedule ")]),a("b-button",{staticClass:"is-danger is-vcentered",on:{click:function(e){return t.deleteSelectedExerciseSchedule(t.selectedExerciseSchedule)}}},[t._v("Delete")])],1)],1)],1),a("b-loading",{attrs:{"is-full-page":!1,active:t.$store.state.selectedUser.exerciseSchedules.loading,"can-cancel":!1}})],1),a("b-tab-item",{attrs:{label:"meal schedules"}},[a("div",{staticClass:"block columns"},[a("b-button",{staticClass:"is-danger column is-full",on:{click:function(e){return t.saveMealSchedulesHandler()}}},[t._v("Save All Changes")])],1),t.$store.state.selectedUser.mealSchedules.loading?t._e():a("div",[a("b-table",{attrs:{columns:t.mealScheduleColumns,data:t.mappedMealSchedules,selected:t.selectedMealSchedule,"sticky-header":""},on:{"update:selected":function(e){t.selectedMealSchedule=e},click:function(t){e.updatedMealSchedule=Object.assign({},t,{mealValid:!0,typeValid:!0,valid:!0}),e.isNewMealSchedule=!1}}}),a("div",{staticClass:"box columns is-multiline",attrs:{id:"updateMealSchedule"}},[a("b-field",{staticClass:"column is-full"},[a("b-switch",{attrs:{disabled:t.isNewMealSchedule,type:"is-dark"},on:{input:function(t){t&&(e.updatedMealSchedule={mealValid:!1,typeValid:!1,mealDate:new Date,changed:!0,valid:!1},e.selectedMealSchedule=null)}},model:{value:t.isNewMealSchedule,callback:function(e){t.isNewMealSchedule=e},expression:"isNewMealSchedule"}},[t._v("Schedule New Meal")])],1),a("b-field",{staticClass:"column is-half",attrs:{label:"Date"}},[a("b-datepicker",{model:{value:t.updatedMealSchedule.mealDate,callback:function(e){t.$set(t.updatedMealSchedule,"mealDate",e)},expression:"updatedMealSchedule.mealDate"}})],1),a("b-field",{staticClass:"column is-half",attrs:{label:"Select Meal"}},[a("b-select",{attrs:{required:"",placeholder:"please select a meal"},nativeOn:{input:function(e){t.validateMeal(e.target.validity.valid),t.updatedMealSchedule.mealName=t.mealList[e.target.value]}},model:{value:t.updatedMealSchedule.mealId,callback:function(e){t.$set(t.updatedMealSchedule,"mealId",e)},expression:"updatedMealSchedule.mealId"}},t._l(t.mealList,(function(e,s){return a("option",{key:e,domProps:{value:s}},[t._v(t._s(e))])})),0)],1),a("b-field",{staticClass:"column is-two-thirds",attrs:{label:"Type"}},[a("b-select",{attrs:{required:"",placeholder:"please select meal type"},nativeOn:{input:function(e){return t.validateMealType(e.target.validity.valid)}},model:{value:t.updatedMealSchedule.mealType,callback:function(e){t.$set(t.updatedMealSchedule,"mealType",e)},expression:"updatedMealSchedule.mealType"}},[a("option",{attrs:{value:"BREAKFAST"}},[t._v("Breakfast")]),a("option",{attrs:{value:"LUNCH"}},[t._v("Lunch")]),a("option",{attrs:{value:"DINNER"}},[t._v("Dinner")]),a("option",{attrs:{value:"SNACK"}},[t._v("Snack")])])],1),a("b-field",{staticClass:"column is-one-third",attrs:{label:" ",grouped:""}},[a("b-button",{staticClass:"is-success",attrs:{disabled:!t.updatedMealSchedule.valid},on:{click:function(e){return t.saveMealSchedule()}}},[t._v(" Save Schedule ")]),a("b-button",{staticClass:"is-danger is-vcentered",on:{click:function(e){return t.deleteSelectedMealSchedule(t.selectedMealSchedule)}}},[t._v("Delete")])],1)],1)],1),a("b-loading",{attrs:{"is-full-page":!1,active:t.$store.state.selectedUser.mealSchedules.loading,"can-cancel":!1}})],1),a("b-tab-item",{attrs:{label:"payments"}},[t.$store.state.selectedUser.payments.loading?t._e():a("div",[a("b-table",{attrs:{columns:t.paymentColumns,selected:t.selectedPayment,data:t.$store.state.selectedUser.payments.data,"sticky-header":""},on:{"update:selected":function(e){t.selectedPayment=e},click:function(s){e.updatedPayment=Object.assign({},s,{dueDate:t.maintainUTCDate(new Date(s.dueDate)),transactionDate:s.transactionDate?t.maintainUTCDate(new Date(s.transactionDate)):new Date,amountDueValid:!0,changed:!1,valid:!0,isPaid:!!s.transactionDate}),t.isNewPayment=!1}}}),a("div",{staticClass:"box columns is-multiline",attrs:{id:"updatePayment"}},[a("b-field",{staticClass:"column is-full"},[a("b-switch",{attrs:{disabled:t.isNewPayment,type:"is-dark"},on:{input:function(t){t&&(e.updatedPayment={amountDueValid:!1,changed:!1,valid:!1,isPaid:!1},e.selectedPayment=null)}},model:{value:t.isNewPayment,callback:function(e){t.isNewPayment=e},expression:"isNewPayment"}},[t._v("Create New Payment")])],1),a("b-field",{staticClass:"column is-half",attrs:{label:"Due Date"}},[a("b-datepicker",{model:{value:t.updatedPayment.dueDate,callback:function(e){t.$set(t.updatedPayment,"dueDate",e)},expression:"updatedPayment.dueDate"}})],1),a("b-field",{staticClass:"column is-half",attrs:{label:"Date Paid"}},[a("b-switch",{attrs:{disabled:t.isNewPayment},model:{value:t.updatedPayment.isPaid,callback:function(e){t.$set(t.updatedPayment,"isPaid",e)},expression:"updatedPayment.isPaid"}},[t._v("Paid")]),a("b-datepicker",{attrs:{disabled:!t.updatedPayment.isPaid},model:{value:t.updatedPayment.transactionDate,callback:function(e){t.$set(t.updatedPayment,"transactionDate",e)},expression:"updatedPayment.transactionDate"}})],1),a("b-field",{staticClass:"column is-half",attrs:{label:"Amount Due"}},[a("b-input",{attrs:{placeholder:"amount due",required:"",type:"number",min:"0",max:"9999"},nativeOn:{input:function(e){return t.validateAmountDue(e.target.validity.valid)}},model:{value:t.updatedPayment.amountDue,callback:function(e){t.$set(t.updatedPayment,"amountDue",e)},expression:"updatedPayment.amountDue"}})],1),a("b-field",{staticClass:"column is-one-half",attrs:{label:" "}},[a("b-button",{staticClass:"is-success",attrs:{disabled:!t.updatedPayment.valid},on:{click:function(e){return t.savePayment()}}},[t._v(" Save ")])],1)],1)],1),a("b-loading",{attrs:{"is-full-page":!1,active:t.$store.state.selectedUser.payments.loading,"can-cancel":!1}})],1),a("b-tab-item",{attrs:{label:"info"}},[a("div",{staticClass:"columns is-multiline"},[a("div",{staticClass:"column is-one-third"},[a("h2",{staticClass:"has-text-weight-semibold"},[t._v("Email:")]),a("p",[t._v(t._s(t.$store.state.selectedUser.email))])]),a("div",{staticClass:"column is-one-third"},[a("h2",{staticClass:"has-text-weight-semibold"},[t._v("Name:")]),a("p",[t._v(" "+t._s(t.$store.state.selectedUser.firstName)+" "+t._s(t.$store.state.selectedUser.lastName)+" ")])]),a("div",{staticClass:"column is-one-third"},[a("h2",{staticClass:"has-text-weight-semibold"},[t._v("Height:")]),a("p",[t._v(t._s(t.$store.state.selectedUser.height))])]),a("div",{staticClass:"column is-one-third"},[a("h2",{staticClass:"has-text-weight-semibold"},[t._v("Phone:")]),a("p",[t._v(t._s(t.$store.state.selectedUser.phoneNumber))])]),a("div",{staticClass:"column is-one-third"},[a("h2",{staticClass:"has-text-weight-semibold"},[t._v("username:")]),a("p",[t._v(t._s(t.$store.state.selectedUser.userName))])]),a("div",{staticClass:"column is-one-third"},[a("h2",{staticClass:"has-text-weight-semibold"},[t._v("Status:")]),a("p",[t._v(t._s(t.$store.state.selectedUser.status))])]),a("div",{staticClass:"column is-full"},[a("h2",{staticClass:"has-text-weight-semibold"},[t._v("Address:")]),a("p",[t._v(" "+t._s(t.$store.state.address.address1)+" "+t._s(t.$store.state.address.address2)+" ")])]),a("div",{staticClass:"column is-full"},[a("p",[t._v(" "+t._s(t.$store.state.address.city)+","+t._s(t.$store.state.address.stateName)+"-"+t._s(t.$store.state.address.country)+" "+t._s(t.$store.state.address.postCode)+" ")])])])]),a("b-tab-item",{attrs:{label:"reports"}},[t.$store.state.selectedUser.progress.loading||t.$store.state.selectedUser.exerciseSchedules.loading?t._e():a("div",[a("b-field",{attrs:{label:"Select Report Type"}},[a("b-select",{model:{value:t.reportType,callback:function(e){t.reportType=e},expression:"reportType"}},[a("option",{attrs:{value:"progress"}},[t._v("Weekly Progress")]),a("option",{attrs:{value:"difficulty"}},[t._v("Exercise Difficulty Feedback")])])],1),"progress"==t.reportType?a("b-table",{attrs:{columns:t.progressColumns,data:t.$store.state.selectedUser.progress.data,"sticky-header":""}}):t._e(),"difficulty"==t.reportType?a("b-table",{attrs:{columns:t.difficultyColumns,data:t.filteredDifficulty,"sticky-header":""}}):t._e()],1),a("b-loading",{attrs:{"is-full-page":!1,active:t.$store.state.selectedUser.progress.loading,"can-cancel":!1}})],1)],1),a("b-skeleton",{attrs:{size:"is-large",active:t.$store.state.selectedUser.loading,count:2}})],1):t._e()])},l=[],i=(s("c975"),s("fb6a"),s("a434"),s("5530")),d=s("b85c"),c={data:function(){return{filteredUsers:[],isManaging:!1,mealTypeSortValue:{BREAKFAST:0,LUNCH:1,DINNER:2,SNACK:3},userColumns:[{field:"username",label:"username",searchable:!0,sortable:!0,centered:!0},{field:"email",label:"email",searchable:!0,sortable:!0,centered:!0},{field:"fname",label:"first name",searchable:!0,sortable:!0,centered:!0},{field:"lname",label:"last name",searchable:!0,sortable:!0,centered:!0},{field:"status",label:"status",searchable:!0,sortable:!0,centered:!0},{field:"phone",label:"phone number",searchable:!0,sortable:!0,centered:!0},{field:"joinDate",label:"join date",searchable:!0,sortable:!0,centered:!0}],selectedClientToManage:{},paymentColumns:[{field:"dueDate",label:"Due",searchable:!0,sortable:!0},{field:"amountDue",label:"Amount",searchable:!0,sortable:!0},{field:"transactionDate",label:"Paid On",searchable:!0,sortable:!0}],progressColumns:[{field:"week",label:"Week Of",searchable:!0,sortable:!0},{field:"weight",label:"Weight",sortable:!0,centered:!0},{field:"weeklyCalories",label:"Calories",sortable:!0,centered:!0}],difficultyColumns:[{field:"exerciseDate",label:"Date",searchable:!0,sortable:!0},{field:"setNumber",label:"Set",centered:!0},{field:"exerciseName",label:"Exercise",sortable:!0,searchable:!0},{field:"reps",label:"Reps",centered:!0},{field:"difficultyFeedback",label:"Difficulty Feedback",sortable:!0,centered:!0}],exerciseScheduleColumns:[{field:"exerciseDate",label:"Date",searchable:!0,sortable:!0},{field:"setNumber",label:"Set",centered:!0},{field:"reps",label:"Reps",centered:!0},{field:"exerciseName",label:"Exercise",sortable:!0,searchable:!0}],mealScheduleColumns:[{field:"mealDate",label:"Date",searchable:!0,sortable:!0},{field:"mealType",label:"Type",sortable:!0,searchable:!0},{field:"mealName",label:"Meal",sortable:!0,searchable:!0}],mappedExerciseSchedules:[],filteredDifficulty:[],presetList:{},exerciseList:{},mealList:{},mappedMealSchedules:[],mealSchedulesToDelete:[],mealSchedulesToUpdate:[],exerciseSchedulesToDelete:[],exerciseSchedulesToUpdate:[],reportType:"difficulty",selectedExerciseDate:new Date,selectedMealDate:new Date,selectedExerciseSchedule:{},selectedMealSchedule:{},selectedPayment:{},updatedExerciseSchedule:{exerciseValid:!1,repsValid:!1,exerciseDate:new Date,changed:!0,setValid:!1,valid:!1},updatedMealSchedule:{mealValid:!1,typeValid:!1,mealDate:new Date,changed:!0,valid:!1},updatedPayment:{dueDate:new Date,transactionDate:new Date,amountDueValid:!1,changed:!0,valid:!1,isPaid:!1},isNewMealSchedule:!0,isNewExerciseSchedule:!0,isNewPayment:!0,selectedPresetId:null,presetValid:!1,presetStartDate:new Date,presetModeEnabled:!1}},created:function(){this.filterUsers(),this.filterPresetList(),this.filterExerciseList(),this.filterMealList()},methods:{filterUsers:function(){var e,t=Object(d["a"])(this.$store.state.users.data);try{for(t.s();!(e=t.n()).done;){var s=e.value;"ROLE_ADMIN"!==s.role&&this.filteredUsers.push(s)}}catch(a){t.e(a)}finally{t.f()}},filterPresetList:function(){var e,t=Object(d["a"])(this.$store.state.presets.data);try{for(t.s();!(e=t.n()).done;){var s=e.value;this.presetList[s.presetId]=s.presetName}}catch(a){t.e(a)}finally{t.f()}},filterExerciseList:function(){var e,t=Object(d["a"])(this.$store.state.exercises.data);try{for(t.s();!(e=t.n()).done;){var s=e.value;"LIVE"!==s.exerciseType&&(this.exerciseList[s.exerciseId]=s.exerciseName)}}catch(a){t.e(a)}finally{t.f()}},filterMealList:function(){var e,t=Object(d["a"])(this.$store.state.meals.data);try{for(t.s();!(e=t.n()).done;){var s=e.value;this.mealList[s.mealId]=s.mealName}}catch(a){t.e(a)}finally{t.f()}},validateExerciseSchedule:function(){this.updatedExerciseSchedule.exerciseValid&&this.updatedExerciseSchedule.repsValid&&this.updatedExerciseSchedule.setValid?this.updatedExerciseSchedule.valid=!0:this.updatedExerciseSchedule.valid=!1},validateMealSchedule:function(){this.updatedMealSchedule.mealValid&&this.updatedMealSchedule.typeValid?this.updatedMealSchedule.valid=!0:this.updatedMealSchedule.valid=!1},validatePayment:function(){this.updatedPayment.amountDueValid?this.updatedPayment.valid=!0:this.updatedPayment.valid=!1},validatePreset:function(e){this.presetValid=e},validateMeal:function(e){this.updatedMealSchedule.mealValid=e,this.validateMealSchedule()},validateMealType:function(e){this.updatedMealSchedule.typeValid=e,this.validateMealSchedule()},validateExercise:function(e){this.updatedExerciseSchedule.exerciseValid=e,this.validateExerciseSchedule()},validateReps:function(e){this.updatedExerciseSchedule.repsValid=e,this.validateExerciseSchedule()},validateSetNumber:function(e){this.updatedExerciseSchedule.setValid=e,this.validateExerciseSchedule()},validateAmountDue:function(e){this.updatedPayment.amountDueValid=e,this.validatePayment()},selectClient:function(){var e={username:this.selectedClientToManage.username,userId:this.selectedClientToManage.userId,addressId:this.selectedClientToManage.addressId,role:this.selectedClientToManage.role,email:this.selectedClientToManage.email,fname:this.selectedClientToManage.fname,height:this.selectedClientToManage.height,joinDate:this.selectedClientToManage.joinDate,lname:this.selectedClientToManage.lname,phone:this.selectedClientToManage.phone,status:this.selectedClientToManage.status};this.$store.dispatch("selectedUserInfo",e),this.fetchAddress(),this.fetchExerciseSchedules(),this.fetchMealSchedules(),this.fetchPayments(),this.fetchProgress(),this.isManaging=!0},exitManagement:function(){this.selectedClientToManage={},this.$store.dispatch("resetSelectedUser"),this.isManaging=!1,this.mappedExerciseSchedules=new Array,this.filteredDifficulty=new Array,this.mappedMealSchedules=new Array,this.mealSchedulesToDelete=new Array,this.mealSchedulesToUpdate=new Array,this.exerciseSchedulesToDelete=new Array,this.exerciseSchedulesToUpdate=new Array,this.selectedExerciseDate=new Date,this.selectedMealDate=new Date,this.selectedExerciseSchedule=null,this.selectedMealSchedule=null,this.selectedPayment=null,this.selectedPresetId=null,this.updatedExerciseSchedule={exerciseValid:!1,repsValid:!1,exerciseDate:new Date,changed:!0,setValid:!1,valid:!1},this.updatedMealSchedule={mealValid:!1,typeValid:!1,mealDate:new Date,changed:!0,valid:!1},this.updatedPayment={dueDate:new Date,transactionDate:new Date,amountDueValid:!1,changed:!0,valid:!1,isPaid:!1},this.isNewMealSchedule=!0,this.isNewExerciseSchedule=!0,this.isNewPayment=!0,this.presetValid=!1,this.presetStartDate=new Date,this.presetModeEnabled=!1},fetchMealSchedules:function(){var e=this;this.mappedMealSchedules=new Array,this.$store.dispatch("setLoading",{phase:"setLoading",type:"selectedUserMealSchedules"}),this.axios.get("/meal_schedules/all/"+this.selectedClientToManage.userId,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){e.$store.dispatch("fetchSelectedUserMealSchedules",t.data),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserMealSchedules"}),e.mapMealSchedules()}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserMealSchedules"})}))},fetchAddress:function(){var e=this;this.$store.dispatch("setLoading",{phase:"setLoading",type:"address"}),this.axios.get("/addresses/"+this.selectedClientToManage.addressId,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){e.$store.dispatch("fetchAddress",t.data),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"address"})}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"address"})}))},fetchExerciseSchedules:function(){var e=this;this.mappedExerciseSchedules=new Array,this.$store.dispatch("setLoading",{phase:"setLoading",type:"selectedUserExerciseSchedules"}),this.axios.get("/exercise_schedules/all/"+this.selectedClientToManage.userId,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){e.$store.dispatch("fetchSelectedUserExerciseSchedules",t.data),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserExerciseSchedules"}),e.filterDifficulty(),e.mapExerciseSchedules()}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserExerciseSchedules"})}))},fetchProgress:function(){var e=this;this.$store.dispatch("setLoading",{phase:"setLoading",type:"selectedProgress"}),this.axios.get("/progress/all/"+this.selectedClientToManage.userId,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){e.$store.dispatch("fetchSelectedUserProgress",t.data),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserProgress"})}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserProgress"})}))},fetchPayments:function(){var e=this;this.$store.dispatch("setLoading",{phase:"setLoading",type:"selectedPayments"}),this.axios.get("/payments/all/"+this.selectedClientToManage.userId,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){e.$store.dispatch("fetchSelectedUserPayments",t.data),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserPayments"})}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserPayments"})}))},filterDifficulty:function(){this.filteredDifficulty=new Array;var e,t=Object(d["a"])(this.$store.state.selectedUser.exerciseSchedules.data);try{for(t.s();!(e=t.n()).done;){var s=e.value;if(s.difficultyFeedback>0){var a=Object(i["a"])({},s);a.exerciseDate=new Date(s.exerciseDate).toDateString(),a.exerciseName=this.exerciseList[a.exerciseId],this.filteredDifficulty.push(a)}}}catch(l){t.e(l)}finally{t.f()}},mapExerciseSchedules:function(){var e,t=Object(d["a"])(this.$store.state.selectedUser.exerciseSchedules.data);try{for(t.s();!(e=t.n()).done;){var s=e.value;s=this.mapExercise(s),this.mappedExerciseSchedules.push(s)}}catch(a){t.e(a)}finally{t.f()}this.sortExerciseSchedules()},mapExercise:function(e){var t,s=Object(d["a"])(this.$store.state.exercises.data);try{for(s.s();!(t=s.n()).done;){var a=t.value;a.exerciseId===e.exerciseId&&(e=Object(i["a"])(Object(i["a"])({},e),{},{exerciseName:a.exerciseName,exerciseDate:this.maintainUTCDate(new Date(e.exerciseDate)),changed:!1}))}}catch(l){s.e(l)}finally{s.f()}return e},mapMealSchedules:function(){var e,t=Object(d["a"])(this.$store.state.selectedUser.mealSchedules.data);try{for(t.s();!(e=t.n()).done;){var s=e.value;s=this.mapMeal(s),this.mappedMealSchedules.push(s)}}catch(a){t.e(a)}finally{t.f()}this.sortMealSchedules()},mapMeal:function(e){var t,s=Object(d["a"])(this.$store.state.meals.data);try{for(s.s();!(t=s.n()).done;){var a=t.value;a.mealId===e.mealId&&(e=Object(i["a"])(Object(i["a"])({},e),{},{mealName:a.mealName,mealDate:this.maintainUTCDate(new Date(e.mealDate)),changed:!1}))}}catch(l){s.e(l)}finally{s.f()}return e},saveExerciseSchedule:function(){this.isNewExerciseSchedule?this.addNewExerciseSchedule():this.updateSelectedExerciseSchedule(),this.sortExerciseSchedules()},sortExerciseSchedules:function(){this.mappedExerciseSchedules.sort((function(e,t){return new Date(e.exerciseDate).toDateString()!==new Date(t.exerciseDate).toDateString()?e.exerciseDate-t.exerciseDate:e.setNumber-t.setNumber}))},updateSelectedExerciseSchedule:function(){this.selectedExerciseSchedule.changed=!0,this.selectedExerciseSchedule.exerciseDate=this.updatedExerciseSchedule.exerciseDate,this.selectedExerciseSchedule.exerciseId=this.updatedExerciseSchedule.exerciseId,this.selectedExerciseSchedule.exerciseName=this.updatedExerciseSchedule.exerciseName,this.selectedExerciseSchedule.reps=this.updatedExerciseSchedule.reps,this.selectedExerciseSchedule.setNumber=this.updatedExerciseSchedule.setNumber,this.updatedExerciseSchedule={exerciseValid:!1,repsValid:!1,exerciseDate:new Date,changed:!0,setValid:!1,valid:!1},this.selectedExerciseSchedule=null,this.isNewExerciseSchedule=!0},addNewExerciseSchedule:function(){this.mappedExerciseSchedules.push({changed:!0,difficultyFeedback:0,exerciseDate:this.updatedExerciseSchedule.exerciseDate,exerciseId:this.updatedExerciseSchedule.exerciseId,exerciseName:this.updatedExerciseSchedule.exerciseName,reps:this.updatedExerciseSchedule.reps,scheduleId:null,setNumber:this.updatedExerciseSchedule.setNumber,userId:this.$store.state.selectedUser.userId}),this.updatedExerciseSchedule={exerciseValid:!1,repsValid:!1,exerciseDate:new Date,changed:!0,setValid:!1,valid:!1},this.selectedExerciseSchedule=null,this.isNewExerciseSchedule=!0},deleteSelectedExerciseSchedule:function(e){var t=this.mappedExerciseSchedules.indexOf(e);this.mappedExerciseSchedules.splice(t,1),e.scheduleId&&this.exerciseSchedulesToDelete.push(e.scheduleId),this.updatedExerciseSchedule={exerciseValid:!1,repsValid:!1,exerciseDate:new Date,changed:!0,setValid:!1,valid:!1},this.selectedExerciseSchedule=null,this.isNewExerciseSchedule=!0},saveExerciseSchedulesHandler:function(){this.$store.dispatch("setLoading",{phase:"setLoading",type:"selectedUserExerciseSchedules"}),this.deleteExerciseSchedules();var e,t=Object(d["a"])(this.mappedExerciseSchedules);try{for(t.s();!(e=t.n()).done;){var s=e.value;if(s.changed){var a={difficultyFeedback:s.difficultyFeedback,exerciseDate:s.exerciseDate.toISOString(),exerciseId:s.exerciseId,reps:s.reps,scheduleId:s.scheduleId,setNumber:s.setNumber,userId:s.userId};this.exerciseSchedulesToUpdate.push(a)}}}catch(l){t.e(l)}finally{t.f()}this.updateExerciseSchedules(),this.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserExerciseSchedules"})},updateExerciseSchedules:function(){var e=this;this.exerciseSchedulesToUpdate.length>0?this.axios.post("/exercise_schedules/groupUpdate",this.exerciseSchedulesToUpdate,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){console.log(t),e.updatedExerciseSchedule={exerciseValid:!1,repsValid:!1,exerciseDate:new Date,changed:!0,setValid:!1,valid:!1},e.selectedExerciseSchedule=null,e.isNewExerciseSchedule=!0,e.exerciseSchedulesToUpdate=new Array}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserExerciseSchedules"})})):(this.updatedExerciseSchedule={exerciseValid:!1,repsValid:!1,exerciseDate:new Date,changed:!0,setValid:!1,valid:!1},this.selectedExerciseSchedule=null,this.isNewExerciseSchedule=!0,this.exerciseSchedulesToUpdate=new Array)},deleteExerciseSchedules:function(){var e=this;this.exerciseSchedulesToDelete.length>0&&this.axios.post("/exercise_schedules/groupDelete/",this.exerciseSchedulesToDelete,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){console.log(t),e.exerciseSchedulesToDelete=new Array}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserExerciseSchedules"})}))},assignPreset:function(){var e=this,t={startDate:this.presetStartDate.toISOString(),presetId:this.selectedPresetId,userId:this.$store.state.selectedUser.userId};this.$store.dispatch("setLoading",{phase:"setLoading",type:"selectedUserExerciseSchedules"}),this.axios.post("/exercise_schedules/newFromPreset",t,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){console.log(t),e.fetchExerciseSchedules(),e.updatedExerciseSchedule={exerciseValid:!1,repsValid:!1,exerciseDate:new Date,changed:!0,setValid:!1,valid:!1},e.selectedExerciseSchedule=null,e.isNewExerciseSchedule=!0,e.exerciseSchedulesToDelete=new Array,e.exerciseSchedulesToUpdate=new Array}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserExerciseSchedules"})}))},saveMealSchedule:function(){this.isNewMealSchedule?this.addNewMealSchedule():this.updateSelectedMealSchedule(),this.sortMealSchedules()},sortMealSchedules:function(){var e=this;this.mappedMealSchedules.sort((function(t,s){return new Date(t.mealDate).toDateString()!==new Date(s.mealDate).toDateString()?t.mealDate-s.mealDate:e.mealTypeSortValue[t.mealType]-e.mealTypeSortValue[s.mealType]}))},updateSelectedMealSchedule:function(){this.selectedMealSchedule.changed=!0,this.selectedMealSchedule.mealDate=this.updatedMealSchedule.mealDate,this.selectedMealSchedule.mealType=this.updatedMealSchedule.mealType,this.selectedMealSchedule.mealName=this.updatedMealSchedule.mealName,this.selectedMealSchedule.mealId=this.updatedMealSchedule.mealId,this.updatedMealSchedule={mealValid:!1,typeValid:!1,mealDate:new Date,changed:!0,valid:!1},this.selectedMealSchedule=null,this.isNewMealSchedule=!0},addNewMealSchedule:function(){this.mappedMealSchedules.push({changed:!0,mealDate:this.updatedMealSchedule.mealDate,mealId:this.updatedMealSchedule.mealId,mealName:this.updatedMealSchedule.mealName,mealType:this.updatedMealSchedule.mealType,scheduleId:null,userId:this.$store.state.selectedUser.userId}),this.updatedMealSchedule={mealValid:!1,typeValid:!1,mealDate:new Date,changed:!0,valid:!1},this.selectedMealSchedule=null,this.isNewMealSchedule=!0},deleteSelectedMealSchedule:function(e){var t=this.mappedMealSchedules.indexOf(e);this.mappedMealSchedules.splice(t,1),e.scheduleId&&this.mealSchedulesToDelete.push(e.scheduleId),this.updatedMealSchedule={mealValid:!1,typeValid:!1,mealDate:new Date,changed:!0,valid:!1},this.selectedMealSchedule=null,this.isNewMealSchedule=!0},saveMealSchedulesHandler:function(){this.$store.dispatch("setLoading",{phase:"setLoading",type:"selectedUserMealSchedules"}),this.deleteMealSchedules();var e,t=Object(d["a"])(this.mappedMealSchedules);try{for(t.s();!(e=t.n()).done;){var s=e.value;if(s.changed){var a={mealDate:s.mealDate.toISOString(),mealId:s.mealId,mealType:s.mealType,scheduleId:s.scheduleId,userId:s.userId};this.mealSchedulesToUpdate.push(a)}}}catch(l){t.e(l)}finally{t.f()}this.updateMealSchedules(),this.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserMealSchedules"})},updateMealSchedules:function(){var e=this;this.mealSchedulesToUpdate.length>0?this.axios.post("/meal_schedules/groupUpdate",this.mealSchedulesToUpdate,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){console.log(t),e.updatedMealSchedule={mealValid:!1,typeValid:!1,mealDate:new Date,changed:!0,valid:!1},e.selectedMealSchedule=null,e.isNewMealSchedule=!0,e.mealSchedulesToUpdate=new Array}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserExerciseSchedules"})})):(this.updatedMealSchedule={mealValid:!1,typeValid:!1,mealDate:new Date,changed:!0,valid:!1},this.selectedMealSchedule=null,this.isNewMealSchedule=!0,this.mealSchedulesToUpdate=new Array)},deleteMealSchedules:function(){var e=this;this.mealSchedulesToDelete.length>0&&this.axios.post("/meal_schedules/groupDelete/",this.mealSchedulesToDelete,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){console.log(t),e.mealSchedulesToDelete=new Array}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"selectedUserMealSchedules"})}))},savePayment:function(){this.isNewPayment?this.addNewPayment():this.updatePayment()},addNewPayment:function(){var e=this,t={amountDue:this.updatedPayment.amountDue,status:"1",dueDate:this.updatedPayment.dueDate.toISOString(),userId:this.$store.state.selectedUser.userId};this.$store.dispatch("setLoading",{phase:"setLoading",type:"selectedUserPayments"}),this.axios.post("/payments/new",t,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(t){console.log(t),e.axios.get("/payments/all/"+e.$store.state.selectedUser.userId,{headers:{Authorization:"Bearer "+e.$store.state.authToken}}).then((function(t){e.$store.dispatch("fetchSelectedUserPayments",t.data),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"payments"}),e.updatedPayment={dueDate:new Date,transactionDate:new Date,amountDueValid:!1,changed:!0,valid:!1,isPaid:!1},e.selectedPayment=null,e.isNewPayment=!0}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"payments"})}))}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"payments"})}))},updatePayment:function(){var e=this,t=null;this.updatedPayment.isPaid&&(t=this.updatedPayment.transactionDate.toISOString()),console.log(t);var s={amountDue:this.updatedPayment.amountDue,status:this.updatedPayment.isPaid?"0":"1",dueDate:this.updatedPayment.dueDate.toISOString(),transactionDate:t,userId:this.$store.state.selectedUser.userId},a=this.updatedPayment.paymentId;this.axios.post("/payments/update/"+a,s,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(l){console.log(l),e.$store.dispatch("updateSelectedUserPayments",{paymentId:a,dueDate:s.dueDate.slice(0,10),transactionDate:t?t.slice(0,10):null,status:s.status,userId:s.userId,amountDue:s.amountDue}),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"payments"}),e.updatedPayment={dueDate:new Date,transactionDate:new Date,amountDueValid:!1,changed:!0,valid:!1,isPaid:!1},e.selectedPayment=null,e.isNewPayment=!0}),(function(t){e.$buefy.dialog.alert(t.response.data.message),e.$store.dispatch("setLoading",{phase:"setLoaded",type:"payments"})}))},maintainUTCDate:function(e){return new Date(e.getTime()+6e4*e.getTimezoneOffset())}}},r=c,n=s("2877"),u=Object(n["a"])(r,a,l,!1,null,null,null);t["default"]=u.exports},"17c2":function(e,t,s){"use strict";var a=s("b727").forEach,l=s("a640"),i=s("ae40"),d=l("forEach"),c=i("forEach");e.exports=d&&c?[].forEach:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}},4160:function(e,t,s){"use strict";var a=s("23e7"),l=s("17c2");a({target:"Array",proto:!0,forced:[].forEach!=l},{forEach:l})},"4de4":function(e,t,s){"use strict";var a=s("23e7"),l=s("b727").filter,i=s("1dde"),d=s("ae40"),c=i("filter"),r=d("filter");a({target:"Array",proto:!0,forced:!c||!r},{filter:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0)}})},5530:function(e,t,s){"use strict";s.d(t,"a",(function(){return i}));s("a4d3"),s("4de4"),s("4160"),s("e439"),s("dbb4"),s("b64b"),s("159b");function a(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function l(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,a)}return s}function i(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?l(Object(s),!0).forEach((function(t){a(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):l(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}},a434:function(e,t,s){"use strict";var a=s("23e7"),l=s("23cb"),i=s("a691"),d=s("50c4"),c=s("7b0b"),r=s("65f0"),n=s("8418"),u=s("1dde"),o=s("ae40"),h=u("splice"),p=o("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,f=Math.min,S=9007199254740991,b="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!h||!p},{splice:function(e,t){var s,a,u,o,h,p,x=c(this),y=d(x.length),g=l(e,y),v=arguments.length;if(0===v?s=a=0:1===v?(s=0,a=y-g):(s=v-2,a=f(m(i(t),0),y-g)),y+s-a>S)throw TypeError(b);for(u=r(x,a),o=0;o<a;o++)h=g+o,h in x&&n(u,o,x[h]);if(u.length=a,s<a){for(o=g;o<y-a;o++)h=o+a,p=o+s,h in x?x[p]=x[h]:delete x[p];for(o=y;o>y-a+s;o--)delete x[o-1]}else if(s>a)for(o=y-a;o>g;o--)h=o+a-1,p=o+s-1,h in x?x[p]=x[h]:delete x[p];for(o=0;o<s;o++)x[o+g]=arguments[o+2];return x.length=y-a+s,u}})},a640:function(e,t,s){"use strict";var a=s("d039");e.exports=function(e,t){var s=[][e];return!!s&&a((function(){s.call(null,t||function(){throw 1},1)}))}},b64b:function(e,t,s){var a=s("23e7"),l=s("7b0b"),i=s("df75"),d=s("d039"),c=d((function(){i(1)}));a({target:"Object",stat:!0,forced:c},{keys:function(e){return i(l(e))}})},c975:function(e,t,s){"use strict";var a=s("23e7"),l=s("4d64").indexOf,i=s("a640"),d=s("ae40"),c=[].indexOf,r=!!c&&1/[1].indexOf(1,-0)<0,n=i("indexOf"),u=d("indexOf",{ACCESSORS:!0,1:0});a({target:"Array",proto:!0,forced:r||!n||!u},{indexOf:function(e){return r?c.apply(this,arguments)||0:l(this,e,arguments.length>1?arguments[1]:void 0)}})},dbb4:function(e,t,s){var a=s("23e7"),l=s("83ab"),i=s("56ef"),d=s("fc6a"),c=s("06cf"),r=s("8418");a({target:"Object",stat:!0,sham:!l},{getOwnPropertyDescriptors:function(e){var t,s,a=d(e),l=c.f,n=i(a),u={},o=0;while(n.length>o)s=l(a,t=n[o++]),void 0!==s&&r(u,t,s);return u}})},e439:function(e,t,s){var a=s("23e7"),l=s("d039"),i=s("fc6a"),d=s("06cf").f,c=s("83ab"),r=l((function(){d(1)})),n=!c||r;a({target:"Object",stat:!0,forced:n,sham:!c},{getOwnPropertyDescriptor:function(e,t){return d(i(e),t)}})}}]);
//# sourceMappingURL=chunk-56c0e8f8.57827d32.js.map