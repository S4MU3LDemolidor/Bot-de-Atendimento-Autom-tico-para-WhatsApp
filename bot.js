const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();
const userChoices = {}; // Para armazenar as escolhas dos usuários e estados

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

function responderCliente(message, numero) {
    if (!userChoices[message.from]) {
        userChoices[message.from] = {};
    }

    switch (numero) {
        case '1':
            client.sendMessage(message.from, `📋 Para abrir um crediário, vamos precisar que você traga os seguintes documentos:\n\n🪪 *RG* (Registro Geral)\n📝 *CPF* (Cadastro de Pessoa Física)\n🏠 *Comprovante de endereço*\n💼 *Comprovante de renda*\n👥 *Referência comercial*\n\nAssim que tiver tudo pronto, venha à nossa Loja presencialmente para darmos início no processo! Será um prazer tê-lo como cliente 😉`);
            break;
        case '2':
            client.sendMessage(message.from, `🎉 Temos sempre um *desconto fixo de 20%* em nossa loja! Para obter informações detalhadas sobre promoções ou descontos especiais do dia, siga-nos no Instagram e fique por dentro de todas as novidades: https://www.instagram.com/ 📲`);
            break;
        case '3':
            client.sendMessage(message.from, `⌛ Nosso horário de funcionamento de segunda a sexta é das 8h às 19h, e aos sábados, das 8h às 15h. Esperamos por você!`);
            break;
        case '4':
            client.sendMessage(message.from, `💸 Para efetuar o pagamento de uma parcela, é necessário comparecer à loja ou entrar em contato com o setor financeiro através do nosso telefone. Estamos aqui para ajudar você a todo momento! 😉`);
            break;
        case '5':
            client.sendMessage(message.from, `🛍️ Para verificar a disponibilidade do produto, informe o item que você está procurando. Assim que você informar, uma de nossas vendedoras estará disponível para atendê-lo rapidamente! 😊`);
            setTimeout(() => {
                client.sendMessage(message.from, `📞 Logo uma vendedora irá atendê-lo!`);
            }, 1000);
            userChoices[message.from].transferred = true; // Marca o usuário como transferido
            break;
        case '6':
            client.sendMessage(message.from, `📞 Aqui estão os contatos de nossos vendedores:\n\n👩‍💼 *Maria*: 12345-6789\n👨‍💼 *João*: 98765-4321\n👩‍💼 *Ana*: 45678-1234\n\nSinta-se à vontade para entrar em contato com qualquer um deles!`);
            break;
        case '7':
            client.sendMessage(message.from, `👋 Você será transferido para um atendente agora! Por favor, aguarde um momento.`);
            userChoices[message.from].transferred = true; // Marca o usuário como transferido
            break;
        default:
            client.sendMessage(message.from, `Desculpe, não entendi sua escolha 😕. Por favor, selecione uma das opções enviando o número correspondente.`);
            break;
    }
}

client.on('message', async (message) => {
    const contact = await message.getContact();
    const name = contact.pushname || contact.verifiedName || contact.name || "Cliente";

    // Verificar se o usuário foi transferido para um atendente
    if (userChoices[message.from] && userChoices[message.from].transferred) {
        return; // Não responde se o usuário foi transferido
    }

    // Comando para encerrar a sessão
    if (message.body.trim().toLowerCase() === 'sair' || message.body.trim().toLowerCase() === 'encerrar') {
        if (!userChoices[message.from]) {
            userChoices[message.from] = {};
        }
        userChoices[message.from].transferred = true; // Marca o usuário como transferido
        await client.sendMessage(message.from, `👋 A sessão foi encerrada! Se precisar de mais ajuda, não hesite em nos chamar! 😊`);
        return;
    }

    // Mensagem de boas-vindas (apenas na primeira interação)
    if (!userChoices[message.from]) {
        userChoices[message.from] = {}; // Inicializa o estado do usuário
        await client.sendMessage(message.from, `*👋 Oi ${name}, tudo bem?* Seja bem-vindo(a) à Lojas Bonitas! 😄 Como posso te ajudar hoje?\n\n1️⃣ - Quer saber como abrir um crediário?\n2️⃣ - Qual o desconto especial do dia?\n3️⃣ - Que horas fechamos a loja?\n4️⃣ - Como pagar uma parcela atrasada?\n5️⃣ - Verificar se há um produto na loja?\n6️⃣ - Contatos dos vendedores\n7️⃣ - Conversar com um atendente\n\nÉ só me dizer o número da opção que você quer!`);
        userChoices[message.from].welcomed = true; // Marca que o usuário já recebeu a mensagem de boas-vindas
    } else {
        const numeroEscolhido = message.body.trim();

        // Chama a função para responder ao cliente com base no número escolhido
        responderCliente(message, numeroEscolhido);

        // Reinicia o fluxo de opções após a resposta com um delay de 5 segundos
        setTimeout(async () => {
            if (!userChoices[message.from]?.transferred) { // Só pergunta novamente se o usuário não foi transferido
                await client.sendMessage(message.from, `*${name}*, deseja algo a mais? Digite o número correspondente ou se quiser encerrar o atendimento automático, digite "sair".`);
            }
        }, 5000);
    }
});

client.initialize();
