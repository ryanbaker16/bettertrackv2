var dailycheckinView = new Vue({
  el: '#app',
  data: {
    checkin_rating: 5,
    feels_entry: '',
    goals_entry: '',
    misc_entry: '',
  },
  methods: {
    submitCheckin: function() {
      console.log("PENIS")
      console.log(this.checkin_rating);
      console.log(this.feels_entry);
      console.log(this.goals_entry);
      console.log(this.misc_entry);
    },
  }
})
