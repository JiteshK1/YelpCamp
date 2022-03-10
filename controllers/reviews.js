import "../models/campground.js"
import "../models/review.js"

import Campground from "../models/campground.js";
import Review from "../models/review.js";

export const addReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}

export const deleteReview = async (req, res) => {
    const { id, reviewsID } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewsID } })
    await Review.findByIdAndDelete(reviewsID);
    req.flash("success", "Successfully Deleted Review")

    res.redirect(`/campgrounds/${id}`)
}