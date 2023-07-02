const Tg = require('./app/services/tg');
const tg = new Tg();
const Shared = require('./app/services/shared');
const shared = new Shared();

async function run() {
    await shared.logging('start', 'start work', `start tg bot`);
    const go = await tg.start();
    if (!go) {
        await shared.logging('start', 'error', `start tg bot`);
        await run();
    } else {
        await shared.logging('start', 'successfully', `start was successful`);
    }
}

run();
