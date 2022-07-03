var express = require('express');
var router = express.Router();

// const moment = require('moment');
const customersSave = require('../../core/customers/save');
const CustomersSaveObj = new customersSave.SaveClass();

const customersUpdate = require('../../core/customers/update');
const CustomersUpdateObj = new customersUpdate.UpdateClass();

 const {isUserAllowed} = require('../../service/session')

router.get('/', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let id = req.query.id ? req.query.id : "";
    let view = req.query.view ?  req.query.view : "";
    if (id) {
        res.render('customers/add/index', { 
            title: 'Express', 
            userData: userData, 
            roleData: roleData,
            update: true,
            view: view,
        });
    }else{
        res.render('customers/add/index', { 
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
        customer_id: req.body.customer_id,
        customer_name: req.body.customer_name,
        address: req.body.address,
        contact: req.body.contact,
        description: req.body.description,
        is_active: req.body.is_active,
        created_by: userData._id,
        created_name: userData.name,
    };

    CustomersSaveObj.save(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Customer Added Successfully',
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
        customer_id: req.body.customer_id,
        customer_name: req.body.customer_name,
        address: req.body.address,
        contact: req.body.contact, 
        description: req.body.description,
        is_active: req.body.is_active,
        updated_by: userData._id,
        updated_name: userData.name,
    };

    CustomersUpdateObj.update(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Customer Updated Successfully',
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

    CustomersUpdateObj.delete(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Customer Deactivated Successfully',
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
