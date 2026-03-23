import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes/routesIndex";
// import { UserProvider } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import AppContext from "./contexts/AppContext";

function App() {
  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <AppContext>
            <Router />
          </AppContext>
        </BrowserRouter>
      </StrictMode>
      <ToastContainer />
    </>
  );
}

export default App;
