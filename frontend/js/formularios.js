import { cadastrarFuncionario, atualizarFuncionario } from "./api.js";
import { carregarFuncionarios } from "./funcionarios.js";

let idEmEdicao = null;

function tocarSomSucesso() {
    const som = document.getElementById("som-sucesso");
    if (som) {
        som.currentTime = 0;
        som.play().catch(() => {});
    }
}

function iniciarFormulario() {
    const formCadastro = document.getElementById("form-candidato");
    const formModal = document.getElementById("form-modal-edicao");
    const btnFecharModal = document.getElementById("btn-fechar-modal");

    if (formCadastro) {
        formCadastro.addEventListener("submit", async function (evento) {
            evento.preventDefault();
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

            try {
                await cadastrarFuncionario(funcionario);
                alert("Candidato cadastrado com sucesso!");
                formCadastro.reset();
                carregarFuncionarios();
            } catch (erro) {
                alert(erro.message);
            }
        });
    }

    if (formModal) {
        formModal.addEventListener("submit", async function (evento) {
            evento.preventDefault();
            const funcionario = {
                id: idEmEdicao,
                nome: document.getElementById("modal-nome").value,
                email: document.getElementById("modal-email").value,
                telefone: document.getElementById("modal-telefone").value,
                cargo: document.getElementById("modal-cargo").value,
                departamento: document.getElementById("modal-departamento").value,
                salario: document.getElementById("modal-salario").value ? Number(document.getElementById("modal-salario").value) : null,
                cidade: document.getElementById("modal-cidade").value,
                status: document.getElementById("modal-status").value
            };

            try {
                await atualizarFuncionario(idEmEdicao, funcionario);
                tocarSomSucesso(); 
                fecharModal();      
                carregarFuncionarios();
            } catch (erro) {
                alert(erro.message);
            }
        });
    }

    if (btnFecharModal) {
        btnFecharModal.addEventListener("click", function (evento) {
            evento.preventDefault();
            fecharModal();
        });
    }
}

function abrirModalEdicao(funcionario) {
    idEmEdicao = funcionario.id;

    document.getElementById("modal-id").value = funcionario.id;
    document.getElementById("modal-nome").value = funcionario.nome || "";
    document.getElementById("modal-email").value = funcionario.email || "";
    document.getElementById("modal-telefone").value = funcionario.telefone || "";
    document.getElementById("modal-cargo").value = funcionario.cargo || "";
    document.getElementById("modal-departamento").value = funcionario.departamento || "";
    document.getElementById("modal-salario").value = funcionario.salario || "";
    document.getElementById("modal-cidade").value = funcionario.cidade || "";
    document.getElementById("modal-status").value = funcionario.status || "EM_ANALISE";

    document.getElementById("modal-titulo").textContent = "Editar Candidato #" + funcionario.id;
    
    const modal = document.getElementById("modal-edicao");
    if (modal) {
        modal.style.display = "flex";
    }
}

function fecharModal() {
    idEmEdicao = null;
    const modal = document.getElementById("modal-edicao");
    if (modal) {
        modal.style.display = "none";
    }
    const formModal = document.getElementById("form-modal-edicao");
    if (formModal) {
        formModal.reset();
    }
}

export { iniciarFormulario, abrirModalEdicao };