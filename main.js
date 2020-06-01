var activityButtons = document.querySelector(".activity-buttons");
var startActivityBtn = document.querySelector(".start-activity-button");
var timeInput = document.querySelector(".time-input");
var currentActivity;

startActivityBtn.addEventListener('click', startActivity);
activityButtons.addEventListener("click", selectActivity);
timeInput.addEventListener("keydown", noLetters);

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
  var startTimerButton = document.querySelector(".start-timer-button");
  if (currentActivity.category === "Study") {
    startTimerButton.classList.add("study-color");
  } else if (currentActivity.category === "Meditate") {
    startTimerButton.classList.add("meditate-color");
  } else if (currentActivity.category === "Exercise") {
    startTimerButton.classList.add("exercise-color");
  }
}

function startActivity(event) {
  event.preventDefault();
  makeNewActivity(event);
  toggleElement("new-activity-title", "new-activity-form");
  toggleElement("current-activity-title", "timer-display");
  displayUserInput();
}

function toggleElement(className1, className2) {
  document.querySelector(`.${className1}`).classList.toggle("hidden");
  document.querySelector(`.${className2}`).classList.toggle("hidden");
}

function makeNewActivity(event) {
  event.preventDefault();
  var category = getCategory(activityButtons);
  var description = document.querySelector(".description-input");
  var minutes = document.querySelector(".minutes-input");
  var seconds = document.querySelector(".seconds-input");

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
