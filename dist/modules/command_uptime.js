"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const moduleBase_1 = require("../moduleBase");
const timeFormat_1 = require("../helper/timeFormat");
class ChatImage extends moduleBase_1.command {
    constructor(bot, logger, config) {
        super(bot, logger, config);
        this.regexp = new RegExp('^/(?:작동시간|uptime)+(?:@' +
            this.config.bot.username + ')? ?$');
    }
    module(msg, match) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Math.round((new Date()).getTime() / 1000) - msg.date <= 180) {
                const chatid = msg.chat.id;
                try {
                    this.logger.info('command: uptime, chatid: ' + chatid +
                        ', username: ' + this.helper.getuser(msg.from) +
                        ', command: ' + msg.text + ', type: pending');
                    let [send, temp] = yield Promise.all([
                        this.bot.sendChatAction(chatid, 'typing'),
                        this.helper.getlang(msg, this.logger)
                    ]);
                    let uptime = new timeFormat_1.default(process.uptime());
                    yield this.bot.sendMessage(chatid, '✅ ' +
                        temp.text('command.uptime.message')
                            .replace(/{hour}/g, uptime.hour)
                            .replace(/{min}/g, uptime.min)
                            .replace(/{sec}/g, uptime.sec), {
                        reply_to_message_id: msg.message_id
                    });
                    this.logger.info('command: uptime, chatid: ' + chatid +
                        ', username: ' + this.helper.getuser(msg.from) +
                        ', command: ' + msg.text + ', type: success');
                }
                catch (e) {
                    this.logger.error('command: uptime, chatid: ' + chatid +
                        ', username: ' + this.helper.getuser(msg.from) +
                        ', command: ' + msg.text + ', type: error');
                    this.logger.debug(e.stack);
                }
            }
        });
    }
}
exports.default = ChatImage;
