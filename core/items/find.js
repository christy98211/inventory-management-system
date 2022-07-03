const MODEL = require('../../model/items/index');

class Find {
    findAll(params) { 
        console.log(' params findAll', params);
        return new Promise((resolve, reject) => {
            MODEL.find()
                .populate('created_by', ['name', 'code'])
                .populate('product_category', ['name', 'code'])
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
                    { $or : [ { product_id : { $regex : new RegExp(params.searchTerm, "i") }, } ] },
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
                    $lookup: 
                    {
                        from: 'category', 
                        localField: 'product_category', 
                        foreignField: '_id', 
                        as: 'category'
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

    findByIdAndUpdate(params) {
        console.log("parmas",params)
        return new Promise((resolve, reject) => {
            MODEL.findOneAndUpdate({
                _id: params.id,
            }, {$inc : {quantity: -params.quantity}}).then((response) => {
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

    findCount() {
        return new Promise((resolve, reject) => {
            MODEL.find({}).count().then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    findAllItem() {
        return new Promise((resolve, reject) => {
            MODEL.find({}).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    findAllItemLessThanTwenty() {
        return new Promise((resolve, reject) => {
            MODEL.find({
                quantity: {$lte : 20}
            })
            .populate('product_category', ['name', 'code'])
            .then((response) => {
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
