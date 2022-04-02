import React, { useEffect, useState } from 'react';
import Book from './Book';
import axios from 'axios';
import './bookList.css';



const BookList = () => {

    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");


    // Get a list of all books from DB when component is first loaded
    useEffect(() => {
        // Fetch books and store in state
        const fetchBooks = async () => {
            const data = await axios.get("http://localhost:8080");
            setBooks(data.data.books);
        };
        fetchBooks();
    }, []);



    // Add a new book to the DB
    const handleAddBook = async () => {
        await axios.post("http://localhost:8080",
            { "title": title, "author": author, "year": year });
    };






    return (
        <div className="bookListWrapper">
            <div className='bookList'>
                <form className="addBook">
                    <input type="text" placeholder='title' value={title} onChange={e => setTitle(e.target.value)} />
                    <input type="text" placeholder='author' value={author} onChange={e => setAuthor(e.target.value)} />
                    <input type="number" placeholder='year' value={year} onChange={e => setYear(e.target.value)} />
                    <button className='addButton' onClick={handleAddBook}>Add Book</button>
                </form>

                <div className="booklist">
                    {books.map(book => (
                        <Book key={book.id} book_id={book.id} title={book.title} author={book.author} year={book.year} setBooks={setBooks} />
                    ))}
                </div>
            </div>
        </div>
        
    );
};


export default BookList;