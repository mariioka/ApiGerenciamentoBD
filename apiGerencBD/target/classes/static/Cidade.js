const tabelaCidades = document.querySelector("#tabelaCidades");
const tabelaFormularioCidades = document.querySelector("#tabelaFormularioCidades");
const corpoTabelaCidades = document.querySelector("#corpoTabelaCidades");
const paragrafoMensagemCidades = document.querySelector("#paragrafoMensagemCidades");
const txtNomeCid = document.querySelector('#txtNomeCid');
const txtEstado = document.querySelector("#txtEstado");
const txtPais = document.querySelector("#txtPais");
const txtPopulacao = document.querySelector("#txtPopulacao");
const txtIdCid = document.querySelector("#txtIdCid");

const btnNova = document.querySelector('#btnNova');
const btnSalvarCid = document.querySelector('#btnSalvarCid');
const btnApagarCid = document.querySelector('#btnApagarCid');
const btnCancelarCid = document.querySelector('#btnCancelarCid');
var criandoNovaCidade = false;

function inicializarCid() {
    criandoNovaCidade = false;
    paragrafoMensagemCidades.textContent =
        "Pressione o botão Nova ou selecione uma cidade da lista:";
    txtIdCid.value = "";
    txtNomeCid.value = '';
    txtEstado.value = "";
    txtPais.value = "";
    txtPopulacao.value = "";
    txtIdCid.disabled = true;
    txtNomeCid.disabled = true;
    txtEstado.disabled = true;
    txtPais.disabled = true;
    txtPopulacao.disabled = true;

    btnNova.disabled = false;
    btnSalvarCid.disabled = true;
    btnApagarCid.disabled = true;
    btnCancelarCid.disabled = true;

    tabelaFormularioCidades.style.display = "none";
    tabelaCidades.style.display = "inline";

    listarTodasCidades();
}

function listarTodasCidades() {
    const errorHandler = function (error) {
        paragrafoMensagemCidades.textContent =
            "Erro ao listar cidades (código " + error.message + ")";
    };
    asyncLerCids(preencherTabelaCid, errorHandler);
}

function preencherTabelaCid(cidades) {
    corpoTabelaCidades.innerHTML = "";
    var n = cidades.length;
    for (var i = 0; i < n; i++) {
        let p = cidades[i];
        let linha = corpoTabelaCidades.insertRow();
        let celulaIdCid = linha.insertCell();
        let celulaNomeCid = linha.insertCell();
        let celulaEstado = linha.insertCell();
        let celulaPais = linha.insertCell();
        let celulaPopulacao = linha.insertCell();

        let alink = document.createElement("a");
        alink.textContent = p.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () {
            selecionarCidade(p.id); };
        celulaIdCid.appendChild(alink);
        celulaNomeCid.textContent = p.nome;
        celulaEstado.textContent = p.estado;
        celulaPais.textContent = p.pais;
        celulaPopulacao.textContent = p.populacao;
    }
}

function selecionarCidade(id) {
    criandoNovaCidade = false;
    const errorHandler = function (error) {
        paragrafoMensagemCidades.textContent =
            "Erro ao selecionar cidade (código " + error.message + ")";
    };
    asyncLerCidById(id, preencherFormularioCid, errorHandler);
}

function preencherFormularioCid(cidade) {
    paragrafoMensagemCidades.textContent =
        "Altere e salve os dados da cidade, ou então apague o registro da cidade.";
    txtIdCid.value = cidade.id;
    txtNomeCid.value = cidade.nome;
    txtEstado.value = cidade.estado;
    txtPais.value = cidade.pais;
    txtPopulacao.value = cidade.populacao;

    txtIdCid.disabled = true;
    txtNomeCid.disabled = false;
    txtEstado.disabled = false;
    txtPais.disabled = false;
    txtPopulacao.disabled = false;

    btnNova.disabled = true;
    btnSalvarCid.disabled = false;
    btnApagarCid.disabled = false;
    btnCancelarCid.disabled = false;

    tabelaFormularioCidades.style.display = "inline";
    tabelaCidades.style.display = "none";
}

function novaCidade() {
    paragrafoMensagemCidades.textContent =
        "Preencha os dados da nova cidade...";
    criandoNovaCidade = true;

    txtIdCid.value = "";
    txtNomeCid.value = '';
    txtEstado.value = "";
    txtPais.value = "";
    txtPopulacao.value = "";

    txtIdCid.disabled = true;
    txtNomeCid.disabled = false;
    txtEstado.disabled = false;
    txtPais.disabled = false;
    txtPopulacao.disabled = false;

    btnNova.disabled = true;
    btnSalvarCid.disabled = false;
    btnApagarCid.disabled = true;
    btnCancelarCid.disabled = false;

    tabelaFormularioCidades.style.display = "inline";
    tabelaCidades.style.display = "none";
}

function salvarCidade() {
    if (criandoNovaCidade) {
        criarCidade();
    } else {
        alterarCidade();
    }
}

function criarCidade() {
    const dadosCidade = {
        'nome': txtNomeCid.value,
        'estado': txtEstado.value,
        'pais': txtPais.value,
        'populacao': txtPopulacao.value,
    };
    const errorHandler = function (error) {
        paragrafoMensagemCidades.textContent =
            "Erro ao criar nova cidade (código " + error.message + ")";
    };
    asyncCriarCid(dadosCidade, inicializarCid, errorHandler);
}

function alterarCidade() {
    const errorHandler = function (error) {
        paragrafoMensagemCidades.textContent =
            "Erro ao alterar cidade (código " + error.message + ")";
    };
    const dadosCidade = {
        'id': txtIdCid.value,
        'nome': txtNomeCid.value,
        'estado': txtEstado.value,
        'pais': txtPais.value,
        'populacao': txtPopulacao.value,
    };
    asyncAlterarCid(dadosCidade, inicializarCid, errorHandler);
}

function cancelarEdicaoCid() {
    inicializarCid();
}

function apagarCidade() {
    const id = txtIdCid.value;
    const errorHandler = function (error) {
        paragrafoMensagemCidades.textContent =
            "Erro ao apagar cidade (código " + error.message + ")";
    };
    asyncApagarCid(id, inicializarCid, errorHandler);
}

async function asyncCriarCid(dadosCidade, onSuccess, onError) {
    try {
        const response = await fetch('/api/cidades', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosCidade)
        });
        if (!response.ok) throw new Error(response.status);
        onSuccess();
    } catch (error) {
        onError(error);
    }
}

async function asyncAlterarCid(dadosCidade, onSuccess, onError) {
    try {
        const response = await fetch('/api/cidades/${dadosCidade.id}', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosCidade)
        });
        if (!response.ok) throw new Error(response.status);
        onSuccess();
    } catch (error) {
        onError(error);
    }
}

async function asyncApagarCid(id, onSuccess, onError) {
    try {
        const response = await fetch('/api/cidades/${id}', {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(response.status);
        onSuccess();
    } catch (error) {
        onError(error);
    }
}

async function asyncLerCids(onSuccess, onError) {
    try {
        const response = await fetch('/api/cidades');
        if (!response.ok) throw new Error(response.status);
        const cidades = await response.json();
        onSuccess(cidades);
    } catch (error) {
        onError(error);
    }
}

async function asyncLerCidById(id, onSuccess, onError) {
    try {
        const response = await fetch('/api/cidades/${id}');
        if (!response.ok) throw new Error(response.status);
        const cidade = await response.json();
        onSuccess(cidade);
    } catch (error) {
        onError(error);
    }
}

inicializarCid();
