var express = require('express');
var router = express.Router();
var axios = require('axios');
const itemsList = require('../../core/items/find');
const ItemsListObj = new itemsList.FindClass();
const moment = require("moment");

const {isUserAllowed} = require('../../service/session')

/* GET items page. */
router.get('/', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    res.render('items/list/index',{ 
        title: 'Express', 
        userData: userData, 
        roleData: roleData, 
    }); 
});

router.get('/list-table', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    const condition = {
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset),
        searchTerm: req.query.search ? req.query.search : "",
    }
    ItemsListObj.findAllListing(condition)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Record displayed ',
                data: success,
            };
            res.send(data);
        }).catch((ex) => {
            var data = {
                status: 500,
                message: 'Internal Server error',
                data: ex,
            };
            res.send(data);
        });
})
  
/* GET Items listing for dropdown. */
router.get('/list', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    const condition = {
        limit: 100,
        skip: 0,
        condition: "",
    }
    ItemsListObj.findAll(condition)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Record displayed ',
                data: success,
            };
            res.send(data);
        }).catch((ex) => {
            var data = {
                status: 500,
                message: 'Internal Server error',
                data: ex,
            };
            res.send(data);
        });
});

/* GET Single Items. */
router.get('/find-one/:id', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        id : req.params.id
    }
    ItemsListObj.findById(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Record Fetched ',
                data: success,
            };
            res.send(data);
        }).catch((ex) => {
            var data = {
                status: 500,
                message: 'Internal Server error',
                data: ex,
            };
            res.send(data);
        });
});

/* GET Single Items. */
router.get('/find-one-reduce-quantity/:id', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        id : req.params.id,
        quantity: req.query.quantity
    }
    console.log("reduce test",params)
    ItemsListObj.findByIdAndUpdate(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Record Fetched ',
                data: success,
            };
            res.send(data);
        }).catch((ex) => {
            var data = {
                status: 500,
                message: 'Internal Server error',
                data: ex,
            };
            res.send(data);
        });
});

router.get('/find-count', isUserAllowed, function(req, res, next) {

    ItemsListObj.findCount()
        .then((success) => {
            var data = {
                status: 200,
                message: 'Count Fetched ',
                data: success,
            };
            res.send(data);
        }).catch((ex) => {
            var data = {
                status: 500,
                message: 'Internal Server error',
                data: ex,
            };
            res.send(data);
        });
});

router.get('/find-all-items', isUserAllowed, function(req, res, next) {

    ItemsListObj.findAllItem()
        .then((success) => {
            var data = {
                status: 200,
                message: 'Records Fetched ',
                data: success,
            };
            res.send(data);
        }).catch((ex) => {
            var data = {
                status: 500,
                message: 'Internal Server error',
                data: ex,
            };
            res.send(data);
        });
});

router.get('/find-all-items-less-than-twenty', isUserAllowed, function(req, res, next) {

    ItemsListObj.findAllItemLessThanTwenty()
        .then((success) => {
            var data = {
                status: 200,
                message: 'Records Fetched ',
                data: success,
            };
            res.send(data);
        }).catch((ex) => {
            var data = {
                status: 500,
                message: 'Internal Server error',
                data: ex,
            };
            res.send(data);
        });
});


module.exports = router;
 