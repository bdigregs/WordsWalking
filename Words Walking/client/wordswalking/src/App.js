import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { BookProvider } from './providers/BookProvider';
import { GenreProvider } from './providers/GenreProvider';

function App() {
  return (
    <Router>
      <UserProvider>
        <BookProvider>
          <GenreProvider>
        <Header />
        
      <ApplicationViews />
      </GenreProvider>
      </BookProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
