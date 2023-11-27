```

store procedures - did not trigger a condition where if the ISBN exists it will raise an error

add publishers - "null value in column \"publisher_location\" of relation \"publisher\" violates not-null constraint"


edit user - "invalid input syntax for type integer: \"cc\""

delete user - "cannot delete"

```

```
[/] GET	/books	Fetch all books 
[/] POST	/books	Add book
[/] PUT	/books/id	Edit book
[/] DELETE	/books/id	Delete book
		
		
[/] GET	/categories	Fetch all categories
[/] POST	/categories	Add category
[/] PUT	/categories/id	Edit category
[/] DELETE	/categories/id	Delete category
		
		
[/] GET	/publishers	Fetch all publishers
[] POST	/publishers	Add publisher
[] PUT	/publishers/id	Edit publisher
[] DELETE	/publishers/id	Delete publisher
		
		
[/] GET	/borrow	Fetch all the borrowed books
[/] GET	/borrow/unreturned	Fetch all the unreturned borrowed books
[] POST	/borrow	Add requests
[] PUT	/borrow/id	Edit borrow requests

		
[/] GET	/users	Fetch all users
[/] POST	/users	Add user
[] PUT	/users/id	Edit user
[] DELETE	/users/id	Delete user

[/] GET /copy Fetch all the copies
[] POST /copy Add copy
[] PUT /copy/:id Edit copy

```