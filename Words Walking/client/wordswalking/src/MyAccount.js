import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BookContext } from "./providers/BookProvider";
import { useEffect } from "react";
import { BookCard } from "./components/book/BookCard";
import "./MyAccount.css"

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

let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {

  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

  return (
      <>
      <div className="myAccountBackground">

   

    {/* <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>Welcome to Words Walking</span> */}



<h1 className="viewListings"> Your books to sell and your books bought!</h1>
<a className="booksBought" href="#booksYouBought">Go To Books You Bought</a>
<h2 className="booksToSell">
  <br />
    Books to sell
  </h2>
  <br /><br />
  <button className="btn btn-primary" onClick={() => {navigate("/book/add")}}>Add Book</button>  
  <div className="view-your-listings">
          {books.filter(
              b => b.sellerId === userId
          ).map((singleBookInLoop) => (
              <BookCard key={singleBookInLoop.id} book={singleBookInLoop} />
          ))
            
          }
      </div>
      <br/><br />

          <h2 id="booksYouBought">Books you bought</h2>
          <br />
      <div className="view-bought-books">
        {books.filter(b => b.buyerId === userId).map((singleBookInLoop) => (
          <BookCard key={singleBookInLoop.id} book={singleBookInLoop} />
        ))}
      </div>

      <button onClick={topFunction} id="myBtn" title="Go to top">Scroll to top</button>
      </div>

</>
  );
}