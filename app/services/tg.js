const config = require('../config/config');
const TelegramBot = require('node-telegram-bot-api');
const Db = require('./db');
const db = new Db();
const Shared = require('./shared');
const shared = new Shared();


class Tg {
    constructor() {
    }

    async register() {
        const bot = new TelegramBot(config.tg.token, {polling: true});
        await bot.onText(/\/register/, async (msg, match) => {
            const chatId = msg.chat.id;
            const userIdTgBot = await db.selectTgUsers(chatId);
            if (userIdTgBot) {
                console.log(`User with id: ${userIdTgBot}, already been registered in the bot`);
                await bot.sendMessage(chatId, 'Вы уже зарегистрированы в боте!');
            } else {
                const login = await shared.generateLogin(chatId);
                const password = await shared.generatePassword();
                const tgUserId = await db.createTgUsers(chatId, login, password);
                console.log(`User with was registered in the bot. Id: ${tgUserId}`);
                await bot.sendMessage(chatId, `Регистрация прошла успешно!`);
                await bot.sendMessage(chatId, `Для просмотра большего количества скидок, Вы можете перейти на сайт ${config.website.url}\nВаш логин: ${login}\nВаш пароль: ${password}`);
            }
        });
    }

    async sendProductList(productList) {
        const bot = new TelegramBot(config.tg.token, {polling: true});
        bot.onText(/\/send_product/, (msg, match) => {
            const chatId = msg.chat.id
            bot.sendMessage(chatId, productList);
        });
    }

}

module.exports = Tg;
