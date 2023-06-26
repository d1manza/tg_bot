const config = require('../config/config');
const {Sequelize} = require('sequelize');
const TgUsers = require('../model/tgUsers');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

class Db {
    constructor() {
    }

    async selectParsingUrl() {
        const products = await sequelize.query('with products as (select pu.name                                                 names,\n' +
            '                         pu.url                                                  url,\n' +
            '                         pu.cost                                                 costs,\n' +
            '                         pu.cashback                                             cashback,\n' +
            '                         round(pu.cashback::numeric / pu.cost::numeric, 2) * 100 parcent_cashback,\n' +
            '                         pu.categories_id                                        categories_id,\n' +
            '                         c.name                                                  categories_name\n' +
            '                  from parsing_urls pu\n' +
            '                           join categories c on c.id = pu.categories_id\n' +
            '                  order by 4 desc\n' +
            '                  limit 3)\n' +
            'select products.categories_id categories_i' +
            'd,\n' +
            '       products.categories_name categories_name,\n' +
            '       count(products.url) count_products,\n' +
            '       array_agg(concat(\'Наименование продукта: \', products.names, \' \\n \', \'Ссылка: \', products.url, \' \\n \',\n' +
            '                        \'Стоимость: \',\n' +
            '                        products.costs, \' \\n \', \'Кэшбек: \', products.cashback, \' \\n \', \'Вернется бонусами: \',\n' +
            '                        products.parcent_cashback, \'%\')) card_product\n' +
            'from products\n' +
            'group by 1, 2;', {
                nest: true
            }
        );
       return products
    }

    async selectTgUsers(tgUsersId) {
        const categories = await TgUsers.findAll({});
    }

    async insertTgUsers(tgUsersId) {
        const userBot = await TgUsers.create({
            tg_id: tgUsersId
        });
        if (userBot.tg_id) {
            return userBot.tg_id
        } else {
            return false
        }
    }

}

module.exports = Db;
