import { create } from 'venom-bot'

export class VenomBot {
  #venombot

  #session

  static getInstance() {
    if (VenomBot.instance === undefined) VenomBot.instance = new VenomBot()
    return VenomBot.instance
  }

  async init({ session, headless, useChrome }) {
    this.#session = session
    this.#venombot = await create({
      session,
      headless,
      // useChrome,
      multidevice: false,
    })

    return this
  }

  get getSessionName() {
    return this.#session
  }

  async onMessage(callback) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')
    return await this.#venombot.onMessage(callback)
  }

  async sendText({ to, message }) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')
    return await this.#venombot.sendText(to, message)
  }

  // Is not working
  async sendButtons({ to, title, buttons, description }) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')

    return await this.#venombot.sendButtons(
      to,
      title,
      description,
      buttons,
    )
  }

  async markUnseenMessage({ to }) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')
    return await this.#venombot.markUnseenMessage(to)
  }

  async sendLocation({ to, coordX, coordY, country}) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')
    return await this.#venombot.sendLocation(to, coordX, coordY, country)
  }

  async getGroups() {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')
    return await this.#venombot.getAllChatsGroups()
  }

  async sendFile({ to, path, file_name, description}) {
    if (!this.#venombot) throw new Error('VenomBot not initialized.')
    return await this.#venombot.sendFile(to, path, file_name, description)
  }
  
}
