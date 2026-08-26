import { aplicarFiltrosERenderizar } from "./funcionarios.js";

function iniciarFiltros() {
    const campoBusca = document.getElementById("search");
    const campoStatus = document.getElementById("statusFilter");

    if (!campoBusca || !campoStatus) {
        return;
    }

    // filtragem em tempo real, sem precisar de botão (o backend só busca
    // por nome/cargo/status; departamento é filtrado aqui no front)
    campoBusca.addEventListener("input", aplicarFiltrosERenderizar);
    campoStatus.addEventListener("change", aplicarFiltrosERenderizar);

    iniciarPainelMobile();
}

function iniciarPainelMobile() {
    const painel = document.getElementById("filtersPanel");
    const botaoAbrir = document.getElementById("mobileFilters");
    const fundo = document.getElementById("mobileFilterBackdrop");

    if (!painel) return;

    const alternar = (abrir) => {
        painel.classList.toggle("open", abrir);
        if (fundo) fundo.classList.toggle("open", abrir);
        document.body.style.overflow = abrir ? "hidden" : "";
    };

    botaoAbrir?.addEventListener("click", () => alternar(true));
    fundo?.addEventListener("click", () => alternar(false));
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") alternar(false);
    });
}

export { iniciarFiltros };
