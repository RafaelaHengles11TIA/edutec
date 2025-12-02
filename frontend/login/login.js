async function logar() {
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
  }

  const resposta = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
  });

  const dados = await resposta.json();

  if (!dados.sucesso) {
      alert("Email ou senha incorretos!");
      return;
  }

  localStorage.setItem("emailJogador", email);
  alert("Login realizado!");

  window.location.href = "../jogo/jogo1.html";
}
