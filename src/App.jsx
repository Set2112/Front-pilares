import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AttendanceHome from './components/attendance/AttendanceHome';
import EmployeeList from './components/employees/EmployeeList';
import ReportsHome from './components/reports/ReportsHome';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />



        <main className="main-content">
          <Routes>
            <Route path="/" element={<AttendanceHome />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
