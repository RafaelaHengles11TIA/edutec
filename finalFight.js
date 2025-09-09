const questions = [
    { question: "Qual é o principal fator que limita a fotossíntese em florestas tropicais úmidas?", answers: [
        {id: 1, text: "Isponibilidade de água", correct:false},
        {id: 2, text: "Intensidade luminosa", correct:false},
        {id: 3, text: "Disponibilidade de nutrientes no solo", correct:true},
        {id: 4, text: "Concentração de oxigênio", correct:false},
    ]},
    { question: "O conceito de capacidade de suporte em ecologia se refere a:", answers: [
        {id: 1, text: "A quantidade máxima de energia que pode circular em uma teia alimentar", correct:false},
        {id: 2, text: "O número máximo de indivíduos que um ecossistema pode sustentar sem se degradar", correct:true},
        {id: 3, text: "A taxa de natalidade necessária para equilibrar a mortalidade", correct:false},
        {id: 4, text: "O tempo de recuperação de um ecossistema após uma perturbação", correct:false},
    ]},
    { question: "O ciclo do fósforo difere do ciclo do nitrogênio porque:", answers: [
        {id: 1, text: "O fósforo não passa pela atmosfera de forma significativa", correct:true},
        {id: 2, text: "O fósforo depende de bactérias fixadoras para entrar no solo", correct:false},
        {id: 3, text: "O nitrogênio não se acumula em rochas", correct:false},
        {id: 4, text: "O fósforo não é reciclado na teia alimentar", correct:false},
    ]},

    { question: "Por que eu vejo medo nos seus olhos?", answers: [
        {id: 1, text: "...", correct:false},
        {id: 2, text: "...", correct:false},
        {id: 3, text: "...", correct:false},
        {id: 4, text: "...", correct:false},
    ]},
    { question: "Você é fraco.", answers: [
        {id: 1, text: "...", correct:false},
        {id: 2, text: "...", correct:false},
        {id: 3, text: "...", correct:false},
        {id: 4, text: "...", correct:false},
    ]},
    { question: "Seu fim chegou", answers: [
        {id: 1, text: "...", correct:false},
        {id: 2, text: "...", correct:false},
        {id: 3, text: "...", correct:false},
        {id: 4, text: "...", correct:false},
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
            nextButton.innerText = "Seu fim chegou";
            nextButton.onclick = () => window.location.href = "finalPrint.html";
        } else {
            nextButton.innerText = "Seu fim chegou";
            nextButton.onclick = () => window.location.href = "finalPrint.html";
        }
    } else {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }
}

startQuiz();
