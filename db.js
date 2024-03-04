const mongoose = require('mongoose');

const scheme = 'mongodb+srv';
const host = 'cluster0.frzuroc.mongodb.net';
const uri = `${scheme}://${host}`;

function connect() {
    mongoose.connect(uri, {
        user: process.env.USER_DB,
        pass: process.env.PASS_DB,
        dbName: 'TasksAPI',
    })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            console.log(err);
            process.exit(1);
        });
}

function disconnect() {
    mongoose.connection.close();
}

module.exports = {
    connect,
    disconnect,
};