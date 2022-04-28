const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What is the name of the UTD mascot?",
        choice1: 'Bevo',
        choice2: 'Jared',
        choice3: 'Temoc',
        choice4: 'Betty',
        answer: 3,
    },
    {
        question:
            "What is the mascot?",
        choice1: "Longhorn",
        choice2: "Dog",
        choice3: "Comet",
        choice4: "Bear",
        answer: 3,
    },
    {
        question: "How many campus organizations does UTD have?",
        choice1: "100",
        choice2: "200",
        choice3: "300",
        choice4: "over 400",
        answer: 4,
    },
    {
        question: "How many fraternities and sororities does UTD have?",
        choice1: "15",
        choice2: "26",
        choice3: "30",
        choice4: "35",
        answer: 2,
    },
    {
        question: "What is the significance behind the name Temoc",
        choice1: "Temoc is Comet spelled backwards",
        choice2: "Temoc is the name of the founders dog",
        choice3: "Temoc is the name of the presidents dog",
        choice4: "Temoc is the name of the city that UTD is located in",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()