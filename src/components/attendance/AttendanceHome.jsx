// AttendanceHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AttendanceHome.css';
import AdminLoginModal from './../common/AdminLoginModal';
import SuccessModal from './../common/SuccessModal'; // Si se usa el modal de éxito

// Variables de entorno o constantes (usar mejor variables de entorno en producción)
const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

const AttendanceHome = () => {
  const navigate = useNavigate();

  // Estado principal para el registro de asistencia (ID de empleado)
  const [employeeId, setEmployeeId] = useState('');

  // Estado del modal de administrador
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado del modal de éxito
  const [showSuccess, setShowSuccess] = useState(false);

  // Función para registrar asistencia
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Asistencia registrada para ID: ${employeeId}`);

    // Mostrar modal de éxito
    setShowSuccess(true);

    // Limpiar campo
    setEmployeeId('');
  };

  // Abrir/cerrar modal de administrador
  const toggleAdminModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Lógica de autenticación del administrador
  const handleAdminLogin = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      console.log('¡Acceso de Administrador Concedido!');
      navigate('/employees'); // Redirige a lista de empleados
      return true;
    } else {
      console.log('Error: Nombre de usuario o contraseña incorrectos.');
      return false;
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
            <button type="submit" className="attendance-button">
              INGRESAR
            </button>
          </form>

          {/* Ícono para abrir el modal de administrador */}
          <div className="attendance-settings-icon" onClick={toggleAdminModal}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3
                        c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3
                        1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22
                        .03-1.99 4-3.08 6-3.08
                        1.99 0 5.97 1.09 6 3.08
                        -1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
        </div>

        <div className="attendance-right">
          <div className="qr-title-fixed">ESCANEA CÓDIGO QR</div>
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

      {/* Modal de administrador */}
      <AdminLoginModal
        isOpen={isModalOpen}
        onClose={toggleAdminModal}
        onLogin={handleAdminLogin}
      />

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Entrada registrada"
      />
    </div>
  );
};

export default AttendanceHome;