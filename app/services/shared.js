const config = require('../config/config');
const generator = require('generate-password');

class Shared {
    constructor() {
    }

    async generateLogin(tgUsersId) {
        try {

            const login = `${config.generating.prefixLogin}${tgUsersId}`
            return login
        } catch {
            return false
        }
    }

    async generatePassword() {
        try {
            const password = generator.generate({
                length: config.generating.lengthPassword
            });
            return password
        } catch {
            return false
        }
    }

    async logging(funcName, status, message) {
        const date = new Date();
        console.log(`[${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.toLocaleTimeString()}] - Function: ${funcName}. Status: ${status}. Message: ${message}`);
    }

}

module.exports = Shared;
