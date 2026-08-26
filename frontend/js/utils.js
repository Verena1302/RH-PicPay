function textoStatus(status) {
    if (status === "EM_ANALISE") return "Em análise";
    if (status === "APROVADO") return "Aprovado";
    if (status === "REPROVADO") return "Reprovado";
    if (status === "CONTRATADO") return "Contratado";
    return status;
}

// caminho inverso: rótulo mostrado na tela -> enum que o backend espera
function enumStatus(label) {
    if (label === "Em análise") return "EM_ANALISE";
    if (label === "Aprovado") return "APROVADO";
    if (label === "Reprovado") return "REPROVADO";
    if (label === "Contratado") return "CONTRATADO";
    return label;
}

// classe CSS do status (usada no "pill" colorido do novo layout)
function classeStatus(status) {
    if (status === "EM_ANALISE") return "status-analysis";
    if (status === "APROVADO") return "status-approved";
    if (status === "REPROVADO") return "status-rejected";
    if (status === "CONTRATADO") return "status-hired";
    return "status-analysis";
}

function formatarSalario(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return "-";
    }
    return "R$ " + Number(valor).toFixed(2).replace(".", ",");
}

// iniciais do nome, usadas no avatar redondo (ex: "Marina Lopes" -> "ML")
function iniciais(nome) {
    return (nome || "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(x => x[0])
        .join("")
        .toUpperCase();
}

export { textoStatus, enumStatus, classeStatus, formatarSalario, iniciais };