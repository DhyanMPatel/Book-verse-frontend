import { StrictMode } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routesIndex";
import { AuthProvider, } from "./contexts/AuthContext";
import { BooksProvider } from "./contexts/BooksContext";

function App() {
  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <BooksProvider>
              <Router />
            </BooksProvider>
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
    </>
  );
}

export default App;
