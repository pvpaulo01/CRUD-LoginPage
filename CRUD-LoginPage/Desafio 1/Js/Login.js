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