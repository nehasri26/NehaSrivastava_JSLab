class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.questionIndex = 0;
    }
    getQuestionByIndex() {
      return this.questions[this.questionIndex];
    }
    checkForCorrectAnswer(answer) {
      let question = this.getQuestionByIndex();
      if (question.isCorrectAnswer(answer)) {
        this.score++;
      }
      this.questionIndex++;
    }
    isEnded() {
      return this.questionIndex === this.questions.length;
    }
  }
  
  class Question {
    constructor(questionText, choices, answer) {
      this.text = questionText;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(selectedChoice) {
      if(this.answer === selectedChoice){
        return true;
      }
      else {
        return false;
      }
    }
  }
  
  let questions = [
    new Question(
      "To select all div elements of a html file inside a javascript code snippet,what can we use?",
      ["getElementById method", "getElementsByClassName method", "getElementsByTagName method", "All of the above"],
      "getElementsByTagName method"
    ),
    new Question(
      "We can call a function by a delay of some seconds in js using which method?",
      ["delay()", "setTimeout()", "Both A and B", "None of the above"],
      "setTimeout()"
    ),
    new Question(
      "Which object of a DOM node will be used to add or remove css classes on a html element using JS code?",
      ["listClass", "changeCss", "classList", "None of the above"],
      "classList"
    ),
    new Question(
      "Which of the following keywords is used to check if a function is an object or not?",
      ["isObject", "Instanceof", "typeof", "None of the above"],
      "Instanceof"
    ),
    new Question(
      "For a given array,which is the correct option to get the length of array arr",
      ["arr.length", "arr.len()", "len(arr)", "None of the above"],
      "arr.length"
    ),
    new Question(
      "Strings in Javascript are",
      ["Immutable", "Mutable", "Both", "None of the above"],
      "Immutable"
    )  
  ];
  
  let quiz = new Quiz(questions);
  
  function loadQuestions() {
    if (quiz.isEnded()) {
      showFinalScores();
      return;
    }
  
    let currentQuestion = quiz.getQuestionByIndex();
    let questionElement = document.getElementById("question"); 
    questionElement.innerHTML = currentQuestion.text;
  
    let displayedChoices = currentQuestion.choices;
    for (let i = 0; i < displayedChoices.length; i++) {
      let eachChoiceElement = document.getElementById("choice" + i); 
      eachChoiceElement.innerHTML = displayedChoices[i];
  
      let eachChoiceBtn = document.getElementById("btn" + i); 
      eachChoiceBtn.onclick = function () {
        quiz.checkForCorrectAnswer(displayedChoices[i]); 
        loadQuestions();
      };
    }
  
    showProgress();
  }
  
  
  loadQuestions();
  
  function showFinalScores() {
    let resPercent = (quiz.score / questions.length) * 100;
    let scoresHTML = `
          <h1>Results... </h1>
          <h2 id='score'>Your Score is :- ${quiz.score} </h2>
          <h2> And overall percentage is :- ${resPercent}% </h2>
          <h1>Congratulations!!!</h1>
      `;
    let quizCanvas = document.getElementById("quiz");
    quizCanvas.innerHTML = scoresHTML;
  }
  
  function showProgress() {
    let questionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Question ${questionNumber} of ${quiz.questions.length}`;
  }
  