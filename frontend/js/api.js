const URL_BASE = "http://localhost:8080/funcionarios";

// GET 
async function getFuncionarios(busca) {
    let url = URL_BASE;
    if (busca) {
        url = URL_BASE + "?busca=" + busca;
    }

    const resposta = await fetch(url);
    const dados = await resposta.json();
    return dados;
}

async function getFuncionarioPorId(id) {
    const resposta = await fetch(URL_BASE + "/" + id);
    if (!resposta.ok) {
        throw new Error("Funcionário não encontrado.");
    }
    const dados = await resposta.json();
    return dados;
}

// POST 
async function cadastrarFuncionario(funcionario) {
    const resposta = await fetch(URL_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(funcionario)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao cadastrar. Verifique se o ID já existe.");
    }
    return await resposta.json();
}

// PUT
async function atualizarFuncionario(id, funcionario) {
    const resposta = await fetch(URL_BASE + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(funcionario)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao atualizar o funcionário.");
    }
    return await resposta.json();
}

// PATCH
async function atualizarStatus(id, novoStatus) {
    const resposta = await fetch(URL_BASE + "/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus })
    });

    if (!resposta.ok) {
        throw new Error("Erro ao atualizar o status.");
    }
    return await resposta.json();
}

// DELETE
async function excluirFuncionario(id) {
    const resposta = await fetch(URL_BASE + "/" + id, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        throw new Error("Erro ao excluir o funcionário.");
    }
}

export {
    getFuncionarios,
    getFuncionarioPorId,
    cadastrarFuncionario,
    atualizarFuncionario,
    atualizarStatus,
    excluirFuncionario
};