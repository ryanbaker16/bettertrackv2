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
      date = new Date();
      dateString = date.toDateString()
      dateString = dateString.slice(4)
      checkinLog = {
        'checkin_rating': this.checkin_rating,
        'feels': this.feels_entry,
        'goals': this.goals_entry,
        'misc': this.misc_entry,
        'checkin_date': dateString
      }
      console.log(checkinLog);
    },
  }
})
