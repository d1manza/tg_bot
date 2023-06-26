const config = require('../config/config');
const generator = require('generate-password');

class Shared {
    constructor() {
    }

    async generateLogin(tgUsersId) {
        return `${config.generating.prefixLogin}${tgUsersId}`
    }

    async generatePassword() {
        const password = await generator.generate({
            length: 8
        });
        return password
    }

}

module.exports = Shared;
