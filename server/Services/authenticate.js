
function isLoggedIn(req, res, next)
{
    if(req.session.user) {
        return next();
    }
    res.redirect('/user/login');    
}

function verifyUser(email, password)
{
    return ( email === 'admin' && password === 'admin' );
}

export { isLoggedIn, verifyUser };