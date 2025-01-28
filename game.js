const CategoryIcon = document.querySelector(".categoryImage");
const category = document.querySelector(".category-p");
const numberOfQuestion = document.querySelector(".question-number");
const question = document.querySelector(".question-p");
const progressBar = document.querySelector(".bar");
const answersContainer = Array.from(document.querySelectorAll(".answer"));
const answers = Array.from(document.querySelectorAll(".answer-p"));
const submitBtn = document.querySelector(".submit-btn");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const errorMessage = document.querySelector(".error-message");
const answerLetterContainers = document.querySelectorAll(".answer-letter-container");
const answerLetters = document.querySelectorAll(".answer-letter");
const answerImages = document.querySelectorAll(".answer-image");
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
    startGame();
  })
  .catch(err => {
    console.error(err);
  });
  let chosenAnswer;
  let availableChoices;
  let rightAnswer;
  let availableQuestions;
  let availableQuestion;
function startGame() {
    //set icon and title
    CategoryIcon.src = data["quizzes"][localStorage.getItem("subject")]["icon"];
    category.innerText = data["quizzes"][localStorage.getItem("subject")]["title"];

    questionCounter = 1;
    score = 0;
    
  
    //set available questions
    GetQuestion();

// submit button function
submitBtn.addEventListener("click", ()=> {
  if (!chosenAnswer) {
    errorMessage.style.display = "flex";
  }

  else {
    
    //errorMessage.style.display = "none";
    console.log("question counter:"+questionCounter)
  
  submitBtn.style.display = "none";
  nextQuestionBtn.style.display = "flex";
  
  //right or wrong answer logic
  console.log(availableChoices);
  if (availableChoices[Number(chosenAnswer)]===rightAnswer) {
    document.querySelector(`.answer[data-number="${Number(chosenAnswer)}"]`).style.border = "2px solid green";
    document.querySelector(`.answer-letter-container[data-container="${Number(chosenAnswer)}"]`).style.backgroundColor = "green";
    document.querySelector(`.answer-letter[data-letter="${Number(chosenAnswer)}"]`).style.color = "white"
    document.getElementById(`${Number(chosenAnswer)}`).src = "./assets/images/icon-correct.svg"
    score +=1;
    console.log("score is :"+score);
    
    }

  else {
    document.querySelector(`.answer[data-number="${Number(chosenAnswer)}"]`).style.border = "2px solid red";
    document.querySelector(`.answer-letter-container[data-container="${Number(chosenAnswer)}"]`).style.backgroundColor = "red";
    document.querySelector(`.answer-letter[data-letter="${Number(chosenAnswer)}"]`).style.color = "white"
    document.getElementById(`${Number(chosenAnswer)}`).src = "./assets/images/icon-error.svg"
    //depict icon for right choice
    availableChoices.forEach(choice => {
      if (choice===rightAnswer) {
        indexOfRightAnswer = availableChoices.indexOf(choice);
        document.getElementById(`${Number(indexOfRightAnswer)}`).src = "./assets/images/icon-correct.svg"
      }})
  
  }

  

}})


nextQuestionBtn.addEventListener("click", ()=>{
  questionCounter++;
  submitBtn.style.display = "flex";
  nextQuestionBtn.style.display = "none";
  clearAnswers();
  chosenAnswer = undefined;
  console.log(chosenAnswer);
  GetQuestion();
});






}

function GetQuestion () {
  if (questionCounter>10) {
    localStorage.setItem("score", score);
    window.location.assign("./end.html");
  }

  availableQuestions = [...data["quizzes"][localStorage.getItem("subject")]["questions"]]
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    //define question
    availableQuestion = availableQuestions[questionIndex]["question"]
    console.log(availableQuestion)
  //define available choices
  availableChoices = [...availableQuestions[questionIndex]["options"]];
  console.log(availableChoices);
  //define available answer
  rightAnswer = availableQuestions[questionIndex]["answer"];
  console.log(rightAnswer);
  //add number of question and progression bar
  numberOfQuestion.innerText = `question ${questionCounter} of 10`;
    progressBar.style.width = `${(questionCounter / 10) * 100}%`;

  //depict question
  question.innerText = availableQuestion;
  // depict available choices
  for (let i = 0; i < answers.length; i++) {
    answers[i].innerText = availableQuestions[questionIndex]["options"][i]
  }
  //
  
  
  //add hover and click effect on choices
  answersContainer.forEach(answer => {
    answer.addEventListener("mouseover", ()=> {
      answer.firstElementChild.classList.remove("inactive");
      answer.firstElementChild.classList.add("active");
      
    })
    
    answer.addEventListener("mouseout", ()=> {
      answer.firstElementChild.classList.remove("active");
      answer.firstElementChild.classList.add("inactive");
      
    })
    answer.addEventListener("click", ()=> {
      errorMessage.style.display = "none";
    answer.firstElementChild.style.backgroundColor = "#A729F5";
    answer.firstElementChild.style.color = "white";
    answer.style.border = "2px solid #A729F5";
    chosenAnswer = answer.dataset["number"];
    console.log("chose answer is :" + chosenAnswer);
    //disable not chosen choices
    answersContainer.forEach(answer => {
      if (answer.dataset["number"]!=chosenAnswer) {
        answer.setAttribute("disabled", true)
      }})
})
})



}


function clearAnswers () {
  console.log("clear answers")
  
  answersContainer.forEach(answer => {
      answer.removeAttribute("disabled", true);
      answer.removeAttribute("style");
    })

  answerLetterContainers.forEach(e => {
    e.removeAttribute("style");
  })

  answerLetters.forEach(e => {
    e.removeAttribute("style");
  })

  answerImages.forEach(e => {
    e.src = "";
  })
}


