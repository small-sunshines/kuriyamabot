import { command as Command } from '../moduleBase'
import * as Telegram from 'node-telegram-bot-api'
import { Logger } from 'log4js';

export default class ComandHelp extends Command {
  constructor (bot: Telegram, logger: Logger) {
    super (bot, logger)
    this.regexp = new RegExp('^/(?:help|도움말)+(?:@' +
      this.config.bot.username + ')? ?$')
  }
  
  protected async module (msg: Telegram.Message, match: RegExpExecArray) {
    if (Math.round((new Date()).getTime() / 1000) - msg.date <= 180) {
      const chatid = msg.chat.id
      try {
        this.logger.info('command: help, chatid: ' + chatid +
          ', username: ' + this.helper.getuser(msg.from) +
          ', command: ' + msg.text + ', type: pending')
        // eslint-disable-next-line
        let [send, temp] = await Promise.all([
          this.bot.sendChatAction(chatid, 'typing'),
          this.helper.getlang(msg, this.logger)
        ])
        await this.bot.sendMessage(chatid, '📒 ' +
          temp.help('command.help.help'), {
            reply_to_message_id: msg.message_id,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: this.helper.commandlist(temp)
            }
          })
        this.logger.info('command: help, chatid: ' + chatid +
          ', username: ' + this.helper.getuser(msg.from) +
          ', command: ' + msg.text + ', type: success')
      } catch (e) {
        this.logger.error('command: help, chatid: ' + chatid +
          ', username: ' + this.helper.getuser(msg.from) +
          ', command: ' + msg.text + ', type: error')
        this.logger.debug(e.stack)
      }
    }
  }
}
