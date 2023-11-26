
store procedures - did not trigger a condition where if the ISBN exists it will raise an error

add publishers - "null value in column \"publisher_location\" of relation \"publisher\" violates not-null constraint"

edit books - "invalid input syntax for type integer: \"978-0-526-566\""

edit categories - "invalid input syntax for type integer: \"test\""

edit user - "invalid input syntax for type integer: \"cc\""

delete user - "cannot delete"

[/] GET	/books	Fetch all books 
[/] POST	/books	Add book
[] PUT	/books/id	Edit book
[] DELETE	/books/id	Delete book
		
		
[/] GET	/categories	Fetch all categories
[/] POST	/categories	Add category
[] PUT	/categories/id	Edit category
[/] DELETE	/categories/id	Delete category
		
		
[/] GET	/publishers	Fetch all publishers
[] POST	/publishers	Add publisher
[] PUT	/publishers/id	Edit publisher
[] DELETE	/publishers/id	Delete publisher
		
		
[] GET	/borrow-records	Fetch all the borrowed books
[] POST	/borrow-records	Add requests
[] PUT	/borrow-records/id	Edit borrow requests
[] DELETE		
		
[/] GET	/users	Fetch all users
[/] POST	/users	Add user
[] PUT	/users/id	Edit user
[] DELETE	/users/id	Delete user