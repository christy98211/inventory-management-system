const MODEL = require('../../model/location/index');

class Find {
    findAll(params) {
        console.log(' params findAll', params);
        return new Promise((resolve, reject) => {
            MODEL.find()
                .populate('created_by', ['name', 'code'])
                .populate('state', ['name', 'code'])
                .populate('country', ['name', 'code'])
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
                    { $or : [ { city : { $regex : new RegExp(params.searchTerm, "i") }, } ] },
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
                            from: 'state', 
                            localField: 'state', 
                            foreignField: '_id', 
                            as: 'state'
                        } 
                    },  
                    {
                        $lookup: 
                        {
                            from: 'country', 
                            localField: 'country', 
                            foreignField: '_id', 
                            as: 'country'
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
