const pool = require("./db");
const validateBook = require("./validations/book.validation");
const validateUser = require("./validations/user.validation");

const getAllBooks = async () => {
  try {
    const result = await pool.query("SELECT * FROM v_books");
    return result.rows;
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    throw error;
  }
};

const getBookById = async (bookId) => {
  try {
    const result = await pool.query("SELECT * FROM books where book_id = $1", [
      bookId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in getting book by ID:", error);
    throw error;
  }
};

const createBook = async (book) => {
  try {
    const {
      isbn,
      publication_year,
      publisher_id,
      title,
      author,
      category_id,
      pages,
    } = book;

    const checkBook = await pool.query("SELECT * FROM books WHERE isbn = $1", [
      isbn,
    ]);

    if (checkBook.rows.length > 0) {
      throw new Error("Book already exists");
    }

    await validateBook(book);

    const result = await pool.query(
      "CALL add_book($1, $2, $3, $4, $5, $6, $7)",
      [isbn, publication_year, publisher_id, title, author, category_id, pages]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in creating a book:", error);
    throw error;
  }
};

const updateBook = async (bookId, book) => {
  try {
    const {
      isbn,
      publication_year,
      publisher_id,
      title,
      author,
      category_id,
      pages,
    } = book;
    const result = await pool.query(
      "CALL update_book($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        bookId,
        isbn,
        publication_year,
        publisher_id,
        title,
        author,
        category_id,
        pages,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in updating the books:", error);
    throw error;
  }
};

const deleteBook = async (bookId) => {
  try {
    const result = await pool.query("CALL delete_book($1)", [bookId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in deleteBook:", error);
    throw error;
  }
};

const getAllCategories = async () => {
  try {
    const result = await pool.query("SELECT * FROM category");
    return result.rows;
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    throw error;
  }
};

const getAllPublishers = async () => {
  try {
    const result = await pool.query("SELECT * FROM publisher");
    return result.rows;
  } catch (error) {
    console.error("Error in getAllPublishers:", error);
    throw error;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM category where category_id = $1",
      [categoryId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in getCategoryById:", error);
    throw error;
  }
};

const getPublisherById = async (publisherId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM publisher where publisher_id = $1",
      [publisherId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in getPublisherById:", error);
    throw error;
  }
};

const createCategory = async (category) => {
  try {
    const { category_name } = category;
    const result = await pool.query("CALL add_category($1)", [category_name]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in createCategory:", error);
    throw error;
  }
};

const createPublisher = async (publisher) => {
  try {
    const { publisher_name, publisher_location } = publisher;
    console.log(
      "🚀 ~ file: queries.js:109 ~ createPublisher ~ publisher:",
      publisher
    );
    const result = await pool.query("CALL add_publisher($1, $2)", [
      publisher_name,
      publisher_location,
    ]);
    return result;
  } catch (error) {
    console.error("Error in createPublisher:", error);
    throw error;
  }
};

const updateCategory = async (categoryId, category) => {
  try {
    const { category_name } = category;
    const result = await pool.query("CALL update_category($1, $2)", [
      categoryId,
      category_name,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in updateCategory:", error);
    throw error;
  }
};

const updatePublisher = async (publisher_id, publisher) => {
  try {
    const { publisher_name, publisher_location } = publisher;
    const result = await pool.query("CALL update_publisher($1, $2, $3)", [
      publisher_id,
      publisher_name,
      publisher_location,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in updatePublisher:", error);
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const result = await pool.query("CALL delete_category($1)", [categoryId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    throw error;
  }
};

const deletePublisher = async (publisherId) => {
  try {
    const result = await pool.query("CALL delete_publisher($1)", [publisherId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in deletePublisher:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM v_user");
    return result.rows;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM user_account where user_id = $1",
      [userId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
};

const createUser = async (user) => {
  try {
    const { first_name, last_name, username, password, birthdate, role } = user;

    const checkUser = await pool.query(
      "SELECT * FROM user_account WHERE username = $1",
      [username]
    );

    if (checkUser.rows.length > 0) {
      throw new Error("User already exists");
    }

    await validateUser(user);

    const result = await pool.query(
      "CALL add_useraccount($1, $2, $3, $4, $5, $6)",
      [first_name, last_name, username, password, birthdate, role]
    );
    return result;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

const updateUser = async (user_id, user) => {
  try {
    const { first_name, last_name, username, password, birthdate, role } = user;
    const result = await pool.query(
      "CALL update_useraccount($1, $2, $3, $4, $5, $6)",
      [user_id, first_name, last_name, username, password, birthdate, role]
    );
    return result;
  } catch (error) {
    console.error("Error in updating the user:", error);
    throw error;
  }
};
const deleteUser = async (user_id) => {
  try {
    const result = await pool.query("CALL delete_useraccount($1)", [user_id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
};

const getAllBorrowedBooks = async () => {
  try {
    const result = await pool.query("SELECT * FROM v_record");
    return result.rows;
  } catch (error) {
    console.error("Error in getAllBorrowedBooks:", error);
    throw error;
  }
};

const updateOverdueStatus = async (bookId) => {
  try {
    const result = await pool.query(
      "UPDATE borrow_record SET status = 'Overdue' WHERE copy_id = $1",
      [bookId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error in updateOverdueStatus:", error);
    throw error;
  }
};

const getUnreturnedBorrowedBooks = async () => {
  try {
    const result = await pool.query("SELECT * FROM v_unreturnedbooks");
    return result.rows;
  } catch (error) {
    console.error("Error in getUnreturnedBorrowedBooks:", error);
    throw error;
  }
};

const getBorrowedBookById = async (borrowedBookId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM borrow_record where borrow_id = $1",
      [borrowedBookId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in getBorrowedBookById:", error);
    throw error;
  }
};

const createBorrowedBook = async (borrowedBook) => {
  try {
    const { copy_id, user_id, borrow_date, returned_date, status } =
      borrowedBook;
    const result = await pool.query(
      "CALL add_borrowrecord($1, $2, $3, $4, $5)",
      [copy_id, user_id, borrow_date, returned_date, status]
    );
    return result;
  } catch (error) {
    console.error("Error in creating the borrowed books:", error);
    throw error;
  }
};

const updateBorrowedBook = async (book_record_id, borrowedBook) => {
  try {
    const { copy_id, user_id, borrow_date, returned_date, status } =
      borrowedBook;
    const result = await pool.query(
      "CALL update_borrowrecord($1, $2, $3, $4, $5, $6)",
      [book_record_id, copy_id, user_id, borrow_date, returned_date, status]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in updating the borrowed books:", error);
    throw error;
  }
};

const addCopy = async (copy) => {
  try {
    const { book_id, status } = copy;
    const result = await pool.query("CALL add_copy($1, $2)", [book_id, status]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in addCopy:", error);
    throw error;
  }
};

const updateCopy = async (copy_id, copy) => {
  try {
    const { book_id, status } = copy;
    const result = await pool.query("CALL update_copy($1, $2, $3)", [
      copy_id,
      book_id,
      status,
    ]);
    return result;
  } catch (error) {
    console.error("Error in updateCopy:", error);
    throw error;
  }
};

const deleteCopy = async (copyId) => {
  try {
    const result = await pool.query("CALL delete_copy($1)", [copyId]);
    return result.rows;
  } catch (error) {
    console.error("Error in deleteCopy:", error);
    throw error;
  }
};

const getAllBookCopies = async () => {
  try {
    const result = await pool.query("SELECT * FROM v_copies");
    return result.rows;
  } catch (error) {
    console.error("Error in getBookCopies:", error);
    throw error;
  }
};

module.exports = {
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
  getAllBorrowedBooks,
  getUnreturnedBorrowedBooks,
  getBorrowedBookById,
  createBorrowedBook,
  updateBorrowedBook,
  addCopy,
  updateCopy,
  deleteCopy,
  getAllBookCopies,
  updateOverdueStatus
};
