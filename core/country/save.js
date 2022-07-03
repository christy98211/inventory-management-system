const MODEL = require('../../model/country/index');

class Save {
    save(params) {
        console.error('ERROR : core || v1 || country || params() : ', params);

        return new Promise((resolve, reject) => {
            MODEL.insertMany(params).then((response) => {
                resolve(response);
            }).catch((err) => {
                console.error('ERROR : core || v1 || country || savecountry() : ', err);
                reject(err);
            });
        });
    }
}

module.exports = {
    SaveClass: Save,
};
