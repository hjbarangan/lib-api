const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../queries");

router.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = req.body;
    const category = await createCategory(newCategory);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = req.body;
    const category = await updateCategory(categoryId, updatedCategory);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await deleteCategory(categoryId);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
