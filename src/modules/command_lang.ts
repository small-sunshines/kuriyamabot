module.exports = (bot, logger, helper) => {
  bot.onText(new RegExp('^/(?:언어변경|언어|lang|langset)+(?:@' + global.botinfo.username + ')? ?$'), async (msg, match) => {
    if (Math.round((new Date()).getTime() / 1000) - msg.date <= 180) {
      const chatid = msg.chat.id
      let temp, send
      try {
        logger.info('chatid: ' + chatid + ', username: ' + helper.getuser(msg.from) + ', lang: ' + msg.from.language_code + ', command: ' + msg.text + ', type: command received')
        let ctype = msg.chat.type
        if (ctype === 'group' || ctype === 'supergroup' || ctype === 'channel') {
          // eslint-disable-next-line
          let admins, isAdmin = false;
          [send, temp, admins] = await Promise.all([
            bot.sendChatAction(chatid, 'typing'),
            helper.getlang(msg, logger),
            bot.getChatAdministrators(chatid)
          ])
          isAdmin = isAdmin = admins.some((v) => {
            return v.user.id === msg.from.id
          })
          if (!isAdmin) {
            await bot.sendMessage(chatid, '❗️ ' + temp.text('command.lowPermission'))
            logger.info('chatid: ' + chatid + ', username: ' + helper.getuser(msg.from) + ', lang: ' + msg.from.language_code + ', command: ' + msg.text + ', type: lowPermission')
          } else {
            await bot.sendMessage(chatid, '🔤 ' + temp.text('command.lang.announce'), {
              reply_to_message_id: msg.message_id,
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: helper.langlist(temp)
              }
            })
          }
        } else {
          [send, temp] = await Promise.all([
            bot.sendChatAction(chatid, 'typing'),
            helper.getlang(msg, logger)
          ])
          await bot.sendMessage(chatid, '🔤 ' + temp.text('command.lang.announce'), {
            reply_to_message_id: msg.message_id,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: helper.langlist(temp)
            }
          })
        }
        logger.info('chatid: ' + chatid + ', username: ' + helper.getuser(msg.from) + ', lang: ' + msg.from.language_code + ', command: ' + msg.text + ', type: valid,')
      } catch (e) {
        logger.error('chatid: ' + chatid + ', username: ' + helper.getuser(msg.from) + ', lang: ' + msg.from.language_code + ', command: ' + msg.text + ', type: error')
        logger.debug(e.stack)
      }
    }
  })
}