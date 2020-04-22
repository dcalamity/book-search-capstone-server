CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (225) NOT NULL
);

CREATE TABLE book_collection (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    collection_name VARCHAR (255) NOT NULL
);

CREATE TABLE book (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    collection_id INTEGER
        REFERENCES book_collection(id) ON DELETE CASCADE NOT NULL,
    finished INTEGER NOT NULL,
    title VARCHAR (255) NOT NULL,
    author VARCHAR (255) NOT NULL,
    genre VARCHAR (255) NOT NULL,
    isbn_id VARCHAR (255) NOT NULL,
    year_published INTEGER NOT NULL,
    description TEXT NOT NULL,
    bookmark_page INTEGER NOT NULL,
    book_rating INTEGER NOT NULL
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    book_id INTEGER
        REFERENCES book(id) ON DELETE CASCADE NOT NULL,
    book_comment TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL
);

INSERT INTO public.users (user_name,"password") VALUES 
('admin','admin')
,('user','user')
,('log','log')
,('sandra','sandra')
;

INSERT INTO public.book_collection (user_id,collection_name) VALUES 
(4,'Romance')
,(2,'Science and Robots')
,(1,'Healthcare')
,(3,'Sea Animals')
;