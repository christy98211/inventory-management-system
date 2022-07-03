const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    console.log(" *** login routes hit ** ")
    res.render('login/auth-login', { 
        title: 'Express', 
        userData: userData, 
        roleData: roleData, 
    });
});

/* Description:- Get data */
router.post('/find_user',function(req,res){
    const userData = req.session.userData;
    const roleData = req.session.roleData;
    console.log("find user routes hit"+JSON.stringify(req.body));
  /* var params = {
        username = req.body.username,
        password = req.body.password
    }*/
    var json = {
        status:200,
        message:"Login Successfull !!"
    }
    res.send(json);
});

module.exports = router;
