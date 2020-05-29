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
    // handles activity timer
    // uses this.minutes and this.seconds
  }

  markComplete() {
    this.completed = true;
  }

  saveToStorage() {
    pastActivities.push(currentActivity);
  }
}
