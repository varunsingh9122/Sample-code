const tokenServe = require('../helpers/jwt_helper');
module.exports = function permits(...roles) {
    const createError = require('http-errors')


    // const isAllowed = role => roles.indexOf(role) >-1;

    return async (req, res, next) => {
        const reqRole = roles;
        const finalToken = (req.headers.authorization || req.headers.Authorization || '').split('JWT ').pop();
        const reqToken = finalToken.replace('"', '');
        /*  
         * If token not exist Unauthorized error
         */
        if (!reqToken) {
            return next(
                createError.Unauthorized("Token does not exists.")
            );
        }

        try {
            const decodeToken = await tokenServe.verifyTokenWithPermits(reqToken);
            req.tokenData = decodeToken;
            const userRoles = decodeToken.role;
            /* !!!: 
                validating the routing permission with user permission
                if user have the permission is will show the permission  
            */
            const intersection = reqRole.filter(element => userRoles.includes(element));
            if (intersection > -1) {
                return next(
                    createError.Unauthorized("Unauthorised Access You don't have permission, Please contact your administrator.")
                );
            }else{
                console.log("user oauthorized successfully.")
                next();
            }
        } catch (err) {
            next(err);
        }

    };
}