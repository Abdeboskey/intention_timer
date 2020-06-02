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
    setInterval(function() {
      var timeDisplay = document.querySelector('.timer');
      var totalSeconds = (this.minutes * 60) + this.seconds;
      var activeMinutes = Math.floor((totalSeconds)/60) % 60;
      var activeSeconds = totalSeconds % 60;
      for (var i = total.seconds; i = 0; i--) {
        console.log()
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
