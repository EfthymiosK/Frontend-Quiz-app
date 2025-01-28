const CategoryIcon = document.querySelectorAll(".categoryImage");
const category = document.querySelectorAll(".category-p");
const result = document.querySelector(".result");
playAgainBtn = document.querySelector(".play-again-btn");
const toggleBtn = document.querySelector(".toggle-btn");

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

toggleBtn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});

let data = [];
fetch("data.json")
  .then(res => {
    return res.json();
  })
  .then(loadedData => {
    console.log(loadedData);
    data = loadedData;
    gameEnd();
  })
  .catch(err => {
    console.error(err);
  });



function gameEnd () {
CategoryIcon.forEach(icon => {
    icon.src = data["quizzes"][localStorage.getItem("subject")]["icon"];
})

category.forEach(category => {category.innerText = data["quizzes"][localStorage.getItem("subject")]["title"];})  
result.innerText = localStorage.getItem("score")  

playAgainBtn.addEventListener("click", ()=> {
    window.location.assign("./index.html");
})
}

