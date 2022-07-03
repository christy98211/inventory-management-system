var express = require('express');
var router = express.Router();

// const moment = require('moment');
const usersSave = require('../../core/users/save');
const UsersSaveObj = new usersSave.SaveClass();

const usersUpdate = require('../../core/users/update');
const UsersUpdateObj = new usersUpdate.UpdateClass();

const {isUserAllowed} = require('../../service/session')

router.get('/', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let id = req.query.id ? req.query.id : "";
    let view = req.query.view ?  req.query.view : "";
    if (id) {
        res.render('users/add/index', { 
            title: 'Express', 
            userData: userData, 
            roleData: roleData,
            update: true,
            view: view,
        });
    }else{
        res.render('users/add/index', { 
            title: 'Express', 
            userData: userData, 
            roleData: roleData,
            update: false,
            view: view,
        });
    }
});

router.post('/save', isUserAllowed,  (req, res, next) => {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        code: req.body.code,
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        password: req.body.password,
        role_id: req.body.role_id,
        role_code: req.body.role_code,
        product_category: req.body.product_category,
        // gender: req.body.gender,
        phone_number: req.body.phone_number,
        user_info: req.body.user_info,
        is_active: req.body.is_active,
        created_by: userData._id,
        created_name: userData.name,
    };

    UsersSaveObj.save(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Users Added Successfully',
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

router.post('/update', isUserAllowed,  (req, res, next) => {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let params = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        password: req.body.password,
        role_id: req.body.role_id,
        role_code: req.body.role_code,
        product_category: req.body.product_category,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
        user_info: req.body.user_info,
        is_active: req.body.is_active,
        updated_by: userData._id,
        updated_name: userData.name
    };

    UsersUpdateObj.update(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Users Updated Successfully',
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

    UsersUpdateObj.delete(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'User Deactivated Successfully',
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
