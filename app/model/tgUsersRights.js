const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

/*-- auto-generated definition
create table tg_users_rights
(
    id_users    integer                                not null
        constraint tg_users_rights_tg_users_id_fk
            references tg_users (id),
    id_rights   integer                                not null
        constraint tg_users_rights_rights_id_fk
            references rights,
    "createdAt" timestamp with time zone default now() not null,
    "updatedAt" timestamp with time zone default now(),
    "deletedAt" timestamp with time zone,
    id          serial
);

alter table tg_users_rights
    owner to postgres;

create unique index tg_users_rights_id_uindex
    on tg_users_rights (id);*/

const TgUsersRights = sequelize.define('tg_users_rights', {
    id_users: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    id_rights: {
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
    }
}, {});

module.exports = TgUsersRights;
