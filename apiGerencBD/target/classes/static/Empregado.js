const tabelaEmpregados = document.querySelector("#tabelaEmpregados");
const tabelaFormularioEmpr = document.querySelector("#tabelaFormularioEmpr");
const corpoTabelaEmpregados = document.querySelector("#corpoTabelaEmpregados");
const paragrafoMensagemEmpregados = document.querySelector("#paragrafoMensagemEmpregados");
const txtNomeEmpr = document.querySelector('#txtNomeEmpr');
const txtCargo = document.querySelector("#txtCargo");
const txtSalario = document.querySelector("#txtSalario");
const txtIdEmpr = document.querySelector("#txtIdEmpr");

const btnNovo = document.querySelector('#btnNovo');
const btnSalvarEmpr = document.querySelector('#btnSalvarEmpr');
const btnApagarEmpr = document.querySelector('#btnApagarEmpr');
const btnCancelarEmpr = document.querySelector('#btnCancelarEmpr');
var criandoNovoEmpregado = false;


function inicializarEmpr() {
    criandoNovoEmpregado = false;
    paragrafoMensagemEmpregados.textContent =
        "Pressione o botão Novo ou selecione um empregado da lista:";
    txtIdEmpr.value = "";
    txtNomeEmpr.value = '';
    txtCargo.value = "";
    txtSalario.value = "";
    txtIdEmpr.disabled = true;
    txtNomeEmpr.disabled = true;
    txtCargo.disabled = true;
    txtSalario.disabled = true;

    btnNovo.disabled = false;
    btnSalvarEmpr.disabled = true;
    btnApagarEmpr.disabled = true;
    btnCancelarEmpr.disabled = true;

    tabelaFormularioEmpr.style.display = "none";
    tabelaEmpregados.style.display = "inline";

    listarTodosEmpregados();
}

function listarTodosEmpregados() {
    const errorHandler = function (error) {
        paragrafoMensagemEmpregados.textContent =
            "Erro ao listar empregados (código " + error.message + ")";
    };
    asyncLerEmprs(preencherTabelaEmpr, errorHandler);
}

function preencherTabelaEmpr(empregados) {
    corpoTabelaEmpregados.innerHTML = "";
    var n = empregados.length;
    for (var i = 0; i < n; i++) {
        let p = empregados[i];
        let linha = corpoTabelaEmpregados.insertRow();
        let celulaIdEmpr = linha.insertCell();
        let celulaNomeEmpr = linha.insertCell();
        let celulaCargo = linha.insertCell();
        let celulaSalario = linha.insertCell();

        let alink = document.createElement("a");
        alink.textContent = p.id;
        alink.href = "javascript:void(0)";
        alink.onclick = function () {
            selecionarEmpregado(p.id); };
        celulaIdEmpr.appendChild(alink);
        celulaNomeEmpr.textContent = p.nome;
        celulaCargo.textContent = p.cargo;
        celulaSalario.textContent = p.salario;
    }
}

function selecionarEmpregado(id) {
    criandoNovoEmpregado = false;
    const errorHandler = function (error) {
        paragrafoMensagemEmpregados.textContent =
            "Erro ao selecionar empregado (código " + error.message + ")";
    };
    asyncLerEmprById(id, preencherFormularioEmpr, errorHandler);
}

function preencherFormularioEmpr(empregado) {
    paragrafoMensagemEmpregados.textContent =
        "Altere e salve os dados do empregado, ou então apague o registro do empregado.";
    txtIdEmpr.value = empregado.id;
    txtNomeEmpr.value = empregado.nome;
    txtCargo.value = empregado.cargo;
    txtSalario.value = empregado.salario;

    txtIdEmpr.disabled = true;
    txtNomeEmpr.disabled = false;
    txtCargo.disabled = false;
    txtSalario.disabled = false;

    btnNovo.disabled = true;
    btnSalvarEmpr.disabled = false;
    btnApagarEmpr.disabled = false;
    btnCancelarEmpr.disabled = false;

    tabelaFormularioEmpr.style.display = "inline";
    tabelaEmpregados.style.display = "none";
}

function novoEmpregado() {
    paragrafoMensagemEmpregados.textContent =
        "Preencha os dados do novo empregado...";
    criandoNovoEmpregado = true;

    txtIdEmpr.value = "";
    txtNomeEmpr.value = '';
    txtCargo.value = "";
    txtSalario.value = "";

    txtIdEmpr.disabled = true;
    txtNomeEmpr.disabled = false;
    txtCargo.disabled = false;
    txtSalario.disabled = false;

    btnNovo.disabled = true;
    btnSalvarEmpr.disabled = false;
    btnApagarEmpr.disabled = true;
    btnCancelarEmpr.disabled = false;

    tabelaFormularioEmpr.style.display = "inline";
    tabelaEmpregados.style.display = "none";
}

function salvarEmpregado() {
    if (criandoNovoEmpregado) {
        criarEmpregado();
    } else {
        alterarEmpregado();
    }
}

function criarEmpregado() {
    const dadosEmpregado = {
        'nome': txtNomeEmpr.value,
        'cargo': txtCargo.value,
        'salario': txtSalario.value,
    };
    const errorHandler = function (error) {
        paragrafoMensagemEmpregados.textContent =
            "Erro ao criar novo empregado (código " + error.message + ")";
    };
    asyncCriarEmpr(dadosEmpregado, inicializarEmpr, errorHandler);
}

function alterarEmpregado() {
    const errorHandler = function (error) {
        paragrafoMensagemEmpregados.textContent =
            "Erro ao alterar empregado (código " + error.message + ")";
    };
    const dadosEmpregado = {
        'id': txtIdEmpr.value,
        'nome': txtNomeEmpr.value,
        'cargo': txtCargo.value,
        'salario': txtSalario.value,
    };
    asyncAlterarEmpr(dadosEmpregado, inicializarEmpr, errorHandler);
}

function cancelarEdicaoEmpr() {
    inicializarEmpr();
}

function apagarEmpregado() {
    const id = txtIdEmpr.value;
    const errorHandler = function (error) {
        paragrafoMensagemEmpregados.textContent =
            "Erro ao apagar empregado (código " + error.message + ")";
    };
    asyncApagarEmpr(id, inicializarEmpr, errorHandler);
}

async function asyncCriarEmpr(dadosEmpregado, onSuccess, onError) {
    try {
        const response = await fetch('/api/empregados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosEmpregado)
        });
        if (!response.ok) throw new Error(response.status);
        onSuccess();
    } catch (error) {
        onError(error);
    }
}

async function asyncAlterarEmpr(dadosEmpregado, onSuccess, onError) {
    try {
        const response = await fetch('/api/empregados/${dadosEmpregado.id}', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosEmpregado)
        });
        if (!response.ok) throw new Error(response.status);
        onSuccess();
    } catch (error) {
        onError(error);
    }
}

async function asyncApagarEmpr(id, onSuccess, onError) {
    try {
        const response = await fetch('/api/empregados/${id}', {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(response.status);
        onSuccess();
    } catch (error) {
        onError(error);
    }
}

async function asyncLerEmprs(onSuccess, onError) {
    try {
        const response = await fetch('/api/empregados');
        if (!response.ok) throw new Error(response.status);
        const empregados = await response.json();
        onSuccess(empregados);
    } catch (error) {
        onError(error);
    }
}

async function asyncLerEmprById(id, onSuccess, onError) {
    try {
        const response = await fetch('/api/empregados/${id}');
        if (!response.ok) throw new Error(response.status);
        const empregado = await response.json();
        onSuccess(empregado);
    } catch (error) {
        onError(error);
    }
}

inicializarEmpr();