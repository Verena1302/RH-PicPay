import { cadastrarFuncionario, atualizarFuncionario } from "./api.js";
import { enumStatus, textoStatus } from "./utils.js";
import { aplicarFiltrosERenderizar, carregarFuncionarios } from "./funcionarios.js";

let idEmEdicao = null;

function iniciarFormulario() {
    const form = document.getElementById("candidateForm");
    form.addEventListener("submit", enviarFormulario);

    document.getElementById("openCreate").addEventListener("click", abrirParaCadastro);
    document.getElementById("mobileCreate")?.addEventListener("click", e => {
        e.preventDefault();
        abrirParaCadastro();
    });
}

function lerFormulario() {
    return {
        id: Number(document.getElementById("fieldId").value),
        nome: document.getElementById("fieldName").value,
        email: document.getElementById("fieldEmail").value,
        telefone: document.getElementById("fieldPhone").value,
        cargo: document.getElementById("fieldRole").value,
        departamento: document.getElementById("fieldDept").value,
        salario: document.getElementById("fieldSalary").value ? Number(document.getElementById("fieldSalary").value) : null,
        cidade: null,
        status: enumStatus(document.getElementById("fieldStatus").value)
    };
}

async function enviarFormulario(evento) {
    evento.preventDefault();
    const funcionario = lerFormulario();

    try {
        if (idEmEdicao === null) {
            await cadastrarFuncionario(funcionario);
        } else {
            await atualizarFuncionario(idEmEdicao, funcionario);
        }

        window.closeModal("candidateModal");
        limparFormulario();
        carregarFuncionarios();
    } catch (erro) {
        alert(erro.message);
    }
}

function abrirParaCadastro() {
    limparFormulario();
    window.openModal("candidateModal");
}

function iniciarEdicao(funcionario) {
    idEmEdicao = funcionario.id;

    document.getElementById("editId").value = funcionario.id;
    document.getElementById("fieldId").value = funcionario.id;
    document.getElementById("fieldId").disabled = true;
    document.getElementById("fieldName").value = funcionario.nome || "";
    document.getElementById("fieldEmail").value = funcionario.email || "";
    document.getElementById("fieldPhone").value = funcionario.telefone || "";
    document.getElementById("fieldRole").value = funcionario.cargo || "";
    document.getElementById("fieldDept").value = funcionario.departamento || "";
    document.getElementById("fieldSalary").value = funcionario.salario ?? "";
    document.getElementById("fieldStatus").value = textoStatus(funcionario.status);

    document.getElementById("modalTitle").textContent = "Editar candidato";
    document.getElementById("modalDescription").textContent = "Atualize os dados desta pessoa no processo seletivo.";
    document.getElementById("submitCandidate").innerHTML = "Salvar alterações <span>→</span>";

    window.openModal("candidateModal");
}

function limparFormulario() {
    idEmEdicao = null;

    document.getElementById("candidateForm").reset();
    document.getElementById("editId").value = "";
    document.getElementById("fieldId").disabled = false;

    document.getElementById("modalTitle").textContent = "Cadastrar candidato";
    document.getElementById("modalDescription").textContent = "Adicione uma nova pessoa ao processo seletivo.";
    document.getElementById("submitCandidate").innerHTML = "Cadastrar candidato <span>→</span>";
}

export { iniciarFormulario, iniciarEdicao };
