const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

const ParsingUrls = sequelize.define('parsing_urls', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cost: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    cashback: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    categories_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
}, {});

module.exports = ParsingUrls;


