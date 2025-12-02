// finalPrint.js

// 1. PEGAR EMAIL (se não tiver email, manda pra login)
const email = localStorage.getItem("emailJogador");
if (!email) {
    alert("Você precisa estar logado para ver sua pontuação!");
    window.location.href = "../login/login.html";
}

// 2. PEGAR TEMPO FINAL
const tempoFinal = localStorage.getItem("tempoFinal");

// Se por algum motivo não tiver tempo salvo
if (!tempoFinal) {
    console.warn("Nenhum tempo encontrado.");
}

// 3. ENVIAR TEMPO PARA O BACKEND (SALVAR NO RANKING)
async function salvarPontuacao() {
    try {
        const resposta = await fetch("http://localhost:3333/ranking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                tempo: Number(tempoFinal)
            })
        });

        const data = await resposta.json();
        console.log("Pontuação salva:", data);
    } catch (erro) {
        console.error("Erro ao salvar pontuação:", erro);
    }
}

// Chama automaticamente ao entrar na página
salvarPontuacao();


// 4. OPCIONAL — MOSTRAR TEMPO NA TELA
const titulo = document.querySelector("h1");
if (titulo && tempoFinal) {
    titulo.innerText = `Fim de jogo – Seu tempo: ${tempoFinal}ms`;
}
