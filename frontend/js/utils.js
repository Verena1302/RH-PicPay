function textoStatus(status) {
    if (status === "EM_ANALISE") return "Em Análise";
    if (status === "APROVADO") return "Aprovado";
    if (status === "REPROVADO") return "Reprovado";
    if (status === "CONTRATADO") return "Contratado";
    return status;
}

function formatarSalario(valor) {
    if (!valor) {
        return "-";
    }
    return "R$ " + Number(valor).toFixed(2).replace(".", ",");
}

export { textoStatus, formatarSalario };