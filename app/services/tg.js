const config = require('../config/config');
const TelegramBot = require('node-telegram-bot-api');
const Db = require('./db');
const db = new Db();

class Tg {
    constructor() {
    }

    async register() {
        const bot = new TelegramBot(config.tg.token, { polling: true });
        await bot.onText(/\/register/, async (msg, match) => {
            const tgUserId = await db.insertTgUsers(msg.chat.id);
            console.log(`User with was registered in the bot. TgId: ${tgUserId}`);
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
