import { cadastrarFuncionario, atualizarFuncionario } from "./api.js";
import { enumStatus, textoStatus } from "./utils.js";
import { aplicarFiltrosERenderizar, carregarFuncionarios } from "./funcionarios.js";

let idEmEdicao = null;

function iniciarFormulario() {
    const form = document.getElementById("candidateForm");

    form.addEventListener("submit", enviarFormulario);

    document.getElementById("fieldPhone")
        .addEventListener("input", formatarTelefone);

    document.getElementById("fieldSalary")
        .addEventListener("input", formatarSalarioInput);

    document.getElementById("openCreate")
        .addEventListener("click", abrirParaCadastro);

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
        salario: converterSalarioParaNumero(document.getElementById("fieldSalary").value),
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
    document.getElementById("fieldSalary").value = funcionario.salario != null
        ? Number(funcionario.salario).toLocaleString("pt-BR", {style: "currency",currency: "BRL"}) : "";
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





function converterSalarioParaNumero(valor) {
    if (!valor) {
        return null;
    }

    return Number(
        valor
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    );
}

function formatarTelefone(evento) {
    let telefone = evento.target.value.replace(/\D/g, "").slice(0, 11);

    if (telefone.length <= 2) {
        telefone = telefone.replace(/(\d{0,2})/, "($1");
    } else if (telefone.length <= 7) {
        telefone = telefone.replace(/(\d{2})(\d+)/, "($1) $2");
    } else {
        telefone = telefone.replace(
            /(\d{2})(\d{5})(\d{0,4})/,
            "($1) $2-$3"
        );
    }

    evento.target.value = telefone;
}


function formatarSalarioInput(evento) {
    let valor = evento.target.value.replace(/\D/g, "");

    if (!valor) {
        evento.target.value = "";
        return;
    }

    valor = Number(valor) / 100;

    evento.target.value = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}