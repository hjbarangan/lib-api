const createBook = async (book) => {
    try {
      const { isbn } = book;
  
      await checkIfBookExists(isbn);
      await validateBook(book);
  
      const result = await addBookToDatabase(book);
      return result.rows[0];
    } catch (error) {
      console.error("Error in creating a book:", error);
      throw error;
    }
  };
  
  const checkIfBookExists = async (isbn) => {
    const checkBook = await pool.query("SELECT * FROM books WHERE isbn = $1", [isbn]);
  
    if (checkBook.rows.length > 0) {
      throw new Error("Book already exists");
    }
  };
  
  const addBookToDatabase = async (book) => {
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
      "CALL add_book($1, $2, $3, $4, $5, $6, $7)",
      [isbn, publication_year, publisher_id, title, author, category_id, pages]
    );
  
    return result;
  };
  