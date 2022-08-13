const client = require("./client");

async function createReview({ user_id, reviewTitle, reviewComment }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            INSERT INTO review(user_id, review_title, review_comment)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
      [user_id, reviewTitle, reviewComment]
    );

    console.log(review);
    return review;
  } catch (error) {
    console.error("Error Creating Review", error);
    throw error;
  }
}

async function getReviewsById({ id }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            SELECT *
            FROM review
            WHERE id = $1;
            `,
      [id]
    );
  } catch (error) {
    console.error("Error Getting review", error);
    throw error;
  }
}

//export functions

module.exports = {
  createReview,
  getReviewsById,
};
