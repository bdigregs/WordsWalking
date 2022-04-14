import React from "react"
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { BookContext } from "../../providers/BookProvider";

export const BookCard = ({ book }) => {

    const navigate = useNavigate();

    const { buyBook } = useContext(BookContext)


    return (

        <>
        <div className="bookCard">
            <h3 className="bookTitle">{book.title}</h3>
            <h4 className="bookAuthor">{book.author}</h4>
            <p className="bookSynopsis">Synopsis: {book.synopsis}</p>
            <p className="bookPublisher">Publisher: {book.publisher}</p>
            <p className="bookPublishDate">Publish Date: {book.publishDate}</p>
            <p className="bookFirstEdition">First Edition: {book.firstEdition}</p>
            <p className="bookPrice">${book.price}</p>
            <img src={book.imageUrl} alt="book_image" />
            <button id="buyBook" onClick={buyBook()}>Buy Book</button>  
        </div>
        
        
        
        
        
        </>






    )
}