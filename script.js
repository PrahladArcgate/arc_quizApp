const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".startBtn");
const prevBtn = document.querySelector(".backButton");
const quiz = [
  {
    question: "Q.What year was Javascript launched?",
    choices: ["1998", "1995", "1994", "Non of these"],
    answer: "1995",
  },
  {
    question: "Q.What does HTML stand for?",
    choices: [
      "Hypertext Markup Language",
      " Hyperthext Markdown Language",
      "Hyperloop Machine Language",
      "const myFunction = () => {};",
    ],
    answer: "Hypertext Markup Language",
  },
  {
    question: "Q.What does CSS stand for?",
    choices: ["C", "Python", "java", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "Q.What is the purpose of the this keyword in JavaScript?",
    choices: [
      "It refers to the current function.",
      "It refers to the current object.",
      "It refers to the parent object.",
      " It is used for comments.",
    ],
    answer: "It refers to the current object.",
  },
  {
    question: "Q.What are the features of JavaScript?",
    choices: [
      "Open Source",
      "Lightweight",
      "Non of these.",
      "platefrom-based applications",
    ],
    answer: "Open Source",
  },
];
let dataArr = [];
let currentQuestionIndex = 0;
let totalscore = 0;
let quizOver = false;
// input user and check email field.
function login() {
  var username = document.getElementById("User-name").value;
  var email = document.getElementById("email").value;
  const emailPattern = /^\S+@\S+\.\S+$/;
  const usernamePattern = /^[A-Za-z0-9]{8}$/; 
  if (!email.match(emailPattern)) {
    displayAlert("Please enter a valid email address.");
    return;
  }
  if (!username.match(usernamePattern)) {
    displayAlert("Username must be 8 characters.");
    return;
  }
  const existingUser = dataArr.find((user) => user.username === username && user.email === email);
// user validation email exiting check
  if (existingUser) {
    // displayAlert(`Welcome back, ${username}! Your score is ${existingUser.score}.`);
    newShowScore(existingUser.score, quiz.length);
    return false;
    console.log('asdg');
  }
  // Store data in local storage.
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("score", totalscore);
  localStorage.setItem("currentQuestionIndex",currentQuestionIndex) 
}
$(window).on("load", function () {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const userData = localStorage.getItem("userData");
  document.getElementById("username").innerText = username;  // check user login yes or no
  if (!username || !email) {
    $("#Login").modal("show");
    if (userData) {
      dataArr = JSON.parse(userData);
      }      
  }else {
      for (let i = 0; i < quiz.length; i++) {
      const questionans = "question" + i + "SelectedOptionIndex";     
      const selectedOptionIndex = localStorage.getItem(questionans);
      if (selectedOptionIndex !== null) {
        quiz[i].selectedOptionIndex = parseInt(selectedOptionIndex);
      }
    }
    showQuestions();
  }
});
const scrambleQuestions = () => {
  for (let i = quiz.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0; 
  showQuestions();
};
const showQuestions = () => {  
   const questionDetails = quiz[currentQuestionIndex];
  questionBox.textContent = questionDetails.question;
  choicesBox.textContent = "";
  if (currentQuestionIndex === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div");
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add("choice");
    choicesBox.appendChild(choiceDiv);
    if (i === questionDetails.selectedOptionIndex) {
      choiceDiv.classList.add("selected");
    }
    choiceDiv.addEventListener("click", () => {
      // Remove 'selected' class from all choices
      const allChoices = choicesBox.getElementsByClassName("choice");
      for (let j = 0; j < allChoices.length; j++) {
        allChoices[j].classList.remove("selected");
      }

      // Add 'selected' class to the clicked choice
      choiceDiv.classList.add("selected");   
      questionDetails.selectedOptionIndex = i;
      localStorage.setItem("question" + currentQuestionIndex + "SelectedOptionIndex", i);  //hold selectedoptions
    });
    reloadbtn.style.display = "none";
  }
  };
// Function to check answers
const checkAnswer = () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
    totalscore++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestions();
  } else {
    showScore();
    localStorage.setItem("score", totalscore);
  }
  localStorage.setItem("currentQuestionIndex", currentQuestionIndex)   
};
// back button function-----------------
const backQuestion = () => {
  currentQuestionIndex--;
  showQuestions();
};
prevBtn.addEventListener("click", backQuestion);
// disply exiting user score. 
const newShowScore = (totalscore, quizlen) => {
  console.log('Final result : ', totalscore);
  scoreCard.textContent = `You Scored ${totalscore} out of ${quizlen}!`;
  displayAlert("Woo-Woo! you have completed this quiz!");   
  if (dataArr.length >= 3) {       
    displayAlert("This Session limit is over. Please open new browser")   
  }
    tabledisplay();   
};
// Function to Show Alert---------------------
const displayAlert = (msg) => {
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};
function tabledisplay() {
  const tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  for (let i = dataArr.length - 1; i >= 0; i--) {
    const rowData = dataArr[i];
    const row = document.createElement("tr");
    const nametable = document.createElement("td");
    const emailrow = document.createElement("td");
    const scorerow = document.createElement("td");
    nametable.textContent = rowData.username;
    emailrow.textContent = rowData.email;
    scorerow.textContent = rowData.score;
    row.appendChild(nametable);
    row.appendChild(emailrow);
    row.appendChild(scorerow);
    tableBody.appendChild(row);
  }
}
function handleClick() {
  const selectedChoice = document.querySelector(".choice.selected");
  if (!selectedChoice && nextBtn.textContent === "Submit") {
    displayAlert("Select your answer");
    return;
  }
  if (quizOver) {
    nextBtn.textContent = "Submit";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    quizOver = false;
    score = 0;
    startQuiz();
  } else {
    checkAnswer();
  }
}
// Start Quiz function
const startQuiz = () => {
  score_name = document.getElementById('score_id').innerHTML
  if (score_name.trim() != "") {
    document.getElementById("backbtn").setAttribute("style", "display:none");
    document.getElementById("subbtn").setAttribute("style", "display:none");
    document.getElementsByClassName(".Btn").setAttribute("style","display:none");
  }  
  scrambleQuestions();
  var uname = localStorage.getItem("username");
  document.getElementById("username").innerText = uname; 
};
// Function to show score-------------------------
const showScore = () => {  
  document.getElementById("backbtn").setAttribute("style", "display:none");
  document.getElementById("subbtn").setAttribute("style", "display:none"); 
  questionBox.textContent = "";
  choicesBox.textContent = "";
  reloadbtn.style.display = "block";
  scoreCard.textContent = `You Scored ${totalscore} out of ${quiz.length}!`;
  displayAlert("Woo-Woo! you have completed this quiz!");
  dataArr.push({
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    score: totalscore,
  });  
  localStorage.setItem("userData", JSON.stringify(dataArr));  
  quizOver = true;
  console.log(dataArr);
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("score");
  localStorage.removeItem("currentQuestionIndex");
  localStorage.removeItem("questionDetails.selectedOptionIndex");
};
// Adding Event Listener to Start Button------------------------
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  container.style.display = "block";
  startQuiz();
});
nextBtn.addEventListener("click", handleClick);

