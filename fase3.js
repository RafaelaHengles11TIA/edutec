const questions = [
    { question: "Qual desses não é um ciclo bioquímico", answers: [
        {id: 1, text: "Ciclo do carbono", correct:false},
        {id: 2, text: "Ciclo do fósforo", correct:false},
        {id: 3, text: "Ciclo do carbono", correct:false},
        {id: 4, text: "Ciclo da vida", correct:true},
    ]},
    { question: "Qual desses fatores afeta os ciclos bioquicos", answers: [
        {id: 1, text: "Posição dos planetas", correct:false},
        {id: 2, text: "Emissão de gáses", correct:true},
        {id: 3, text: "Consumo de batatas doces em regiões deserticas", correct:false},
        {id: 4, text: "Termino da Virginia e Zé Felipe", correct:false},
    ]},
    { question: "Qual desses fatores não afeta o ciclo do carbono", answers: [
        {id: 1, text: "Emissão de gases", correct:false},
        {id: 2, text: "Respiração animal", correct:false},
        {id: 3, text: "Queima de combustíveis fósseis", correct:false},
        {id: 4, text: "Minifundios de consumo próprio", correct:true},
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
            nextButton.onclick = () => window.location.href = "mapa4.html";
        } else {
            nextButton.innerText = "Voltar ao mapa";
            nextButton.onclick = () => window.location.href = "mapa3.html";
        }
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }
}

startQuiz();
