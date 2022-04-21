import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../../providers/BookProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BookCard } from "./BookCard";
import { BookSearch } from "./BookSearch";
import "./BookList.css"

export const BookList = () => {
    const { books, getAllBooks, searchTerms } = useContext(BookContext)

    const [filteredBooks, setFiltered ] = useState([])

    const { bookId } = useParams();

    useEffect(() => {
        getAllBooks();
    }, []);

useEffect(() => {
    if (searchTerms !== "") {
        const subset = books.filter(book => book.title.toLowerCase().includes(searchTerms.toLowerCase()) || book.author.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(subset)
    } else { 
        setFiltered(books)

    }
}, [searchTerms, books])
    
    const navigate = useNavigate();

    // const handleControlledInputChange = (props) => {

    //    searchTerms(props.target.value)

    // }

    return (
        <>
        <div className="bookList">
        
      <h1 className="browseAllListings">Browse all listings</h1>
      <p className="browse">Look through the catalog to see which books your community has put up for sale.</p>

        <div className="bookSearch">
            <BookSearch key={bookId} />
        </div>


     
      <div className="browse-books">
          {filteredBooks.filter(
              b => b.buyerId === null 
          ).map((singleBookInLoop) => (
              <BookCard key={singleBookInLoop.id} book={singleBookInLoop} />
          ))
            
          }
      </div>
      </div>
        
        </>



    )

}