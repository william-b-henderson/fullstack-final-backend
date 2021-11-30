const express = require('express')
const mongoose = require('mongoose')
const Occasion = require('../models/Occasion');
const User = require("../models/User")

var router = express.Router();

//routes TBD

//design:
// user db : for auth and each user stores saved occasions 
// occasion db : with all saved occasions across all users


// TODO get all occasions for given user
router.route('/get-my-occasions')
    .get((req, res) => {
        User.findById(req.query.id, (err, userProfile) => {
            const myOccasions = []
            for (const occ of userProfile.savedOccasions) {
                myOccasions.push(occ)
            }
            res.json(myOccasions)
        })
    })

// TODO add occasion to user's saved occasion list (in user db)
router.route("/create")
    .put((req, res) => {
        User.findByIdAndUpdate(req.body.id, {$push: {"savedOccasions": req.body.occasion}}, (err, userProfile) => {
            if (err) {
                res.send(err)
            } else {
                res.json(userProfile)
            }
        })
    })

// TODO remove occasion from user's saved occasion list (in user db)


// need to add event listener to "get occasion button" to use the yelp api and fetch a random restaurant from the area
//    and add this "occasion" object to our occasion database and categorize its occasion_type
//    ** we could prob fetch a list of restaurants beforehand based on location all at once, create a bunch of occasion objects
//       either by hand (or some really simple filter) instead of only fetching from the API when you click the button. 
//       There we would need to ensure no duplicates, somehow get randomness, and filter just through the API call, which I guess
//       could work

//useful yelp apis query terms: term (any search term), categories (list of supported), location (city of Berkeley), price (dollar signs)
module.exports = router
