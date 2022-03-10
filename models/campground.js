import mongoose from "mongoose";
import "./review.js"
import Review from "./review.js";




const Schema = mongoose.Schema
const ImageSchema = new Schema({
    url: String,
    filename: String

})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})
const opts = { toJSON: { virtuals: true } };
const CampgroundSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    discription: String,
    location: String,
    reviews: [{
        type: Schema.Types.ObjectId, ref: "Review"

    }]
},opts)
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>`
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
const Campground = mongoose.model("Campground", CampgroundSchema)

export default Campground








