
document.addEventListener("DOMContentLoaded", function() {
    // Referências aos elementos HTML
    var nome = document.getElementById("nomeuser");
    var email = document.getElementById("email");
    var senha = document.getElementById("pwd");
    var dtAdmissao = document.getElementById("date");
    var salario = document.getElementById("salario");
    var btnCadastro = document.getElementById("btn-cadastro");

// Função para verificar o campo de entrada e exibir alerta se estiver vazio
btnCadastro.addEventListener("click", function() {
    if (nome.value === "" || email.value === "" || senha.value === "" || dtAdmissao.value === "" || salario.value === "") {
        alert("Preencha todos os campos, por favor!");
    } else {
        const dataAdmissao = new Date(dtAdmissao.value);
        const novoProfessor = {
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            dataAdmissao: dataAdmissao,
            salario: salario.value
        };

        fetch('http://localhost:3000/professores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProfessor)
        })
        .then(response => response.json())
        .then(data => {
          const uniqueId = data.id; 
            alert("Novo professor cadastrado com Sucesso!!!!")
            window.location.href = '../html/Login.html'
            console.log('Novo professor cadastrado:', data);
            
        })
        .catch(error => {
            console.error('Erro ao cadastrar novo professor:', error);
        });
    }
});
});
// Consumindo a API LOCAL E atualizando a Tabela de Professores

const tableBody = document.querySelector('tbody');

fetch('http://localhost:3000/professores')
  .then(response => response.json())
  .then(data => {
    
    data.forEach(professor => {

      const row = tableBody.insertRow();
      const cellNome = row.insertCell(0);
      const cellEmail = row.insertCell(1);
      const celldtAdmissao = row.insertCell(2);
      const cellSalario = row.insertCell(3);
      const cellAcoes = row.insertCell(4);
   
      cellNome.textContent = professor.nome;
      cellEmail.textContent = professor.email;
      celldtAdmissao.textContent = professor.dataAdmissao;
      cellSalario.textContent = professor.salario;

      const dtAdmissao = new Date(professor.dataAdmissao);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      celldtAdmissao.textContent = dtAdmissao.toLocaleDateString('pt-BR', options);
      const salarioFormatado = parseFloat(professor.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      cellSalario.textContent = salarioFormatado;
     
    });
    
  })
     

