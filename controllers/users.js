import "../models/user.js"
import User from "../models/user.js";



export const renderRegister = (req, res) => {
    res.render('users/register')
}
export const Register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registerUser = await User.register(user, password)
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash('success', 'User register successfully')
            res.redirect('/campgrounds')
        })

    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }

}

export const renderLogin = (req, res) => {
    res.render('users/login')
}
export const Login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo;
    // console.log(redirectUrl)
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}
export const Logout = (req, res) => {
    req.logOut();
    req.flash('success', "Good bye")

    res.redirect('/campgrounds')
}