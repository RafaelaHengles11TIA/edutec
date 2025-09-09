const questions = [
    { question: "Qual dessas relações é harmônica intraespecífica?", answers: [
        {id: 1, text: "Sociedade de formigas", correct:true},
        {id: 2, text: "Briga de cão e gato", correct:false},
        {id: 3, text: "Bacteria no intestino humano", correct:false},
        {id: 4, text: "Lobo caçando raposa", correct:false},
    ]},
    { question: "Inquilinismo é quando:", answers: [
        {id: 1, text: "Os dois individuos se beneficiam", correct:false},
        {id: 2, text: "Um se beneficia e o outro é prejudicado", correct:true},
        {id: 3, text: "Um se beneficia e outro não é afetado", correct:false},
        {id: 4, text: "Ambos se prejudicam", correct:false},
    ]},
    { question: "A relação comensalismo é quando:", answers: [
        {id: 1, text: "Ambos se beneficiam", correct:false},
        {id: 2, text: "Um se beneficia e outro é prejudicado", correct:false},
        {id: 3, text: "Ambos se prejudicam", correct:false},
        {id: 4, text: "Um se beneficia e outro não é afetado", correct:true},
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
            nextButton.onclick = () => window.location.href = "mapa9.html";
        } else {
            nextButton.innerText = "Voltar ao mapa";
            nextButton.onclick = () => window.location.href = "mapa8.html";
        }
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }
}

startQuiz();
