class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.totalSecs = ((parseInt(this.minutes)) * 60) + (parseInt(this.seconds));
    this.completed = false;
    this.id = Date.now();
  }

  countdown() {
    this.totalSecs--;
    var displayMins = Math.floor(this.totalSecs / 60);
    var displaySecs = this.totalSecs % 60;
    var userMins = document.querySelector(".user-minutes");
    var userSecs = document.querySelector(".user-seconds");
    userMins.innerText = `${("0" + displayMins).slice(-2)}`;
    userSecs.innerText = `${("0" + displaySecs).slice(-2)}`;
  }

  markComplete() {
    this.completed = true;
    startTimerButton.innerText = "COMPLETE!"
    toggleElement("log-activity-button");
  }

  saveToStorage() {
    //pastActivities.push(currentActivity);
    var stringOfThePast = JSON.stringify(pastActivities);
    localStorage.setItem("pastActivities", stringOfThePast);
  }
}
