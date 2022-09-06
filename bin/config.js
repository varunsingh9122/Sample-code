const dotenv = require('dotenv');
const path = require('path');

if(process.env.NODE_ENV){
    dotenv.config({
        path: path.resolve(`${process.env.NODE_ENV}.env`)
    });
}else{
    dotenv.config({
        path: path.resolve(`development.env`)
    });
}

// console.log("env path... ", `${process.env.NODE_ENV}.env`)
// console.log("Server started as", process.env.NODE_ENV, '', process.env.PORT)
// module.exports = {
//     NODE_ENV : process.env.NODE_ENV || 'development',
//     HOST : process.env.HOST || 'localhost',
//     PORT : process.env.PORT || 3007
// }