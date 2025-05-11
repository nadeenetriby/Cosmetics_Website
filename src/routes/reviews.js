const express = require("express");
const { createRev , averageRating } = require("../Controllers/reviewController ");
const authMiddleware = require("../middleware/PromoteAuthen"); 
const router = express.Router();

// Create a review
router.post("/:productId/createReviews", authMiddleware, createRev );

router.get("/reviewRate/:productId", averageRating);

module.exports = router;
