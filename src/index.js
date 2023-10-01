const express = require('express');

require('../database/mongoose');

const port = process.env.PORT;
const userRoute = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/user', userRoute);

app.listen(port, () => {
    console.log('App is running at port ' + port);
})