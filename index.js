console.log("=== Sitemas de Metas pessoais ===");
console.log("Bem-vindo ao sistema de metas pessoais!")

let metas = [];

console.log("Lista de metas: ", metas);

function adicionarMeta(){
    let novaMeta = "Estudar Javascript";
    metas.push(novaMeta);
    console.log("Meta Adicionada:", novaMeta);
    console.log("Metas Atualizadas:", metas.length);
}

adicionarMeta();
console.log("Metas Finais:", metas);