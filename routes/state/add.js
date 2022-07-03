var express = require('express');
var router = express.Router();

// const moment = require('moment');
const stateSave = require('../../core/state/save');
const StateSaveObj = new stateSave.SaveClass();

const stateUpdate = require('../../core/state/update');
const StateUpdateObj = new stateUpdate.UpdateClass();

 const {isUserAllowed} = require('../../service/session')

router.get('/', isUserAllowed, function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    let id = req.query.id ? req.query.id : "";
    let view = req.query.view ?  req.query.view : "";
    if (id) {
        res.render('state/add/index', { 
            title: 'Express', 
            userData: userData, 
            roleData: roleData,
            update: true,
            view: view,
        });
    }else{ 
        res.render('state/add/index', { 
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

    StateSaveObj.save(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'State Added Successfully',
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

    StateUpdateObj.update(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'State Updated Successfully',
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

    StateUpdateObj.update(params)
        .then((success) => {
            var data = {
                status: 200,
                message: 'State Deactivated Successfully',
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
