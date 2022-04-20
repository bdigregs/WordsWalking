import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../../providers/BookProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BookCard } from "./BookCard";
import { BookSearch } from "./BookSearch";

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
        
      <h1>Browse all listings</h1>

        <div className="bookSearch">
            <BookSearch key={bookId} />
        </div>


     
      <div className="browse-books">
          {books.filter(
              b => b.buyerId === null 
          ).map((singleBookInLoop) => (
              <BookCard key={singleBookInLoop.id} book={singleBookInLoop} />
          ))
            
          }
      </div>
        
        
        </>



    )

}