var express = require('express');
var router = express.Router();
var axios = require('axios');
const categoryList = require('../../core/category/find');
const CategoryListObj = new categoryList.FindClass();
const moment = require("moment");

const {isUserAllowed} = require('../../service/session')

/* GET category page. */
router.get('/', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    res.render('category/list/index',{ 
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
    CategoryListObj.findAllListing(condition)
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

/* GET category listing. */
router.get('/list', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    const condition = {
        limit: 100,
        skip: 0,
        condition: "",
    }
    CategoryListObj.findAll(condition)
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

/* GET Single category listing. */
router.get('/find-one/:id', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        id : req.params.id
    }
    CategoryListObj.findById(params)
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
