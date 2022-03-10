import express from "express";
const router = express.Router({ mergeParams: true });
import "../models/campground.js"
import "../utilities/catchAsync.js"
import "../models/review.js"
import "../utilities/ExpressError.js"
import "../schemas2.js"
import Campground from "../models/campground.js";
import Review from "../models/review.js";
import catchAsync from "../utilities/catchAsync.js";
import ExpressError from "../utilities/ExpressError.js";
import reviewsSchema from "../schemas2.js";
import { validateReview, isLoggedIn, isReviewAuthor } from "../middleware.js";
import { addReview, deleteReview } from "../controllers/reviews.js"



router.post("/", isLoggedIn, validateReview, catchAsync(addReview))
router.delete("/:reviewsID", isLoggedIn, isReviewAuthor, catchAsync(deleteReview))


const reviewRoute = router
export default reviewRoute