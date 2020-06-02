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
    setInterval(function() {  // keeps going forever if no
      var timeDisplay = document.querySelector('.timer');
      var totalSeconds = (this.minutes * 60) + this.seconds;
      var activeMinutes = Math.floor((totalSeconds) / 60) % 60;
      var activeSeconds = totalSeconds % 60;
      //totalSeconds--;
      ; console.log('hello');
    }, 1000)
  }

  markComplete() {
    this.completed = true;
  }

  saveToStorage() {
    pastActivities.push(currentActivity);
  }
}
