import { createRequire } from "module";

const require = createRequire(import.meta.url)

const mongoose = require("mongoose");
import "../models/campground.js"
import Campground from "../models/campground.js";
import "./cities.js"
import cities from "./cities.js"
import "./seedHelpers.js"
import descriptors from "./seedHelpers.js"
import land from "./seedHelpers.js"

mongoose.connect('mongodb://localhost:27017/yelcamp',

);



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6220526126e5171062885230',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(land)}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,
cities[random1000].latitude,]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dljr05ybm/image/upload/v1646627334/YelpCamp/gbr3ly9penqosqvpqavl.jpg',
                    filename: 'YelpCamp/gbr3ly9penqosqvpqavl',


                },
                {
                    url: 'https://res.cloudinary.com/dljr05ybm/image/upload/v1646627437/YelpCamp/yhpydzualsvqlh8jnuxo.webp',
                    filename: 'YelpCamp/yhpydzualsvqlh8jnuxo',

                }
            ],
            discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})