import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 IMPORTAR ESTO
import './AttendanceHome.css';

const AttendanceHome = () => {
    const navigate = useNavigate()
    // Estado principal para el registro de asistencia (ID de empleado)
    const [employeeId, setEmployeeId] = useState('');
    // Estado para controlar si el modal está abierto o cerrado
    const [isModalOpen, setIsModalOpen] = useState(false);
    // NUEVOS ESTADOS para el login de administrador
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Asistencia registrada para ID: ${employeeId}`);
        setEmployeeId('');
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        // Opcional: Limpiar los campos del login al cerrar el modal
        setAdminUsername('');
        setAdminPassword('');
    };

    // NUEVA FUNCIÓN para manejar el envío del formulario de login
    const handleAdminLogin = (e) => {
        e.preventDefault();

        // **Lógica de Autenticación de Ejemplo**
        const USER = 'admin';
        const PASS = '1234';

        // 1. Verificar las credenciales
         if (adminUsername === USER && adminPassword === PASS) {
        alert('¡Acceso de Administrador Concedido!');
        
        // 2. 🚀 REDIRECCIÓN AQUÍ: Usamos navigate() para cambiar la URL
        navigate('/employees'); // Redirige a la lista de empleados
        
        } else {
        alert('Error: Nombre de usuario o contraseña incorrectos.');
        }

        // Cierra el modal después de intentar el login
        toggleModal(); 
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

                    {/* Ícono que abre el modal */}
                    <div className="attendance-settings-icon" onClick={toggleModal}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
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
            {/* LÓGICA DEL MODAL DE LOGIN */}
                    {isModalOpen && (
                        <div className="ventana-settings" onClick={toggleModal}>
                            <div className="ventana-settings-texto" onClick={(e) => e.stopPropagation()}>
                                
                                {/* Contenido que replica la imagen */}
                                <div className="admin-login-content">
                                    {/* Icono de usuario y engranaje */}
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="login-icon">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                                    </svg>
                                    <h3 className="login-title">Ingresa contraseña como Administrador</h3>
                                    
                                    <form onSubmit={handleAdminLogin}>
                                        <label>Nombre *</label>
                                        <input
                                            type="text"
                                            value={adminUsername}
                                            onChange={(e) => setAdminUsername(e.target.value)}
                                            required
                                        />
                                        <label>Contraseña *</label>
                                        <input
                                            type="password"
                                            value={adminPassword}
                                            onChange={(e) => setAdminPassword(e.target.value)}
                                            required
                                        />
                                        {/* El botón "Ingresar" tiene un X, lo usaremos para cerrar el modal si es presionado */}
                                        <button type="submit" className="login-button">
                                            Ingresar
                                            <span onClick={toggleModal}>&times;</span> {/* Este es el ícono de cierre */}
                                        </button>
                                    </form>
                                    
                                </div>
                                
                            </div>
                        </div>
                    )}
        </div>
        

    );
};

export default AttendanceHome;