import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

// Componente para la barra de control (Agregar, Buscar, Reporte)
const ControlPanel = ({ onAddEmployee, onGenerateReport, onSearchChange, searchTerm }) => (
    <div className="control-panel">
        <div className="control-panel-left">
            {/* Botón: Agregar nuevo empleado */}
            <button className="control-button add-button" onClick={onAddEmployee}>
                {/* Ícono de Persona con signo de más (usando un SVG placeholder) */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-6 1.17-6 3.5V19h12v-2.5c0-2.33-3.67-3.5-6-3.5zm8 0c-.29 0-.62.02-.97.08C16.89 15.68 18 16.71 18 18.25V19h4v-2.5c0-2.33-3.67-3.5-6-3.5zM15 15h2v2h-2zm-3 0h2v2h-2z"/>
                </svg>
                Agregar nuevo empleado
            </button>
            
            {/* Botón: Generar Reporte */}
            <button className="control-button report-button" onClick={onGenerateReport}>
                {/* Ícono de documento (usando un SVG placeholder) */}
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16H6v-2h6v2zm2-5c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v6zm-4-4h2v2h-2v-2z"/>
                </svg>
                Generar Reporte
            </button>
        </div>

        <div className="control-panel-right">
            {/* Campo de búsqueda */}
            <input
                type="text"
                className="search-input"
                placeholder="Buscar por Nombre o ID"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {/* Botón de búsqueda (opcional, ya que se puede buscar al teclear) */}
            <button className="control-button search-button">Buscar</button>
        </div>
    </div>
);


const EmployeeList = () => {
    const navigate = useNavigate();
    const initialEmployees = [
        { id: 'EMP001', name: 'Ana Martínez', area: 'Ciber-escuela', role: 'Docente', active: true },
        { id: 'EMP002', name: 'Carlos Gómez', area: 'Cultura', role: 'Coordinador', active: true },
        { id: 'EMP003', name: 'Lucía Fernández', area: 'Deporte', role: 'Auxiliar', active: false },
        { id: 'EMP004', name: 'Miguel Pérez', area: 'Ciber-escuela', role: 'Docente', active: true },
        // ... puedes agregar más datos aquí
    ];
    
    // Estado para la búsqueda y los empleados filtrados
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [newEmployeeData, setNewEmployeeData] = useState({
        fullName: '',
        employeeId: '',
        email: '',
        phone: '',
        position: '',
        area: '',
        // Aquí irían los estados para las horas
    });

    const toggleAddModal = () => {
        setIsAddModalOpen(!isAddModalOpen);
    };

    // Funciones de acción
    const handleAddEmployee = () => {
        // En lugar de una alerta, abrimos el modal
        toggleAddModal(); 
    };

    const handleEmployeeSubmit = (e) => {
        e.preventDefault();
        alert(`Empleado ${newEmployeeData.fullName} agregado con éxito.`);
        // Aquí iría la lógica para enviar los datos a tu API
        
        toggleAddModal(); // Cerrar modal después de enviar
    };

    const handleGenerateReport = () => {
        navigate('/reports');
    };

    // ----------------------------------------------------
    // Lógica de filtrado de empleados
    const filteredEmployees = initialEmployees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emp.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // 

    return (
        <div className="employee-list">
            <h2>Gestión de Empleados</h2>
            
            {/* 👈 INSERTAMOS EL PANEL DE CONTROL AQUÍ */}
            <ControlPanel
                onAddEmployee={handleAddEmployee}
                onGenerateReport={handleGenerateReport}
                onSearchChange={setSearchTerm}
                searchTerm={searchTerm}
            />
            
            <div className="employee-table">
                {/* Si hay resultados, muestra la tabla */}
                {filteredEmployees.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Área</th>
                                <th>Rol</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(emp => (
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.area}</td>
                                    <td>{emp.role}</td>
                                    <td className={emp.active ? 'status-active' : 'status-inactive'}>
                                        {emp.active ? 'Activo' : 'Inactivo'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    // Mensaje si no hay resultados
                    <p className="no-results">No se encontraron empleados que coincidan con "{searchTerm}".</p>
                )}
            </div>
            {/* 👈 ESTRUCTURA DEL MODAL */}
            {isAddModalOpen && (
                <div className="modal-overlay" onClick={toggleAddModal}>
                    <div className="add-employee-modal" onClick={(e) => e.stopPropagation()}>
                        
                        <h2 className="modal-title">Agregar nuevo empleado</h2>
                        
                        <form onSubmit={handleEmployeeSubmit} className="add-employee-form">
                            
                            {/* Fila 1 */}
                            <label>Nombre completo *</label>
                            <input type="text" required value={newEmployeeData.fullName} onChange={(e) => setNewEmployeeData({...newEmployeeData, fullName: e.target.value})} />
                            
                            {/* Fila 2 */}
                            <label>ID de empleado *</label>
                            <input type="text" required value={newEmployeeData.employeeId} onChange={(e) => setNewEmployeeData({...newEmployeeData, employeeId: e.target.value})} />

                            {/* Fila 3: Email y Teléfono (en dos columnas) */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input type="email" required value={newEmployeeData.email} onChange={(e) => setNewEmployeeData({...newEmployeeData, email: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono</label>
                                    <input type="tel" value={newEmployeeData.phone} onChange={(e) => setNewEmployeeData({...newEmployeeData, phone: e.target.value})} />
                                    {/* Nota: Para el ícono de país, usarías un componente más complejo. Aquí es solo input. */}
                                </div>
                            </div>
                            
                            {/* Fila 4: Posición y Área (en dos columnas con select) */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Posicion</label>
                                    <select value={newEmployeeData.position} onChange={(e) => setNewEmployeeData({...newEmployeeData, position: e.target.value})}>
                                        <option value="">-- Seleccionar --</option>
                                        <option value="Docente">Docente</option>
                                        {/* ... otras opciones ... */}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Area</label>
                                    <select value={newEmployeeData.area} onChange={(e) => setNewEmployeeData({...newEmployeeData, area: e.target.value})}>
                                        <option value="">-- Seleccionar --</option>
                                        <option value="Cultura">Cultura</option>
                                        {/* ... otras opciones ... */}
                                    </select>
                                </div>
                            </div>
                            
                            {/* Fila 5: Horarios (Grid de 7x2) */}
                            <div className="horario-grid">
                                <span className="grid-label"></span>
                                {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'].map(day => (
                                    <span key={day} className="grid-day">{day}</span>
                                ))}
                                
                                <span className="grid-label">Hora de entrada</span>
                                {/* Simula 7 inputs de hora */}
                                {Array(7).fill(0).map((_, i) => (
                                    <input key={`in-${i}`} type="time" className="time-input" defaultValue="09:00" />
                                ))}
                                
                                <span className="grid-label">Hora de salida</span>
                                {/* Simula 7 inputs de hora */}
                                {Array(7).fill(0).map((_, i) => (
                                    <input key={`out-${i}`} type="time" className="time-input" defaultValue="18:00" />
                                ))}
                            </div>

                            {/* Botón de Envío y Cierre */}
                            <button type="submit" className="submit-button">
                                Enviar
                                <span onClick={toggleAddModal}>&times;</span>
                            </button>
                            
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EmployeeList;