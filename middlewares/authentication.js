var Auth = {
    is_login: function (req, res, next) {
    if (!req.session.is_login) {
    req.flash('msg_error', "Please log in first before access this area!");
    return res.redirect('/login');
    }
    next();
    },
   };
   module.exports = Auth;