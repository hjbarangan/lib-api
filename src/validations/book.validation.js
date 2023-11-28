const validateBook = async (book) => {
  const {
    isbn,
    publication_year,
    publisher_id,
    title,
    author,
    category_id,
    pages,
  } = book;

  if (!isbn) {
    throw new Error("Missing required field: ISBN");
  }

  if (!publication_year) {
    throw new Error("Missing required field: Publication Year");
  }

  if (!publisher_id) {
    throw new Error("Missing required field: Publisher");
  }

  if (!title) {
    throw new Error("Missing required field: Title");
  }

  if (!author) {
    throw new Error("Missing required field: Author");
  }

  if (!category_id) {
    throw new Error("Missing required field: Category");
  }

  if (!pages) {
    throw new Error("Missing required field: Pages");
  }
};

module.exports = validateBook;
