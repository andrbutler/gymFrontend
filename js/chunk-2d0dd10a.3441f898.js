(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dd10a"],{8095:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"schedule"}},[e.$store.state.liveClasses.loading?e._e():s("section",{attrs:{id:"live"}},[s("b-collapse",{staticClass:"card",attrs:{animation:"slide","aria-id":"contentIdForA11y3"},scopedSlots:e._u([{key:"trigger",fn:function(t){return s("div",{staticClass:"card-header",attrs:{role:"button","aria-controls":"contentIdForA11y3"}},[s("p",{staticClass:"card-header-title"},[e._v(" This Week's Live Classes ")]),s("a",{staticClass:"card-header-icon"},[s("b-icon",{attrs:{icon:t.open?"menu-down":"menu-up"}})],1)])}}],null,!1,3716048950)},[s("div",{staticClass:"card-content"},[s("div",{staticClass:"content columns"},e._l(e.currentWeek,(function(t,a){return s("div",{key:a,staticClass:"card column"},[s("header",{staticClass:"card-header"},[s("p",{staticClass:"card-header-title"},[e._v(" "+e._s(t.date.toDateString())+" ")])]),s("div",{staticClass:"card-content"},e._l(t.liveClasses,(function(t){return s("ul",{key:t.exerciseId},[s("a",{attrs:{href:t.exampleLink}},[e._v(" "+e._s(t.exerciseName)+" -- "+e._s(new Date(t.classTime).toTimeString().slice(0,5))+" ")])])})),0)])})),0)])])],1),s("b-skeleton",{attrs:{size:"is-large",active:e.$store.state.liveClasses.loading,count:2}}),s("section",{attrs:{id:"prior"}},[s("b-collapse",{staticClass:"card",attrs:{animation:"slide","aria-id":"contentIdForA11y3"},scopedSlots:e._u([{key:"trigger",fn:function(t){return s("div",{staticClass:"card-header",attrs:{role:"button","aria-controls":"contentIdForA11y3"}},[s("p",{staticClass:"card-header-title"},[e._v(" Last Week ")]),s("a",{staticClass:"card-header-icon"},[s("b-icon",{attrs:{icon:t.open?"menu-down":"menu-up"}})],1)])}}])},[s("div",{staticClass:"card-content"},e._l(e.lastWeek,(function(t,a){return s("div",{key:a,staticClass:"card"},[s("header",{staticClass:"card-header"},[s("p",{staticClass:"card-header-title"},[e._v(" "+e._s(t.date.toDateString())+" ")])]),s("div",{staticClass:"card-content"},[s("p",{staticClass:"has-text-weight-semibold"},[e._v("Exercises")]),e._l(t.exercises,(function(t){return s("ul",{key:t.scheduleId},[s("p",[e._v("set: "+e._s(t.setNumber))]),s("p",[s("a",{attrs:{href:t.exerciseInfo.exampleLink}},[e._v(e._s(t.exerciseInfo.exerciseName))]),e._v(" reps: "+e._s(t.reps)+" ")]),s("div",{directives:[{name:"show",rawName:"v-show",value:0==t.difficultyFeedback,expression:"e.difficultyFeedback == 0"}],attrs:{id:"feedback-control"}},[s("b-field",{attrs:{id:t.scheduleId}},[s("b-select",{attrs:{placeholder:"Difficulty Feedback"},model:{value:t.difficultyValue,callback:function(s){e.$set(t,"difficultyValue",s)},expression:"e.difficultyValue"}},e._l(e.difficultes,(function(t,a){return s("option",{key:a,domProps:{value:t}},[e._v(" "+e._s(a)+" ")])})),0)],1),s("b-button",{staticClass:"is-success is-light",on:{click:function(s){e.giveDifficultyFeedback(t.scheduleId,{exerciseDate:t.exerciseDate,difficultyFeedback:t.difficultyValue,exerciseId:t.exerciseId,userId:t.userId}),t.difficultyFeedback=t.difficultyValue}}},[e._v(" Submit Feedback")])],1)])})),s("p",{staticClass:"has-text-weight-semibold"},[e._v("Meals")]),e._l(t.meals,(function(t){return s("ul",{key:t.scheduleId},[s("p",[e._v(" "+e._s(t.mealType)+" : "),s("a",{attrs:{href:t.mealInfo.recipeLink}},[e._v(e._s(t.mealInfo.mealName))]),e._v(" calories: "+e._s(t.mealInfo.calories)+" ")])])}))],2)])})),0)])],1),s("section",{attrs:{id:"current"}},[s("b-collapse",{staticClass:"card",attrs:{animation:"slide","aria-id":"contentIdForA11y3"},scopedSlots:e._u([{key:"trigger",fn:function(t){return s("div",{staticClass:"card-header",attrs:{role:"button","aria-controls":"contentIdForA11y3"}},[s("p",{staticClass:"card-header-title"},[e._v(" This Week ")]),s("a",{staticClass:"card-header-icon"},[s("b-icon",{attrs:{icon:t.open?"menu-down":"menu-up"}})],1)])}}])},[s("div",{staticClass:"card-content"},e._l(e.currentWeek,(function(t,a){return s("div",{key:a,staticClass:"card"},[s("header",{staticClass:"card-header"},[s("p",{staticClass:"card-header-title"},[e._v(" "+e._s(t.date.toDateString())+" ")])]),s("div",{staticClass:"card-content"},[s("p",{staticClass:"has-text-weight-semibold"},[e._v("Exercises")]),e._l(t.exercises,(function(t){return s("ul",{key:t.scheduleId},[s("p",[e._v("set: "+e._s(t.setNumber))]),s("p",[s("a",{attrs:{href:t.exerciseInfo.exampleLink}},[e._v(e._s(t.exerciseInfo.exerciseName))]),e._v(" reps: "+e._s(t.reps)+" ")]),s("div",{directives:[{name:"show",rawName:"v-show",value:0==t.difficultyFeedback,expression:"e.difficultyFeedback == 0"}],attrs:{id:"feedback-control"}},[s("b-field",{attrs:{id:t.scheduleId}},[s("b-select",{attrs:{placeholder:"Difficulty Feedback"},model:{value:t.difficultyValue,callback:function(s){e.$set(t,"difficultyValue",s)},expression:"e.difficultyValue"}},e._l(e.difficultes,(function(t,a){return s("option",{key:a,domProps:{value:t}},[e._v(" "+e._s(a)+" ")])})),0)],1),s("b-button",{staticClass:"is-success is-light",on:{click:function(s){e.giveDifficultyFeedback(t.scheduleId,{exerciseDate:t.exerciseDate,difficultyFeedback:t.difficultyValue,exerciseId:t.exerciseId,userId:t.userId}),t.difficultyFeedback=t.difficultyValue}}},[e._v(" Submit Feedback")])],1)])})),s("p",{staticClass:"has-text-weight-semibold"},[e._v("Meals")]),e._l(t.meals,(function(t){return s("ul",{key:t.scheduleId},[s("p",[e._v(" "+e._s(t.mealType)+" : "),s("a",{attrs:{href:t.mealInfo.recipeLink}},[e._v(e._s(t.mealInfo.mealName))]),e._v(" calories: "+e._s(t.mealInfo.calories)+" ")])])}))],2)])})),0)])],1),s("section",{attrs:{id:"upcomming"}},[s("b-collapse",{staticClass:"card",attrs:{animation:"slide","aria-id":"contentIdForA11y3"},scopedSlots:e._u([{key:"trigger",fn:function(t){return s("div",{staticClass:"card-header",attrs:{role:"button","aria-controls":"contentIdForA11y3"}},[s("p",{staticClass:"card-header-title"},[e._v(" Next Week ")]),s("a",{staticClass:"card-header-icon"},[s("b-icon",{attrs:{icon:t.open?"menu-down":"menu-up"}})],1)])}}])},[s("div",{staticClass:"card-content"},e._l(e.nextWeek,(function(t,a){return s("div",{key:a,staticClass:"card"},[s("header",{staticClass:"card-header"},[s("p",{staticClass:"card-header-title"},[e._v(" "+e._s(t.date.toDateString())+" ")])]),s("div",{staticClass:"card-content"},[s("p",{staticClass:"has-text-weight-semibold"},[e._v("Exercises")]),e._l(t.exercises,(function(t){return s("ul",{key:t.scheduleId},[s("p",[e._v("set: "+e._s(t.setNumber))]),s("p",[s("a",{attrs:{href:t.exerciseInfo.exampleLink}},[e._v(e._s(t.exerciseInfo.exerciseName))]),e._v(" reps: "+e._s(t.reps)+" ")])])})),s("p",{staticClass:"has-text-weight-semibold"},[e._v("Meals")]),e._l(t.meals,(function(t){return s("ul",{key:t.scheduleId},[s("p",[e._v(" "+e._s(t.mealType)+" : "),s("a",{attrs:{href:t.mealInfo.recipeLink}},[e._v(e._s(t.mealInfo.mealName))]),e._v(" calories: "+e._s(t.mealInfo.calories)+" ")])])}))],2)])})),0)])],1)],1)},i=[],r=s("b85c"),c={name:"Schedule",data:function(){return{currentDay:null,currentWeek:[],lastWeek:[],nextWeek:[],difficultes:{easy:1,normal:2,difficult:3},difficultyValue:0}},created:function(){this.getDays()},methods:{getDays:function(){for(var e=this.$dayjs(),t=0;t<7;t++)this.currentWeek.push({date:e.day(t).toDate(),exercises:[],meals:[],liveClasses:[]}),this.currentWeek[t].date.setHours(0,0,0,0,0),this.nextWeek.push({date:e.day(t).add(1,"week").toDate(),exercises:[],meals:[],liveClasses:[]}),this.nextWeek[t].date.setHours(0,0,0,0,0),this.lastWeek.push({date:e.day(t).subtract(1,"week").toDate(),exercises:[],meals:[],liveClasses:[]}),this.lastWeek[t].date.setHours(0,0,0,0,0);this.currentDay=e.toDate(),this.currentDay.setHours(0,0,0,0,0),this.filterSchedules(this.lastWeek),this.filterSchedules(this.currentWeek),this.filterSchedules(this.nextWeek)},filterSchedules:function(e){var t,s=Object(r["a"])(e);try{for(s.s();!(t=s.n()).done;){var a,i=t.value,c=Object(r["a"])(this.$store.state.signedInUser.exerciseSchedules.data);try{for(c.s();!(a=c.n()).done;){var l=a.value,n=this.$dayjs(l.exerciseDate).toDate();if(i.date.toDateString()===this.maintainUTCDate(n).toDateString()){var d=this.mapExercises(l);i.exercises.push(d)}}}catch(b){c.e(b)}finally{c.f()}var o,u=Object(r["a"])(this.$store.state.liveClasses.data);try{for(u.s();!(o=u.n()).done;){var f=o.value,h=this.$dayjs(f.classTime).toDate();if(i.date.toDateString()===h.toDateString()){var v=f;i.liveClasses.push(v)}}}catch(b){u.e(b)}finally{u.f()}var p,m=Object(r["a"])(this.$store.state.signedInUser.mealSchedules.data);try{for(m.s();!(p=m.n()).done;){var y=p.value,_=this.$dayjs(y.mealDate).toDate();if(i.date.toDateString()===this.maintainUTCDate(_).toDateString()){var k=this.mapMeals(y);i.meals.push(k)}}}catch(b){m.e(b)}finally{m.f()}}}catch(b){s.e(b)}finally{s.f()}},mapMeals:function(e){var t,s=Object(r["a"])(this.$store.state.meals.data);try{for(s.s();!(t=s.n()).done;){var a=t.value;a.mealId==e.mealId&&(e.mealInfo=a)}}catch(i){s.e(i)}finally{s.f()}return e},mapExercises:function(e){var t,s=Object(r["a"])(this.$store.state.exercises.data);try{for(s.s();!(t=s.n()).done;){var a=t.value;a.exerciseId==e.exerciseId&&(e.exerciseInfo=a,e.difficultyValue=e.difficultyFeedback)}}catch(i){s.e(i)}finally{s.f()}return e},giveDifficultyFeedback:function(e,t){var s=this,a={id:e,update:t};this.$store.dispatch("setLoading",{phase:"setLoading",type:"signedInUserExerciseSchedules"}),this.axios.post("/exercise_schedules/update/feedback/"+e,t,{headers:{Authorization:"Bearer "+this.$store.state.authToken}}).then((function(e){s.$store.dispatch("updateExerciseDifficulty",a),s.$store.dispatch("setLoading",{phase:"setLoaded",type:"signedInUserExerciseSchedules"}),console.log(e)}),(function(e){s.$buefy.dialog.alert(e.response.data.message),s.$store.dispatch("setLoading",{phase:"setLoaded",type:"signedInUserExerciseSchedules"})}))},maintainUTCDate:function(e){return new Date(e.getTime()+6e4*e.getTimezoneOffset())}}},l=c,n=s("2877"),d=Object(n["a"])(l,a,i,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0dd10a.3441f898.js.map