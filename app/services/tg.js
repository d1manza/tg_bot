const config = require('../config/config');
const TelegramBot = require('node-telegram-bot-api')

class Tg {
    constructor() {
    }

    async register() {
        const bot = new TelegramBot(config.tg.token, { polling: true });
        bot.onText(/\/register/, (msg, match) => {
            const chatId = msg.chat.id
            console.log(chatId);
            bot.sendMessage(chatId, 'Done.')
        });
    }

    async sendProductList(productList) {
        const bot = new TelegramBot(config.tg.token, { polling: true });
        bot.onText(/\/send_product/, (msg, match) => {
            const chatId = msg.chat.id
            bot.sendMessage(chatId, productList);
        });
    }

}

module.exports = Tg;
