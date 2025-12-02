const button = document.querySelector("header button");
const menu = document.querySelector("header ul");

// Abrir/fechar menu ao clicar no botão
button.addEventListener("click", (e) => {
  e.stopPropagation(); 
  menu.classList.toggle("show");
});

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && e.target !== button) {
    menu.classList.remove("show");
  }
});

async function carregarRanking() {
  try {
    const resposta = await fetch("http://localhost:3333/ranking");
    const ranking = await resposta.json();

    const lista = document.querySelector("#ranking");

    lista.innerHTML = ranking
      .map(r => `
        <li>
          <span>👤 ${r.posicao}. ${r.nome}</span>
          <span>${r.melhorTempo}s</span>
        </li>
      `)
      .join("");
  } catch (erro) {
    console.error("Erro ao carregar ranking:", erro);
  }
}

carregarRanking();
