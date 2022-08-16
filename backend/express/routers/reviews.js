const express = require("express");
const reviewsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { destroyReview, getCartsProductsById, createReview, getReviewsByCartId, updateReview, getReviewsById } = require("../../db");

reviewsRouter.post("/create", async (req, res, next) => {
  const { carts_id, reviewTitle, reviewComment } = req.body
    console.log("Req.BODY HERE ", req.body)
    try {
      const _review = await getReviewsByCartId(carts_id);
      // console.log("THIS IS A NEW ACTIVITY", name)
  
      if (_review) {
        res.send({
          name: "ReviewExistsError",
          message: `A review with for this product already exists`,
          error: "Error Review Already Exists..",
        });
      } else {
        const review = await createReview({ carts_id, reviewTitle, reviewComment });
        // console.log ("THIS IS THE NEW REVIEW ", review )
        res.send(review);
      }
    } catch (error) {
      next(error);
    }
  });

  reviewsRouter.get("/review", async (req, res) => {
    
  })

  module.exports = reviewsRouter;