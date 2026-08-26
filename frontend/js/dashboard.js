import { getFuncionarios } from "./api.js";

function pct(parte, total) {
    if (!total) return "0%";
    return (parte / total * 100).toFixed(1).replace(".0", "") + "%";
}

function montarBarras(lista) {
    const container = document.getElementById("deptBarChart");
    const porDepartamento = {};

    lista.forEach(f => {
        const dept = f.departamento || "Sem departamento";
        porDepartamento[dept] = (porDepartamento[dept] || 0) + 1;
    });

    const entradas = Object.entries(porDepartamento).sort((a, b) => b[1] - a[1]);
    document.getElementById("dept-count-tag").textContent = `${entradas.length} área${entradas.length === 1 ? "" : "s"}`;

    if (entradas.length === 0) {
        container.innerHTML = "<div class='empty-state'><b>Sem dados de departamento ainda.</b></div>";
        return;
    }

    const maior = entradas[0][1];
    container.innerHTML = entradas.map(([dept, qtd]) => `
        <div class="bar-row"><label>${dept}</label>
            <div class="bar-track"><i style="width:${maior ? (qtd / maior * 100) : 0}%"></i></div><b>${qtd}</b>
        </div>
    `).join("");
}

function montarDonut(contagem, total) {
    const donut = document.getElementById("statusDonut");
    if (!total) {
        donut.style.background = "var(--surface-elevated)";
        return;
    }

    // ordem: Em análise (amber) -> Aprovado (blue) -> Reprovado (danger) -> Contratado (green)
    const ordem = [
        { qtd: contagem.EM_ANALISE, cor: "var(--amber)" },
        { qtd: contagem.APROVADO, cor: "var(--blue)" },
        { qtd: contagem.REPROVADO, cor: "var(--danger)" },
        { qtd: contagem.CONTRATADO, cor: "var(--green)" }
    ];

    let acumulado = 0;
    const partes = ordem.map(item => {
        const inicio = acumulado;
        acumulado += (item.qtd / total) * 100;
        return `${item.cor} ${inicio}% ${acumulado}%`;
    });

    donut.style.background = `conic-gradient(${partes.join(", ")})`;
}

async function carregarDashboard() {
    let lista = [];
    try {
        lista = await getFuncionarios();
    } catch (erro) {
        return;
    }

    const contagem = { EM_ANALISE: 0, APROVADO: 0, REPROVADO: 0, CONTRATADO: 0 };
    lista.forEach(f => {
        if (contagem[f.status] !== undefined) contagem[f.status]++;
    });

    const total = lista.length;

    document.getElementById("kpi-total").textContent = total;
    document.getElementById("kpi-analise").textContent = contagem.EM_ANALISE;
    document.getElementById("kpi-aprovados").textContent = contagem.APROVADO;
    document.getElementById("kpi-reprovados").textContent = contagem.REPROVADO;
    document.getElementById("kpi-contratados").textContent = contagem.CONTRATADO;

    document.getElementById("kpi-analise-note").textContent = `${pct(contagem.EM_ANALISE, total)} do pipeline`;
    document.getElementById("kpi-aprovados-note").textContent = `${pct(contagem.APROVADO, total)} do pipeline`;
    document.getElementById("kpi-reprovados-note").textContent = `${pct(contagem.REPROVADO, total)} do pipeline`;
    document.getElementById("kpi-contratados-note").textContent = `${pct(contagem.CONTRATADO, total)} do pipeline`;

    document.getElementById("donut-total").textContent = total;
    document.getElementById("donut-total-tag").textContent = `${total} total`;
    document.getElementById("legend-analise").textContent = contagem.EM_ANALISE;
    document.getElementById("legend-aprovados").textContent = contagem.APROVADO;
    document.getElementById("legend-reprovados").textContent = contagem.REPROVADO;
    document.getElementById("legend-contratados").textContent = contagem.CONTRATADO;

    montarDonut(contagem, total);
    montarBarras(lista);
}

document.addEventListener("DOMContentLoaded", carregarDashboard);
