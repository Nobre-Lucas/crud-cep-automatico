async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPJSON = await consultaCEP.json();

        var cidade = document.getElementById("cidade");
        var logradouro = document.getElementById("endereco");
        var estado = document.getElementById("estado");

        if (consultaCEPJSON.erro) {
            throw Error("CEP não existente!");
        }

        cidade.value = consultaCEPJSON.localidade;
        logradouro.value = consultaCEPJSON.logradouro
        estado.value = consultaCEPJSON.uf;

        console.log(consultaCEPJSON);
        return consultaCEPJSON;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

var cepCliente = document.getElementById("cep");
cepCliente.addEventListener("focusout", () => buscaEndereco(cepCliente.value));