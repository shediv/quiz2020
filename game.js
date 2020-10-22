// Load questions
var mythologyQuestions = [    
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "Who was the son of Bhima and Hidimba?",
      "correct_answer": "Ghatotkacha",
      "incorrect_answers": [
        "Jarasandha",
        "Barbarik",
        "Abhimanyu"
      ]
    },
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "Bali was killed by ______ .",
      "correct_answer": "Ram",
      "incorrect_answers": [
        "Ravana",
        "Hanuman",
        "Sugreev"
      ]
    },
    {
        "question": "For how many days was the Battle of Kurukshetra fought?",
        "correct_answer": "18",
        "incorrect_answers": [
          "11",
          "7",
          "24"
        ]
    },
    {
        "question": "For how many days was the Battle of Kurukshetra fought?",
        "correct_answer": "Ram",
        "incorrect_answers": [
          "Ravana",
          "Hanuman",
          "Sugreev"
        ]
    },
    {
        "question": "For how many days was the Battle of Kurukshetra fought?",
        "correct_answer": "Ram",
        "incorrect_answers": [
          "Ravana",
          "Hanuman",
          "Sugreev"
        ]
    },
    {
        "question": "For how many days was the Battle of Kurukshetra fought?",
        "correct_answer": "Ram",
        "incorrect_answers": [
          "Ravana",
          "Hanuman",
          "Sugreev"
        ]
    },
]

var historyQuestions = [   
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What machine element is located in the center of fidget spinners?",
      "correct_answer": "Bearings",
      "incorrect_answers": [
        "Axles",
        "Gears",
        "Belts"
      ]
    },
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "The drug cartel run by Pablo Escobar originated in which South American city?",
      "correct_answer": "Medell&iacute;n",
      "incorrect_answers": [
        "Bogot&aacute;",
        "Quito",
        "Cali"
      ]
    }
]

var politicsQuestions = [   
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What machine element is located in the center of fidget spinners?",
      "correct_answer": "Bearings",
      "incorrect_answers": [
        "Axles",
        "Gears",
        "Belts"
      ]
    },
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "The drug cartel run by Pablo Escobar originated in which South American city?",
      "correct_answer": "Medell&iacute;n",
      "incorrect_answers": [
        "Bogot&aacute;",
        "Quito",
        "Cali"
      ]
    }
]

var sportsQuestions = [   
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What machine element is located in the center of fidget spinners?",
      "correct_answer": "Bearings",
      "incorrect_answers": [
        "Axles",
        "Gears",
        "Belts"
      ]
    },
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "The drug cartel run by Pablo Escobar originated in which South American city?",
      "correct_answer": "Medell&iacute;n",
      "incorrect_answers": [
        "Bogot&aacute;",
        "Quito",
        "Cali"
      ]
    }
]

var whoiswhoQuestions = [   
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "What machine element is located in the center of fidget spinners?",
      "correct_answer": "Bearings",
      "incorrect_answers": [
        "Axles",
        "Gears",
        "Belts"
      ]
    },
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "The drug cartel run by Pablo Escobar originated in which South American city?",
      "correct_answer": "Medell&iacute;n",
      "incorrect_answers": [
        "Bogot&aacute;",
        "Quito",
        "Cali"
      ]
    }
]

const question = document.getElementById('question');
const loadQuestion = document.getElementById('load-question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

// Set questions based on type
let loadedQuestions;
if (window.location.search.split("=")[1] == "mythology") {
    loadedQuestions = mythologyQuestions;
} else if (window.location.search.split("=")[1] == "history") {
    loadedQuestions = historyQuestions;
} else if (window.location.search.split("=")[1] == "politics") {
    loadedQuestions = politicsQuestions;
} else if (window.location.search.split("=")[1] == "sports") {
    loadedQuestions = sportsQuestions;
}
else if (window.location.search.split("=")[1] == "who") {
    loadedQuestions = whoiswhoQuestions;
}

let questions = [];
let MAX_QUESTIONS = loadedQuestions.length;
questions = loadedQuestions.map((loadedQuestion) => {
    const formattedQuestion = {
        question: loadedQuestion.question,
    };

    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
    answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
    );

    answerChoices.forEach((choice, index) => {
        formattedQuestion['choice' + (index + 1)] = choice;
    });

    return formattedQuestion;
});

questionCounter = 0;
score = 0;
availableQuesions = [...questions];
loader.classList.add('hidden');

// startGame();

//CONSTANTS
const CORRECT_BONUS = 10;

getNewQuestion = () => {
    if (availableQuesions.length < 1 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        alert("End of questions");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    // progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

loadMyquestion = () => {
    game.classList.add('hidden');
    loader.classList.remove('hidden');
    loadQuestion.classList.add('hidden');
    setTimeout(() => {        
        getNewQuestion();
        game.classList.remove('hidden');
        loader.classList.add('hidden');
    }, 1000);
}

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            loadQuestion.classList.remove('hidden');
            game.classList.add('hidden');
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};