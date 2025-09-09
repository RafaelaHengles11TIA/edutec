const questions = [
    { question: "O que é um bioma?", answers: [
        {id: 1, text: "Regiões que compartilham ecosistemas semelhantes", correct:true},
        {id: 2, text: "Regiões qe compartilham pessoas de etnias semelhantes", correct:false},
        {id: 3, text: "Regiões que compartilham o mesmo time de futebol de varzea", correct:false},
        {id: 4, text: "Regiões que compartilham unicamente clima semelhante", correct:false},
    ]},
    { question: "Qual desses Biomas não é encontrado no Brasil", answers: [
        {id: 1, text: "Caatinga", correct:false},
        {id: 2, text: "Mata Atlântica", correct:false},
        {id: 3, text: "Pampas", correct:false},
        {id: 4, text: "Mata Baiana", correct:true},
    ]},
    { question: "Qual desses biomas tem predominância no continente africano?", answers: [
        {id: 1, text: "Savana", correct:true},
        {id: 2, text: "Amazônia", correct:false},
        {id: 3, text: "Tundra", correct:false},
        {id: 4, text: "Caatinga", correct:false},
    ]}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) score++;

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") button.classList.add("correct");
        else button.classList.add("incorrect");
    });

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = "block";
        if (score === questions.length) {
            nextButton.innerText = "Avançar";
            nextButton.onclick = () => window.location.href = "mapa3.html";
        } else {
            nextButton.innerText = "Voltar ao mapa";
            nextButton.onclick = () => window.location.href = "mapa2.html";
        }
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }
}

startQuiz();
