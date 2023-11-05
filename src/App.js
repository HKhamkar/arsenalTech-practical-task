import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import { Box, Toolbar } from "@mui/material";
import MovieDetailPage from "./Pages/MovieDetailPage";
import PersonPage from "./Pages/PersonPage";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Suspense fallback={<>Loading... </>}>
      <Header />

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<HomePage />} exact={true} />
          <Route path="/movie/:id" element={<MovieDetailPage />} exact={true} />
          <Route path="/person/:id" element={<PersonPage />} exact={true} />

          {/* Redirecting unknown url to 404 page */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Box>
    </Suspense>
  );
}

export default App;
