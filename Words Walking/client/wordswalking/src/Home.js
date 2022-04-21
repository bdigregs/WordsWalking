import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BookContext } from "./providers/BookProvider";
import { useEffect } from "react";
import { BookCard } from "./components/book/BookCard";
import "./Home.css"


export default function Home() {

  const navigate = useNavigate();
  const {getAllBooks, books} = useContext(BookContext)

  useEffect(() => {
    getAllBooks();
}, []);

const user = JSON.parse(localStorage.getItem("wordsWalkingUser"))

// const userId = user.id
// console.log(userId)

// books.sellerId = parseInt(userId)

  return (
      <>
      <div className="homeBackground">
    {/* <button onClick={() => {navigate("/book/add")}}>Add Book</button>   */}

    {/* <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>Welcome to Words Walking, {user.firstName}</span> */}

    <h1 className="welcome">Welcome to Words Walking, {user.firstName}!</h1>

    <p className="welcomeParagraph">In our domain, you can search, sell, and buy books within your community! If you have used books that need a happy home, look no further.</p>

{/* <img className="logo" src="https://lh3.googleusercontent.com/MXl10sp3zfFJh3pTSriyo26v-Cm6Cye9VzhzSXewlnodLs_uw57nUj4hJIRUX85fjxHLJi0nDMQxdU5j5_MV-BO8m_sDQgCPk7lTAp-3PxI3S8Iw01ubLGVf6wIbFnSA_OwZbwZWCw=w500-h315-p-k" />  */}
{/* 
    <img src="https://www.canva.com/design/DAE9UmQG_UE/view" alt="WordsWalking" />

<h1> View all of your listings</h1>
<h2>
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

          <h2>Books you bought</h2>
          <br />
      <div className="view-bought-books">
        {books.filter(b => b.buyerId === userId).map((singleBookInLoop) => (
          <BookCard key={singleBookInLoop.id} book={singleBookInLoop} />
        ))}
      </div> */}

</div>
</>
  );
}