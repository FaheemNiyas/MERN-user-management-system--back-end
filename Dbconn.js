const mongoose = require('mongoose');

const Dbconn = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log('CRUD database is connected !')
        ).catch((err) => console.log(err));
}

module.exports = Dbconn 