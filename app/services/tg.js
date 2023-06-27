const config = require('../config/config');
const TelegramBot = require('node-telegram-bot-api');
const Db = require('./db');
const db = new Db();
const Shared = require('./shared');
const shared = new Shared();


class Tg {
    constructor() {
    }

    async start() {
        const bot = new TelegramBot(config.tg.token, {polling: true});
        await bot.onText(/\/register/, async (msg, match) => {
            const chatId = msg.chat.id;
            const getInfoFromTgId = await db.getInfoFromTgId(chatId);
            if (getInfoFromTgId) {
                console.log(`User with id: ${chatId}, already been registered in the bot`);
                await bot.sendMessage(chatId, 'Вы уже зарегистрированы :)');
            } else {
                const login = await shared.generateLogin(chatId);
                const password = await shared.generatePassword();
                const createTgUsers = await db.createTgUsers(chatId, login, password);
                if (createTgUsers) {
                    const createUsersRights = await db.createUsersRights(createTgUsers.id, config.rights.id_users);
                    if (createUsersRights) {
                        console.log(`User with was registered in the bot. Id: ${chatId}`);
                        await bot.sendMessage(chatId, `Регистрация прошла успешно!`);
                        await bot.sendMessage(chatId, `Для просмотра большего количества акций, Вы можете перейти на сайт ${config.website.url}\nВаш логин: ${login}\nВаш пароль: ${password}`);
                    }  else {
                        console.log(`Function: createUsersRights. Error registration in the bot. Id: ${chatId}`);
                    }
                } else {
                    console.log(`Function: createTgUsers. Error registration in the bot. Id: ${chatId}`);
                }
            }
        });
        await bot.onText(/\/unregister/, async (msg, match) => {
            const chatId = msg.chat.id;
            const userIdTgBot = await db.getInfoFromTgId(chatId);
            if (!userIdTgBot) {
                console.log(`User with id: ${chatId}, not registered in the bot`);
                await bot.sendMessage(chatId, 'Вы не зарегистрированы :(');
            } else {
                const tgUserId = await db.deleteTgUsers(chatId);
                console.log(`User with was unregistered in the bot. Id: ${chatId}`);
                await bot.sendMessage(chatId, `Вы отключились от рассылки топовых акций :(`);
            }
        });
        await bot.onText(/\/remind/, async (msg, match) => {
            const chatId = msg.chat.id;
            const userIdTgBot = await db.getInfoFromTgId(chatId);
            if (!userIdTgBot) {
                console.log(`User with id: ${chatId}, not registered in the bot`);
                await bot.sendMessage(chatId, 'Вы не зарегистрированы :(');
            } else {
                console.log(`Remind login and password user with id: ${chatId}`);
                await bot.sendMessage(chatId, `Ваш логин: ${userIdTgBot.login}\nВаш пароль: ${userIdTgBot.password}`);
            }
        });

        await bot.onText(/\/help/, async (msg, match) => {
            const chatId = msg.chat.id;
            await bot.sendMessage(chatId, `Зарегестрироваться /register \nОтключиться /unregister \nНапомнить логин и пароль /remind \nПомощь /help`,{'parse_mode': 'html'});
        });

        await bot.onText(/\/start/, async (msg, match) => {
            const chatId = msg.chat.id;
            await bot.sendMessage(chatId, `Зарегестрироваться /register \nОтключиться /unregister \nНапомнить логин и пароль /remind \nПомощь /help`,{'parse_mode': 'html'});
        });

    }

}

module.exports = Tg;
