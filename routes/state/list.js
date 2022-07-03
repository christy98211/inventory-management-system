var express = require('express');
var router = express.Router();
var axios = require('axios');
const stateList = require('../../core/state/find');
const StateListObj = new stateList.FindClass();
const moment = require("moment");

const {isUserAllowed} = require('../../service/session')

/* GET state page. */
router.get('/', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    res.render('state/list/index',{ 
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
    StateListObj.findAllListing(condition)
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
  
/* GET state listing for dropdown. */
router.get('/list', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    const condition = {
        limit: 100,
        skip: 0,
        condition: "",
    }
    StateListObj.findAll(condition)
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

/* GET Single State. */
router.get('/find-one/:id', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        id : req.params.id
    }
    StateListObj.findById(params)
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


module.exports = router;
