// const bcrypt = require('bcryptjs');
// const MODEL = require('../../../models/mongo/user.js');

// const salt = bcrypt.genSaltSync(10);
// function initializeAdminUser() {
//     return new Promise((resolve, reject) => {
//         const data = [
//         {
//             name: 'Solomon Padayattil',
//             email: 'solomon@blackmilkmedia.com',
//             password: bcrypt.hashSync('admin@123', salt) || null,
//             gender: 'Female',
//             role_code: 'SUPERADMIN',
//             // role_id: '5fae197d6c2514043520f849',
//             phone_number: 9876543210,
//             is_admin: true,
//             is_active: true,
//             total_daily_goal_assign: 10,
//             total_weekly_goal_assign: 10,
//             total_monthly_goal_assign: 30,
//             productCategory: [],
//             userInfo: 'Super User',
//             videoFormatCategory: [],
//             createdBy: {
//                id: '1',
//                name: 'Admin',
//             },
//          },
//         ];
//         // CHECKS WHETHER THE COLLECTION IS EMPTY , IF YES THEN INITIALIZE IT
//         MODEL.count().then((count) => {
//             if (count === 0) {
//                 console.log('### INITIALIZE ADMIN USER RECORDS ###');
//                 MODEL.insertMany(data).then((response) => {
//                     resolve(response);
//                 }).catch((err) => {
//                     reject(err);
//                 });
//             } else {
//                 console.log('### ADMIN USER ALREADY INITIALIZED! ###');
//                 resolve(count);
//             }
//         }).catch((err) => {
//             reject(err);
//         });
//     });
// }

// module.exports = {
//     initializeAdminUser,
// };
