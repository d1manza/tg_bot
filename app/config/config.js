function getEnv(name, defaults) {
    if (!process.env[name]) {
        return defaults
    } else {
        return process.env[name];
    }
}

const config = {
    db: {
        host: 'localhost',
        port: 5432,
        name: 'parser',
        user: 'postgres',
        password: 'bitopsystem'
    },
    tg: {
        token: '6020383410:AAG-HTWRv0glOvWCg5grMK-JkjkSQYmRj9Y'
    },
    website: {
        url: 'yandex.ru'
    },
    generating: {
        prefixLogin: 'sbermegamarketbot-',
        lengthPassword: 8
    }
};

module.exports = config;
