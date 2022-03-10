import { createRequire } from "module";
const require = createRequire(import.meta.url)
import "../models/campground.js"
import "../cloudinary/index.js"
import Campground from "../models/campground.js";
import cloudinary from "../cloudinary/index.js";
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = 'pk.eyJ1Ijoiaml0ZXNoMjJzZHNkcyIsImEiOiJjbDBnOTNjZm8wemEzM2RreG9lMjh6aW9iIn0.WpnExGMY4JapmvVb1Kr9cw'
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });


export const index = async (req, res) => {
    const campgrounds = await Campground.find({});

    res.render('campgrounds/index', { campgrounds: campgrounds })
}

export const renderNewForm = (req, res) => {
    res.render("campgrounds/new")
}
export const showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash("error", "cannot find Campground")
        return res.redirect("/campgrounds")
    }
    res.render('campgrounds/show', { campground: campground })
}
export const renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash("error", "cannot find Campground")
        return res.redirect("/campgrounds")
    }
    res.render('campgrounds/edit', { campground: campground })
}


export const createCampground = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    if (!req.body.campground) throw new ExpressError("Invalid Campground", 400)
    const campground = new Campground(req.body.campground)
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id;
    await campground.save();
    // console.log(campground)
    req.flash("success", "Successfully Created Campground")
    res.redirect(`/campgrounds/${campground._id}`)
}
export const updateCampground = async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    console.log(campground)
    req.flash("success", "Successfully Updated Campground")

    res.redirect(`/campgrounds/${campground._id}`)

}
export const deleteCampground = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully Deleted Campground")

    res.redirect(`/campgrounds`)



}