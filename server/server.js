require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/index'));

mongoose.connect(
    process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            throw new Error(err);
        } else {
            console.log("Base de datos online");
        }
    }
)

app.listen(process.env.PORT);