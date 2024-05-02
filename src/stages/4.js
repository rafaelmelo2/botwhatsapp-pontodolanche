import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageFour = {
  async exec({ from, message }) {
    const address = storage[from].address
    const phone = from.split('@')
    storage[from].details = message

    storage[from].stage = STAGES.CONFIRMAR

    
    let msg = '🔴 Pedido *CANCELADO* com sucesso. \n Volte Sempre!'
    if (message === '*'|| message.trim().toUpperCase() === 'ENCERRAR') {
      storage[from].stage = STAGES.INICIAL
    } else {
      console.log("teste")
      const itens = storage[from].itens
      const orders = itens.map((item) => item.description).join(', ')
      const total = itens.reduce((acc, item) => acc + item.price, 0);

      msg = `🔔 *NOVO PEDIDO* 🔔: \n\n
        📞 Cliente: +${phone[0]}\n 
        🍔 Pedido: *${orders}*\n 
        📍 Endereço: *${address}*\n 
        🚚 Taxa de entrega: *a confirmar*.\n 
        💰 Valor total: *${total} reais*.\n 
        ⏳ Tempo médio de entrega: *30 minutos*.\n 
        🛑 Detalhes: *${message}*\n\n`+
        '```🔊 Digite "OK" para confirmar seu pedido```'+
        '\n-----------------------------------\n*️⃣ - ```CANCELAR pedido```'
    }
    await VenomBot.getInstance().sendText({ to: from, message: msg })
  },
}
