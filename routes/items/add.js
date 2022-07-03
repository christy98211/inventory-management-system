var express = require('express');
var router = express.Router();

// const moment = require('moment');
const itemsSave = require('../../core/items/save');
const ItemsSaveObj = new itemsSave.SaveClass();

const itemsUpdate = require('../../core/items/update');
const ItemsUpdateObj = new itemsUpdate.UpdateClass();

 const {isUserAllowed} = require('../../service/session')
 
router.get('/', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let id = req.query.id ? req.query.id : "";
    let view = req.query.view ?  req.query.view : "";
    if (id) {
        res.render('items/add/index', { 
            title: 'Express', 
            userData: userData, 
            roleData: roleData,
            update: true,
            view: view, 
        });
    }else{
        res.render('items/add/index', { 
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
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        rate: req.body.rate,
        quantity: req.body.quantity, 
        description: req.body.description,
        is_active: req.body.is_active,
        created_by: userData._id,
        created_name: userData.name,
    };

    ItemsSaveObj.save(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Items Added Successfully',
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
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        rate: req.body.rate,
        quantity: req.body.quantity,
        description: req.body.description,
        is_active: req.body.is_active,
        updated_by: userData._id,
        updated_name: userData.name,
    };

    ItemsUpdateObj.update(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Items Updated Successfully',
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

    ItemsUpdateObj.delete(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'Items Deactivated Successfully',
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
