async function carregarTarefas() {
    try {
        const resposta = await fetch("http://159.65.228.63/tarefas");
        const tarefas = await resposta.json();

        const tabela = document.querySelector("#tabelaTarefas tbody");
        const msg = document.getElementById("mensagem");

        tabela.innerHTML = "";
        msg.innerHTML = "";

        if (tarefas.length === 0) {
            msg.textContent = "Nenhuma tarefa cadastrada";
            return;
        }

        tarefas.forEach(t => {
            const tr = document.createElement("tr");

            if (t.prioridade === "Urgente") {
                tr.classList.add("urgente");
            }

            const recursos = Array.isArray(t.recursosNecessarios)
                ? t.recursosNecessarios.join(", ")
                : t.recursosNecessarios;

            tr.innerHTML = `
                <td>${t.prioridade}</td>
                <td>${t.descricao}</td>
                <td>${t.local}</td>
                <td>${recursos}</td>
                <td>${t.dataLimite}</td>
                <td>${t.matricula}</td>
            `;

            tabela.appendChild(tr);
        });

    } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
        document.getElementById("mensagem").textContent = "Erro ao conectar à API.";
    }
}

carregarTarefas();
