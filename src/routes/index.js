const express = require("express");
const router = express.Router();

const booksRoutes = require("./book.route");
const categoriesRoutes = require("./category.route");
const publishersRoutes = require("./publisher.route");
const usersRoutes = require("./user.route");
const borrowRoutes = require("./borrow.route")
const copyRoutes = require("./copy.route")

router.use("/books", booksRoutes);
router.use("/categories", categoriesRoutes);
router.use("/publishers", publishersRoutes);
router.use("/users", usersRoutes);
router.use("/borrow", borrowRoutes);
router.use("/copy", copyRoutes);

module.exports = router;
