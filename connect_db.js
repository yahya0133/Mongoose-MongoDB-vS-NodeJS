const mongoose = require('mongoose');
require('dotenv').config();

const db_connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(` data base is connect  : ${conn.connection.host}`);
    } catch (error) {
        console.error(`err: ${error.message}`);
        process.exit(1);
    }
};

module.exports = db_connect;