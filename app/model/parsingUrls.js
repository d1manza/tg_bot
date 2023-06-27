const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

/*-- auto-generated definition
create table parsing_urls
(
    id            serial
constraint parsing_url_pk
primary key,
    name          varchar,
    cost          integer,
    cashback      integer,
    url           varchar                                not null,
    "createdAt"   timestamp with time zone default now() not null,
    "updatedAt"   timestamp with time zone default now() not null,
    categories_id integer                                not null
constraint parsing_urls_categories_id_fk
references categories,
    "deletedAt"   timestamp with time zone
);

alter table parsing_urls
owner to postgres;

create unique index parsing_url_id_uindex
on parsing_urls (id);*/

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


