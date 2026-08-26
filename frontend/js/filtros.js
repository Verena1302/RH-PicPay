import { aplicarFiltrosERenderizar } from "./funcionarios.js";

function iniciarFiltros() {
    const campoBusca = document.getElementById("search");
    const campoStatus = document.getElementById("statusFilter");

    if (!campoBusca || !campoStatus) {
        return;
    }

    botaoBuscar.addEventListener("click", function () {
        carregarFuncionarios(campoBusca.value.trim());
    });

    campoBusca.addEventListener("keypress", function (evento) {
        if (evento.key === "Enter") {
            evento.preventDefault();
            carregarFuncionarios(campoBusca.value.trim());
        }
    });

    // Se o usuário apagar a busca, volta a mostrar todos
    campoBusca.addEventListener("input", function () {
        if (campoBusca.value.trim() === "") {
            carregarFuncionarios();
        }
    });
}

export { iniciarFiltros };
