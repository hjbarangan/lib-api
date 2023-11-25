const pool = require('./db');

const getAllBooks = async () => {
    const result = await pool.query('SELECT * FROM v_books');
    return result.rows;
};

const getBookById = async (bookId) => {
    const result = await pool.query('SELECT * FROM book where book_id = $1', [bookId]);
    return result.rows[0];
};

const createBook = async (book) => {
    const { isbn, publication_year, publisher_id, title, author, category_id, pages, status } = book;
    const result = await pool.query(
        'CALL add_book($1, $2, $3, $4, $5, $6, $7, $8)',
        [isbn, publication_year, publisher_id, title, author, category_id, pages, status]
    );
    return result.rows[0];
};

const updateBook = async (bookId, book) => {
    const { isbn, publication_year, publisher_id, title, author, category_id, pages, status } = book;
    const result = await pool.query(
        'CALL update_book($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [isbn, publication_year, publisher_id, title, author, category_id, pages, status, bookId]
    );
    return result.rows[0];
};

const deleteBook = async (bookId) => {
    const result = await pool.query('CALL delete_book($1)', [bookId]);
    return result.rows[0];
};

const getAllCategories = async () => {
    const result = await pool.query('SELECT * FROM category');
    return result.rows;
}

const getAllPublishers = async () => {
    const result = await pool.query('SELECT * FROM publisher');
    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const result = await pool.query('SELECT * FROM category where category_id = $1', [categoryId]);
    return result.rows[0];
}

const getPublisherById = async (publisherId) => {
    const result = await pool.query('SELECT * FROM publisher where publisher_id = $1', [publisherId]);
    return result.rows[0];
}

const createCategory = async (category) => {
    const { category_name } = category;
    const result = await pool.query(
        'CALL add_category($1)',
        [category_name]
    );
    return result.rows[0];
};

const createPublisher = async (publisher) => {
    const { publisher_name, publication_location } = publisher;
    const result = await pool.query(
        'CALL add_publisher($1, $2)',
        [publisher_name, publication_location]
    );
    return result.rows[0];
}

const updateCategory = async (categoryId, category) => {
    const { category_name } = category;
    const result = await pool.query(
        'CALL update_category($1, $2)',
        [category_name, categoryId]
    );
    return result.rows[0];
}

const updatePublisher = async (publisherId, publisher) => {
    const { publisher_name, publication_location } = publisher;
    const result = await pool.query(
        'CALL update_publisher($1, $2, $3)',
        [publisher_name, publication_location, publisherId]
    );
    return result.rows[0];
}

const deleteCategory = async (categoryId) => {
    const result = await pool.query('CALL delete_category($1)', [categoryId]);
    return result.rows[0];
}

const deletePublisher = async (publisherId) => {
    const result = await pool.query('CALL delete_publisher($1)', [publisherId]);
    return result.rows[0];
}

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
};
