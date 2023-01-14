require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

require("./Database/dbConnection.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});