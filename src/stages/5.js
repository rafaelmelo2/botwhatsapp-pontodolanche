import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'
import { format } from 'date-fns';

export const finalStage = {
  async exec({ from, message }) {

    

    let msg = '🔴 Pedido *CANCELADO* com sucesso. \n Volte Sempre!'
    if (message === '*' || message.trim().toUpperCase() === 'ENCERRAR') {
      storage[from].stage = STAGES.INICIAL
      
    } else {
      storage[from].stage = STAGES.ATENDENTE
      msg = '✅ *Prontinho, pedido feito!* \n\nAgora, se você ainda não sabe o valor da taxa de entrega para sua região, vou te passar para um atendente para que ele verique o valor da *taxa de entrega*. \n\n⏳ *Aguarde um instante*.'
      
      const currentDate = new Date()
      const formattedTime = format(currentDate, 'HH:mm:ss');
      const formattedDay = format(currentDate, 'dd/MM/yyyy');
      
      const phone = from.split('@')
      const itens = storage[from].itens
      const orders = itens.map((item) => item.description).join(', ')
      const total = itens.reduce((acc, item) => acc + item.price, 0);
      const address = storage[from].address
      const details = storage[from].details

      const msg2 = `🔔 *NOVO PEDIDO* 🔔: \n\n
      🕗 Horário: *${formattedTime} - ${formattedDay}*\n
      📞 Cliente: +${phone[0]}
        https://api.whatsapp.com/send?phone=+${phone[0]}\n 
      🍔 Pedido: *${orders}*\n 
      📍 Endereço: *${address}*\n 
      🚚 Taxa de entrega: *a confirmar*.\n 
      💰 Valor total: *${total} reais*.\n 
      🛑 Detalhes: *${details}*\n`

      VenomBot.getInstance().sendText({
        to: '120363276765872986@g.us',
        message: msg2
      })
      
      return VenomBot.getInstance().sendText({
        to: from,
        message: msg,
      })

    }
    
  },
}
