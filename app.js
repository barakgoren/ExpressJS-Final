const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.frzuroc.mongodb.net`)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    })


