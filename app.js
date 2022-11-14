const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const connectDB = require('./db/connect');
const notFound = require('./notFound/notFound');
const { join } = require('path');
const router = require('./router/router');
const cookieParser = require('cookie-parser');

const app = express()

const SERVER_PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/',express.static(path.join(__dirname, 'public','login')));
app.use('/ShopingCardList',express.static(path.join(__dirname, 'public','ShopingCardList')));
app.use('/ShopingCardList/shoping',express.static(path.join(__dirname, 'public','AddToList')));

app.use('/', router);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_ADRES);
    app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
