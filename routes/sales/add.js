var express = require('express');
var router = express.Router();

// const moment = require('moment');
const salesSave = require('../../core/sales/save');
const SalesSaveObj = new salesSave.SaveClass();

const salesUpdate = require('../../core/sales/update');
const SalesUpdateObj = new salesUpdate.UpdateClass();

const {isUserAllowed} = require('../../service/session')

router.get('/', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let id = req.query.id ? req.query.id : "";
    let view = req.query.view ?  req.query.view : "";
    if (id) {
        res.render('sales/add/index', { 
            title: 'Express', 
            userData: userData, 
            roleData: roleData,
            update: true,
            view: view,
        });
    }else{
        res.render('sales/add/index', { 
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
        customer_id: req.body.customer_id,
        customer_name: req.body.customer_name,
        item_name: req.body.item_name,
        item_quantity: req.body.item_quantity,
        bill_amount: req.body.bill_amount,
        description: req.body.description,
        is_active: req.body.is_active,
        created_by: userData._id,
        created_name: userData.name,
    };

    SalesSaveObj.save(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Sales Added Successfully',
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
        customer_id: req.body.customer_id,
        customer_name: req.body.customer_name,
        item_name: req.body.item_name,
        item_quantity: req.body.item_quantity,
        bill_amount: req.body.bill_amount,
        description: req.body.description,
        is_active: req.body.is_active,
        updated_by: userData._id,
        updated_name: userData.name
    };
 
    SalesUpdateObj.update(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Sales Updated Successfully',
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

    SalesUpdateObj.delete(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Sales Deactivated Successfully',
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
