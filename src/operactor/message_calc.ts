import { Logger } from "log4js"
import * as Telegram from "node-telegram-bot-api"
import { Config } from "../config"
import { message as Message } from "../operactorBase"

import * as math from "mathjs"

export default class messageCalc extends Message {
  constructor(bot: Telegram, logger: Logger, config: Config) {
    super (bot, logger, config)
  }

  protected async module(msg: Telegram.Message) {
    if (Math.round((new Date()).getTime() / 1000) - msg.date >= 180) { return }
    if (!msg.reply_to_message) { return }
    if ((msg.reply_to_message.from as Telegram.User).username !==
      this.config.bot.username) { return }
    if (Math.round((new Date()).getTime() / 1000) -
      msg.reply_to_message.date >= 60) { return }
    if (!msg.reply_to_message) { return }
    if (!msg.reply_to_message.text) { return }
    if (!msg.reply_to_message.text.match(/💻❗️/)) { return }

    const chatid = msg.chat.id
    try {
      this.logger.info("message: calc, chatid: " + chatid +
        ", username: " + this.helper.getUser(msg.from!) +
        ", command: " + msg.text + ", type: pending")

      const [send, temp] = await Promise.all([
        this.bot.sendChatAction(chatid, "typing"),
        this.helper.getLang(msg, this.logger),
      ])

      try {
        const string = msg.text!.split("|")

        let result
        if (string[1]) {
          const scope: {
            [index: string]: string|number
          } = {}

          string[1].split(",").forEach((value, index, array) => {
            value = value.replace(/\ /g, "")
            const variable = value.split("=")
            if (typeof variable[0] != "number") {
                scope[variable[0]] = variable[1]
              }
          })

          result = math.evaluate(string[0], scope)
        } else {
          result = math.evaluate(msg.text!)
        }

        await this.bot.sendMessage(chatid, result, {
          reply_to_message_id: msg.message_id,
          parse_mode: "HTML",
        })

        this.logger.info("message: calc, chatid: " + chatid +
          ", username: " + this.helper.getUser(msg.from!) +
          ", command: " + msg.text + ", type: success")
      } catch (e) {
        await this.bot.sendMessage(chatid, temp.text("command.calc.error"), {
          reply_to_message_id: msg.message_id,
          parse_mode: "HTML",
        })
        this.logger.info("message: calc, chatid: " + chatid +
          ", username: " + this.helper.getUser(msg.from!) +
          ", command: " + msg.text + ", type: error")
        this.logger.debug(e.stack)
      }
    } catch (e) {
      this.logger.error("message: calc chatid: " + chatid +
        ", username: " + this.helper.getUser(msg.from!) +
        ", command: " + msg.text + ", type: error")
      this.logger.debug(e.stack)
    }
  }
}
