import express from "express";
const router = express.Router();
import "../models/campground.js"
import "../schemas.js"
import "../utilities/ExpressError.js"
import "../utilities/catchAsync.js"
import "../middleware.js"
import "../cloudinary/index.js"
import Campground from "../models/campground.js";
import campgroundSchema from "../schemas.js";
import ExpressError from "../utilities/ExpressError.js";
import catchAsync from "../utilities/catchAsync.js";
import { isAuthor, isLoggedIn, validateCampground } from "../middleware.js";
import { index, renderNewForm, showCampground, renderEditForm, createCampground, updateCampground, deleteCampground } from "../controllers/campgrounds.js"
import multer from "multer"
import { storage } from "../cloudinary/index.js";
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(createCampground))
router.get("/new", isLoggedIn, renderNewForm)

router.route('/:id')
    .get(catchAsync(showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(updateCampground))
    .delete(isLoggedIn, catchAsync(deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditForm))


const campgroundroute = router
export default campgroundroute
