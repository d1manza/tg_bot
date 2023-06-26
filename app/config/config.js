function getEnv(name, defaults) {
    if (!process.env[name]) {
        return defaults
    } else {
        return process.env[name];
    }
}

const config = {
    db: {
        host: '192.168.65.50',
        port: 5432,
        name: 'xxx',
        user: 'xxx',
        password: 'xxx'
    },
    tg: {
        token: 'xxx'
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
