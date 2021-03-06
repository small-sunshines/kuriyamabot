import { Logger } from "log4js"
import * as Telegram from "node-telegram-bot-api"
import { Config } from "../config"
import { command as Command } from "../operactorBase"

export default class CommandLeaveArgsNull extends Command {
  constructor(bot: Telegram, logger: Logger, config: Config) {
    super (bot, logger, config)
    this.regexp = new RegExp("^/leave+(?:@" +
      this.config.bot.username + ")? ?$")
  }

  protected async module(msg: Telegram.Message, match: RegExpExecArray) {
    if (Math.round((new Date()).getTime() / 1000) - msg.date <= 180) {
      const chatid = msg.chat.id
      try {
        this.logger.info("command: leave, chatid: " + chatid +
          ", username: " + this.helper.getUser(msg.from!) +
          ", command: " + msg.text + ", type: pending")
        // tslint:disable-next-line: no-shadowed-variable
        const [send, temp] = await Promise.all([
          this.bot.sendChatAction(chatid, "typing"),
          this.helper.getLang(msg, this.logger),
        ])
        if (msg.chat.type !== "group" && msg.chat.type !== "supergroup") {
          await this.bot.sendMessage(chatid, "❗️ " +
            temp.text("command.isnotgroup"))
          this.logger.info("command: leave, chatid: " + chatid +
            ", username: " + this.helper.getUser(msg.from!) +
            ", command: " + msg.text + ", type: is not group")
        } else {
          await this.bot.sendMessage(chatid, "🔧 " +
            temp.text("command.leave.help")
              .replace(/{botid}/g, this.config.bot.username!!), {
                reply_to_message_id: msg.message_id,
                parse_mode: "Markdown",
              })
          this.logger.info("command: leave, chatid: " + chatid +
            ", username: " + this.helper.getUser(msg.from!) +
            ", command: " + msg.text + ", type: success")
        }
      } catch (e) {
        this.logger.error("command: leave, chatid: " + chatid +
          ", username: " + this.helper.getUser(msg.from!) +
          ", command: " + msg.text + ", type: error")
        this.logger.debug(e.stack)
      }
    }
  }
}
