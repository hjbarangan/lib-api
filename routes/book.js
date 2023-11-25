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
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../queries");

router.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await getBookById(bookId);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/books", async (req, res) => {
  try {
    const newBook = req.body;
    const book = await createBook(newBook);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const book = await updateBook(bookId, updatedBook);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await deleteBook(bookId);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/categories", async (req, res) => {
  try {
    const newCategory = req.body;
    const category = await createCategory(newCategory);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/categories/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = req.body;
    const category = await updateCategory(categoryId, updatedCategory);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await deleteCategory(categoryId);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/publishers", async (req, res) => {
  try {
    const publishers = await getAllPublishers();
    res.json(publishers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/publishers/:id", async (req, res) => {
  try {
    const publisherId = req.params.id;
    const publisher = await getPublisherById(publisherId);
    res.json(publisher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/publishers", async (req, res) => {
  try {
    const newPublisher = req.body;
    const publisher = await createPublisher(newPublisher);
    res.json(publisher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/publishers/:id", async (req, res) => {
  try {
    const publisherId = req.params.id;
    const updatedPublisher = req.body;
    const publisher = await updatePublisher(publisherId, updatedPublisher);
    res.json(publisher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/publishers/:id", async (req, res) => {
  try {
    const publisherId = req.params.id;
    const publisher = await deletePublisher(publisherId);
    res.json(publisher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const newUser = req.body;
    const user = await createUser(newUser);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await updateUser(userId, updatedUser);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await deleteUser(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
