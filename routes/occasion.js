const express = require('express')
const mongoose = require('mongoose')
const Occasion = require('../models/Occasion');
const User = require("../models/User");
const axios = require('axios');
const auth = require("../middleware/auth");

var router = express.Router();

//routes TBD

//design:
// user db : for auth and each user stores saved occasions 
// occasion db : with all saved occasions across all users

const occasionToRestaurants = {
    "date": ["Lucia's", "Eureka!", "Chez Panisse"],
    "work": ["Ippudo", "Caffe Strada", "Berkeley Thai House"],
    "quick-bite": ["La Burrita", "Seniore's", "Top Dog"],
    "friends": ["Artichoke Basille's Pizza", "Gypsy's Trattoria Italiana", "IB's"] 
}

//Client ID
//l_Qx4Bm1zznKu-A0HRU-mA

//API Key
//U9FWWqIQycgki0K8s0LPfh8yzKTrmAMrqMLcEaBBdwqhNyaCYfziMSGKu4B9GoS__OgvkNGedLswnMTO7ChBXhYu9dhHzf4YqvZKe4Q_1jNHTZu5RFwTFsxccnWoYXYx

//route for each type that gets a random restaurant from our hardcoded list
router.get("/getRestaurantBasedOnOccasion", auth, (req, res) => {
    const { occasion } = req.body;

    const restaurantName = occasionToRestaurants[occasion][Math.floor(Math.random() * 3)];
    
    axios.get("https://api.yelp.com/v3/businesses/search?term=" + restaurantName + "&location=Berkeley", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer U9FWWqIQycgki0K8s0LPfh8yzKTrmAMrqMLcEaBBdwqhNyaCYfziMSGKu4B9GoS__OgvkNGedLswnMTO7ChBXhYu9dhHzf4YqvZKe4Q_1jNHTZu5RFwTFsxccnWoYXYx',
        }
    })
    .then(response => {
        restaurant = response.data.businesses[0];
        const occasion = new Occasion({      
            name: restaurant.name,
            id: restaurant.id,
            image_url: restaurant.image_url,
            url: restaurant.url,
            rating: restaurant.rating,
            price: restaurant.price,
            categories: restaurant.categories.map(function (currentElement) {
                return currentElement.title;
            }),
            transactions: restaurant.transactions,
            phone: restaurant.phone,
        })
        occasion.save((error, document) => {
            if (error) {
                res.json({ status: "failure" })
            } else {
                res.json({
                    status: "success",
                    id: occasion.id,
                })
            }
        })})
    .catch(error => {res.send(error); })
    });

  
  


//route to add current restaurant id to user's favorites
router.post("/addToFavorites", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.favorites.push(req.body.restaurant);
        User.findByIdAndUpdate(req.user.id, {favorites : user.favorites}, (error) => {
            if (error) {
                res.json({ status: "Error in adding item" })
            } else {
              res.json(user.favorites);
          }
        });
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

//get favorites list for current user

router.get("/getFavoritesList", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.favorites);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });


//get info for restaurant given id (using hashmap between names and ids)

router.post("/getRestaurantDetails", auth, (req, res) => {
		Occasion.findOne({"id": req.body.id}, (error, occasion) => {
			if (error) {
				res.status(500).json({ status: "failure" })
			} else {
				res.json(occasion)
	        }
        })
	})



module.exports = router;
