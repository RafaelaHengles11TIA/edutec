import express from "express";
import cors from "cors";
import fs from "fs";
import mysql from "mysql2"

const app = express();
app.use(cors());
app.use(express.json());

const port = 3333;
const userFile = "./usuarios.json";

// Garantir que o arquivo existe
if (!fs.existsSync(userFile)) {
  fs.writeFileSync(userFile, JSON.stringify([], null, 2));
}

// 🟦 CADASTRO (POST)
app.post("/cadastro", (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(userFile));

  const novoUsuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    melhorTempo: null // SEM TEMPO NO INÍCIO
  };

  usuarios.push(novoUsuario);
  fs.writeFileSync(userFile, JSON.stringify(usuarios, null, 2));

  res.json({ sucesso: true, mensagem: "Usuário cadastrado!" });
});

// 🟦 LOGIN (POST)
app.post("/login", (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(userFile));

  const usuario = usuarios.find(
    u => u.email === req.body.email && u.senha === req.body.senha
  );

  if (!usuario) {
    return res.status(401).json({ sucesso: false, mensagem: "Credenciais inválidas" });
  }

  res.json({ sucesso: true, mensagem: "Login realizado!", usuario });
});

// 🟦 SALVAR TEMPO FINAL (POST)
app.post("/salvar-tempo", (req, res) => {
  const { email, tempoFinal } = req.body;

  const usuarios = JSON.parse(fs.readFileSync(userFile));
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    return res.status(404).json({ sucesso: false, mensagem: "Usuário não encontrado" });
  }

  // Salvar apenas o MELHOR tempo
  if (usuario.melhorTempo === null || tempoFinal < usuario.melhorTempo) {
    usuario.melhorTempo = tempoFinal;
  }

  fs.writeFileSync(userFile, JSON.stringify(usuarios, null, 2));

  res.json({ sucesso: true, mensagem: "Tempo salvo!" });
});

// 🟦 RANKING (GET)
app.get("/ranking", (req, res) => {
  const usuarios = JSON.parse(fs.readFileSync(userFile));

  const ranking = usuarios
    .filter(u => u.melhorTempo !== null) // só quem jogou
    .sort((a, b) => a.melhorTempo - b.melhorTempo) // menor tempo = melhor
    .map((u, index) => ({
      posicao: index + 1,
      nome: u.nome,
      melhorTempo: u.melhorTempo
    }));

  res.json(ranking);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}!`);
});

const database = mysql.createPool ({
  host: "benserverplex.ddns.net",
  user: "alunos",
  password: "senhaAlunos",
  database: "web_02ma",
  connectionLimit: 10
})