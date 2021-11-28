var resultView = new Vue({
    el: '#app',
    data: {
      users: users["users"],
      currentUser: {},
      isLoggedIn: false,
      userStreak: 0,
      username: "",
      password: "",
      checkin_rating: 5,
      feels_entry: '',
      goals_entry: '',
      misc_entry: '',

    },
    methods: {
        updateCurrentUserInfo(username){
            this.currentUser = this.users[username];
            this.getUserStreak();
        },
        logUserIn(username, password){
            if(username in this.users){
                if(password === this.users[username]['password']){
                    isLoggedIn = true;
                    this.updateCurrentUserInfo(username);
                    console.log("successfully logged in");
                    console.log(this.currentUser);
                    document.getElementById("login").style.visibility = "hidden";
                    document.getElementById("prizes").style.visibility = "visible";
                }
                else{
                    alert("Invalid Password: Please try again");
                    document.getElementById("login").display.visibility = "visible";
                }
            }
            else{
                alert("Invalid username: Please try again.");
                document.getElementById("login").style.visibility = "visible";
            }



        },

        createUserAccount(name, username, password){
            users[username] = {"password": password,
            "name": name,
            "num_checkins" : 0,
            "checkin_streak": 0,
            "checkins": []
            }
            //redirect to login page
        },

        openPrizesDiv(){

        },

        getUserStreak(){
            this.userStreak =  this.currentUser['checkin_streak'];
        },
        
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
