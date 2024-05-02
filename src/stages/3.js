import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageThree = {
  async exec({ from, message }) {
    storage[from].address = message
    storage[from].stage = STAGES.PEDIDO

    let msg = '🔴 Pedido *CANCELADO* com sucesso. \n Volte Sempre!'
    if (message === '*' || message.trim().toUpperCase() === 'ENCERRAR') {
      storage[from].stage = STAGES.INICIAL
    } else {
      const itens = storage[from].itens
      const orders = itens.map((item) => item.description).join(', ')

      const total = itens.reduce((acc, item) => acc + item.price, 0);

      msg =
        `🗒️ *RESUMO DO PEDIDO*: \n\n
        🍔 Itens: *${orders}* \n
        🚚 Taxa de entrega: *a confirmar*. \n
        📍 Endereço: *${message}* \n
        💰 Valor total: *${total} reais*. \n\n` +
        '🔊 ```Agora, conte mais detalhes: nome de quem irá buscar no local ou receberá a entrega, forma de pagamento, precisará de troco...```'+
        '\n-----------------------------------\n*️⃣ - ```CANCELAR pedido```' 
    }

    await VenomBot.getInstance().sendText({ to: from, message: msg })

    // return '✅ *Prontinho, pedido feito!* \n\nAgora, se você ainda não sabe o valor da taxa de entrega para sua região, vou te passar para um atendente para que ele verique o valor da *taxa de entrega*. \n\n⏳ *Aguarde um instante*.'
  },
}
