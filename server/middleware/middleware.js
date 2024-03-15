// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// const middleware = (req, res, next) => {
//     // const {token} = req.body;
//     console.log(req.body);

//     try{
//         jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
//             if(err){
//                 console.log(err);
//             }

//             req.user = data;
//             next();
//         })
//     } catch(err){
//         console.log(err);
//     }
// }

// module.exports = middleware;