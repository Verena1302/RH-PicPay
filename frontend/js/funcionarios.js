import { getFuncionarios, getFuncionarioPorId, excluirFuncionario, atualizarStatus } from "./api.js";
import { textoStatus, formatarSalario } from "./utils.js";
import { iniciarEdicao } from "./formularios.js";

let listaAtual = [];
let idSelecionado = null;

const icones = {
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m4 16-.8 4.8L8 20l11-11-4-4L4 16Z"/><path d="m13 6 4 4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M10 11v6m4-6v6M9 7V4h6v3m-9 0 1 14h10l1-14"/></svg>'
};

async function carregarFuncionarios() {
    const corpoTabela = document.getElementById("candidateTable");
    corpoTabela.innerHTML = "<div class='empty-state'><b>Carregando candidatos...</b></div>";

    try {
        listaAtual = await getFuncionarios();
    } catch (erro) {
        listaAtual = [];
        corpoTabela.innerHTML = "<div class='empty-state'><b>Não foi possível carregar os candidatos.</b><br>O backend está rodando?</div>";
        document.getElementById("resultCount").textContent = "0 candidatos";
        return;
    }

    aplicarFiltrosERenderizar();
}

function aplicarFiltrosERenderizar() {
    const campoBusca = document.getElementById("search");
    const campoStatus = document.getElementById("statusFilter");

    const termo = (campoBusca?.value || "").toLowerCase().trim();
    const statusEscolhido = campoStatus?.value || "";

    const filtrada = listaAtual.filter(f => {
        const textoCandidato = `${f.nome} ${f.cargo} ${f.departamento || ""}`.toLowerCase();
        const bateBusca = !termo || textoCandidato.includes(termo);
        const bateStatus = !statusEscolhido || textoStatus(f.status) === statusEscolhido;
        return bateBusca && bateStatus;
    });

    mostrarTabela(filtrada);
}

function mostrarTabela(lista) {
    const corpoTabela = document.getElementById("candidateTable");
    const contador = document.getElementById("resultCount");

    if (lista.length === 0) {
        corpoTabela.innerHTML = "<div class='empty-state'><b>Nenhum candidato encontrado.</b><br>Experimente remover algum filtro ou fazer outra busca.</div>";
        contador.textContent = "0 candidatos";
        return;
    }

    corpoTabela.innerHTML = lista.map(f => `
        <article class="candidate-row">
            <div class="candidate-person"><span class="candidate-avatar initials">${iniciais(f.nome)}</span>
                <div><b>${f.nome}</b><small>${f.email || ""}</small></div>
            </div>
            <div class="candidate-main"><b>${f.cargo || "-"}</b><small>Posição em aberto</small></div>
            <div class="candidate-main"><b>${f.departamento || "-"}</b><small>Departamento</small></div>
            <div class="candidate-salary">${formatarSalario(f.salario)}</div>
            <div><span class="status-pill ${classeStatus(f.status)}">${textoStatus(f.status)}</span></div>
            <div class="row-actions">
                <button type="button" class="row-action" title="Ações rápidas" data-acao="ver" data-id="${f.id}">${icones.bolt}</button>
                <button type="button" class="row-action" title="Editar" data-acao="editar" data-id="${f.id}">${icones.edit}</button>
                <button type="button" class="row-action delete" title="Excluir" data-acao="excluir" data-id="${f.id}">${icones.trash}</button>
            </div>
        </article>
    `).join("");

    contador.textContent = `${lista.length} candidato${lista.length === 1 ? "" : "s"}`;
}

function iniciarTabela() {
    const corpoTabela = document.getElementById("candidateTable");

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
}

function excluir(id) {
    const funcionario = listaAtual.find(f => f.id === id);
    if (!funcionario) return;

    idSelecionado = id;
    document.getElementById("deleteText").textContent =
        `Essa ação removerá permanentemente os dados de ${funcionario.nome}.`;
    window.openModal("deleteModal");
}

async function confirmarExclusao() {
    if (idSelecionado === null) return;

    try {
        await excluirFuncionario(idSelecionado);
        window.closeModal("deleteModal");
        carregarFuncionarios();
    } catch (erro) {
        alert(erro.message);
        window.closeModal("deleteModal");
    }
}

async function editar(id) {
    try {
        const funcionario = await getFuncionarioPorId(id);
        abrirModalEdicao(funcionario);
    } catch (erro) {
        alert(erro.message);
    }
}

async function verDetalhes(id) {
    try {
        const f = await getFuncionarioPorId(id);
        idSelecionado = id;

        document.getElementById("quickContent").innerHTML = `
            <div class="quick-person"><span class="quick-avatar">${iniciais(f.nome)}</span>
                <div><h3>${f.nome}</h3><small>${f.email || ""} · ${f.telefone || "-"}</small></div>
            </div>
            <div class="quick-grid">
                <div class="quick-item"><small>Cargo</small><b>${f.cargo || "-"}</b></div>
                <div class="quick-item"><small>Departamento</small><b>${f.departamento || "-"}</b></div>
                <div class="quick-item"><small>Salário</small><b>${formatarSalario(f.salario)}</b></div>
                <div class="quick-item"><small>Status</small><span class="status-pill ${classeStatus(f.status)}">${textoStatus(f.status)}</span></div>
            </div>`;

        window.openModal("quickModal");
    } catch (erro) {
        alert(erro.message);
    }
}

function iniciarQuickEdit() {
    document.getElementById("quickEdit").addEventListener("click", () => {
        window.closeModal("quickModal");
        if (idSelecionado !== null) editar(idSelecionado);
    });

    document.getElementById("confirmDelete").addEventListener("click", confirmarExclusao);
}

export { carregarFuncionarios, iniciarTabela };
