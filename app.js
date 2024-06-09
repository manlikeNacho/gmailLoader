const express = require('express');
const cors = require('cors');
const { logger } = require('./utils/logger');
const session = require('express-session');
const config = require('config');
const router = require('./routes/auth.js');
const dotenv = require('dotenv')
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    logger.info(`Endpoint Called: ${req.method} - ${req.path}`);
    next();
});

app.use('/',router)

const port = process.env.PORT || 8080;

const server = app.listen(port, async () => {
    logger.info(`Listening from PORT:${port}`);
});

module.exports = { server };
