const express = require("express");
const router = express.Router();

const {
  getAllBorrowedBooks,
  getUnreturnedBorrowedBooks,
  getBorrowedBookById,
  createBorrowedBook,
  updateBorrowedBook,
  updateOverdueStatus,
} = require("../queries");

const checkAndUpdateOverdueStatus = async () => {
  try {
    const borrowedBooks = await getAllBorrowedBooks();

    const currentDate = new Date();

    for (const book of borrowedBooks) {
      const dueDate = new Date(book.borrowed_date);

      dueDate.setDate(dueDate.getDate() + 7);

      if (currentDate > dueDate && book.returned_date === null) {
        await updateOverdueStatus(book.copy_id);
      }
    }
  } catch (error) {
    console.error("Error in checkAndUpdateOverdueStatus:", error);
    throw error;
  }
};

router.get("/", async (req, res) => {
  try {
    await checkAndUpdateOverdueStatus();

    const borrowedBooks = await getAllBorrowedBooks();
    res.json(borrowedBooks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const borrowedBooks = await getAllBorrowedBooks();
//     res.json(borrowedBooks);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

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

router.put("/change-status/:borrowedBookId", async (req, res) => {
  try {
    const { borrowedBookId } = req.params;
    const borrowedBook = await updateBorrowedBook(req.body, borrowedBookId);
    res.json(borrowedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
