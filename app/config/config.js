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
        token: 'xxx'
    }
};

module.exports = config;
