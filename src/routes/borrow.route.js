const express = require("express");
const router = express.Router();

const {
  getAllBorrowedBooks,
  getUnreturnedBorrowedBooks,
  getBorrowedBookById,
  createBorrowedBook,
  updateBorrowedBook,
} = require("../queries");

router.get("/", async (req, res) => {
  try {
    const borrowedBooks = await getAllBorrowedBooks();
    res.json(borrowedBooks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/unreturned", async (req, res) => {
  try {
    const borrowedBooks = await getUnreturnedBorrowedBooks();
    res.json(borrowedBooks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:borrowedBookId", async (req, res) => {
  try {
    const { borrowedBookId } = req.params;
    const borrowedBook = await getBorrowedBookById(borrowedBookId);
    res.json(borrowedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const borrowedBook = await createBorrowedBook(req.body);
    res.json(borrowedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:borrowedBookId", async (req, res) => {
  try {
    const { borrowedBookId } = req.params;
    const borrowedBook = await updateBorrowedBook(borrowedBookId, req.body);
    res.json(borrowedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
