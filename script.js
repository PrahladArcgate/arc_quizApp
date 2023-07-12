const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
// array of objects that stores question.
const quiz = [
    {
        question: "1.What year was Javascript launched?",
        choices: ["1998", "1995", "1994", "Non of these"],
        answer: "1995"
    },
    {
        question: "2.What does HTML stand for?",
        choices: ["Hypertext Markup Language", " Hyperthext Markdown Language", "Hyperloop Machine Language", "const myFunction = () => {};"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "3.What does CSS stand for?",
        choices: ["C", "Python", "java", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "4.What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    },
    {
        question: "5.What are the features of JavaScript?",
        choices: ["Open Source", "Lightweight", "Non of these.", "platefrom-based applications"],
        answer: "Open Source"
    }
];
let currentQuestionIndex = 0;
let totalscore = 0;
let quizOver = false;
// Arrow Function for showing Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];   
    questionBox.textContent = questionDetails.question;
    choicesBox.textContent = "";
    console.log(choicesBox.textContent)
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }
}
// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
               totalscore++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        showScore();
    }
}
// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${totalscore} out of ${quiz.length}!`;
    displayAlert("Woo-Woo! you have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
}
// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
        }, 2000);
}
// random question throw.
const scrambleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}
// Start Quiz function
const startQuiz = () =>{
    scrambleQuestions();
}
// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});
function handleClick() {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Submit") {
        // console.log("Select your answer");
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
nextBtn.addEventListener('click', handleClick);
