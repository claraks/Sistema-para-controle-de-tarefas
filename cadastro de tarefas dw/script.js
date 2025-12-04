async function carregarTarefas() {
    const resposta = await fetch("http://159.65.228.63/tarefas");
    const tarefas = await resposta.json();

    const tabela = document.querySelector("#tabelaTarefas tbody");
    const msg = document.getElementById("mensagem");

    tabela.innerHTML = "";
    msg.innerHTML = "";

    if (tarefas.length === 0) {
        msg.innerHTML = "Nenhuma tarefa cadastrada";
        return;
    }

    tarefas.forEach(t => {
        let tr = document.createElement("tr");

        if (t.prioridade === "Urgente") {
            tr.classList.add("urgente");
        }

        tr.innerHTML = `
            <td>${t.prioridade}</td>
            <td>${t.descricao}</td>
            <td>${t.local}</td>
            <td>${t.recursosNecessarios.join(", ")}</td>
            <td>${t.dataLimite}</td>
            <td>${t.matricula}</td>
        `;

        tabela.appendChild(tr);
    });
}

carregarTarefas();
