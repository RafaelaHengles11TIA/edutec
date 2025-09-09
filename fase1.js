const questions = [
    { question: "Qual desses biomas é conhecido pelo frio", answers: [
        {id: 1, text: "Tundra", correct:true},
        {id: 2, text: "Pradaria", correct:false},
        {id: 3, text: "Metrópole", correct:false},
        {id: 4, text: "Canavial", correct:false},
    ]},
    { question: "Qual desses biomas é conhecido por ser inóspito (Difícil de viver)", answers: [
        {id: 1, text: "Deserto", correct:true},
        {id: 2, text: "Mata Atlântica", correct:false},
        {id: 3, text: "Amazônia", correct:false},
        {id: 4, text: "Biomas Úmidos", correct:false},
    ]},
    { question: "Qual desses não é um bioma:", answers: [
        {id: 1, text: "Pampas", correct:false},
        {id: 2, text: "Amazônia", correct:false},
        {id: 3, text: "Cerrado", correct:false},
        {id: 4, text: "Cepulcral", correct:true},
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
            nextButton.onclick = () => window.location.href = "mapa2.html";
        } else {
            nextButton.innerText = "Voltar ao mapa";
            nextButton.onclick = () => window.location.href = "mapa1.html";
        }
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }
}

startQuiz();
