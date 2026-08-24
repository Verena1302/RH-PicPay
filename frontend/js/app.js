import { carregarFuncionarios, iniciarTabela } from "./funcionarios.js";
import { iniciarFormulario } from "./formularios.js";
import { iniciarFiltros } from "./filtros.js";

document.addEventListener("DOMContentLoaded", function () {
    iniciarFormulario();
    iniciarTabela();
    iniciarFiltros();
    carregarFuncionarios();
});
