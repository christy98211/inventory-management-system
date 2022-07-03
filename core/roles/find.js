const MODEL = require('../../model/roles/index');

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

    findByIdRole(params) {
        return new Promise((resolve, reject) => {
            console.log("#####################")
            MODEL.findOne({
                _id: params.id,
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

      /* Description: - Edit Data from database to listing */
      findById(id) {
        return new Promise((resolve, reject) => {
            const roleDocument = {
                _id: id,
            };
            console.log('## Get Role Management Update GetData 3##'+JSON.stringify(roleDocument));
            MODEL.findOne(roleDocument)
            .then((success) => {
                const data = {
                    status: 200,
                    message: 'Data For Edit Displayed',
                    data: success,
                };
                resolve(data);
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
