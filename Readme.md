# Bot telegram
Telegram bot to get information about discounts

## Methods
* `/register` - bot registration
* `/unregister` - bot unregistration
* `/remind` - remind login and password from the website
* `/help` - get help

## Info
* Launch on Node v18.16.1 and higher
* Use Sequelize (ORM)
* Use Node-telegram-bot-api (interaction with telegram)
* Use generate-password (user for generate password)

## Config
path: `./app/config.js`
```js
db: {
        host: 'localhost' //host DB,
        port: 5432 //port DB,
        name: 'db_name' //name DB,
        user: 'db_user' //user DB,
        password: 'password' //password DB
    },
tg: {
        token: 'xxx' //token telegram bot
    },
website: {
        url: 'yandex.ru' //url website
    },
generating: {
        prefixLogin: 'sbermegamarketbot-', //prefix login in system
        lengthPassword: 8 //length password
    }
```
