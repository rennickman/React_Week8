import React, { useState } from 'react';
import axios from 'axios';
import "./book.css";



const Book = ({ book_id, title, author, year, setBooks }) => {

    const [titleEdit, setTitleEdit] = useState(title);
    const [authorEdit, setAuthorEdit] = useState(author);
    const [yearEdit, setYearEdit] = useState(year);



    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () => setEditMode(!editMode);


    // Delete book from the database
    const handleDeleteBook = async () => {
        await axios.delete("http://localhost:8080",
            { data: { "book_id": book_id }});
        const data = await axios.get("http://localhost:8080");
        setBooks(data.data.books);
    };


    const handleEditBook = async () => {
        await axios.put("http://localhost:8080",
            { "book_id": book_id, "title": titleEdit, "author": authorEdit, "year": yearEdit });
        const data = await axios.get("http://localhost:8080");
        setBooks(data.data.books);
        toggleEditMode();
    }

    



    return (
        <div className='book'>
            {!editMode ? (
                <div className="info">
                    <h3 className='title'>{title}</h3>
                    <p className='author'>{author}</p>
                    <p className='year'>{year}</p>
                </div>
            ) : (
                <div className="editInputs">
                    <input 
                        type="text" className="editInput" value={titleEdit} onChange={e => setTitleEdit(e.target.value)} 
                    />
                    <input
                        type="text" className="editInput" value={authorEdit} onChange={e => setAuthorEdit(e.target.value)}
                    />
                    <input
                        type="number" className="editInput" value={yearEdit} onChange={e => setYearEdit(e.target.value)}
                    />
                </div>
            )}
            
            {!editMode ? (
                <div className="buttons">
                    <button className="bookButton" onClick={toggleEditMode}>Edit</button>
                    <button className="bookButton" onClick={handleDeleteBook}>Delete</button>
                </div>
            ) : (
                <div className="buttons">
                    <button className="bookButton" onClick={handleEditBook}>Submit</button>
                    <button className="bookButton" onClick={toggleEditMode}>Cancel</button>
                </div>
            )}
            

        </div>
    );
};


export default Book;