const questions = [
    { question: "Qual das alternativas é um exemplo de mutualismo?", answers: [
        {id: 1, text: "Um leão caçando uma zebra", correct:false},
        {id: 2, text: "Um pássaro comendo uma fruta", correct:false},
        {id: 3, text: "Cupins e seus protozoários do intestino", correct:true},
        {id: 4, text: "Coruja comendo rato", correct:false},
    ]},
    { question: "A relação onde um indivíduo se alimenta do outro é chamada de:", answers: [
        {id: 1, text: "Comensalismo", correct:false},
        {id: 2, text: "Predatismo", correct:true},
        {id: 3, text: "Mutualismo", correct:false},
        {id: 4, text: "Inquilinismo", correct:false},
    ]},
    { question: "No parasitismo, o parasita:", answers: [
        {id: 1, text: "Ajuda o hospedeiro a viver melhor", correct:false},
        {id: 2, text: "Se alimenta do hospedeiro, assim o beneficiando", correct:false},
        {id: 3, text: "Vive em harmonia com o hospedeiro", correct:false},
        {id: 4, text: "Prejudica o hospedeiro para sobreviver", correct:true},
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
            nextButton.onclick = () => window.location.href = "mapa8.html";
        } else {
            nextButton.innerText = "Voltar ao mapa";
            nextButton.onclick = () => window.location.href = "mapa7.html";
        }
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }
}

startQuiz();
