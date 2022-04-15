import React, { useState } from "react";

export const BookContext = React.createContext();

export const BookProvider = (props) => {
    const [books, setBooks] = useState([]);


    const getAllBooks = () => {
        return fetch("https://localhost:44381/api/Book")
            .then((res) => res.json())
            .then(setBooks);
    };

    const addBook = (book) => {
        return fetch("https://localhost:44381/api/Book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book),

        })
            // .then(response => response.json())
            .then(getAllBooks)
    };

    const deleteBook = bookId => {
        return fetch(`http://localhost:44381/api/Book/${bookId}`, {
            method: "DELETE"
        })

    }

    const editBook = book => {
        return fetch(`https://localhost:44381/api/Book/${book.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        }).then(getAllBooks)
    }


    const buyBook = (id) => {
        
        
        let user = JSON.parse(localStorage.getItem("wordsWalkingUser"))
     
        return fetch(`https://localhost:44381/api/Book/${id}?userId=${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(getAllBooks)
    }

    return (
        <BookContext.Provider value={{ books, getAllBooks, addBook, editBook, deleteBook, buyBook }}>
            {props.children}
        </BookContext.Provider>
    )


}