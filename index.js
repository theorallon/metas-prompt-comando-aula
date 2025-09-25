// Importa os métodos 'input', 'select' e 'checkbox' do pacote '@inquirer/prompts'
const { input, select, checkbox } = require('@inquirer/prompts');

// Função para limpar a tela do console
function limparTela() {
    console.clear(); // Limpa o console
}

// Função para exibir uma mensagem formatada no console
function mostrarMensagem(mensagem) {
    console.log(`\n${mensagem}\n`); // Exibe a mensagem com quebras de linha
}

// Exibe uma mensagem inicial ao iniciar o sistema
console.log("=== 📱Sitemas de Metas pessoais ===");
console.log("Bem-vindo ao sistema de metas pessoais!");

// Declara um array vazio para armazenar as metas pessoais
let metas = [];

// Função assíncrona para exibir o menu e capturar a escolha do usuário
async function mostrarMenu() {
    // Usa o método 'select' para exibir opções e capturar a escolha do usuário
    const opcao = await select({
        message: "O que você gostaria de fazer?", // Mensagem exibida no menu
        choices: [ // Lista de opções disponíveis
            { name: "Adicionar nova Meta", value: "adicionar" }, // Opção para adicionar meta
            { name: "Mostrar todas as metas", value: "mostrar" }, // Opção para mostrar metas
            { name: "Marcar metas como realizadas", value: "marcar" }, // Opção para marcar metas como realizadas
            { name: "Sair", value: "sair" } // Opção para sair do sistema
        ]
    });

    // Retorna a opção escolhida pelo usuário
    return opcao;
}

// Função assíncrona para executar a ação correspondente à opção escolhida
async function executarAcao(opcao) {
    switch (opcao) { // Verifica a opção escolhida
        case "adicionar": // Caso seja "adicionar"
            await adicionarMeta(); // Chama a função para adicionar uma meta
            break;
        case "mostrar": // Caso seja "mostrar"
            await mostrarMetas(); // Chama a função para mostrar as metas
            break;
        case "marcar": // Caso seja "marcar"
            await marcarMetas(); // Chama a função para marcar metas como realizadas
            break;
        case "sair": // Caso seja "sair"
            break; // Não faz nada, apenas sai do loop
        default: // Caso a opção seja inválida
            console.log("Opção inválida. Tente novamente. ❌"); // Exibe mensagem de erro
    }
}

// Função principal para iniciar o sistema
async function iniciar() {
    limparTela(); // Limpa a tela ao iniciar
    mostrarMensagem("=== 📱Sitemas de Metas pessoais ==="); // Exibe uma mensagem inicial

    while (true) { // Loop infinito para manter o sistema ativo
        const opcao = await mostrarMenu(); // Exibe o menu e captura a escolha do usuário

        if (opcao === "sair") { // Verifica se o usuário escolheu sair
            await executarAcao(opcao); // Executa a ação de saída
            limparTela(); // Limpa a tela antes de sair
            mostrarMensagem("Até mais 👋"); // Exibe mensagem de despedida
            break; // Encerra o loop
        }

        await executarAcao(opcao); // Executa a ação correspondente à opção escolhida
    }
}

// Função assíncrona para adicionar uma nova meta
async function adicionarMeta() {
    // Usa o método 'input' para capturar a nova meta do usuário
    let descricao = await input({
        message: "✏️ Digite sua nova meta pessoal:" // Mensagem exibida ao usuário
    });

    // Verifica se a meta é inválida (string vazia)
    if (descricao.length === 0) {
        mostrarMensagem("❌ Meta inválida. Tente novamente."); // Exibe mensagem de erro
        return; // Encerra a função
    }

    // Cria um objeto representando a nova meta
    const novaMeta = {
        value: descricao, // Descrição da meta
        checked: false // Indica que a meta ainda não foi realizada
    };

    // Adiciona a nova meta ao array 'metas'
    metas.push(novaMeta);

    // Exibe mensagem de sucesso
    mostrarMensagem("✅ Meta adicionada com sucesso!");
}

// Função assíncrona para exibir todas as metas armazenadas
async function mostrarMetas() {
    if (metas.length === 0) { // Verifica se não há metas cadastradas
        mostrarMensagem("⛔ Não existem metas cadastradas!"); // Exibe mensagem de erro
        return; // Encerra a função
    }

    console.log("📚 Suas Metas Pessoais:"); // Exibe título da lista de metas
    // Itera sobre o array 'metas' e exibe cada meta com seu índice
    metas.forEach((meta, index) => {
        const status = meta.checked ? "[x]" : "[ ]"; // Define o status da meta (realizada ou não)
        console.log(`${status} ${index + 1}. ${meta.value}`); // Exibe a meta com numeração
    });
}

// Função assíncrona para marcar metas como realizadas
async function marcarMetas() {
    if (metas.length === 0) { // Verifica se não há metas cadastradas
        mostrarMensagem("⛔ Não existem metas cadastradas!"); // Exibe mensagem de erro
        return; // Encerra a função
    }

    // Usa o método 'checkbox' para permitir que o usuário selecione metas realizadas
    const metasSelecionadas = await checkbox({
        message: "📝 Selecione as metas que você já concluiu:", // Mensagem exibida ao usuário
        choices: metas.map(meta => ({
            name: meta.value, // Nome da meta
            value: meta.value, // Valor da meta
            checked: meta.checked // Status atual da meta
        })),
    });

    // Marca todas as metas como não realizadas inicialmente
    metas.forEach(meta => meta.checked = false);

    // Atualiza o status das metas selecionadas como realizadas
    metasSelecionadas.forEach(metasSelecionada => {
        const meta = metas.find(m => m.value === metasSelecionada); // Encontra a meta correspondente
        if (meta) {
            meta.checked = true; // Marca a meta como realizada
        }
    });
}

async function metasRealizadas() {
    const realizadas = metas.filter(meta => meta.checked === true); // Filtra as metas realizadas
    if (realizadas.length === 0) { // Verifica se não há metas realizadas
        mostrarMensagem("❌ Não existem metas realizadas!"); // Exibe mensagem de erro
        return; // Encerra a função
    }

    console.log("✅ Metas Realizadas:"); // Exibe título da lista de metas realizadas
    realizadas.forEach((meta, index) => {
        console.log(`${index + 1}. ${meta.value}`); // Exibe cada meta realizada com numeração
    });

    mostrarMensagem(`Parabéns Você já concluiu ${realizadas.length} metas! 🎉`); // Exibe o total de metas realizadas

    

}

// Chama a função principal para iniciar o sistema
iniciar();