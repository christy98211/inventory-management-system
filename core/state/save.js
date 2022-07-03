const MODEL = require('../../model/state/index');

class Save {
    save(params) {
        console.error('ERROR : core || v1 || state || params() : ', params);

        return new Promise((resolve, reject) => {
            MODEL.insertMany(params).then((response) => {
                resolve(response);
            }).catch((err) => {
                console.error('ERROR : core || v1 || state || savestate() : ', err);
                reject(err);
            });
        });
    }
}

module.exports = {
    SaveClass: Save,
};
