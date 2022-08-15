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
    return review;
  } catch (error) {
    console.error("Error Getting review", error);
    throw error;
  }
}
async function getReviewsByCartId({ carts_products_id }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            SELECT *
            FROM review
            WHERE carts_products_id = $1;
            `,
      [carts_products_id]
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
      `Update review
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
      `DELETE FROM review
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
