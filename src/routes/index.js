const express = require("express");
const router = express.Router();

const booksRoutes = require("./book.route");
const categoriesRoutes = require("./category.route");
const publishersRoutes = require("./publisher.route");
const usersRoutes = require("./user.route");
const borrowRoutes = require("./borrow.route");
const copyRoutes = require("./copy.route");
const authRoutes = require("./auth.route");

const authMiddleware = require("../middleware/auth.middleware");

// router.use("/books", authMiddleware, booksRoutes);
router.use("/books", authMiddleware, booksRoutes);
router.use("/categories",  authMiddleware, categoriesRoutes);
router.use("/publishers",  authMiddleware, publishersRoutes);
router.use("/users",  authMiddleware, usersRoutes);
router.use("/borrow-records",  authMiddleware, borrowRoutes);
router.use("/copies", authMiddleware, copyRoutes);
router.use("/login", authRoutes);

module.exports = router;
