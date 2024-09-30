## Projeto: Bot de Atendimento Automático para WhatsApp

### Introdução

Este projeto é um bot de atendimento automático para WhatsApp, desenvolvido utilizando a biblioteca `whatsapp-web.js`. Muitas empresas cobram valores absurdos para implementar sistemas semelhantes. No entanto, com este código, qualquer desenvolvedor pode criar seu próprio bot de atendimento automatizado, economizando muito dinheiro. A ideia é fornecer uma solução eficiente para automatizar processos simples de atendimento, como responder perguntas frequentes e direcionar clientes para vendedores.

---

### Como Executar o Programa

Para rodar o bot, siga os passos abaixo:

1. **Pré-requisitos**:
   - Ter o [Node.js](https://nodejs.org/en/) instalado em seu sistema.
   - Instalar a biblioteca `whatsapp-web.js` através do npm.

2. **Instalação das Dependências**:
   - Após clonar o repositório, no terminal, execute o comando:
     ```bash
     npm install whatsapp-web.js qrcode-terminal
     ```

3. **Executar o Bot**:
   - No terminal, rode o comando:
     ```bash
     node index.js
     ```
   - O terminal irá exibir um QR Code. Você deve abrir o WhatsApp Web e escanear este código para conectar o bot à sua conta do WhatsApp.

4. **Pronto!** O bot agora está conectado e pronto para responder automaticamente às mensagens recebidas.

---

### Explicação do Código

1. **Estrutura Principal**:
   - O código utiliza a biblioteca `whatsapp-web.js` para se conectar ao WhatsApp através de um cliente web.
   - Uma vez iniciado, ele aguarda mensagens de entrada e responde automaticamente com base na escolha do cliente.

2. **Lógica de Atendimento**:
   - A primeira interação do cliente recebe uma mensagem de boas-vindas. O bot oferece opções numeradas para que o usuário escolha.
   - Dependendo da opção selecionada (1-7), o bot envia a resposta correspondente.
   - Se o cliente escolher ser transferido para um atendente, o bot interrompe o fluxo de mensagens automáticas.

3. **Personalizações**:
   - O código pode ser facilmente adaptado para incluir novas opções ou alterar as mensagens padrão.
   - Para adicionar novas respostas, basta editar a função `responderCliente()`. 
   - O tempo de espera para enviar novas mensagens também pode ser alterado na função `setTimeout`.

4. **Prevenção de Repetição**:
   - A lógica impede que a mensagem de boas-vindas seja enviada mais de uma vez para o mesmo cliente. Isso é controlado pela variável `userChoices`.

---

### Perigos do Uso de APIs Não Oficiais

É importante entender que a biblioteca `whatsapp-web.js` não é uma API oficial do WhatsApp. Embora seja uma ferramenta poderosa, seu uso pode trazer riscos. Entre os perigos estão:

- **Bloqueio de Conta**: O WhatsApp pode bloquear contas que utilizam soluções de automação não oficiais.
- **Limitações de Funcionalidades**: Recursos críticos podem não estar disponíveis ou funcionar de maneira inesperada.
  
Sempre que possível, busque alternativas oficiais para evitar esses riscos em longo prazo.

Para mais informações sobre a biblioteca utilizada, consulte a documentação oficial em: [whatsapp-web.js Documentation](https://wwebjs.dev/guide/).

---

### Exigências Necessárias para Rodar o Programa

Para garantir o funcionamento adequado do bot, certifique-se de:

- Ter uma conexão estável com a internet, tanto no computador quanto no dispositivo móvel.
- Manter o WhatsApp Web conectado enquanto o bot estiver em execução.
- O WhatsApp deve permanecer aberto no dispositivo, pois o bot depende de uma conexão ativa com a sessão web.

---

### Conclusão

Este projeto demonstra como você pode economizar dinheiro ao criar seu próprio bot de atendimento automatizado. Com uma pequena curva de aprendizado e uma simples estrutura de código, você pode personalizar o bot de acordo com as necessidades da sua empresa. Evite pagar valores altos por soluções prontas, quando você mesmo pode criar e adaptar seu próprio sistema.

---

Se tiver alguma dúvida ou quiser adaptar este projeto ao seu gosto, fique à vontade para modificar o código e expandir as funcionalidades.

