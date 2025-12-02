async function cadastrar() {
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const confirmarSenha = document.querySelector("#confirmar_senha").value;

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  const resposta = await fetch("http://localhost:3333/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha })
  });

  const dados = await resposta.json();
  alert(dados.mensagem);

  if (dados.sucesso) {
    window.location.href = "../login/login.html";
  }
}
