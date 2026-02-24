import { StrictMode } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routesIndex";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
    </>
  );
}

export default App;
