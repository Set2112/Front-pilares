import React from 'react';
import './ReportsHome.css';

const ReportsHome = () => {
  return (
    <div className="reports-home">
      <h2>Reportes e Historial</h2>
      <div className="reports-container">
        <div className="filters-section">
          <h3>Filtros</h3>
          <div className="filter-group">
            <label>Fecha de inicio:</label>
            <input type="date" />
          </div>
          <div className="filter-group">
            <label>Fecha de fin:</label>
            <input type="date" />
          </div>
          <button className="generate-button">GENERAR REPORTE</button>
        </div>
        <div className="reports-content">
          <p>Seleccione los filtros y genere un reporte</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsHome;
