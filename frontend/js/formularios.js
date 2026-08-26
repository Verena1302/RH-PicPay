import { cadastrarFuncionario, atualizarFuncionario } from "./api.js";
import { enumStatus, textoStatus } from "./utils.js";
import { aplicarFiltrosERenderizar, carregarFuncionarios } from "./funcionarios.js";

let idEmEdicao = null;

function tocarSomSucesso() {
    const som = document.getElementById("som-sucesso");
    if (som) {
        som.currentTime = 0;
        som.play().catch(() => {});
    }
}

function iniciarFormulario() {
    const form = document.getElementById("form-candidato");
    const botaoCancelar = document.getElementById("btn-cancelar-edicao");

    form.addEventListener("submit", enviarFormulario);
    botaoCancelar.addEventListener("click", limparFormulario);
}

function lerFormulario() {
    const funcionario = {
        id: Number(document.getElementById("id").value),
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        cargo: document.getElementById("cargo").value,
        departamento: document.getElementById("departamento").value,
        salario: document.getElementById("salario").value ? Number(document.getElementById("salario").value) : null,
        cidade: document.getElementById("cidade").value,
        status: document.getElementById("status").value
    };
    return funcionario;
}

async function enviarFormulario(evento) {
    evento.preventDefault();
    const funcionario = lerFormulario();

    try {
        if (idEmEdicao === null) {
            // não está editando ninguém -> cadastra novo (POST)
            await cadastrarFuncionario(funcionario);
            alert("Candidato cadastrado com sucesso!");
        } else {
            // está editando -> atualiza (PUT)
            await atualizarFuncionario(idEmEdicao, funcionario);
            alert("Candidato atualizado com sucesso!");
        }

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

function abrirModalEdicao(funcionario) {
    idEmEdicao = funcionario.id;

    document.getElementById("id").value = funcionario.id;
    document.getElementById("id").disabled = true;
    document.getElementById("nome").value = funcionario.nome || "";
    document.getElementById("email").value = funcionario.email || "";
    document.getElementById("telefone").value = funcionario.telefone || "";
    document.getElementById("cargo").value = funcionario.cargo || "";
    document.getElementById("departamento").value = funcionario.departamento || "";
    document.getElementById("salario").value = funcionario.salario || "";
    document.getElementById("cidade").value = funcionario.cidade || "";
    document.getElementById("status").value = funcionario.status || "EM_ANALISE";

    document.getElementById("titulo-formulario").textContent = "Editar Candidato #" + funcionario.id;
    document.getElementById("botao-salvar").textContent = "Atualizar Candidato";
    document.getElementById("btn-cancelar-edicao").hidden = false;
}

function fecharModal() {
    idEmEdicao = null;

    document.getElementById("form-candidato").reset();
    document.getElementById("id").disabled = false;

    document.getElementById("titulo-formulario").textContent = "Cadastrar Candidato";
    document.getElementById("botao-salvar").textContent = "Cadastrar Candidato";
    document.getElementById("btn-cancelar-edicao").hidden = true;
}

export { iniciarFormulario, iniciarEdicao };

