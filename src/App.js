import LoginPage from "./pages/login/LoginPage";
import MainPage from "./pages/main/MainPage";
import ItemCategoryPage from "./pages/itemCategory/ItemCategoryPage";
import FontTest from "./fonts/FontTest";

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<MainPage />} />
          <Route path="/itemCategory" element={<ItemCategoryPage />} />
          <Route path="/fontTest" element={<FontTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;