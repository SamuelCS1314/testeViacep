var endereco = null;

function buscarCEP() {
    const cep = document.getElementById('CEP').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(dados => {
            if (dados.erro) {
                alert("CEP não encontrado!");
                return;
            }
            document.getElementById("logradouro").textContent = dados.logradouro;
            document.getElementById("bairro").textContent = dados.bairro;
            document.getElementById("localidade").textContent = dados.localidade;
            document.getElementById("estado").textContent = dados.estado;
            
            endereco = dados;
            console.log("Endereço carregado:", endereco);
        })
        .catch(err => console.error("Erro ao buscar CEP:", err));
}

function enviarForm() {
    const infoPessoal = {
        nomeCompleto: document.getElementById('nome').value,
        CPF: document.getElementById('CPF').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        CEP: document.getElementById('CEP').value,
        complemento: document.getElementById('complemento').value,
        unidade: document.getElementById('unidade').value
    }

    if (!endereco) {
        alert("Por favor, busque um CEP válido antes de enviar.");
        return;
    }

    fetch('/api/uploads/enderecos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(endereco)
    })
    .then(resposta => resposta.json().then(dados => ({ ok: resposta.ok, dados })))
    .then(({ ok, dados }) => {
        if (!ok) {
            alert(dados.erro || 'Não foi possível enviar. Tente Novamente.');
            return;
        }
        alert(dados.mensagem || 'Enviado com sucesso!');
    })
    .catch(err => {
        console.error('Erro no fetch:', err);
        alert('Erro ao conectar com o servidor.');
    });

    fetch('/api/uploads/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(infoPessoal)
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