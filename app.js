const Db = require('./app/services/db');
const db = new Db();

async function run() {
    const parsing_url = await db.selectParsingUrl();
}

run();
