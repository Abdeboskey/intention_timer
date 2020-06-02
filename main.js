var activityButtons = document.querySelector(".activity-buttons");
var startActivityBtn = document.querySelector(".start-activity-button");
var startTimerButton = document.querySelector(".start-timer-button");
var timeInput = document.querySelector(".time-input"); // refactor???
var description = document.querySelector(".description-input");
var minutes = document.querySelector(".minutes-input");
var seconds = document.querySelector(".seconds-input");
var currentActivity;

startActivityBtn.addEventListener("click", startActivity); //revert back to startActivity
activityButtons.addEventListener("click", selectActivity);
startTimerButton.addEventListener("click", startTimer);
timeInput.addEventListener("keydown", noLetters);

function buttonSelect(button, image, category) {
  button.classList.remove("btn-default");
  button.classList.add(`${category}-selected`);
  image.src = `assets/${category}-active.svg`;
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

function startActivity(event) {
  event.preventDefault();
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
  } else {
    removeErrorMessage("category");
    return false;
  }
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
}

function removeErrorMessage(section) {
  document.querySelector(`.${section}-error`).classList.add("hidden");
}

function changeInputColor(section) {
  document.querySelector(`.${section}-input`).classList.add("input-error-color");
}

function defaultInputColor(section) {
  document.querySelector(`.${section}-input`).classList.remove("input-error-color");
}

function toggleElement(className1) {
  document.querySelector(`.${className1}`).classList.toggle("hidden");
}

function displayUserInput() {
  getDescription();
  getTime();
  getColor();
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
  //var startTimerButton = document.querySelector(".start-timer-button"); // made global
  if (currentActivity.category === "Study") {
    startTimerButton.classList.add("study-color");
  } else if (currentActivity.category === "Meditate") {
    startTimerButton.classList.add("meditate-color");
  } else if (currentActivity.category === "Exercise") {
    startTimerButton.classList.add("exercise-color");
  }
}

function getCategory(parent) {
  for (var i = 0; i < parent.children.length; i++) {
    if (!parent.children[i].classList.contains("btn-default")) {
      return parent.children[i].innerText;
    }
  }
  return "";
}

function selectActivity(event) {
  event.preventDefault();
  var studyButton = document.getElementById("study-button");
  var studyImage = document.querySelector(".study-img");
  var meditateButton = document.getElementById("meditate-button");
  var meditateImage = document.querySelector(".meditate-img");
  var exerciseButton = document.getElementById("exercise-button");
  var exerciseImage = document.querySelector(".exercise-img");

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

function startTimer(event) {
  event.preventDefault();
  currentActivity.countdown();
}
