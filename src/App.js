// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MiniDrawer from "./Components/Drower";
import HomePage from "./Pages/Home";
import VideoDetail from "./Pages/VideoPage";

function App() {
  return (
    <BrowserRouter>
      <MiniDrawer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </MiniDrawer>
    </BrowserRouter>
  );
}

export default App;
