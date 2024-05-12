const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.host}:${process.env.dbPort}/${process.env.dbName}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log("Connected to MongoDb");
});

module.exports = db
