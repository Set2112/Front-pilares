// AttendanceHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import './AttendanceHome.css';
import AdminLoginModal from './../common/AdminLoginModal';
import SuccessModal from './../common/SuccessModal';
import ErrorModal from './../common/ErrorModal';
import LoadingSpinner from './../common/LoadingSpinner';

// Variables de entorno o constantes
const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

const AttendanceHome = () => {
  const navigate = useNavigate();

  // Estados
  const [employeeId, setEmployeeId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [scanError, setScanError] = useState('');

  // Funciones de modales
  const showSuccessModal = (id) => {
    setSuccessMessage(`Asistencia registrada para ID: ${id}`);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSuccessMessage('');
  };

  const showErrorModal = (message) => {
    setErrorMessage(message);
    setShowError(true);
  };

  // Modificado: Reabrir modal de admin al cerrar error
  const handleCloseError = () => {
    setShowError(false);
    setErrorMessage('');
    // Reabrir el modal de administrador
    setIsModalOpen(true);
  };

  // Función para registrar asistencia manual
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!employeeId.trim()) {
      showErrorModal('Por favor ingrese un ID válido');
      return;
    }

    console.log(`Asistencia registrada para ID: ${employeeId}`);
    showSuccessModal(employeeId);
    setEmployeeId('');
  };

  // Función para manejar el escaneo del QR - CÁMARA CONTINUA
  const handleQrScan = (result) => {
    if (result && result.length > 0) {
      const scannedData = result[0].rawValue;
      console.log(`QR escaneado: ${scannedData}`);

      // NO desactivar el escáner - la cámara permanece activa
      // setIsScannerActive(false); // <-- Comentado para mantener cámara activa

      // Mostrar modal de éxito con el ID escaneado
      showSuccessModal(scannedData);

      // Llenar el input con el ID escaneado (opcional)
      setEmployeeId(scannedData);
    }
  };

  const handleScanError = (error) => {
    console.error('Error en el escáner:', error);
    setScanError('Error al acceder a la cámara');
  };

  const toggleScanner = () => {
    setIsScannerActive(!isScannerActive);
    setScanError('');
  };

  const toggleAdminModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Lógica de autenticación del administrador
  const handleAdminLogin = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      console.log('¡Acceso de Administrador Concedido!');
      
      setIsModalOpen(false);
      setShowLoading(true);
      
      setTimeout(() => {
        setShowLoading(false);
        navigate('/employees');
      }, 2000);
      
      return true;
    } else {
      console.log('Error: Credenciales incorrectas');
      setIsModalOpen(false);
      showErrorModal('Credenciales no identificadas');
      return false;
    }
  };

  return (
    <div className="attendance-home">
      <div className="attendance-container">
        {/* Lado izquierdo - Formulario */}
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

          <div 
            className="attendance-settings-icon" 
            onClick={toggleAdminModal}
            title="Acceso Administrador"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
            </svg>
          </div>
        </div>

        {/* Lado derecho - Escáner QR */}
        <div className="attendance-right">
          <div className="qr-title-fixed">ESCANEA CÓDIGO QR</div>
          
          <div className="qr-scanner">
            {!isScannerActive ? (
              <div className="scanner-frame" onClick={toggleScanner}>
                <div className="scanner-corner scanner-tl"></div>
                <div className="scanner-corner scanner-tr"></div>
                <div className="scanner-corner scanner-bl"></div>
                <div className="scanner-corner scanner-br"></div>
                <div className="scanner-dot"></div>
                <div className="scanner-text">Toca para escanear</div>
              </div>
            ) : (
              <div className="scanner-camera-container">
                <Scanner
                  onScan={handleQrScan}
                  onError={handleScanError}
                  constraints={{ facingMode: 'environment' }}
                  components={{ finder: false }}
                  styles={{
                    container: { 
                      width: '100%', 
                      height: '100%', 
                      borderRadius: '1.25rem', 
                      overflow: 'hidden' 
                    },
                    video: { 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }
                  }}
                />
                
                <div className="scanner-overlay">
                  <div className="scanner-corner scanner-tl"></div>
                  <div className="scanner-corner scanner-tr"></div>
                  <div className="scanner-corner scanner-bl"></div>
                  <div className="scanner-corner scanner-br"></div>
                  <div className="scanner-grid"></div>
                  <div className="scanner-line"></div>
                  <div className="scanner-status-text">Escaneando...</div>
                </div>
                
                <button className="scanner-close-btn" onClick={toggleScanner}>
                  ✕
                </button>
                
                {scanError && <div className="scanner-error">{scanError}</div>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modales */}
      {isModalOpen && (
        <AdminLoginModal
          isOpen={isModalOpen}
          onClose={toggleAdminModal}
          onLogin={handleAdminLogin}
        />
      )}

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        message={successMessage}
        autoCloseDelay={3000}
      />

      <ErrorModal
        isOpen={showError}
        onClose={handleCloseError}
        message={errorMessage}
        autoCloseDelay={3000}
      />

      {showLoading && (
        <LoadingSpinner
          size="large"
          text="Cargando datos del administrador..."
          fullScreen={true}
        />
      )}
    </div>
  );
};

export default AttendanceHome;
