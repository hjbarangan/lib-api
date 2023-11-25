const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAllCategories,
  getAllPublishers,
  getCategoryById,
  getPublisherById,
  createCategory,
  createPublisher,
  updateCategory,
  updatePublisher,
  deleteCategory,
  deletePublisher,
} = require("../queries");

router.get("/books", async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
});

router.get("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const book = await getBookById(bookId);
  res.json(book);
});

router.post("/books", async (req, res) => {
  const newBook = req.body;
  const book = await createBook(newBook);
  res.json(book);
});

router.put("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  const book = await updateBook(bookId, updatedBook);
  res.json(book);
});

router.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const book = await deleteBook(bookId);
  res.json(book);
});

router.get("/categories", async (req, res) => {
  const categories = await getAllCategories();
  res.json(categories);
});

router.get("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);
  res.json(category);
});

router.post("/categories", async (req, res) => {
  const newCategory = req.body;
  const category = await createCategory(newCategory);
  res.json(category);
});

router.put("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  const updatedCategory = req.body;
  const category = await updateCategory(categoryId, updatedCategory);
  res.json(category);
});

router.delete("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  const category = await deleteCategory(categoryId);
  res.json(category);
});

router.get("/publishers", async (req, res) => {
  const publishers = await getAllPublishers();
  res.json(publishers);
});

router.get("/publishers/:id", async (req, res) => {
  const publisherId = req.params.id;
  const publisher = await getPublisherById(publisherId);
  res.json(publisher);
});

router.post("/publishers", async (req, res) => {
  const newPublisher = req.body;
  const publisher = await createPublisher(newPublisher);
  res.json(publisher);
});

router.put("/publishers/:id", async (req, res) => {
  const publisherId = req.params.id;
  const updatedPublisher = req.body;
  const publisher = await updatePublisher(publisherId, updatedPublisher);
  res.json(publisher);
});

router.delete("/publishers/:id", async (req, res) => {
  const publisherId = req.params.id;
  const publisher = await deletePublisher(publisherId);
  res.json(publisher);
});

module.exports = router;
