const client = require("./client");

async function createReview({ carts_id, reviewTitle, reviewComment }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            INSERT INTO reviews(carts_id, review_title, review_comments)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
      [carts_id, reviewTitle, reviewComment]
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
    return review;
  } catch (error) {
    console.error("Error Getting review", error);
    throw error;
  }
}
async function getReviewsByCartId({ carts_id }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            SELECT *
            FROM reviews
            WHERE carts_id = $1;
            `,
      [carts_id]
    );
    return review;
  } catch (error) {
    console.error("Error Getting review", error);
    throw error;
  }
}

async function updateReview({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [review],
    } = await client.query(
      `Update reviews
        SET ${setString}
        WHERE id=${id}
        RETURNING *`,
      object.values(fields)
    );
    return review;
  } catch (error) {
    console.error("Error Retrieving review", error);
    throw error;
  }
}

async function destroyReview({ id, reviewTitle }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `DELETE FROM reviews
            WHERE "id" =${id} AND "reviewTitle" =${reviewTitle}`
    );
    return true;
  } catch (error) {
    console.error("Error deleting review", error);
  }
}

//export functions

module.exports = {
  createReview,
  getReviewsById,
  getReviewsByCartId,
  destroyReview,
  updateReview,
};
