import React, { useState } from "react";

export const GenreContext = React.createContext();

export const GenreProvider = (props) => {

    const [genres, setGenre] = useState([]);

    const getAllGenres = () => {
        return fetch("https://localhost:44381/api/Genre")
        .then((res) => res.json())
        .then(setGenre)
    };

    return (
        <GenreContext.Provider value={{genres, getAllGenres}}>
            {props.children}
        </GenreContext.Provider>
    )


}