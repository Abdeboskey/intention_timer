var studyButton = document.getElementById("study-button");
var studyImage = document.querySelector(".study-img");
var meditateButton = document.getElementById("meditate-button");
var meditateImage = document.querySelector(".meditate-img");
var exerciseButton = document.getElementById("exercise-button");
var exerciseImage = document.querySelector(".exercise-img");
var activityButtons = document.querySelector(".activity-buttons");
var startActivityBtn = document.querySelector(".start-activity-button");
var startTimerButton = document.querySelector(".start-timer-button");
var timeInput = document.querySelector(".time-input");
var description = document.querySelector(".description-input");
var minutes = document.querySelector(".minutes-input");
var seconds = document.querySelector(".seconds-input");
var createNewButton = document.querySelector(".create-new-button");
var logActivityBtn = document.querySelector(".log-activity-button")
var currentActivity;
var pastActivities = [];

window.onload = getFromStorage();
startActivityBtn.addEventListener("click", startActivity);
activityButtons.addEventListener("click", selectActivity);
timeInput.addEventListener("keydown", noLetters);
createNewButton.addEventListener("click", createNewActivity);
logActivityBtn.addEventListener("click", logActivity);

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
  validateInput(currentActivity.description, "description");
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

function toggleElement(className) {
  document.querySelector(`.${className}`).classList.toggle("hidden");
}

function hideElement(className) {
  document.querySelector(`.${className}`).classList.add("hidden");
}

function displayElement(className) {
  document.querySelector(`.${className}`).classList.remove("hidden");
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
  document.querySelector(".new-activity-form").reset();
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

function createCard() {
  var cardSection = document.querySelector(".card-section");
  cardSection.innerHTML = "";
  for (var i = 0; i < pastActivities.length; i++) {
    var activityCardHTML = `
    <section class="activity-card" id=${pastActivities[i].id}>
      <div class="card-text">
        <label class="category">${pastActivities[i].category}</label>
        <h4 class="time">${pastActivities[i].minutes} MIN ${pastActivities[i].seconds} SECONDS</h4>
        <p class="goal">${pastActivities[i].description}</p>
      </div>
      <div class="activity-color ${pastActivities[i].category.toLowerCase()}-card-color"></div>
    </section>
    `;
    cardSection.innerHTML += activityCardHTML;
  }
}

function displayLoggedActivities() {
  displayElement("card-section");
  hideElement("no-activities-message");
  createCard();
}

function displayCompletedActivity() {
  toggleElement("current-activity-title");
  toggleElement("completed-display");
  toggleElement("timer-display");
  toggleElement("completed-activity-title");
}

function logActivity() {
  pastActivities.push(currentActivity);
  displayLoggedActivities();
  displayCompletedActivity();
  currentActivity.saveToStorage();
}

function resetTimer() {
  startTimerButton.innerText = "START";
  hideElement("log-activity-button");
}

function getFromStorage() {
  var stringOfThePast = localStorage.getItem("pastActivities");
  var revivedActivities = JSON.parse(stringOfThePast);
  pastActivities = revivedActivities;

  if (pastActivities !== []) {
    displayLoggedActivities();
  }
}

function createNewActivity(event) {
  toggleElement("completed-display");
  toggleElement("completed-activity-title");
  toggleElement("new-activity-form");
  toggleElement("new-activity-title");
  allButtonsDefault();
  resetTimer();
}

function allButtonsDefault() {
  buttonDefault(studyButton, studyImage, "study");
  buttonDefault(exerciseButton, exerciseImage, "exercise");
  buttonDefault(meditateButton, meditateImage, "meditate");
}
