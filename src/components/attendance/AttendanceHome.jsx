// AttendanceHome.jsx
import React, { useState } from 'react';
import './AttendanceHome.css';
import AdminLoginModal from './../common/AdminLoginModal';
import SuccessModal from './../common/SuccessModal'; // si usas el modal de éxito
import { useNavigate } from 'react-router-dom';

const ADMIN_USERS = ['ADMIN01', 'Admin General'];
const ADMIN_PASS = 'admin123';

const AttendanceHome = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setEmployeeId('');
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleLogin = (user, pass) => {
    const u = (user || '').trim();
    if (ADMIN_USERS.includes(u) && pass === ADMIN_PASS) {
      // Marca sesión admin y navega a la lista
      localStorage.setItem('isAdmin', '1');
      setShowModal(false);
      navigate('/empleados');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="attendance-home">
      <div className="attendance-container">
        <div className="attendance-left">
          <h2 className="attendance-title">Registro de Asistencia</h2>
          <form className="attendance-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="attendance-input"
              placeholder="Ingrese su ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
            <button type="submit" className="attendance-button">INGRESAR</button>
          </form>

          {/* Icono que abre el modal de admin */}
          <div className="attendance-settings-icon" onClick={() => setShowModal(true)}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0
-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
        </div>
        <div className="attendance-right">
          <div className="qr-title-fixed">ESCANEA CODIGO QR</div>
          <div className="qr-scanner">
            <div className="scanner-frame">
              <div className="scanner-corner scanner-tl"></div>
              <div className="scanner-corner scanner-tr"></div>
              <div className="scanner-corner scanner-bl"></div>
              <div className="scanner-corner scanner-br"></div>
              <div className="scanner-dot"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Administrador */}
      <AdminLoginModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogin={handleLogin}
      />

      {/* Modal de éxito en registro */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Entrada registrada"
      />
    </div>
  );
};

export default AttendanceHome;
