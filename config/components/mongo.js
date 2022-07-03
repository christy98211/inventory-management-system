const mongoose = require('mongoose');
const config = require('../../config/config.json');
const constants = require('../../config/constants');

const { DATABASE_MONGO_PREFIX } = constants;

module.exports = {
    bootstrap: () => {
        const mongodb = config.mongodb[process.env.NODE_ENV];

        // const connectionString = `${DATABASE_MONGO_PREFIX}${mongodb.host}:${mongodb.port}/${mongodb.database}`;
        const connectionString = `${mongodb.url}`;
        console.log(`Mongo connectionString: ${connectionString}  Retries> ${Number.MAX_VALUE}`);
      
        const options = {
            server: {
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000
            },
            useNewUrlParser: true
        };
        mongoose.connect(connectionString, options)
            .then((db) => {
                console.log(`Connected to MongoDB! ${db} ENV: ${[process.env.NODE_ENV]}`);
                // connectionString.close();
            })
            .catch((err) => {
                if (err) {
                    console.log(`Unable to connect MongoDB ${err}`);
                }
            });
            
    },
    config: null,
};
