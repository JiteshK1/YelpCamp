import express from "express";
import passport from "passport";
import "../models/user.js"
import "../utilities/catchAsync.js"

import User from "../models/user.js";
import catchAsync from "../utilities/catchAsync.js";
const router = express.Router({ mergeParams: true });
import { renderRegister, Register, renderLogin, Login, Logout } from "../controllers/users.js"


router.route('/register')
    .get(renderRegister)
    .post(catchAsync(Register))

router.route('/login')
    .get(renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), Login)

router.get('/logout', Logout)

const userroute = router

export default userroute