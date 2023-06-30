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
            if (getInfoFromTgId === 2) {
                return false
            } else if (getInfoFromTgId === 1) {
                const login = await shared.generateLogin(chatId);
                if (login) {
                    shared.logging('generateLogin', 'successfully', `user with tg id: ${chatId} generated login`);
                    const password = await shared.generatePassword();
                    if (password) {
                        shared.logging('generatePassword', 'successfully', `user with tg id: ${chatId} generated password`);
                        const createTgUsers = await db.createTgUsers(chatId, login, password);
                        if (createTgUsers) {
                            shared.logging('createTgUsers', 'successfully', `user with tg id: ${chatId} created`);
                            const createUsersRights = await db.createUsersRights(createTgUsers.id, config.rights.id_users);
                            if (createUsersRights) {
                                shared.logging('createUsersRights', 'successfully', `Rights for user with tg id: ${chatId} created`);
                                return await this.pushMessageTg(`Регистрация прошла успешно! \nДля просмотра большего количества акций, Вы можете перейти на сайт <b>${config.website.url}</b>\nВаш логин: <b>${login}</b>>\nВаш пароль: <b>${password}</b>`, chatId, bot);
                            } else {
                                shared.logging('createUsersRights', 'error', `Rights for user with tg id: ${chatId} not created`);
                                return false
                            }
                        } else {
                            shared.logging('createTgUsers', 'error', `user with tg id: ${chatId} not created`);
                            return false
                        }
                    } else {
                        shared.logging('generatePassword', 'error', `user with tg id: ${chatId} not generated password`);
                        return false
                    }
                } else {
                    shared.logging('generateLogin', 'error', `user with tg id: ${chatId} not generated login`);
                    return false
                }
            } else {
                shared.logging('getInfoFromTgId', 'successfully', `user with tg id: ${chatId} already exists`);
                return await this.pushMessageTg('Вы уже зарегистрированы :)', chatId, bot);
            }
        });


        await bot.onText(/\/unregister/, async (msg, match) => {
            const chatId = msg.chat.id;
            const getInfoFromTgId = await db.getInfoFromTgId(chatId);
            if (getInfoFromTgId) {
                const deleteTgUsers = await db.deleteTgUsers(chatId);
                if (deleteTgUsers) {
                    const deleteUsersRights = await db.deleteUsersRights(getInfoFromTgId.id);
                    if (deleteUsersRights) {
                        console.log(`User with was unregistered in the bot. Id: ${chatId}`);
                        await bot.sendMessage(chatId, `Вы отключились от рассылки топовых акций :(`);
                    } else {
                        console.log(`Function: deleteUsersRights. Error unregistration in the bot. Id: ${chatId}`);
                    }
                } else {
                    console.log(`Function: deleteTgUsers. Error unregistration in the bot. Id: ${chatId}`);
                }
            } else {
                console.log(`User with id: ${chatId}, not registered in the bot`);
                await bot.sendMessage(chatId, 'Вы не зарегистрированы :(');
            }
        });
        await bot.onText(/\/remind/, async (msg, match) => {
            const chatId = msg.chat.id;
            const getInfoFromTgId = await db.getInfoFromTgId(chatId);
            if (getInfoFromTgId) {
                console.log(`Remind login and password user with id: ${chatId}`);
                await bot.sendMessage(chatId, `Ваш логин: ${getInfoFromTgId.login}\nВаш пароль: ${getInfoFromTgId.password}`);
            } else {
                console.log(`User with id: ${chatId}, not registered in the bot`);
                await bot.sendMessage(chatId, 'Вы не зарегистрированы :(');
            }
        });

        await bot.onText(/\/help/, async (msg, match) => {
            const chatId = msg.chat.id;
            await bot.sendMessage(chatId, `Зарегестрироваться /register \nОтключиться /unregister \nНапомнить логин и пароль /remind \nПомощь /help`, {'parse_mode': 'html'});
        });

        await bot.onText(/\/start/, async (msg, match) => {
            const chatId = msg.chat.id;
            await bot.sendMessage(chatId, `Зарегестрироваться /register \nОтключиться /unregister \nНапомнить логин и пароль /remind \nПомощь /help`, {'parse_mode': 'html'});
        });

    }

    async pushMessageTg(message, chatId, bot) {
        try {
            await shared.logging('pushMessage', 'successfully', `message ___${message}___ delivered to user - ${chatId}`);
            await bot.sendMessage(chatId, `${message}`, {'parse_mode': 'html'});
            return true
        } catch {
            await shared.logging('pushMessage', 'successfully', `message ___${message}___ not delivered to user - ${chatId}`);
            return false
        }
    }

}

module.exports = Tg;
