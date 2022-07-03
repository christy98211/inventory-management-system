exports.isUserAllowed = (req, res, next) => {
    sess = req.session;
    if (sess.userData) {
          return next();
    }
    else { res.redirect('/'); }
}

