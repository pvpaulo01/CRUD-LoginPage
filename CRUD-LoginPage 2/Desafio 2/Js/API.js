const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());

const professores = [];
let idCounter = 1; // Contador para gerar IDs únicos

// Listar todos os professores
app.get('/professores', (req, res) => {
   res.json(professores);

  
});

// Adicionar um novo professor
app.post('/professores', (req, res) => {
  const novoProfessor = {
    id: idCounter++, // Usar o valor atual do contador como ID e incrementar para o próximo
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    dataAdmissao: req.body.dataAdmissao,
    salario: req.body.salario,
  };

  professores.push(novoProfessor);
  res.status(201).json(novoProfessor);
});

// Obter um professor por ID
app.get('/professores/:id', (req, res) => {
  const id = req.params.id;
  const professor = professores.find(p => p.id === Number(id));

  if (professor) {
    res.json(professor);
  } else {
    res.status(404).json({ message: 'Professor não encontrado.' });
  }
});

// Atualizar um professor por ID
app.put('/professores/:id', (req, res) => {
  const id = req.params.id;
  const index = professores.findIndex(p => p.id === Number(id));

  if (index !== -1) {
    const professorAtualizado = {
      id: Number(id),
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      dataAdmissao: req.body.dataAdmissao,
      salario: req.body.salario,
    };

    professores[index] = professorAtualizado;
    res.json(professorAtualizado);
  } else {
    res.status(404).json({ message: 'Professor não encontrado.' });
  }
});

// Excluir um professor por ID
app.delete('/professores/:id', (req, res) => {
  const id = req.params.id;
  const index = professores.findIndex(p => p.id === Number(id));

  if (index !== -1) {
    professores.splice(index, 1);
    res.status(200).json({ message: 'Professor excluído com sucesso.' });
  } else {
    res.status(404).json({ message: 'Professor não encontrado.' });
  }
});

app.listen(port, () => {
  console.log(`A API está rodando em http://localhost:${port}`);
});

app.get('/professores', (req, res) => {
  const email = req.query.email; // Pega o email da query da URL
  const professoresEncontrados = professores.filter(p => p.email === email);
  
  if (professoresEncontrados.length > 0) {
    res.json(professoresEncontrados);
  } else {
    res.status(404).json({ message: 'Nenhum professor encontrado com o email fornecido.' });
  }
});