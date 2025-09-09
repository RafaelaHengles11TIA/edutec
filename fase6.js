const questions = [
    { question: "A sucessão ecológica contempla mudanças em:", answers: [
        {id: 1, text: "Comunidades de um ecosistema", correct:true},
        {id: 2, text: "Gerações organicas", correct:false},
        {id: 3, text: "Índices de inflação", correct:false},
        {id: 4, text: "Taxa Selic", correct:false},
    ]},
    { question: "A sucessão ecológica é um processo:", answers: [
        {id: 1, text: "Gradual", correct:true},
        {id: 2, text: "Instantâneo", correct:false},
        {id: 3, text: "Termo-nuclear", correct:false},
        {id: 4, text: "Inventado", correct:false},
    ]},
    { question: "O apse da sucessão ecológica é:", answers: [
        {id: 1, text: "A extinsão", correct:false},
        {id: 2, text: "A comunidade estável", correct:true},
        {id: 3, text: "O fim de semana", correct:false},
        {id: 4, text: "A reprodução das espécies", correct:false},
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
            nextButton.onclick = () => window.location.href = "mapa7.html";
        } else {
            nextButton.innerText = "Voltar ao mapa";
            nextButton.onclick = () => window.location.href = "mapa6.html";
        }
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }
}

startQuiz();
