const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../queries");


router.get("/", async (req, res) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const newUser = req.body;
      const user = await createUser(newUser);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUser = req.body;
      const user = await updateUser(userId, updatedUser);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await deleteUser(userId);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
