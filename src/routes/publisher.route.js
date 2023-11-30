const express = require("express");
const router = express.Router();
const { getAllPublishers, getPublisherById, createPublisher, updatePublisher, deletePublisher } = require("../queries");

router.get("/", async (req, res) => {
    try {
      const publishers = await getAllPublishers();
      res.json(publishers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const publisherId = req.params.id;
      const publisher = await getPublisherById(publisherId);
      res.json(publisher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const newPublisher = req.body;
      const publisher = await createPublisher(newPublisher);
      res.json(publisher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const publisherId = req.params.id;
      const updatedPublisher = req.body;
      const publisher = await updatePublisher(publisherId, updatedPublisher);
      res.json(publisher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const publisherId = req.params.id;
      const publisher = await deletePublisher(publisherId);
      res.json(publisher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  
  module.exports = router;
  