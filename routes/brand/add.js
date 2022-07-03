var express = require('express');
var router = express.Router();

// const moment = require('moment');
const brandSave = require('../../core/brand/save');
const BrandSaveObj = new brandSave.SaveClass();

const brandUpdate = require('../../core/brand/update');
const BrandUpdateObj = new brandUpdate.UpdateClass();

 const {isUserAllowed} = require('../../service/session')

router.get('/', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let id = req.query.id ? req.query.id : "";
    let view = req.query.view ?  req.query.view : "";
    if (id) {
        res.render('brand/add/index', { 
            title: 'Express', 
            userData: userData, 
            roleData: roleData,
            update: true,
            view: view,
        });
    }else{
        res.render('brand/add/index', { 
            title: 'Express', 
            userData: userData, 
            roleData: roleData,
            update: false,
            view: view,
        });
    }
});

router.post('/save', isUserAllowed, (req, res, next) => {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.is_active,
        created_by: userData._id,
        created_name: userData.name,
    };

    BrandSaveObj.save(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Brand Added Successfully',
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

router.post('/update', isUserAllowed, (req, res, next) => {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.is_active,
        updated_by: userData._id,
        updated_name: userData.name,
    };

    BrandUpdateObj.update(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Brand Updated Successfully',
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

router.post('/delete', isUserAllowed, (req, res, next) => {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        id: req.body.id,
        is_active: false,
    };

    BrandUpdateObj.delete(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Brand Deactivated Successfully',
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
