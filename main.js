// var ageInput = document.getElementById("age")
//
// ageInput.addEventListener("keydown", function(e) {
//   // prevent: "e", "=", ",", "-", "."
//   if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
//     e.preventDefault();
//   }
// })  prevent e code for later

// var studyButton = document.querySelector(".study-button");
// var meditateButton = document.querySelector(".meditate-button");
// var exerciseButton = document.querySelector(".exercise-button");
//
// studyButton.addEventListener('click', changeStudyButton);
// meditateButton.addEventListener('click', changeMeditateButton);
// exerciseButton.addEventListener('click', changeExerciseButton);
//
//   event.preventDefault();
// function changeStudyButton(event) {
//   studyButton = event.target
//   studyButton.src = 'assets/study-active.svg';
//   studyButton.style.color = '#B3FD78';
//   studyButton.style.borderColor = '#B3FD78';
// }
//
// function changeMeditateButton(event) {
//   event.preventDefault();
//   meditateButton = event.target.closest(".meditate-button")
//   meditateButton.src = "assets/meditate-active.svg"
//   meditateButton.style.color = "#C278FD";
//   meditateButton.style.borderColor = "#C278FD";
// }
//
// function changeExerciseButton() {
//   event.preventDefault();
//   exerciseButton = event.target
//   exerciseButton.src = 'assets/exercise-active.svg';
//   exerciseButton.style.color = '#FD8078';
//   exerciseButton.style.borderColor = '#FD8078';
// }
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
    studyButton.classList.remove("btn-default"); // create incompassing function for all
    studyButton.classList.add("study-selected"); // lines in if staement
    studyImage.src = "assets/study-active.svg";
  } else if (event.target.id === "meditate-button") {
    meditateButton.classList.remove("btn-default"); // create incompassing function for all
    meditateButton.classList.add("meditate-selected"); // lines in if staement
    meditateImage.src = "assets/meditate-active.svg";
  } else if (event.target.id === "exercise-button") {
    exerciseButton.classList.remove("btn-default"); // create incompassing function for all
    exerciseButton.classList.add("exercise-selected"); // lines in if staement
    exerciseImage.src = "assets/exercise-active.svg";
  }
}
