import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const attendantStage = {
  async exec({ from, message }) {

    const currentDate = new Date()
    
    // storage[from].stage = STAGES.INICIAL

    if (message.trim().toUpperCase() === 'ENCERRAR'){
      storage[from].stage = STAGES.INICIAL
      return VenomBot.getInstance().sendText({
        to: from,
        message: '🔚 *Atendimento encerrado* 🔚',
      })
    }
  },
}
