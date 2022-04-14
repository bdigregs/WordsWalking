import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../../providers/BookProvider";
import { useNavigate } from "react-router-dom";
import { BookCard } from "./BookCard";

export const BookList = () => {
    const { books, getAllBooks } = useContext(BookContext)

    useEffect(() => {
        getAllBooks();
    }, []);
    
    const navigate = useNavigate();



    return (
        <>
        
      <p>Browse all listings</p>
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