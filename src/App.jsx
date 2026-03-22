import { StrictMode } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routesIndex";
import { AuthProvider } from "./contexts/AuthContext";
import { BooksProvider } from "./contexts/BookContext";
import { ReviewProvider } from "./contexts/ReviewContext";
// import { UserProvider } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <BooksProvider>
              <ReviewProvider>
              
                  <Router />
                
              </ReviewProvider>
            </BooksProvider>
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
      <ToastContainer />
    </>
  );
}

export default App;
