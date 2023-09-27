const express = require('express');

const port = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
    res.send('Yo!');
})

app.listen(port, () => {
    console.log('App is running at port ' + port);
})