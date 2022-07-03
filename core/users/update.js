const MODEL = require('../../model/users/index');

class Update {
    update(params) {
        return new Promise((resolve, reject) => {
            console.log('Update ----> Core', params)
            MODEL.findOneAndUpdate({
                _id: params.id,
            }, params).then((response) => {
                console.log('response', response);
                if (response === null) throw new Error(404);
                resolve(response);
            }).catch((err) => {
                console.error('ERROR : core || v1 || location :: update || Update() : ', err);
                reject(err);
            });
        });
    }

    delete(params) {
        return new Promise((resolve, reject) => {
            console.log('Update ----> Core', params)
            MODEL.deleteOne({
                _id: params.id,
            }, params).then((response) => {
                console.log('response', response);
                if (response === null) throw new Error(404);
                resolve(response);
            }).catch((err) => {
                console.error('ERROR : core || v1 || location :: update || Update() : ', err);
                reject(err);
            });
        });
    }
}

module.exports = {
    UpdateClass: Update,
};
