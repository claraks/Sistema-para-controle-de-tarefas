document.getElementById("formTarefa").addEventListener("submit", async (e) => {
    e.preventDefault();

    const prioridade = document.getElementById("prioridade").value;
    const descricao = document.getElementById("descricao").value;
    const local = document.getElementById("local").value;

    const recursos = document.getElementById("recursos").value
        .split("\n")
        .map(r => r.trim())
        .filter(r => r.length > 0);

    const dataLimite = document.getElementById("dataLimite").value;
    const matricula = Number(document.getElementById("matricula").value);

    const tarefa = {
        prioridade,
        descricao,
        local,
        recursosNecessarios: recursos,
        dataLimite: dataLimite.replace("T", " ") + ":00",
        matricula,
        concluida: false,
        tipo: "tarefa"
    };

    try {
        const resp = await fetch("http://159.65.228.63/tarefas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefa)
        });

        if (resp.ok) {  
            alert("Tarefa cadastrada com sucesso!");
            window.location.href = "index.html";
        } else {
            alert("Erro ao cadastrar tarefa!");
        }

    } catch (erro) {
        alert("Erro ao conectar à API.");
        console.error(erro);
    }
});

