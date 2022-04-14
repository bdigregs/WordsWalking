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
        return fetch("https://localhost:44381/api/Book", { method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book),
       
        })
        // .then(response => response.json())
        .then(getAllBooks)
    };

    
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
        return fetch(`https://localhost:44381/api/Book/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(getAllBooks)
    }

return (
    <BookContext.Provider value={{books, getAllBooks, addBook, editBook, buyBook}}>
        {props.children}
    </BookContext.Provider>
)


}