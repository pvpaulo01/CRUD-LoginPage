  // Função para exibir a mensagem com animação de escrever letra por letra
  function escreverLetraPorLetra(mensagem, tempoPorLetra) {
    var mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.innerHTML = ""; // Limpa o conteúdo da div

    var index = 0;
    var intervalId = setInterval(function() {
        if (index < mensagem.length) {
            mensagemDiv.innerHTML += mensagem.charAt(index); // Adiciona a próxima letra
            index++;
        } else {
            clearInterval(intervalId); // Interrompe o intervalo quando todas as letras foram escritas
            mensagemDiv.innerHTML += "&#129489;&#127998;&#8205;&#127891;"; // Adiciona o emoji ao final da frase

        }
    }, tempoPorLetra);
}

// Função para exibir a mensagem inicialmente
escreverLetraPorLetra("Bem vindo Professor(a) ", 100); // 100 milissegundos entre cada letra

// Chama a função a cada 2 segundos para repetir o efeito
setInterval(function() {
    escreverLetraPorLetra("Bem vindo Professor(a) ", 100); // 100 milissegundos entre cada letra
}, 10000); // 2000 milissegundos (2 segundos)

function fazerLogin(){
    var usuario = document.getElementById("email").value
    var senha = document.getElementById("pwd").value
    const url = `http://localhost:3000/professores?email=${email}`;

   
    if (usuario == "" || senha == ""){
        alert("Favor Preencha todos os Campos");
        window.location.reload();
    } else {

    

    const url = `http://localhost:3000/professores?email=${email}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const professor = data[0];
                if (professor.senha === senha) {
                    // Login bem-sucedido
                    window.location.href = "../html/Tabela.html" 
                    console.log("Login bem-sucedido!");
                    // Redirecionar ou realizar outras ações após o login
                } else {
                    alert("E-mail ou senha Incorreta!!.")
                    console.log("Senha incorreta.");
                    window.location.reload();
                }
            } 
        })
        .catch(error => {
            console.error("Ocorreu um erro na requisição: ", error);
        });
}
        
    }
     
    

   
