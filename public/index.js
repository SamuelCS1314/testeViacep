function buscarCEP(){
    const cep = document.getElementById('CEP').value;
    const endereco = {};
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
    .then(response => response.json())
    .then(dados => {
        console.log(dados)
        document.getElementById("logradouro").textContent = dados.logradouro;
        document.getElementById("bairro").textContent = dados.bairro;
        document.getElementById("localidade").textContent = dados.localidade;
        document.getElementById("estado").textContent = dados.estado;
    });
};