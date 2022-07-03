const MODEL = require('../../model/customers/index');

class Save { 
    save(params) {
        console.error('ERROR : core || v1 || location || params() : ', params);

        return new Promise((resolve, reject) => {
            MODEL.insertMany(params).then((response) => {
                resolve(response);
            }).catch((err) => {
                console.error('ERROR : core || v1 || location || savelocation() : ', err);
                reject(err);
            });
        });
    }
}

module.exports = {
    SaveClass: Save,
};
