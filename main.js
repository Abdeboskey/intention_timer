var studyButton = document.getElementById("study-button"); //////// These are all from the selectActivity function
var studyImage = document.querySelector(".study-img"); //////////// as per Scott's suggestion
var meditateButton = document.getElementById("meditate-button"); //
var meditateImage = document.querySelector(".meditate-img"); //////
var exerciseButton = document.getElementById("exercise-button"); //
var exerciseImage = document.querySelector(".exercise-img"); //////
var activityButtons = document.querySelector(".activity-buttons");
var startActivityBtn = document.querySelector(".start-activity-button");
var startTimerButton = document.querySelector(".start-timer-button");
var timeInput = document.querySelector(".time-input"); // refactor???
var description = document.querySelector(".description-input");
var minutes = document.querySelector(".minutes-input");
var seconds = document.querySelector(".seconds-input");
var currentActivity;
var pastActivities = [];

startActivityBtn.addEventListener("click", startActivity); //revert back to startActivity
activityButtons.addEventListener("click", selectActivity);
// startTimerButton.addEventListener("click", startTimer); ---> put in startActivity()
timeInput.addEventListener("keydown", noLetters);
// do we want these so that error messages disappear when text is typed? I don't think they fully work yet...
// description.addEventListener("keydown", removeErrorMessage);
// minutes.addEventListener("keydown", removeErrorMessage);
// seconds.addEventListener("keydown", removeErrorMessage);

function selectActivity(event) {
  event.preventDefault();
  if (event.target.classList.contains("study")) {
    buttonSelect(studyButton, studyImage, "study");
    buttonDefault(meditateButton, meditateImage, "meditate");
    buttonDefault(exerciseButton, exerciseImage, "exercise");
  } else if (event.target.classList.contains("meditate")) {
    buttonSelect(meditateButton, meditateImage, "meditate");
    buttonDefault(studyButton, studyImage, "study");
    buttonDefault(exerciseButton, exerciseImage, "exercise");
  } else if (event.target.classList.contains("exercise")) {
    buttonSelect(exerciseButton, exerciseImage, "exercise");
    buttonDefault(studyButton, studyImage, "study");
    buttonDefault(meditateButton, meditateImage, "meditate");
  }
}

function buttonSelect(button, image, category) {
  button.classList.remove("btn-default");
  button.classList.add(`${category}-selected`);
  image.src = `assets/${category}-active.svg`;
  removeErrorMessage("category")
}

function buttonDefault(button, image, category) {
  button.classList.add("btn-default");
  button.classList.remove(`${category}-selected`);
  image.src = `assets/${category}.svg`;
}

function noLetters(event) {
  if ([69, 187, 188, 189, 190].includes(event.keyCode)) {
    event.preventDefault();
  }
}

function validateInputs() {
  validateInput(currentActivity.description, "description"); // had to do function for each otherwise it wouldn't display all of them
  validateInput(currentActivity.minutes, "minutes");
  validateInput(currentActivity.seconds, "seconds");
  validateCategory();
}

function checkInputs() {
  if (validateCategory() ||
      validateInput(currentActivity.description, "description") ||
      validateInput(currentActivity.minutes, "minutes") ||
      validateInput(currentActivity.seconds, "seconds")
    )
    {
    return false;
  }
  return true;
}

function validateCategory() {
  if (currentActivity.category === "") {
    displayErrorMessage("category");
    return true;
  } /* else {
    removeErrorMessage("category"); <----- Put this in buttonSelect() so error disappears when any button is selected.
    return false;
  } */
}

function validateInput(currentActivity, input){
  if (currentActivity === "") {
    displayErrorMessage(input);
    changeInputColor(input);
    return true;
  } else {
    removeErrorMessage(input);
    defaultInputColor(input);
    return false;
  }
}

function displayErrorMessage(section) {
  document.querySelector(`.${section}-error`).classList.remove("hidden");
  // document.querySelector(`.${section}-input`).classList.add("input-error-color"); // ?
}

function removeErrorMessage(section) {
  document.querySelector(`.${section}-error`).classList.add("hidden");
  // document.querySelector(`.${section}-input`).classList.remove("input-error-color"); // ?
}

function changeInputColor(section) {
  document.querySelector(`.${section}-input`).classList.add("input-error-color");
}
// Should we refactor by putting this ^ inside displayErrorMessage?

function defaultInputColor(section) {
  document.querySelector(`.${section}-input`).classList.remove("input-error-color");
}
// Same with this ^ and removeErrorMessage? Would clean up this setion AND the function above.
// Is it SRP, since both functions contribute to displaying/hiding the error message?
// For some reason that I can't remember right now, this ^ broke something when I tried to make this change.

function toggleElement(className1) {
  document.querySelector(`.${className1}`).classList.toggle("hidden");
}

function startActivity(event) {
  event.preventDefault();
  startTimerButton.addEventListener("click", startTimer);
  makeNewActivity(event);
  validateInputs();
  if (checkInputs()) {
    toggleElement("new-activity-title");
    toggleElement("new-activity-form");
    toggleElement("current-activity-title");
    toggleElement("timer-display");
    displayUserInput();
  }
}

function makeNewActivity() {
  var category = getCategory(activityButtons);
  currentActivity = new Activity(
    category.trim(),
    description.value.trim(),
    minutes.value.trim(),
    seconds.value.trim()
  );
}

function getCategory(parent) {
  for (var i = 0; i < parent.children.length; i++) {
    if (!parent.children[i].classList.contains("btn-default")) {
      return parent.children[i].innerText;
    }
  }
  return "";
}

function getDescription() {
  var userDescription = document.querySelector(".user-description");
  userDescription.innerText = currentActivity.description;
}

function getTime() {
  var userMinutes = document.querySelector(".user-minutes");
  var userSeconds = document.querySelector(".user-seconds");
  var dblDigitMinutes = ("0" + currentActivity.minutes).slice(-2);
  var dblDigitSeconds = ("0" + currentActivity.seconds).slice(-2);

  userMinutes.innerText = dblDigitMinutes;
  userSeconds.innerText = dblDigitSeconds;
}

function getColor() {
  if (currentActivity.category === "Study") {
    startTimerButton.classList.add("study-color");
  } else if (currentActivity.category === "Meditate") {
    startTimerButton.classList.add("meditate-color");
  } else if (currentActivity.category === "Exercise") {
    startTimerButton.classList.add("exercise-color");
  }
}

function displayUserInput() {
  getDescription();
  getTime();
  getColor();
}

function startTimer(event) {
  startTimerButton.removeEventListener("click", startTimer);
  var timerInterval = setInterval(function () {
    currentActivity.countdown()
    if (currentActivity.totalSecs <= 0) {
      clearInterval(timerInterval);
      currentActivity.markComplete();
    }
  }, 1000);
}
