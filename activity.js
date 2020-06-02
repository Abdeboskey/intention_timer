class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }

  countdown() {
    var mins = parseInt(this.minutes);
    var secs = parseInt(this.seconds);
    var totalSecs = (mins * 60) + secs;
    var displayMins = Math.floor(totalSecs / 60);
    var displaySecs = totalSecs % 60;
    var userMins = document.querySelector(".user-minutes");
    var userSecs = document.querySelector(".user-seconds");

    setInterval(function() {
      for (var i = totalSecs; i >= 0; totalSecs--) {
      userMins.innerText = ("0" + displayMins).slice(-2);
      userSecs.innerText = ("0" + displaySecs).slice(-2);
      console.log(totalSecs);
      }
    }, 1000)
  }

  markComplete() {
    this.completed = true;
  }

  saveToStorage() {
    pastActivities.push(currentActivity);
  }
}
