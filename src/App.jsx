import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CafePage from './pages/CafePage';
import EmployeePage from './pages/EmployeePage';
import EditCafePage from './pages/EditCafePage';
import EditEmployeePage from './pages/EditEmployeePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cafes" />} />
      <Route path="/cafes" element={<CafePage />} />
      <Route path="/cafes/edit/:id" element={<EditCafePage />} />
      <Route path="/cafes/add" element={<EditCafePage />} />
      <Route path="/employees" element={<EmployeePage />} />
      <Route path="/employees/edit/:id" element={<EditEmployeePage />} />
      <Route path="/employees/add" element={<EditEmployeePage />} /> 
    </Routes>
  );
}