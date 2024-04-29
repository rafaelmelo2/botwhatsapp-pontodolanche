import { VenomBot } from '../venom.js'
import { menu } from '../menu.js'
import { storage } from '../storage.js'
import { neighborhoods } from './neighborhoods.js'
import { initialStage } from './0.js'
import { STAGES } from './index.js'

export const stageOne = {
  async exec(params) {
    const message = params.message.trim()
    const isMsgValid = /[0|1|2]/.test(message)

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

    if (isMsgValid) {
      const option = options[Number(message)]()
      msg = option.message
      storage[params.from].stage = option.nextStage || STAGES.INICIAL
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg })

    if (storage[params.from].stage === STAGES.INICIAL) {
      await initialStage.exec(params)
    } else if (storage[params.from].stage === STAGES.FALAR_COM_ATENDENTE) {
      storage[params.from].finalStage = {
        startsIn: new Date().getTime(),
        endsIn: new Date().setSeconds(60), // 1 minute of inactivity
      }
    }
  },
}

const options = {
  1: () => {
    const sanduiches = [];
    const bebidas = [];
    const adicionais = [];

    let message = '🚨  CARDÁPIO  🚨\n\n'

    Object.keys(menu).forEach((value) => {
      // Verificar a categoria de cada item e adicioná-lo ao vetor correspondente
      if (menu[value].category === 'sanduiche') {
        console.log(`${numbers[value]} ${menu[value].description} - _R$${menu[value].price}_`)
        sanduiches.push(`${numbers[value]} ${menu[value].description} - _R$${menu[value].price}_`);
      } else if (menu[value].category === 'bebida') {
        bebidas.push(`${numbers[value]} ${menu[value].description} - _R$${menu[value].price}_`);
      } else if (menu[value].category === 'adicional') {
        adicionais.push(`${numbers[value]} ${menu[value].description} - _R$${menu[value].price}_`);
      }
    });

    message += '*SANDUICHES*\n' + sanduiches.join('\n') + '\n\n';
    message += '*BEBIDAS*\n' + bebidas.join('\n') + '\n\n';
    message += '*ADICIONAIS*\n' + adicionais.join('\n') + '\n\n';

    message += '\n```APENAS UMA OPÇÃO POR VEZ```'
    return {
      message,
      nextStage: STAGES.CARRINHO,
    }
  },
  2: () => {
    const message =
      '\n-----------------------------------\n📍 Valores\n' +
      neighborhoods +
      '\n-----------------------------------\n '

    return {
      message,
      nextStage: null,
    }
  },
  0: () => {
    return {
      message:
        '🔃 Encaminhando você para um atendente. \n⏳ *Aguarde um instante*.\n \n⚠️ A qualquer momento, digite *ENCERRAR* para encerrar o atendimento. ⚠️',
      nextStage: STAGES.FALAR_COM_ATENDENTE,
    }
  },
}

const numbers = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣',
  10: '1️⃣0️⃣'
}
