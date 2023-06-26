const Db = require('./app/services/db');
const db = new Db();
const Tg = require('./app/services/tg');
const tg = new Tg();

async function run() {
    const register = await tg.register();
}

run();
