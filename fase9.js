const questions = [
    { question: "A relação entre o boi e o carrapato é de:", answers: [
        {id: 1, text: "Comensalismo", correct:false},
        {id: 2, text: "Inquilinismo", correct:false},
        {id: 3, text: "Parasitismo", correct:true},
        {id: 4, text: "Mutualismo", correct:false},
    ]},
    { question: "Qual dessas relações é interespecífica desarmônica?", answers: [
        {id: 1, text: "Mutualismo", correct:false},
        {id: 2, text: "Predatismo", correct:true},
        {id: 3, text: "Sociedade", correct:false},
        {id: 4, text: "Colônia", correct:false},
    ]},
    { question: "Uma sociedade é formada por", answers: [
        {id: 1, text: "Espécies diferentes vivendo juntas", correct:false},
        {id: 2, text: "Seres da mesma espécie dividindo tarefas", correct:true},
        {id: 3, text: "Seres que competem o mesmo espaço", correct:false},
        {id: 4, text: "Individuos vivendo isolados", correct:false},
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
            nextButton.onclick = () => window.location.href = "mapa10.html";
        } else {
            nextButton.innerText = "Voltar ao mapa";
            nextButton.onclick = () => window.location.href = "mapa9.html";
        }
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }
}

startQuiz();

const openBtn = document.getElementById("openPopup"); // botão da porta
const overlay = document.getElementById("popupOverlay"); // fundo escuro
const yesBtn = document.getElementById("yesBtn"); // botão "Sim"
const noBtn = document.getElementById("noBtn");   // botão "Não"

// Abrir pop-up
openBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
});

// Fechar pop-up no botão "Não"
noBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Redirecionar ao clicar em "Sim"
yesBtn.addEventListener("click", () => {
  window.location.href = "index.html"; // ajuste o link da sua página inicial
});

// Fechar clicando fora da caixa
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});
