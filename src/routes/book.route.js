const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../queries");

router.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await getBookById(bookId);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newBook = req.body;
    const book = await createBook(newBook);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const book = await updateBook(bookId, updatedBook);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await deleteBook(bookId);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
