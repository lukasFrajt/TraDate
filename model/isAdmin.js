/**
 * Created by lukasfrajt on 20/02/2017.
 */
module.exports = function requireRole(role) {
    return function(req, res, next) {
        if(req.user){
            var appMetadata = req.user.profile._json|| {};
            var roles = appMetadata.roles || [];
            if (roles.indexOf(role) != -1) {
                next();
            } else {
                res.redirect('/unauthorized');
            }
        }
        else {
            res.redirect('/unauthorized');
        }
    }
};