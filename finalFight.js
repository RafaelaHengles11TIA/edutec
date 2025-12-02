// finalPrint.js

// --- CONFIGURAÇÃO ---
const RANKING_URL = "http://localhost:3333/salvar-tempo";
const BTN_ID = "btnPontuacao";
const TEMPO_KEY = "tempoFinal";
const EMAIL_KEY = "emailJogador";
const FLAG_KEY = "tempoEnviado"; // evita reenvio repetido

// Esconder botão imediatamente (caso esteja visível no HTML)
const btn = document.getElementById(BTN_ID);
if (btn) btn.style.display = "none";

// Se o botão existirá dentro do body com onclick, evitar que o clique no botão
// dispare o onclick do body (previne redirecionamento indesejado)
if (btn) {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    // o <a> já tem href para ranking, então não precisamos fazer mais nada aqui
  });
}

// Função que envia a pontuação para o backend
async function enviarTempoParaBackend(email, tempoFinal) {
  try {
    const res = await fetch(RANKING_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        tempoFinal: Number(tempoFinal)
      })
    });

    if (!res.ok) {
      console.error("Servidor retornou erro ao salvar tempo:", res.status);
      return false;
    }

    console.log("Tempo enviado com sucesso!");
    return true;
  } catch (err) {
    console.error("Erro ao enviar tempo:", err);
    return false;
  }
}

// Execução ao carregar a página
window.addEventListener("load", async () => {
  const email = localStorage.getItem(EMAIL_KEY);
  const tempoFinal = localStorage.getItem(TEMPO_KEY);
  const jaEnviado = localStorage.getItem(FLAG_KEY) === "true";

  // Se não estiver logado, manda pro login (proteção extra)
  if (!email) {
    alert("Você precisa estar logado para ver sua pontuação.");
    window.location.href = "../login/login.html"; // ajuste caso o caminho seja diferente
    return;
  }

  // Mostrar botão apenas após tentativa de envio (ou timeout)
  const mostrarBotao = () => {
    if (btn) btn.style.display = "inline-block";
  };

  // Se não existe tempo salvo, apenas mostra o botão e sai (não envia nada)
  if (!tempoFinal) {
    console.warn("Nenhum tempoFinal encontrado no localStorage.");
    // mostrar botão após curto delay para manter UX consistente
    setTimeout(mostrarBotao, 800);
    return;
  }

  // Se já enviou antes, só mostrar o botão e evitar reenvio
  if (jaEnviado) {
    console.log("Tempo já enviado anteriormente — não será reenviado.");
    mostrarBotao();
    return;
  }

  // Tenta enviar para o backend. Se falhar, ainda assim mostra o botão após 1s.
  const enviado = await enviarTempoParaBackend(email, tempoFinal);
  if (enviado) {
    // marca como enviado para evitar duplicatas
    localStorage.setItem(FLAG_KEY, "true");
    // opcional: remover o tempo do localStorage para limpar (comente se quiser manter)
    // localStorage.removeItem(TEMPO_KEY);
  } else {
    console.warn("Falha ao enviar tempo — o botão será mostrado para o usuário.");
  }

  // Mostrar botão (independente do resultado) — com pequena animação de UX
  setTimeout(mostrarBotao, 600);
});
