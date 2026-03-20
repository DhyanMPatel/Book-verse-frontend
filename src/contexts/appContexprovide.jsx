import React from "react";
import { ReviewProvider } from "./ReviewContext";

const appContexprovide = ({ children }) => {
  return (
    <div>
      <BooksProvider>
        <ReviewProvider>
          <Router />
        </ReviewProvider>
      </BooksProvider>
    </div>
  );
};

export default appContexprovide;
