// var minutesInput = document.querySelector(".minutes-input");
// minutesInput.addEventListener("keydown", noLetters);
// function noLetters(e) {
//   // prevent: "e", "=", ",", "-", "."
//   if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
//     e.preventDefault();
//   }
// }) // prevent e code for later

var studyButtons = document.querySelector(".activity-buttons");

studyButtons.addEventListener("click", selectActivity);

function selectActivity(event) {
  event.preventDefault();
  var studyButton = document.getElementById("study-button");
  var studyImage = document.querySelector(".study-img");
  var meditateButton = document.getElementById("meditate-button");
  var meditateImage = document.querySelector(".meditate-img");
  var exerciseButton = document.getElementById("exercise-button");
  var exerciseImage = document.querySelector(".exercise-img");

  if (event.target.id === "study-button") {
    studySelect(studyButton, studyImage);
    meditateDefault(meditateButton, meditateImage);
    exerciseDefault(exerciseButton, exerciseImage);
  } else if (event.target.id === "meditate-button") {
    meditateSelect(meditateButton, meditateImage);
    studyDefault(studyButton, studyImage);
    exerciseDefault(exerciseButton, exerciseImage);
  } else if (event.target.id === "exercise-button") {
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
