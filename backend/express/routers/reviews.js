const express = require("express");
const reviewsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { destroyReview, getCartsProductsById, createReview, getReviewsByCartId, updateReview, getReviewsById, getReviewsByUserId } = require("../../db");

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

  reviewsRouter.get("/:review_id", async (req, res) => {
    const id = req.params.review_id
    try {
    const review = await getReviewsById({id});
    res.send(review);}
    catch (error) {
      next(error);
    }
  })

  reviewsRouter.patch("/:review_id/update", async (req, res, next) => {
    try {
        const id = req.params.review_id;
        console.log("id: ",id)
        const { review_title, review_comments } = req.body;
        console.log("req.body: ", req.body);
        const _review = await getReviewsById({id});
        console.log("_review: ", _review);
  
        if (!_review) {
          res.send({
            name: "review doesn't exist",
            message: `This Review doesn't exist`,
            error: "Error review doesn't exist..",
          });
        }
 
        const updateField = {};
        if (review_title) {
          updateField.review_title = review_title;
        }
    
        if (review_comments) {
          updateField.review_comments = review_comments;
        }
        const updatedReview = await updateReview({
          id: id,
          review_title: review_title,
          review_comments: review_comments,
        });
        // console.log("THIS IS THE UPDATED ACTIVITY TO SEND BACK: ", updatedActivity);
        res.send(updatedReview);
      } catch (error) {
        next(error);
      } 
  })

  reviewsRouter.delete("/:review_id/delete", async (req, res, next) => {
    const  id  = req.params.review_id;
    console.log("78 req.body: ", req.body);
    try {
      // const _review = await getReviewsById({id});
      
      const deleteReview = await destroyReview({id});
      res.send(deleteReview);

    } catch (error) {
      next(error);
    }
  });
  module.exports = reviewsRouter;