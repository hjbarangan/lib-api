-- CREATE TABLE --
CREATE TABLE IF NOT EXISTS books (
    book_id SERIAL PRIMARY KEY,
    isbn VARCHAR(17) NOT NULL,
    publication_year INT NOT NULL,
    publisher_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    pages INT NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS copy (
    copy_id SERIAL PRIMARY KEY,
    book_id INT NOT NULL,
    status VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS publisher (
    publisher_id SERIAL PRIMARY KEY,
    publisher_name VARCHAR(255) NOT NULL,
    publisher_location VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_account (
    user_id SERIAL PRIMARY KEY,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS borrow_record (
    borrow_id SERIAL PRIMARY KEY,
    copy_id INT NOT NULL,
    user_id INT NOT NULL,
    borrow_date DATE NOT NULL,
    returned_date DATE,
    status VARCHAR(255) NOT NULL
);


-- ADD FOREIGN KEY --
ALTER TABLE books
ADD FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id),
ADD FOREIGN KEY (category_id) REFERENCES category(category_id);

ALTER TABLE borrow_record
ADD FOREIGN KEY (book_id) REFERENCES books(book_id),
ADD FOREIGN KEY (user_id) REFERENCES user_account(user_id);

ALTER TABLE copy
ADD FOREIGN KEY (book_id) REFERENCES books(book_id);


--CREATE DATA
INSERT INTO publisher (publisher_name, publisher_location)
VALUES ('Miramax Books', 'New York'),
       ('Bloomsbury', 'London'),
       ('Dutton Books','Boston'),
       ('Simon & Schuster', 'New York'),
       ('Orion Books', 'London'),
       ('Double Day', 'New York'),
       ('HarperCollins Publishers', 'New York'),
       ('Scholastic', 'New York'),
       ('Random House', 'New York'),
       ('Penguin Books', 'London');

INSERT INTO category (category_name)
VALUES ('Fiction'),
       ('Science Fiction'),
       ('Drama'),
       ('Romance'),
       ('Fantasy'),
       ('Thriller'),
       ('Literature'),
       ('Young Adult'),
       ('Classics'),
       ('Mystery');

INSERT INTO books (isbn, publication_year, publisher_id, title, author, category_id, pages)
VALUES ('978-0-7475-3269-9', 1997, 2, 'Harry Potter and the Philosophers Stone', 'J.K. Rowling', 5, 223),
       ('978-0-525-55536-0', 2017, 3, 'Turtles All the Way Down', 'John Green', 8, 286),
       ('978-1-4424-2671-9', 2014, 4, 'To All the Boys Ive Loved Before', 'Jenny Han', 8, 421),
       ('978-1-4169-6829-0', 2010, 4, 'The Summer I Turned Pretty', 'Jenny Han', 4, 276),
       ('0-7868-5629-7', 2005, 1, 'The Lightning Thief', 'Rick Riordan', 5, 377),
       ('978-0-385-53697-4', 2013, 6, 'Crazy Rich Asians', 'Kevin Kwan', 4, 403),
       ('0-06-202402-7', 2011, 7, 'Divergent', 'Veronica Roth', 2, 487, 'inactive'),
       ('978-1-432-85043-2', 2012, 5, 'Eleanor & Park', 'Rainbow Rowell', 4, 333),
       ('978-1-4169-5507-8', 2007, 4, 'City of Bones', 'Cassandra Clare', 5, 512),
       ('978-0-439-02352-8', 2008, 8, 'The Hunger Games', 'Suzanne Collins', 2, 374);

INSERT INTO copy (book_id, status)
VALUES (1, 'Overdue'),
       (2, 'Active'),
       (1, 'Borrowed'),
       (4, 'Active'),
       (4, 'Borrowed'),
       (5, 'Borrowed'),
       (4, 'Overdue'),
       (8, 'Active'),
       (8, 'Active'),
       (5, 'Overdue'),
       (4, 'Active');

INSERT INTO user_account (last_name, first_name, username, password, role)
VALUES ('Na', 'Jaemin', 'najaemin42', 'nana', 'admin'),
       ('Lee', 'Bada', 'badalee', 'bebe', 'reader'),
       ('Yu', 'Jimin', 'yujimin', 'cheesecat', 'reader'),
       ('Kwon', 'Hoshi', 'hoshikwon', 'horanghae', 'reader'),
       ('Kim', 'Jungwoo', 'jungwookim', 'puppywoo', 'reader'),
       ('Lee', 'Mark', 'marklee', 'haechan', 'admin'),
       ('Lee', 'Jeno', 'jenolee', 'samoyed', 'admin'),
       ('Shin', 'Ryujin', 'shinryujin', 'ryujin', 'reader'),
       ('Lee', 'Haechan', 'haechannie', 'haechan06', 'admin'),
       ('Jeon', 'Wonwoo', 'jeonwonwoo', 'gameboi', 'reader');

INSERT INTO borrow_record (copy_id, user_id, borrow_date, returned_date, status)
VALUES (8, 2, '2023-10-23', '2023-10-26', 'inactive'),
       (2, 1, '2023-10-26', NULL, 'active'),
       (5, 7, '2023-08-13', '2023-08-25', 'inactive'),
       (3, 10, '2023-10-18', NULL, 'active'),
       (9, 5, '2023-10-01', '2023-10-20', 'inactive'),
       (1, 9, '2023-09-01', '2023-09-08', 'inactive'),
       (6, 3, '2023-07-06', NULL, 'active'),
       (4, 6, '2023-06-06', '2023-06-28', 'inactive'),
       (7, 4, '2023-10-30', NULL, 'active'),
       (5, 2, '2023-11-03', NULL, 'active');

SELECT * FROM books;



-- add_category --
CREATE OR REPLACE PROCEDURE add_category(IN ctgry_name character varying)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT category_id
              FROM category
              WHERE category_name = ctgry_name)
    THEN
        RAISE NOTICE 'Category already exists';
    ELSE
        INSERT INTO category (category_name)
        VALUES (ctgry_name);
    END IF;

    COMMIT;
END;
$$;

-- add copy --
CREATE OR REPLACE PROCEDURE add_copy(IN copy_bookId integer, IN copy_status character varying)
    language plpgsql
as
$$
BEGIN
    INSERT INTO copy (book_id, status)
    VALUES (copy_bookId, copy_status);

    COMMIT;
END;
$$;


-- add_publisher --
CREATE OR REPLACE PROCEDURE add_publisher(IN pub_name character varying, IN pub_location character varying)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT publisher_id
              FROM publisher
              WHERE publisher_name = pub_name)
    THEN
        RAISE NOTICE 'Publisher already exists';
    ELSE
        INSERT INTO publisher (publisher_name, publisher_location)
        VALUES (pub_name, pub_location);
    END IF;

    COMMIT;
END;
$$;

-- add_book --
CREATE OR REPLACE PROCEDURE add_book(IN bk_isbn character varying, IN bk_pubyear integer, IN pub_id integer, IN bk_title character varying, IN bk_author character varying, IN ctgry_id integer, IN bk_pages integer)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT isbn
        FROM books
        WHERE isbn = bk_isbn)
    THEN
        RAISE NOTICE 'Book already exists';
    ELSE
        INSERT INTO books (isbn, publication_year, publisher_id, title, author, category_id, pages)
        VALUES (bk_isbn, bk_pubyear, pub_id, bk_title, bk_author, ctgry_id, bk_pages);
    END IF;

    COMMIT;
END;
$$;

-- add_userAccount --
CREATE OR REPLACE PROCEDURE add_userAccount(IN usr_lastName character varying, IN usr_firstName character varying, IN usr_username character varying, IN usr_password character varying, IN usr_status character varying)
    language plpgsql
AS
$$
BEGIN
    IF EXISTS(SELECT user_id
              FROM user_account
              WHERE last_name = usr_lastName OR first_name = usr_firstName)
    THEN
        RAISE NOTICE 'User already exists';
    ELSE
        INSERT INTO user_account (last_name, first_name, username, password, role)
        VALUES (usr_lastName, usr_firstName, usr_username, usr_password, usr_status);
    END IF;

    COMMIT;
END;
$$;

-- add_borrowRecord --
CREATE OR REPLACE PROCEDURE add_borrowRecord(IN br_copyId integer, br_userId integer, IN br_borrowedDate date, IN br_returnedDate date, IN br_status character varying)
    language plpgsql
AS
$$
BEGIN
    INSERT INTO borrow_record (copy_id, user_id, borrow_date, returned_date, status)
    VALUES (br_copyId, br_userId, br_borrowedDate, br_returnedDate, br_status);

    COMMIT;
END;
$$;




-- delete_category
CREATE OR REPLACE PROCEDURE delete_category(IN ctgry_id integer)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(
        SELECT category_id FROM category WHERE category_id = ctgry_id)
        THEN
        IF EXISTS(
            SELECT category_id FROM books WHERE category_id = ctgry_id)
        THEN
            RAISE NOTICE 'This category is being used by a book';
        ELSE
            DELETE FROM category
            WHERE category_id = ctgry_id;
        END IF;
    ELSE
        RAISE NOTICE 'Category does not exist.';
    END IF;

    COMMIT;
END;
$$;


-- delete_publisher
create procedure delete_publisher(IN pub_id integer)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(
        SELECT publisher_id FROM publisher WHERE publisher_id = pub_id)
        THEN
        IF EXISTS(
            SELECT publisher_id FROM books WHERE publisher_id = pub_id)
        THEN
            RAISE NOTICE 'A book is published by this publisher.';
        ELSE
            DELETE FROM publisher
            WHERE publisher_id = pub_id;
        END IF;
    ELSE
        RAISE NOTICE 'Publisher does not exist.';
    END IF;

    COMMIT;
END;
$$;


-- delete_copy
create procedure delete_copy(IN cpy_id integer)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(
        SELECT copy_id FROM copy WHERE copy_id = cpy_id)
        THEN
        IF EXISTS(
            SELECT copy_id FROM borrow_record WHERE copy_id = cpy_id)
        THEN
            RAISE NOTICE 'This book copy currently has a borrow record';
        ELSE
            DELETE FROM copy
            WHERE copy_id = cpy_id;
        END IF;
    ELSE
        RAISE NOTICE 'Copy does not exist.';
    END IF;

    COMMIT;
END;
$$;


-- delete_record
create procedure delete_record(IN br_borrowID integer)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(
        SELECT borrow_id FROM borrow_record WHERE borrow_id = br_borrowID)
        THEN
            DELETE FROM borrow_record
            WHERE borrow_id = br_borrowID;
    ELSE
        RAISE NOTICE 'Borrow record does not exist.';
    END IF;

    COMMIT;
END;
$$;


-- delete_userAccount
CREATE OR REPLACE PROCEDURE delete_userAccount(IN usr_userId integer)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(
        SELECT user_id FROM user_account WHERE user_id = usr_userId)
        THEN
        IF EXISTS(
            SELECT user_id FROM borrow_record WHERE user_id = usr_userId)
        THEN
            RAISE NOTICE 'This user currently has a borrow record';
        ELSE
            DELETE FROM user_account
            WHERE user_id = usr_userId;
        END IF;
    ELSE
        RAISE NOTICE 'User does not exist.';
    END IF;

    COMMIT;
END;
$$;


-- delete_book --
CREATE OR REPLACE PROCEDURE delete_book(IN bk_bookId integer)
LANGUAGE plpgsql
AS
$$
BEGIN
    IF EXISTS (
        SELECT book_id FROM books WHERE book_id = bk_bookId
    ) THEN
        IF EXISTS (
            SELECT book_id FROM copy WHERE book_id = bk_bookId
        ) THEN
            RAISE NOTICE 'This book have available copies';
        ELSE
            DELETE FROM books
            WHERE book_id = bk_bookId;
            RAISE NOTICE 'Book deleted successfully.';
        END IF;
    ELSE
        RAISE NOTICE 'Book does not exist.';
    END IF;

    COMMIT;
END;
$$;



-- update_book
CREATE OR REPLACE PROCEDURE update_book(IN bk_id integer, IN bk_isbn character varying, IN bk_pubyear integer, IN pub_id integer, IN bk_title character varying, IN bk_author character varying, IN ctgry_id integer, IN bk_pages integer)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT book_id
        FROM books
        WHERE book_id = bk_id)
    THEN
    UPDATE books
        SET
            isbn = bk_isbn,
            publication_year = bk_pubyear,
            publisher_id = pub_id,
            title = bk_title,
            author = bk_author,
            category_id = ctgry_id,
            pages = bk_pages
        WHERE book_id = bk_id;
    ELSE
        RAISE NOTICE 'Book does not exist';
    END IF;

    COMMIT;
END;
$$;

-- update_category
CREATE OR REPLACE PROCEDURE update_category(IN ctgry_id integer, IN ctgry_name character varying)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT category_id
        FROM category
        WHERE category_id = ctgry_id)
    THEN
    UPDATE category
        SET
            category_name = ctgry_name
        WHERE category_id = ctgry_id;
    ELSE
        RAISE NOTICE 'Category does not exist';
    END IF;

    COMMIT;
END;
$$;

-- update publisher
CREATE OR REPLACE PROCEDURE update_publisher(IN pub_id integer, IN pub_name character varying, IN pub_location character varying)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT publisher_id
        FROM publisher
        WHERE publisher_id = pub_id)
    THEN
    UPDATE publisher
        SET
            publisher_name = pub_name,
            publisher_location = pub_location
        WHERE publisher_id = pub_id;
    ELSE
        RAISE NOTICE 'Publisher does not exist';
    END IF;

    COMMIT;
END;
$$;


-- update_userAccount
CREATE OR REPLACE PROCEDURE update_userAccount(IN usr_id integer, IN usr_lastName character varying, usr_firstName character varying, IN usr_username character varying, IN usr_password character varying, IN usr_role character varying)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT user_id
        FROM user_account
        WHERE user_id = usr_id)
    THEN
    UPDATE user_account
        SET
            last_name = usr_lastName,
            first_name = usr_firstName,
            username = usr_username,
            password = usr_password,
            role = usr_role
        WHERE user_id = usr_id;
    ELSE
        RAISE NOTICE 'User Account does not exist';
    END IF;

    COMMIT;
END;
$$;

-- update_borrowRecord
CREATE OR REPLACE PROCEDURE update_borrowRecord(IN br_id integer, IN br_userId integer, IN br_copyId integer, IN br_borrowDate date, IN br_returnedDate date, IN br_status character varying)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT borrow_id
        FROM borrow_record
        WHERE borrow_id = br_id)
    THEN
    UPDATE borrow_record
        SET
            user_id = br_userId,
            copy_id = br_copyId,
            borrow_date = br_borrowDate,
            returned_date = br_returnedDate,
            status = br_status
        WHERE borrow_id = br_id;
    ELSE
        RAISE NOTICE 'Borrow Record does not exist';
    END IF;

    COMMIT;
END;
$$;

-- update_copy
CREATE OR REPLACE PROCEDURE update_copy(IN cpy_id integer, IN cpy_bookId integer, IN cpy_status character varying)
    language plpgsql
as
$$
BEGIN
    IF EXISTS(SELECT copy_id
        FROM copy
        WHERE copy_id = cpy_id)
    THEN
    UPDATE copy
        SET
            book_id = cpy_bookId,
            status = cpy_status
        WHERE book_id = cpy_id;
    ELSE
        RAISE NOTICE 'Copy does not exist';
    END IF;

    COMMIT;
END;
$$;


-- VIEWS --
CREATE OR REPLACE VIEW v_books(book_id, title, author, isbn, publication_year, publisher, category, pages) AS
SELECT b.book_id, b.title, b.author, b.isbn, b.publication_year, p.publisher_name, c.category_name, b.pages
FROM books b
INNER JOIN publisher p ON b.publisher_id = p.publisher_id
INNER JOIN category c ON b.category_id = c.category_id;

CREATE OR REPLACE VIEW v_record(copy_id, title, reader_name, borrowed_date, returned_date, status) AS
SELECT c.copy_id, b.title, concat(r.first_name, ' ', r.last_name), br.borrow_date, br.returned_date, br.status
FROM borrow_record br
INNER JOIN copy c ON br.copy_id = c.copy_id
INNER JOIN books b ON b.book_id = c.book_id
INNER JOIN user_account r ON br.user_id = r.user_id;

CREATE OR REPLACE VIEW v_unreturnedBooks(title, isbn, reader_name, borrowed_date, returned_date, status) AS
SELECT b.title, b.isbn, concat(r.first_name, ' ', r.last_name), br.borrow_date, br.returned_date, br.status
FROM borrow_record br
INNER JOIN books b ON br.book_id = b.book_id
INNER JOIN user_account r ON br.user_id = r.user_id
WHERE br.status = 'active';

CREATE OR REPLACE VIEW v_user(user_id, name, username, password, role) AS
SELECT u.user_id, concat(u.first_name, ' ', u.last_name), u.username, u.password, u.role
FROM user_account u;

CREATE OR REPLACE VIEW v_copies(copy_id, title, status) AS
SELECT c.copy_id, b.title, c.status
FROM copy c
INNER JOIN books b ON c.book_id = b.book_id;
