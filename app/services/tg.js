const config = require('../config/config');
const TelegramBot = require('node-telegram-bot-api');
const Db = require('./db');
const db = new Db();

class Tg {
    constructor() {
    }

    async register() {
        const bot = new TelegramBot(config.tg.token, { polling: true });
        const abc = await bot.onText(/\/register/, async (msg, match) => {
            //Добавить проверку на уже зарегестрированного
            await db.insertTgUsers(msg.chat.id);
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
