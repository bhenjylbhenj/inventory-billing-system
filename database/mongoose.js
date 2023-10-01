const mongoose = require('mongoose');
const dbString = process.env.MONGODB_CONN_STRING;

try {
    mongoose.connect(dbString, {
        useNewUrlParser: true
    });
} catch (error) {
    console.log(error)
}