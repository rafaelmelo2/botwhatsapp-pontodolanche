import { VenomBot } from './venom.js'
import { stages, getStage } from './stages.js'
import http from 'http'; // Importe o módulo http


const main = async () => {
  try {
    const venombot = await VenomBot.getInstance().init({
      session: 'Ponto do lanche',
      headless: true,
      useChrome: false,
    })

    venombot.onMessage(async (message) => {
      if (message.isGroupMsg) return

      const currentStage = getStage({ from: message.from })
      console.log(message.notifyName)
      await stages[currentStage].stage.exec({
        from: message.from,
        message: message.body,
      })
    })
  } catch (error) {
    console.error(error)
  }
}


const PORT = process.env.PORT || 3000; // Defina a porta do servidor, ou use a porta 3000 se não estiver definida

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor rodando\n');
});

server.listen(PORT, () => {
  console.log(`Servidor HTTP rodando na porta ${PORT}`);
  main()
});



