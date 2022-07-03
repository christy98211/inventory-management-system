const MODEL = require('../../model/users/index');

class Find {
    findAll(params) {
        console.log(' params findAll', params);
        return new Promise((resolve, reject) => {
            MODEL.find()
                .populate('created_by', ['name', 'code'])
                .skip(params.skip).limit(params.limit)
                .sort({ _id: -1 })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    findAllListing(params){
        return new Promise((resolve, reject) => {
            let option = params.searchTerm != "" ? {
                $or :[
                    { $or : [ { name : { $regex : new RegExp(params.searchTerm, "i") }, } ] },
                 ]
                }
                :{}

            console.log("rejex",option)
            MODEL
                .aggregate([
                    {
                        $sort: {
                            _id: -1
                        }
                    },
                    {
                        $lookup: 
                        {
                            from: 'users', 
                            localField: 'created_by', 
                            foreignField: '_id', 
                            as: 'user'
                       } 
                   },  
                    {
                        $match: option
                    },
                    {
                        $facet: {
                            rows: [{
                                    "$skip": params.offset
                                },
                                {
                                    "$limit": params.limit
                                }
                            ],
                            totalRecord: [{
                                $group: {
                                    _id: null,
                                    count: {
                                        $sum: 1
                                    }
                                }
                            }]
                        }
                    }
                ]).then((success) => {
                    resolve(success);
                })
                .catch((err) => {
                    console.log("error",err)
                    reject(err);
                });
        });
    }
    
     /* Description: - User Validation While creating user validation */
     validateUser(params) {
        return new Promise((resolve, reject) => {
            const obj = {};
            MODEL.findOne({ 
                 $or: [ { name: params.username }, { email: params.username } ]
            })
                .then((success) => {
                    console.log(`VALIDATE USER RESPONSE: ${JSON.stringify(success)}`);
                    if(success){
                        obj.status = 200;
                        obj.message = 'user found';
                        obj.data = success;
                        resolve(obj);
                    }else{
                        obj.status = 401;
                        obj.message = 'No data found';
                        obj.data = null;
                        resolve(obj);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }


    count(params) {
        return new Promise((resolve, reject) => {
            MODEL.count(params.condition)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    findById(params) {
        return new Promise((resolve, reject) => {
            MODEL.findOne({
                _id: params.id,
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    findByCode(params) {
        return new Promise((resolve, reject) => {
            MODEL.findOne({
                code: params.code,
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    findLocationByName(params) {
        return new Promise((resolve, reject) => {
            MODEL.findOne({
                name: params,
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

module.exports = {
    FindClass: Find,
};
