import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../../providers/BookProvider";
import { GenreContext } from "../../providers/GenreProvider";
import "./BookForm.css"



export const BookForm = () => {

    const { books, addBook, getAllBooks, getBookById, editBook } = useContext(BookContext)
   const {getAllGenres, genres, setGenre } = useContext(GenreContext)

   const {bookId} = useParams()

const [ isLoading, setIsLoading ] = useState(true)

    const [book, setBook] = useState({
        genreId: 0,
        title: "",
        author: "",
        synopsis: "",
        publisher: "",
        publishDate: "",
        firstEdition: false,
        price: 0.0,
        imageUrl: "",
        // sellerId: parseInt("wordsWalkingUser")
    });

    const navigate = useNavigate();

    const isChecked = (e) => {
        const newBook = {...book}
        newBook[e.target.id] = JSON.parse(e.target.value)
        setBook(newBook)

    }

    useEffect(() => {
        getAllGenres()
    }, [])

    const handleControlledInputChange = (event) => {
        const newBook = {...book}
        newBook[event.target.id] = event.target.value
        setBook(newBook)
    }

    const handleClickSaveBook = (event) => {
        event.preventDefault()

 //Get user Id from local storage
        const user = JSON.parse(localStorage.getItem("wordsWalkingUser"))
        console.log(user)

        const userId = user.id
        console.log(userId)

        book.sellerId = parseInt(userId)
   
        if (book.genreId === 0 || book.title === "" || book.author === "" || book.price === 0 ) {
            window.alert("Please select a genre, title, and author. And don't forget to set a price!")
        }
        else {  
            setIsLoading(true);
      

       
            if (bookId) {
                editBook({
                    id: book.id,
                    genreId: book.genreId,
                    sellerId: book.sellerId,
                    buyerId: book.buyerId,
                    title: book.title,
                    author: book.author,
                    synopsis: book.synopsis,
                    publisher: book.publisher,
                    publishDate: book.publishDate,
                    firstEdition: book.firstEdition,
                    price: book.price,
                    imageUrl: book.imageUrl
                }).then(() => navigate("/myaccount"))
                
            } else {
                addBook({
                    genreId: book.genreId,
                    sellerId: book.sellerId,
                    buyerId: book.buyerId,
                    title: book.title,
                    author: book.author,
                    synopsis: book.synopsis,
                    publisher: book.publisher,
                    publishDate: book.publishDate,
                    firstEdition: book.firstEdition,
                    price: book.price,
                    imageUrl: book.imageUrl
                })
                .then(() => navigate("/myaccount"))
            }
        }
    }

    const handleClickCancel = (event) => {

        navigate("/myaccount")
    }
    
        useEffect(() => {
            getAllBooks().then(() => {
                if (bookId){
                    getBookById(bookId)
                    .then(book => {
                        setBook(book)
                        setIsLoading(false)
                    })
                } else {
                    setIsLoading(false)
                }
            })
        }, [])


    return (
        <>
        <div className="bookFormBackground">
        <form className="bookForm">
            <h2 className="bookForm_title">New Book</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="What's it called?" value={book.title}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="author">Author: </label>
                    <input type="text" id="author" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Who wrote it?" value={book.author}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="dropdown">
                    <select id="genreId"  onChange={handleControlledInputChange}>
                        <option value="0">Select a genre...</option>
                        {genres.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
             
                  

                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="synopsis">Synopsis: </label>
                    <input type="textarea" id="synopsis" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="What's it about?" value={book.synopsis}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="publisher">Publisher: </label>
                    <input type="text" id="publisher" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Who published this book?" value={book.publisher}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="publishDate">Publish Date: </label>
                    <input type="date" id="publishDate" onChange={handleControlledInputChange} value={book.publishDate}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="firstEdition">First Edition?  </label>
                    <input type="checkbox" onChange={isChecked} id="firstEdition" value={true}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:  </label>
                    <input type="number" id="price" onChange={handleControlledInputChange} value={book.price}/>
                </div>
            </fieldset>
            
            <fieldset>
            <div className="form-group">
                <label htmlFor="imageUrl">Image Url: </label>
                <input className="form-control" type="url" id="imageUrl" onChange={handleControlledInputChange} value={book.imageUrl}/>
                </div>
                </fieldset>

                <button id="btnCss" className="btn btn-info" type="submit" onClick={handleClickSaveBook}>Save Book </button>

                
                <button className="btn btn-danger" type="submit" onClick={handleClickCancel}>Cancel </button>
        </form>
        </div>
        </>
    )


}