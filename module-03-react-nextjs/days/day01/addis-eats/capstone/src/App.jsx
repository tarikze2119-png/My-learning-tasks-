import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomeScreen from "./screens/HomeScreen";
import DoctorsScreen from "./screens/DoctorsScreen";
import DoctorDetailScreen from "./screens/DoctorDetailScreen";
import BookingScreen from "./screens/BookingScreen";
import LabResultsScreen from "./screens/LabResultsScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path="doctors" element={<DoctorsScreen />} />
          <Route path="doctors/:id" element={<DoctorDetailScreen />} />
          <Route path="book" element={<BookingScreen />} />
          <Route path="results" element={<LabResultsScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
