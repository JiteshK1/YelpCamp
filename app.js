import { createRequire } from "module";
const require = createRequire(import.meta.url)
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import express from "express";
import * as path from 'path'
const ejsMate = require('ejs-mate');
const app = express();
const methodOverride = require('method-override')
const __dirname = path.resolve()
import session from "express-session";
import flash from "connect-flash"
import passport from "passport";
import localStrategy from "passport-local"
import ExpressMongoSanitize from "express-mongo-sanitize";
import "./models/user.js"
import "./utilities/ExpressError.js"
import "./routes/campgrounds.js"
import "./routes/reviews.js"
import "./routes/user.js"

import ExpressError from "./utilities/ExpressError.js";
import reviewRoute from "./routes/reviews.js";
import campgroundroute from "./routes/campgrounds.js";
import User from "./models/user.js";
import userroute from "./routes/user.js";
import helmet from "helmet";
import MongoStore from "connect-mongo";
import mongoose from "mongoose"
const dburl = process.env.DB_URL;
const secret = process.env.SECRET || "thisIsMySecret"
await mongoose.connect(dburl || 'mongodb://localhost:27017/yelcamp')
    .then(() => {
        console.log(" MOngo working")

    }).catch(err => {
        console.log(" Mongo error", err)
    })






app.engine('ejs', ejsMate);

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(ExpressMongoSanitize())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const store = MongoStore.create({
    mongoUrl: dburl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
})
store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})
const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7
        , maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
// app.use(helmet()); //including this breaks the CSP

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/dv5vm4sqh/"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/dv5vm4sqh/"
];
const connectSrcUrls = [
    "https://*.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://events.mapbox.com",
    "https://res.cloudinary.com/dv5vm4sqh/"
];
const fontSrcUrls = ["https://res.cloudinary.com/dv5vm4sqh/"];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dljr05ybm/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
                "https://images.unsplash.com/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
            mediaSrc: ["https://res.cloudinary.com/dv5vm4sqh/"],
            childSrc: ["blob:"]
        }
    })
)

passport.use(new localStrategy(User.authenticate()))

// How to store or retrieve the user
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    if (!['/login', '/favicon.ico'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')

    next()
})

// app.get('/fakeUser', async (req, res) => {
//     const user = new User({
//         email: "jitesh@gmail.com",
//         username: "Jitesh"
//     })
//     const newUser = await User.register(user, "prakash")
//     res.send(newUser)
// })

app.use('/', userroute)

app.use('/campgrounds', campgroundroute)

app.use("/campgrounds/:id/reviews", reviewRoute)

app.get('/', (req, res) => {
    res.render('home')
});

app.all("*", (req, res, next) => {

    next(new ExpressError("404 Not Found!!!!!", 404))

})

app.use((err, req, res, next) => {
    const { statusCode = 505, message = "Something Went Wrond" } = err;
    if (!err.message) err.message = "EveryThing Went Wrong"
    res.status(statusCode).render("error", { err: err })

})
app.listen(3000, () => {
    console.log("LISITING ON PORT 3000")
})

