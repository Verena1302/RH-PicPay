import { getFuncionarios, getFuncionarioPorId, excluirFuncionario, atualizarStatus } from "./api.js";
import { textoStatus, formatarSalario } from "./utils.js";
import { iniciarEdicao } from "./formularios.js";

async function carregarFuncionarios(termoBusca) {
    try {
        const lista = await getFuncionarios(termoBusca);
        mostrarTabela(lista);
        mostrarIndicadores(lista);
    } catch (erro) {
        alert("Não foi possível carregar os candidatos. O backend está rodando?");
    }
}

function mostrarIndicadores(lista) {
    let total = lista.length;
    let emAnalise = 0;
    let aprovados = 0;
    let reprovados = 0;
    let contratados = 0;

    for (let i = 0; i < lista.length; i++) {
        const status = lista[i].status;
        if (status === "EM_ANALISE") emAnalise++;
        if (status === "APROVADO") aprovados++;
        if (status === "REPROVADO") reprovados++;
        if (status === "CONTRATADO") contratados++;
    }

    document.getElementById("total-candidatos").textContent = total;
    document.getElementById("em-analise").textContent = emAnalise;
    document.getElementById("aprovados").textContent = aprovados;
    document.getElementById("reprovados").textContent = reprovados;
    document.getElementById("contratados").textContent = contratados;
}

function mostrarTabela(lista) {
    const corpoTabela = document.getElementById("tabela-candidatos");
    corpoTabela.innerHTML = "";

    if (lista.length === 0) {
        corpoTabela.innerHTML = "<tr><td colspan='5'>Nenhum candidato encontrado.</td></tr>";
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        const f = lista[i];

        const linha = document.createElement("tr");
        linha.innerHTML =
            "<td>" + f.id + "</td>" +
            "<td>" + f.nome + "<br><small>" + (f.email || "") + "</small></td>" +
            "<td>" + (f.cargo || "-") + "</td>" +
            "<td>" +
                "<select class='select-status' data-id='" + f.id + "'>" +
                    "<option value='EM_ANALISE'" + (f.status === "EM_ANALISE" ? " selected" : "") + ">Em Análise</option>" +
                    "<option value='APROVADO'" + (f.status === "APROVADO" ? " selected" : "") + ">Aprovado</option>" +
                    "<option value='REPROVADO'" + (f.status === "REPROVADO" ? " selected" : "") + ">Reprovado</option>" +
                    "<option value='CONTRATADO'" + (f.status === "CONTRATADO" ? " selected" : "") + ">Contratado</option>" +
                "</select>" +
            "</td>" +
            "<td>" +
                "<button type='button' class='btn-action btn-view' data-acao='ver' data-id='" + f.id + "'>Ver</button> " +
                "<button type='button' class='btn-action btn-put' data-acao='editar' data-id='" + f.id + "'>Editar</button> " +
                "<button type='button' class='btn-action btn-delete' data-acao='excluir' data-id='" + f.id + "'>Excluir</button>" +
            "</td>";

        corpoTabela.appendChild(linha);
    }
}

function iniciarTabela() {
    const corpoTabela = document.getElementById("tabela-candidatos");

    corpoTabela.addEventListener("click", function (evento) {
        const botao = evento.target.closest("button[data-acao]");
        if (!botao) {
            return;
        }

        const id = Number(botao.dataset.id);
        const acao = botao.dataset.acao;

        if (acao === "excluir") {
            excluir(id);
        } else if (acao === "editar") {
            editar(id);
        } else if (acao === "ver") {
            verDetalhes(id);
        }
    });

    corpoTabela.addEventListener("change", function (evento) {
        const select = evento.target.closest(".select-status");
        if (!select) {
            return;
        }
        mudarStatus(Number(select.dataset.id), select.value);
    });
}

async function excluir(id) {
    const confirmar = confirm("Deseja realmente excluir o candidato #" + id + "?");
    if (!confirmar) {
        return;
    }

    try {
        await excluirFuncionario(id);
        alert("Candidato excluído com sucesso!");
        carregarFuncionarios();
    } catch (erro) {
        alert(erro.message);
    }
}

async function editar(id) {
    try {
        const funcionario = await getFuncionarioPorId(id);
        iniciarEdicao(funcionario);
    } catch (erro) {
        alert(erro.message);
    }
}
async function verDetalhes(id) {
    try {
        const f = await getFuncionarioPorId(id);
        alert(
            "ID: " + f.id +
            "\nNome: " + f.nome +
            "\nE-mail: " + f.email +
            "\nTelefone: " + (f.telefone || "-") +
            "\nCargo: " + f.cargo +
            "\nDepartamento: " + (f.departamento || "-") +
            "\nSalário: " + formatarSalario(f.salario) +
            "\nCidade: " + (f.cidade || "-") +
            "\nStatus: " + textoStatus(f.status)
        );
    } catch (erro) {
        alert(erro.message);
    }
}

async function mudarStatus(id, novoStatus) {
    try {
        await atualizarStatus(id, novoStatus);
        carregarFuncionarios();
    } catch (erro) {
        alert(erro.message);
        carregarFuncionarios();
    }
}

export { carregarFuncionarios, iniciarTabela };
