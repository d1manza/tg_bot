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
        try {
            const bot = new TelegramBot(config.tg.token, {polling: true});
            await bot.onText(/\/register/, async (msg, match) => {
                const chatId = msg.chat.id;
                const getInfoFromTgId = await db.getInfoFromTgId(chatId);
                if (getInfoFromTgId === 2) {
                    shared.logging('getInfoFromTgId', 'error', `database connection error`);
                    return false
                } else if (getInfoFromTgId === 1) {
                    shared.logging('getInfoFromTgId', 'successfully', `information from user with tg id: ${chatId} not received`);
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
                                    shared.logging('createUsersRights', 'error', `database connection error`);
                                    return false
                                }
                            } else {
                                shared.logging('createTgUsers', 'error', `database connection error`);
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
                if (getInfoFromTgId === 2) {
                    shared.logging('getInfoFromTgId', 'error', `database connection error`);
                    return false
                } else if (getInfoFromTgId === 1) {
                    shared.logging('getInfoFromTgId', 'successfully', `information from user with tg id: ${chatId} not received`);
                    return await this.pushMessageTg('Вы не зарегистрированы :(', chatId, bot);
                } else {
                    shared.logging('getInfoFromTgId', 'successfully', `information from user with tg id: ${chatId} received`);
                    const deleteTgUsers = await db.deleteTgUsers(chatId);
                    if (deleteTgUsers) {
                        shared.logging('deleteTgUsers', 'successfully', `user with tg id: ${chatId} removed`);
                        const deleteUsersRights = await db.deleteUsersRights(getInfoFromTgId.id);
                        if (deleteUsersRights) {
                            shared.logging('deleteUsersRights', 'successfully', `userRights with tg id: ${chatId} removed`);
                            return await this.pushMessageTg('Вы отписались от рассылки :(', chatId, bot);
                        } else {
                            shared.logging('deleteUsersRights', 'error', `database connection error`);
                            return false
                        }
                    } else {
                        shared.logging('deleteTgUsers', 'error', `database connection error`);
                        return false
                    }
                }
            });
            await bot.onText(/\/remind/, async (msg, match) => {
                const chatId = msg.chat.id;
                const getInfoFromTgId = await db.getInfoFromTgId(chatId);
                if (getInfoFromTgId === 2) {
                    shared.logging('getInfoFromTgId', 'error', `database connection error`);
                    return false
                } else if (getInfoFromTgId === 1) {
                    shared.logging('getInfoFromTgId', 'successfully', `information from user with tg id: ${chatId} not received`);
                    return await this.pushMessageTg('Вы не зарегистрированы :(', chatId, bot);
                } else {
                    shared.logging('getInfoFromTgId', 'successfully', `information from user with tg id: ${chatId} received`);
                    return await this.pushMessageTg(`Ваш логин: <b>${getInfoFromTgId.login}</b>\nВаш пароль: <b>${getInfoFromTgId.password}</b>`, chatId, bot);
                }
            });

            await bot.onText(/\/help/, async (msg, match) => {
                const chatId = msg.chat.id;
                return await this.pushMessageTg(`Зарегистрироваться: /register \nОтключиться: /unregister \nНапомнить логин и пароль: /remind \nПомощь: /help`, chatId, bot);
            });

            await bot.onText(/\/start/, async (msg, match) => {
                const chatId = msg.chat.id;
                return await this.pushMessageTg(`Зарегистрироваться: /register \nОтключиться: /unregister \nНапомнить логин и пароль: /remind \nПомощь: /help`, chatId, bot);
            });
            return true
        } catch {
            return false
        }
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
