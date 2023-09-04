const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DbConn = require('./Dbconn');
const Controller = require('./Controller/Control');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', Controller);

dotenv.config();

DbConn();

app.listen(4000, () => {
    console.log('server is running !!');
})