import React, {useContext} from "react"
import {BookContext} from "../../providers/BookProvider";
import "./BookList.css"

export const BookSearch = () => {

    const {setSearchTerms} = useContext(BookContext)


    return (

        <>
            <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for books... " />
        </>

    )
}