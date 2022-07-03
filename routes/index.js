const express = require('express');

// const bcrypt = require('bcrypt');

const router = express.Router();

const usersList = require('../core/users/find');
const UsersListObj = new usersList.FindClass();

const rolesList = require('../core/roles/find');
const RolesListObj = new rolesList.FindClass();

/* GET home page. */
router.get('/', (req, res, next) => {
  // CHECK FOR USER SESSION IF DATA IS PRESENT THEN REDIRECT TO DASHBOARD OR REDIRECT TO LOGIN
  if(req.session.userData){
    res.redirect('/dashboard');
  }else{
    res.render('login/auth-login', { title: 'Express' });
  }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
   console.log(`SESSION DESTROYED>>> ${JSON.stringify(req.session)}`);
   res.redirect('/')
});

router.post('/authenticate_user', (req, res, next) => {
   console.log('POST AUTH CALLED');
   const bodyParams = {
      username: req.body.username,
      password: req.body.password,
   }
   const responseObj = {};
    //** Check if username and password exists */
    UsersListObj.validateUser(bodyParams).then((validateResponse) => {
        console.log(`OUT SIDE VALIDATE USER DONE NEXT> ${JSON.stringify(validateResponse)}`);
        // if(validateResponse.status === 200 && bcrypt.compareSync(bodyParams.password, validateResponse.data.password)){
        if(validateResponse.status === 200 && (bodyParams.password == validateResponse.data.password)){
          console.log(`VALIDATION SUCCESSFUL`);
          responseObj.status = 200;
          responseObj.data = validateResponse.data;
          console.log(validateResponse)
          RolesListObj.findById(validateResponse.data.role_id)
          .then((roleResponse) => {
              console.log(`ROLE RESPONSE: ${JSON.stringify(roleResponse.data)}`);
              console.log(`validateResponse.data>>> ${JSON.stringify(validateResponse.data)}`);
              //session
              try{
                req.session.userData = validateResponse.data;
                console.log('####userData SET########');
                console.log("session",req.session)

              }catch(ex){
                console.log(`EXCEPTION IN SETTING req.session.userData: ${ex}`);
              }
              try{
                req.session.roleData = roleResponse.data;
                console.log('####roleData SET########');
                console.log("session",req.session)

              }catch(ex){
                console.log(`EXCEPTION IN SETTING req.roleResponse.userData: ${ex}`)
              }
              // console.log("responseObj",responseObj)
              res.send(responseObj)
          })
          .catch((err)=>{
            console.log("error",err)
          })
          
        }else{
            console.log(`VALIDATION FAIL!!`);
            responseObj.status = 401;
            responseObj.data = null;
            res.send(responseObj)
        }
    })
});


module.exports = router;
