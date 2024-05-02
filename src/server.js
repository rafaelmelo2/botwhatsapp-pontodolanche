import { VenomBot } from './venom.js';
import { stages, getStage } from './stages.js';
import { storage } from './storage.js'
import { STAGES } from './stages/index.js'

// Objeto para rastrear o tempo decorrido desde a última interação para cada usuário
const userTimers = {};

// Função para reiniciar o estágio para 0 após 10 minutos de inatividade
const resetStageAfterTimeout = async (from) => {
  userTimers[from] = setTimeout(() => {
    storage[from].stage = STAGES.INICIAL;
    console.log(`Estágio reiniciado para início para o usuário ${from} após 10 minutos de inatividade.`);
    VenomBot.getInstance().sendText({
      to: from,
      message: `🔚 Assistente finalizada após 10 minutos de inatividade 🔚`
    })
  }, 10 * 60 * 1000); // 10 minutos em milissegundos
  
};

// Função para processar a mensagem
const processMessage = async (message) => {
  if (message.isGroupMsg) return;

  const from = message.from;
  const currentStage = getStage({ from });
  await stages[currentStage].stage.exec({
    from: message.from,
    message: message.body,
  });

  // Reinicie o temporizador para o usuário
  clearTimeout(userTimers[from]);
  resetStageAfterTimeout(from);
};

// Função principal
const main = async () => {
  try {
    const venombot = await VenomBot.getInstance().init({
      session: 'Ponto do lanche',
      headless: 'shell',
      args: ['--enable-gpu'],
      useChrome: false,
    });

    // Inicie o temporizador para cada usuário ativo
    Object.keys(storage).forEach((from) => {
      resetStageAfterTimeout(from);
    });

    venombot.onMessage(processMessage);
  } catch (error) {
    console.error(error);
  }
};

main();
