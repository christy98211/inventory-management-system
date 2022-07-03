var express = require('express');
var router = express.Router();

const {isUserAllowed} = require('../../service/session')

/* GET home page. */
router.get('/', isUserAllowed,  function(req, res, next) {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
  res.render('index',{ 
    title: 'Express', 
    userData: userData, 
    roleData: roleData, 
});
});

module.exports = router;