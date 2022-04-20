import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BookContext } from "./providers/BookProvider";
import { useEffect } from "react";
import { BookCard } from "./components/book/BookCard";


export default function MyAccount() {

  const navigate = useNavigate();
  const {getAllBooks, books} = useContext(BookContext)

  useEffect(() => {
    getAllBooks();
}, []);

const user = JSON.parse(localStorage.getItem("wordsWalkingUser"))

const userId = user.id
console.log(userId)

books.sellerId = parseInt(userId)

  return (
      <>
    <button onClick={() => {navigate("/book/add")}}>Add Book</button>  

    {/* <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>Welcome to Words Walking</span> */}



<h1 className="viewListings"> View all of your listings</h1>
<h2 className="booksToSell">
  <br />
    Books to sell
  </h2>
  <br /><br />
  <div className="view-your-listings">
          {books.filter(
              b => b.sellerId === userId
          ).map((singleBookInLoop) => (
              <BookCard key={singleBookInLoop.id} book={singleBookInLoop} />
          ))
            
          }
      </div>
      <br/><br />

          <h2 className="booksYouBought">Books you bought</h2>
          <br />
      <div className="view-bought-books">
        {books.filter(b => b.buyerId === userId).map((singleBookInLoop) => (
          <BookCard key={singleBookInLoop.id} book={singleBookInLoop} />
        ))}
      </div>


</>
  );
}