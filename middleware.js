import "./models/campground.js"
import "./schemas.js"
import "./schemas2.js"
import "./utilities/ExpressError.js"
import "./models/review.js"
import Review from "./models/review.js";
import Campground from "./models/campground.js";
import campgroundSchema from "./schemas.js";
import ExpressError from "./utilities/ExpressError.js";
import reviewsSchema from "./schemas2.js";


export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
export const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    // console.log(result);
    // console.log(error)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

export const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
export const isReviewAuthor = async (req, res, next) => {
    const { id, reviewsID } = req.params;
    const review = await Review.findById(reviewsID);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}


export const validateReview = (req, res, next) => {
    const { error } = reviewsSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }

}
