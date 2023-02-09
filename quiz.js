
const quizData = [
    {
        question: "1. What is the best-selling video game console of all time that sold over 155 million consoles worldwide?",
        a: "Nintendo DS",
        b: "PlayStation 2",
        c: "Xbox 360",
        correct: "b",
    },
    {
        question: "2. What is the highest-grossing arcade game of all time?",
        a: "Street Fighter 2",
        b: "Donkey Kong",
        c: "Pac-Man",
        correct: "c",
    },
    {
        question: "3. Nicknamed King Koopa, who is the arch nemesis of Mario?",
        a: "Boo",
        b: "Bowser",
        c: "Piranha Plant",
        correct: "b",
    },
    {
        question: "4. When was the Nintendo Entertainment System released?",
        a: "1983",
        b: "1981",
        c: "1987",
        correct: "a",
    },
    {
        question: "5. What Mortal Kombat character has the power to control lightning?",
        a: "Raiden",
        b: "Sub-Zero",
        c: "Liu Kang",
        correct: "a",
    },
    {
        question: "6. What is the name of the video game character that is pink, round, and wears red shoes?",
        a: "Birdo",
        b: "Kirby",
        c: "Amy Rose",
        correct: "b",
    },
    {
        question: "7. What is the name of the popular purple creature that was a mascot for PlayStation?",
        a: "Polygon Man",
        b: "Kratos",
        c: "Spyro the Dragon",
        correct: "c",
    },
    {
        question: "8. What female video game character would eventually be portrayed by Angelina Jolie in a movie?",
        a: "Cortana",
        b: "Lara Crof",
        c: "Chell",
        correct: "b",
    },
    {
        question: "9. What was the original name of Mario?",
        a: "Middle-aged Man",
        b: "Mr. Video",
        c: "Jumpman",
        correct: "c",
    },
    {
        question: "10. Who is Sonic sidekick?",
        a: "Miles Tails Prower",
        b: "Manic The Hedgehog",
        c: "Sally Acorn",
        correct: "a",
    },
];
const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')

const submitBtn = document.getElementById('submit')
let currentQuiz = 0
let score = 0
loadQuiz()
function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c

}
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }
       currentQuiz++
       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {
           quiz.innerHTML =`
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>
           <h2> Points: ${score * 10 }</h2>
           <button><a href="homepage.html"/a>Go Back to Main Menu</button>
           `
       }
    }
})