
document.addEventListener("DOMContentLoaded", function() {
  // Referências aos elementos HTML
  var nome = document.getElementById("nomeuser");
  var email = document.getElementById("email");
  var senha = document.getElementById("pwd");
  var dtAdmissao = document.getElementById("dtAdmissao");
  var salario = document.getElementById("salario");
  var botao = document.getElementById("btn-salvar");

  // Função para verificar o campo de entrada e exibir alerta se estiver vazio
  botao.addEventListener("click", function() {
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
              window.location.reload(true);
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
      
      
      // Botoes de ação
      const editarBtn = document.createElement('button');
      editarBtn.textContent = 'Editar';
      editarBtn.classList.add('btn-dark','btn','btneditar');
      editarBtn.addEventListener('click', () => {
        const novoNome = prompt('Editar Nome', professor.nome);
        if (novoNome == null ){
          return;
        }
        const novoEmail = prompt('Editar Email:', professor.email);
        if (novoEmail == null ){
          return;
        }
        const novaDataAdmissao = prompt('Editar Data de Admissão:', professor.dataAdmissao);
        if (novaDataAdmissao == null ){
          return;
        }
        const novoSalario = prompt('Editar Salário:', professor.salario);
        if (novoSalario == null ){
          return;
        }
    
        
        const dadosAtualizados = {
          nome: novoNome,
          email: novoEmail,
          dataAdmissao: novaDataAdmissao,
          salario: novoSalario
        };
      
      
        // Lógica para atualizar os dados do professor no servidor usando o método PUT
        fetch(`http://localhost:3000/professores/${professor.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosAtualizados)
        })
        .then(response => response.json())
        .then(updatedProfessor => {
          // Atualize a linha da tabela com os dados atualizados
          cellNome.textContent = updatedProfessor.nome;
          cellEmail.textContent = updatedProfessor.email;
          celldtAdmissao.textContent = new Date(updatedProfessor.dataAdmissao).toLocaleDateString('pt-BR', options);
          cellSalario.textContent = parseFloat(updatedProfessor.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      
          console.log('Professor atualizado:', updatedProfessor);
        })
        .catch(error => {
          console.error('Erro ao atualizar professor:', error);
        });


        
      });

      const excluirBtn = document.createElement('button');
      excluirBtn.textContent = 'Excluir';
      excluirBtn.classList.add('btn-danger','btn','btnexcluir');
      excluirBtn.addEventListener('click', () => {
      const senhaAdmin = prompt('Digite a Senha de Administrador para Excluir');
      const senhaCorreta = 'admin123';
      if (senhaAdmin == null){
        alert("Exclusão Cancelada.")
        return;

      }
      if (senhaCorreta == senhaAdmin) {


    // Lógica para excluir o professor do servidor usando o método DELETE
      fetch(`http://localhost:3000/professores/${professor.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 204) {
        // Remova a linha da tabela após a exclusão bem-sucedida
        row.remove();
        alert("Professor Excluido Com sucesso!!")
        
      } else {
        
        console.error('Erro ao excluir professor:', response.statusText);
      }
      
    })
    .catch(error => {
      
      console.error('Erro ao excluir professor:', error);
    });
    
  }
  else {
      alert("Senha de Adminstrador Incorreta!");
  }
  // Atualizando a Pagina após a exlusão
  window.location.reload(true);
});
    cellAcoes.appendChild(editarBtn);
    cellAcoes.appendChild(excluirBtn);


    });
  })
      .catch(error => {
      console.error('Erro ao buscar dados da API:', error);
  });



  

  