var express = require('express');
var router = express.Router();
const axios = require('axios');


const locationList = require('../../core/location/find');
const LocationListObj = new locationList.FindClass();

const {isUserAllowed} = require('../../service/session')

/* GET location page. */
router.get('/', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    res.render('location/list/index',{ 
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
    LocationListObj.findAllListing(condition)
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

/* GET location listing. */
router.get('/list', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    const condition = {
        limit: 100,
        skip: 0,
        condition: "",
    }
    LocationListObj.findAll(condition)
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

  /* GET Single location listing. */
router.get('/find-one/:id', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        id : req.params.id
    }
    LocationListObj.findById(params)
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
