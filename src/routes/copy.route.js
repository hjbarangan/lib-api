const express = require("express");
const router = express.Router();
const {
  getAllBookCopies,
  addCopy,
  updateCopy,
  deleteCopy,
} = require("../queries");

router.get("/", async (req, res) => {
  try {
    const copies = await getAllBookCopies();
    res.json(copies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCopy = req.body;
    const copy = await addCopy(newCopy);
    res.json(copy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const copyId = req.params.id;
    const updatedCopy = req.body;
    const copy = await updateCopy(copyId, updatedCopy);
    res.json(copy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const copyId = req.params.id;
    const copy = await deleteCopy(copyId);
    res.json(copy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
