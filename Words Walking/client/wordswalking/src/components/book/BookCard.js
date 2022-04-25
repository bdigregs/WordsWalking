import React from "react"
import { useContext } from "react";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom"
import { BookContext } from "../../providers/BookProvider";
import { GenreContext } from "../../providers/GenreProvider";
import { UserContext } from "../../providers/UserProvider";
import "./BookCard.css"
import { format } from 'date-fns';
import { Row, Col, Card } from "react-bootstrap";



export const BookCard = ({ book }) => {

    const navigate = useNavigate();

    // console.log(format(new Date(book.publishDate), 'yyyy/MM/dd'))
 
    const { buyBook, deleteBook, getAllBooks } = useContext(BookContext)

    const {genres, getAllGenres } = useContext(GenreContext)

    const user = JSON.parse(localStorage.getItem("wordsWalkingUser"))

    const handleClickBuy = () => {
        buyBook(book.id)
        // .then(() => navigate("myaccount"))
}

    const handleClickDelete = () => {
        deleteBook(book.id)
        .then(getAllBooks)
    }

    
    
    return (

        <>
        <div className="bookCard">
            <div className="bookHeading">
            <h3 className="bookTitle">{book.title}</h3>
            <h4 className="bookAuthor">{book.author}</h4>
            <img className="bookImage" src={book.imageUrl} alt="book_image" />
            </div>
            <div className="bookInfo">
            <p className="seller">Seller: </p><p className="description">&nbsp;&nbsp;
{book.user.username}</p>
            <p className="bookSynopsis">Synopsis: </p><p>&nbsp;&nbsp;
{book.synopsis}</p>
            <p className="bookGenre">Genre: </p> <p>&nbsp;&nbsp;
{
                book.genre.name}</p>
            <p className="bookPublisher">Publisher: </p><p>&nbsp;&nbsp;
{book.publisher}</p>
            <p className="bookPublishDate">Year Published: </p><p>&nbsp;&nbsp;
{format(new Date(book.publishDate), 'yyyy')}</p>
            <p className="bookFirstEdition">First Edition: </p><p>&nbsp;&nbsp;{book.firstEdition === true ? `Yes`: `No`} </p>
            <h2 className="bookPrice">${book.price}</h2>
           

            { book.sellerId === user.id || book.buyerId === user.id ?
            "" : <button id="buyBook" type="submit" onClick={handleClickBuy}>Buy Book</button> }

                {book.sellerId === user.id ?
            <button id="editBook" onClick={() => navigate(`/book/edit/${book.id}`)}>Edit Book</button> : ""}
            
            {book.sellerId === user.id ? 
            <button id="deleteBook"  onClick={event => {
                event.preventDefault()
                handleClickDelete()
            }}>Delete Book</button> : "" }
            </div>
        </div>
        
        
        
        
        
        </>






    )
}