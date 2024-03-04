const db = require('./db');
const User = require('./models/userModel');

main();

async function main() {
    db.connect();
    await User.create({ name: 'nisim' });
    db.disconnect();
}