const config = require('../config/config');
const {Sequelize} = require('sequelize');
const TgUsers = require('../model/tgUsers');
const TgUsersRights = require('../model/tgUsersRights');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

class Db {
    constructor() {
    }

    async getInfoFromTgId(tgUsersId) {
        const userIdTgBot = await TgUsers.findOne({
            raw: true,
            attributes: ['id', 'tg_id', 'login', 'password'],
            where: {tg_id: tgUsersId, deletedAt: null}
        });
        if (userIdTgBot) {
            return userIdTgBot
        } else {
            return false
        }
    }

    async createTgUsers(tgUsersId, login, password) {
        const user = await TgUsers.create({
            tg_id: tgUsersId,
            login: login,
            password: password
        });
        if (user) {
            return user
        } else {
            return false
        }
    }

    async createUsersRights(id_users, rights_id) {
        const rightsUsers = await TgUsersRights.create({
            id_users: id_users,
            id_rights: rights_id
        });
        console.log(rightsUsers);
        if (rightsUsers) {
            return rightsUsers
        } else {
            return false
        }
    }

    async deleteTgUsers(tgUsersId) {
        const userIdTgBot = await TgUsers.update({deletedAt: sequelize.fn('NOW')}, {
            where: {
                tg_id: tgUsersId,
                deletedAt: null
            }
        });
        if (userIdTgBot) {
            return userIdTgBot
        } else {
            return false
        }
    }

}

module.exports = Db;
