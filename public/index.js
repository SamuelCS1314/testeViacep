var endereco = null;

function buscarCEP(){
    const cep = document.getElementById('CEP').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
    .then(response => response.json())
    .then(dados => {
        document.getElementById("logradouro").textContent = dados.logradouro;
        document.getElementById("bairro").textContent = dados.bairro;
        document.getElementById("localidade").textContent = dados.localidade;
        document.getElementById("estado").textContent = dados.estado;
        endereco = dados;
    });
};


function enviarForm(){
    const infoPessoal = {
        nomeCompleto: document.getElementById('nome').value,
        CPF: document.getElementById('CPF').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        CEP: document.getElementById('CEP').value,
        complemento: document.getElementById('complemento').value,
        unidade: document.getElementById('unidade').value
    }

    fetch('api/uploads/usuarios', {
        method: POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringfy(infoPessoal)
    })
    .then(resposta => resposta.json().then(dados => ({ ok: resposta.ok, dados: dados})))
    .then(({ ok, dados})   => {
        if (!ok) {
            alert(dados.erro || 'Não foi possível enviar. Tente Novamente.');
            return;
        }
    })
    .catch(err => {
        console.error('Erro no fetch', err);
        alert('Erro ao conectar com o servidor.');
    });

    fetch('api/uploads/enderecos', {
        method: POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringfy(endereco)
    })
    .then(resposta => resposta.json().then(dados => ({ ok: resposta.ok, dados: dados})))
    .then(({ ok, dados})   => {
        if (!ok) {
            alert(dados.erro || 'Não foi possível enviar. Tente Novamente.');
            return;
        }
    })
    .catch(err => {
        console.error('Erro no fetch', err);
        alert('Erro ao conectar com o servidor.');
    });
}