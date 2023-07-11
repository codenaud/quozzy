/* 
    --> Project Information 
  ----------------------
    - Open Trivia Database
    - Web: [URL](https://opentdb.com/api_config.php)
    - Documentation: [DOC](https://opentdb.com/api_config.php)
    - Generate API: APIUrl = https://opentdb.com/api.php?amount=10&type=multiple
    - You can check de JSON Data with vscode extension --> [Thunder Client]
    */

/* --> DOM header elements */

switchThemeIcon.onclick = function () {
  // DOM Navigation Icon
  const navIcon = document.querySelector('#navIcon');
  // console.log(navIcon); --> check if you get the correct selection

  // DOM Theme Switcher between Dark Mode & Light Mode
  const switchThemeIcon = document.querySelector('#switchThemeIcon');
  // console.log(switchThemeIcon); --> check if you get the correct selection

  document.body.classList.toggle('dark-theme');
  if (document.body.classList.contains('dark-theme')) {
    switchThemeIcon.src = '../img/switch-dark-mode.svg'; // change switch icon image
    navIcon.src = '../img/nav-icon-dark.svg'; // change nav icon image
  } else {
    switchThemeIcon.src = '../img/switch-light-mode.svg';
    navIcon.src = '../img/nav-icon-light.svg';
  }
};

// ----------------------------------

const question = document.querySelector('#question'); // DOM Question
const options = document.querySelector('.quiz-options'); // DOM Options
const category = document.querySelector('#quizCategory'); // DOM Category
const difficulty = document.querySelector('#quizDifficulty'); // DOM Difficulty

/* --> Working with the API  */

// APIUrl = https://opentdb.com/api.php?amount=10

async function loadQuestion() {
  const APIUrl = 'https://opentdb.com/api.php?amount=1&type=multiple'; // url of the open trivia api
  const response = await fetch(APIUrl); // Get DATA from API
  // console.log(response);
  const data = await response.json(); // Transform DATA to JSON
  // console.log(data.results[0]); // Get access to property 'results' on the 'Response' Array
  showQuestion(data.results[0]);
}

// Declaramos las variable correctAnswer e incorrectAnswer a nivel global porque luego las necesitaremos para hacer el checkAnswers  mostrar un mensaje u otro.

let correctAnswer;
let incorrectAnswers;

function showQuestion(data) {
  correctAnswer = data.correct_answer;
  // --> GAME CHEAT [see all the correct answers on the browser console]
  // console.log(correctAnswer); // <-- uncomment this line
  incorrectAnswers = data.incorrect_answers;
  let randomOptions = [];

  randomOptions.push(...incorrectAnswers);
  randomOptions.push(correctAnswer);
  randomOptions.sort(() => Math.random() - 0.5); // Randomize items

  question.innerHTML = data.question; // we use innerHTML and not textContent for JSON (&quot;)
  category.textContent = data.category; // add category to DOM category

  setDifficulty(data.difficulty); // Set difficulty based on data.difficulty

  // Clean all the elements inside the <ul>
  options.innerHTML = '';

  // Create <li> elements for each option and add them to the <ul> element
  for (const option of randomOptions) {
    const li = document.createElement('li');
    li.innerHTML = option;
    options.appendChild(li);
  }

  // Assign click event to answer options
  const answerOptions = document.querySelectorAll('.quiz-options li');
  answerOptions.forEach((option) => {
    option.addEventListener('click', selectAnswer);
  });
}

function setDifficulty(quizDifficulty) {
  difficulty.className = ''; // Reset difficulty classes

  if (quizDifficulty === 'easy') {
    difficulty.classList.add('easy');
  } else if (quizDifficulty === 'medium') {
    difficulty.classList.add('medium');
  } else if (quizDifficulty === 'hard') {
    difficulty.classList.add('hard');
  }

  difficulty.textContent = quizDifficulty; // Set difficulty text
}

function selectAnswer(event) {
  // Remove the .selected class from the previously selected answer
  const previousSelected = document.querySelector('.quiz-options li.selected');
  if (previousSelected) {
    previousSelected.classList.remove('selected');
  }

  // Add the .selected class to the currently selected answer
  const selected = event.target;
  selected.classList.add('selected');
}
// Check Answers
let questionCount = 1;
let correctCount = 0;
let incorrectCount = 0;
let selectedAnswer = null;

function checkAnswers() {
  selectedAnswer = document.querySelector('.quiz-options li.selected');

  if (selectedAnswer) {
    const answerText = selectedAnswer.textContent;

    if (answerText === correctAnswer) {
      correctCount++;
      selectedAnswer.classList.add('correct-message-answer');
    } else {
      incorrectCount++;
      selectedAnswer.classList.add('incorrect-message-answer');
    }

    selectedAnswer.classList.remove('selected');
    selectedAnswer.removeEventListener('click', selectAnswer);

    setTimeout(() => {
      const answerOptions = document.querySelectorAll('.quiz-options li');
      answerOptions.forEach((option) => {
        option.classList.remove('correct-message-answer', 'incorrect-message-answer');
      });

      if (questionCount === 10) {
        // --> change by 10
        const queryString = `?correctCount=${correctCount}&incorrectCount=${incorrectCount}`;
        window.location.href = `quiz-results.html${queryString}`;
      } else {
        questionCount++;
        loadQuestion();
      }

      const totalQuestionsElement = document.getElementById('totalQuestions');
      totalQuestionsElement.textContent = questionCount;
    }, 1500);
  } else {
    const infoMessage = document.querySelector('.info-message');
    infoMessage.classList.remove('hidden');

    setTimeout(() => {
      infoMessage.classList.add('hidden');
    }, 1500);
  }
}

const btnCheck = document.getElementById('btnCheck');
btnCheck.addEventListener('click', checkAnswers);

loadQuestion();
