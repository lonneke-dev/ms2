// Instructions modal
var modal = document.getElementById('instructionsModal');
var button = document.getElementById('instructions');
var span = document.getElementsByClassName('close')[0];

button.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Sources of audio-files

var source1 = document.getElementsByClassName("question-audio").src= "audio-files/test2.mp3";
var source2 = document.getElementsByClassName("question-audio").src= "audio-files/test1.mp3";
var source3 = document.getElementsByClassName("question-audio").src= "audio-files/test3.mp3";
var source4 = document.getElementsByClassName("question-audio").src= "audio-files/test4.mp3";

// Quiz array
const quiz = [
    {
        song: source1,
        options:["Can't help falling in love - Elvis Presley", "madonna", "dman"],
        answer: 0
    },
    {
        song: source2,
        options:["a", "b", "c","d"],
        answer: 1
    },        
    {
        song: source3,
        options:["a", "b", "c","d"],
        answer: 2
    }, 
    {
        song: source4,
        options:["a", "b", "c","d"],
        answer: 3
    }

];

const questionNumber = document.querySelector(".question-number");
const questionAudio = document.querySelector(".question-audio");
const optionContainer = document.querySelector(".option-container");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

// Question counter
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

// Randomquestion
function getNewQuestion() {
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionAudio.src = currentQuestion.song;

    const index1 = availableQuestions.indexOf(questionIndex);

    availableQuestions.splice(index1,1);
// Options and random options
    const optionlen = currentQuestion.options.length
    
    for(let i=0; i<optionlen; i++) {
        availableOptions.push(i)
    }
    optionContainer.innerHTML = " ";
    let animationDelay = 0.15;

    for(let i=0; i<optionlen; i++) {
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.15;
        option.id = optionIndex;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++
}

// Get the results of the current question
function getResult(element) {
    const id = parseInt(element.id);
    
    if(id === currentQuestion.answer) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }

    unclickableOptions();
}

// make sure the user can't change the answer
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered")
    }
}

function next() {
    if(questionCounter === quiz.length) {
        console.log("quiz over");
    } else {
        getNewQuestion();
    }
}

window.onload = function() {
    setAvailableQuestions();
    getNewQuestion();
}