Vue.component("student-card", {
  props: ["student", "isactive"],
  template:
    "<div class='student' v-bind:class{cardActive:isactive}>{{student.name}} : {{student.skill}}</div>"
});
var app = new Vue({
  el: "#app",
  data: {
    students: [
      { name: "Sienna", skill: 2, joy: 0 },
      { name: "Cyan", skill: 0, joy: 5 },
      { name: "Magenta", skill: 3, joy: 3 }
    ],
    currentStudent: { name: "Sienna", skill: 2, joy: 0 },
    curStudentId: 0,
    cardActive: true
  },
  methods: {
    arrowClicked: function() {
      this.curStudentId++;
      console.log(this.curStudentId);
      if (this.curStudentId > 2) {
        this.curStudentId = 0;
      }
      this.currentStudent = this.students[this.curStudentId];
      this.cardActive = !this.cardActive;
    }
  }
});
