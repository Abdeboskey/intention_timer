
var activityButtons = document.querySelector(".activity-buttons");
var startActivityBtn = document.querySelector(".start-activity-button");
var timeInput = document.querySelector(".time-input");
var currentActivity;

startActivityBtn.addEventListener('click', makeNewActivity);
activityButtons.addEventListener("click", selectActivity);
timeInput.addEventListener("keydown", noLetters);

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
    studySelect(studyButton, studyImage);
    meditateDefault(meditateButton, meditateImage);
    exerciseDefault(exerciseButton, exerciseImage);
  } else if (event.target.classList.contains("meditate")) {
    meditateSelect(meditateButton, meditateImage);
    studyDefault(studyButton, studyImage);
    exerciseDefault(exerciseButton, exerciseImage);
  } else if (event.target.classList.contains("exercise")) {
    exerciseSelect(exerciseButton, exerciseImage);
    studyDefault(studyButton, studyImage);
    meditateDefault(meditateButton, meditateImage);
  }
}

function studySelect(button, image) {
  button.classList.remove("btn-default");
  button.classList.add("study-selected");
  image.src = "assets/study-active.svg";
}

function meditateSelect(button, image) {
  button.classList.remove("btn-default");
  button.classList.add("meditate-selected");
  image.src = "assets/meditate-active.svg";
}

function exerciseSelect(button, image) {
  button.classList.remove("btn-default");
  button.classList.add("exercise-selected");
  image.src = "assets/exercise-active.svg";
}

function studyDefault(button, image) {
  button.classList.add("btn-default");
  button.classList.remove("study-selected");
  image.src = "assets/study.svg";
}

function meditateDefault(button, image) {
  button.classList.add("btn-default");
  button.classList.remove("meditate-selected");
  image.src = "assets/meditate.svg";
}

function exerciseDefault(button, image) {
  button.classList.add("btn-default");
  button.classList.remove("exercise-selected");
  image.src = "assets/exercise.svg";
}

function noLetters(event) {
  if ([69, 187, 188, 189, 190].includes(event.keyCode)) {
    event.preventDefault();
  }
}
