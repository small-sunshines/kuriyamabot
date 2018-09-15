import { callback as Callback } from '../moduleBase'
import * as Telegram from 'node-telegram-bot-api'
import * as types from '../types'

export default class CallbackHelpHelp extends Callback {
  protected async module (msg: Telegram.CallbackQuery) {
    const answer = (msg: Telegram.CallbackQuery, temp: types.Lang) => {
      this.bot.answerCallbackQuery(msg.id, {
        text: temp.text('command.help.twice')
      })
    }
    const callid = msg.id
    try {
      let temp = await this.helper.getlang(msg, this.logger)
      if (msg.data === 'help_lang') {
        if (msg.message!.text !== '🔤 ' + temp.help('command.help.lang')) {
          this.logger.info('callback: help_lang, callback id: ' + callid +
            ', username: ' + this.helper.getuser(msg.from) +
            ', command: ' + msg.data + ', type: pending')
          try {
            await this.bot.editMessageText('🔤 ' + temp.help('command.help.lang'), {
              chat_id: msg.message!.chat.id,
              message_id: msg.message!.message_id,
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: this.helper.commandlist(temp)
              }})
            this.logger.info('callback: help_lang, callback id: ' + callid +
              ', username: ' + this.helper.getuser(msg.from) +
              ', command: ' + msg.data + ', type: success')
          } catch (e) {
            this.logger.error('callback: help_lang, callback id: ' + callid +
              ', username: ' + this.helper.getuser(msg.from) +
              ', command: ' + msg.data + ', type: error')
            this.logger.debug(e)
          }
        } else {
          answer(msg, temp)
        }
      }
    } catch (e) {
      this.logger.error('callback: help_lang, callback id: ' + callid +
        ', username: ' + this.helper.getuser(msg.from) +
        'command: ' + msg.data + ', type: error')
      this.logger.debug(e)
    }
  }
}
