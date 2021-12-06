var resultView = new Vue({
    el: '#app',
    data: {
      users: users["users"],
      currentUser: {},
      checkins: [],
      isLoggedIn: false,
      userStreak: 0,
      username: "",
      password: "",
      new_user_name: "",
      new_user_email: "",
      new_user_password: "",
      checkin_rating: 5,
      feels_entry: '',
      goals_entry: '',
      misc_entry: '',
      alreadyCheckedIn: false,
      user_num_checkins: [0,0,0,0,0,0,0,0,0,0,0,0],
      totalStars: [0,0,0,0,0,0,0,0,0,0,0,0],
      avgStars: [0,0,0,0,0,0,0,0,0,0,0,0],
      indexArray: [0,1,2,3,4,5,6,7,8,9,10,11],
      months: ["December 2021", "November 2021", "October 2021", "September 2021", "August 2021", "July 2021", "June 2021", "May 2021", "April 2021", "March 2021", "February 2021", "January 2021"]
    },
    methods: {
        updateCurrentUserInfo(username){
            this.currentUser = this.users[username];
            this.checkins = this.currentUser['checkins'];
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
                    document.getElementById("checkin").style.visibility = "visible";
                    document.getElementById("navbar").style.visibility = "visible";
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

        showPrizes(){
            document.getElementById('prizes').style.visibility = "visible";
            document.getElementById('checkin').style.visibility = "hidden";
            document.getElementById('diary').style.visibility = "hidden";
            document.getElementById('success').style.visibility = "hidden";
            document.getElementById('signup').style.visibility = "hidden";
        },

        showCheckin(){
            document.getElementById('prizes').style.visibility = "hidden";
            document.getElementById('checkin').style.visibility = "visible";
            document.getElementById('diary').style.visibility = "hidden";
            document.getElementById('success').style.visibility = "hidden";
            document.getElementById('signup').style.visibility = "hidden";
            document.getElementById("navbar").style.visibility = "visible";
        },
        showSignup(){
            document.getElementById('prizes').style.visibility = "hidden";
            document.getElementById('checkin').style.visibility = "hidden";
            document.getElementById('diary').style.visibility = "hidden";
            document.getElementById('success').style.visibility = "hidden";
            document.getElementById('login').style.visibility = "hidden";
            document.getElementById('signup').style.visibility = "visible";
        },
        showLogin(){
            document.getElementById('prizes').style.visibility = "hidden";
            document.getElementById('checkin').style.visibility = "hidden";
            document.getElementById('diary').style.visibility = "hidden";
            document.getElementById('success').style.visibility = "hidden";
            document.getElementById('login').style.visibility = "visible";
            document.getElementById('signup').style.visibility = "hidden";
        },
        showDiary(){
            document.getElementById('prizes').style.visibility = "hidden";
            document.getElementById('checkin').style.visibility = "hidden";
            document.getElementById('diary').style.visibility = "visible";
            document.getElementById('success').style.visibility = "hidden";
            document.getElementById('signup').style.visibility = "hidden";
        },
        showSuccess(){
            document.getElementById('prizes').style.visibility = "hidden";
            document.getElementById('checkin').style.visibility = "hidden";
            document.getElementById('diary').style.visibility = "hidden";
            document.getElementById('success').style.visibility = "visible";
            document.getElementById('signup').style.visibility = "hidden";
        },

        getUserStreak(){
            this.userStreak =  this.currentUser['checkin_streak'];
        },

        submitCheckin: function() {
          date = new Date();
          dateString = date.toDateString()
          dateString = dateString.slice(4)
          dateMonth = date.getMonth() + 1;
          checkinLog = {
            'checkin_rating': this.checkin_rating,
            'feels': this.feels_entry,
            'goals': this.goals_entry,
            'misc': this.misc_entry,
            'checkin_date': dateString,
            'month': dateMonth
          }
          ourCheckins = this.currentUser['num_checkins']
          ourCheckins[(dateMonth-1)]++;
          this.user_num_checkins[(dateMonth-1)]++;
          if(!this.alreadyCheckedIn){
            this.currentUser['checkin_streak']++;
            this.alreadyCheckedIn = true;
          }
          

          var month = dateMonth;
          console.log(month)
          totalArr = this.totalStars;
          console.log(totalArr)
          totalArr[(dateMonth-1)] += this.checkin_rating;

          this.currentUser['checkins'].push(checkinLog);

          this.getUserStreak();
          this.calcAverage();
          this.showSuccess();
        },

        calcAverage() {
                  for (let i = 0; i < 12; i++) {
                    if(this.user_num_checkins[i] != 0) {
                      this.avgStars[i] = this.totalStars[i]/this.user_num_checkins[i];
                    }
                  }
                  console.log(this.totalStars);
                  console.log(this.user_num_checkins);
                  console.log(this.avgStars);
        },

        calculatePrizeWidth(){

                if(this.userStreak < 5){
                    document.getElementById('prizebar').style.width = (this.userStreak*100/5).toString()+"%";
                }
                else if(this.userStreak < 10){
                    document.getElementById('prizebar').style.width = (this.userStreak*100/10).toString()+"%";
                }
                else if (this.userStreak < 25){
                    document.getElementById('prizebar').style.width = (this.userStreak*100/30).toString()+"%";
                }
        },

        registerNewUser(){
            var name = this.new_user_name;
            console.log(name);
            if(this.new_user_name in this.users){
                alert("Username already in use. Please select another.");
            }
            else{
                    this.users[name] = {
                        "password": this.new_user_password,
                        "email": this.new_user_email,
                        "num_checkins" : 0,
                        "checkin_streak": 0,
                        "checkins": []
                    }
                this.updateCurrentUserInfo(name);
            }
        },

        logUserOut(){
            this.showLogin();

            this.currentUser = {}
            this.checkins = []
            this.isLoggedIn = false
            this.userStreak = 0
            this.username = ""
            this.password = ""
            this.new_user_name = ""
            this.new_user_email = ""
            this.new_user_password = ""
            this.checkin_rating = 5
            this.feels_entry = ''
            this.goals_entry = ''
            this.misc_entry = ''
            this.user_num_checkins = [0,0,0,0,0,0,0,0,0,0,0,0]
            this.totalStars = [0,0,0,0,0,0,0,0,0,0,0,0]
            this.avgStars = [0,0,0,0,0,0,0,0,0,0,0,0]
            this.alreadyCheckedIn = false;

        }
    }

  })
