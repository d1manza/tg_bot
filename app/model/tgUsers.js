const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

/*-- auto-generated definition
create table tg_users
(
    id          serial,
    tg_id       integer                                not null,
    "createdAt" timestamp with time zone default now() not null,
    "updatedAt" timestamp with time zone default now() not null,
    "deletedAt" timestamp with time zone
);

alter table tg_users
owner to postgres;

create unique index tg_users_id_uindex
on tg_users (id);*/

const TgUsers = sequelize.define('tg_users', {
    tg_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
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
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {});

module.exports = TgUsers;
