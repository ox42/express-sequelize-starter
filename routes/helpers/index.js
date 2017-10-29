module.exports = {

    checkLogin: asyncWrap(async (req, res, next) => {

        if (!req.user) {
            return res.redirect('/login');
        } else {

            //ok, pass the request on
            next();
        }
    }),

    checkUnauthorized: asyncWrap(async (req, res, next) => {

        if (req.user) {
            //already logged in, send to dashboard
            return res.redirect('/dashboard');
        } else {

            next();
        }
    })
};