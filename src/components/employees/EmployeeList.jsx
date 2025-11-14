import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

// Datos iniciales de ejemplo
const INITIAL = [
  { id: 'ADMIN01', name: 'Admin General', email:'admin@demo.mx', phone:'+52 55 1234 5678', role: 'Administrador', area: 'Dirección', days:'Lun-Vie', from:'08:00:00', to:'17:00:00', active: true, admin: true },
  { id: 'EMP001', name: 'Ana Martínez',   email:'ana@demo.mx',   phone:'', role: 'Docente',     area: 'Ciber-escuela', days:'Mar-Jue', from:'09:00:00', to:'20:00:00', active: true, admin: false },
  { id: 'EMP002', name: 'Carlos Gómez',   email:'carlos@demo.mx', phone:'', role: 'Coordinador', area: 'Cultura',        days:'Lun-Vie', from:'09:00:00', to:'17:00:00', active: true, admin: false },
  { id: 'EMP003', name: 'Lucía Fernández',email:'lucia@demo.mx',  phone:'+52 55 5656 5464', role: 'Auxiliar', area: 'Deporte', days:'Lunes; Jueves', from:'05:00:00', to:'15:00:00', active: false, admin: false },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState(INITIAL);
  const [query, setQuery] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // 👈 ESTADO UNIFICADO DEL MODAL: Contiene los datos del empleado o es null (cerrado)
  const [modalData, setModalData] = useState(null);
    
  // Función para cerrar el modal
  const toggleModal = () => {
      setModalData(null);
  };
  
  // Maneja cambios en los campos de texto/select del modal
  const handleModalDataChange = (field, value) => {
      setModalData(prev => ({
          ...prev,
          [field]: value
      }));
  };
  
  // Maneja los cambios de horario en el grid
  const handleScheduleChange = (index, type, value) => {
      setModalData(prev => {
          const newSchedule = [...prev.schedule];
          newSchedule[index][type] = value;
          return {
              ...prev,
              schedule: newSchedule
          };
      });
  };

  // Envío de formulario: maneja AGREGAR (isNew: true) y MODIFICAR (isNew: false)
  const handleModalSubmit = (e) => {
      e.preventDefault();
      
      if (!modalData.name || !modalData.id) {
           alert('Por favor complete los campos requeridos.');
           return;
      }

      // 1. Crear el objeto del empleado a guardar (adaptando los campos del modal)
      const employeeToSave = {
          id: modalData.id,
          name: modalData.name,
          email: modalData.email,
          phone: modalData.phone,
          role: modalData.position || 'N/A', // Mapeo de Posicion a role
          area: modalData.area || 'N/A',
          days: 'Ver Horario', 
          from: modalData.schedule[0].entry + ':00', 
          to: modalData.schedule[0].exit + ':00', 
          // Conservar propiedades existentes al modificar
          active: employees.find(e => e.id === modalData.id)?.active ?? true, 
          admin: employees.find(e => e.id === modalData.id)?.admin ?? false,
      };

      // 2. Actualizar el estado de la lista de empleados
      if (modalData.isNew) {
          // AGREGAR NUEVO
          setEmployees(prev => [employeeToSave, ...prev]);
      } else {
          // MODIFICAR EXISTENTE
          setEmployees(prev => prev.map(emp => 
              emp.id === modalData.id ? employeeToSave : emp
          ));
      }
      
      // 3. Cerrar modal
      setModalData(null); 
  };
  
  // Abre el modal para AGREGAR NUEVO
  const handleAdd = () => {
    // Inicializa el estado para un formulario vacío de un nuevo empleado
    setModalData({
        id: '',
        name: '',
        email: '',
        phone: '',
        position: '',
        area: '',
        schedule: Array(7).fill({ entry: '09:00', exit: '17:00' }),
        isNew: true // Indicador de que es una operación de agregado
    });
  };

  // Abre el modal para MODIFICAR
  const handleEdit = (id) => {
    const employeeToEdit = employees.find(e => e.id === id);

    if (employeeToEdit) {
        // Rellena el formulario con los datos existentes
        const scheduleData = Array(7).fill({
            entry: employeeToEdit.from.substring(0, 5) || '09:00',
            exit: employeeToEdit.to.substring(0, 5) || '17:00'
        });
        
        setModalData({
            id: employeeToEdit.id,
            name: employeeToEdit.name,
            email: employeeToEdit.email,
            phone: employeeToEdit.phone,
            position: employeeToEdit.role, // Mapeo: role en data, position en formulario
            area: employeeToEdit.area,
            schedule: scheduleData,
            isNew: false // Indicador de que es una operación de modificación
        });
    } else {
         alert('Empleado no encontrado.');
    }
  };


  // ------------------------------------------------------------------
  //  OTROS HANDLERS Y LÓGICA
  // ------------------------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q)
    );
  }, [employees, query]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleReport = () => {
    navigate('/reportes');
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    setEmployees(prev => prev.filter(e => e.id !== deleteId));
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];


  return (
    <div className="employee-screen">
      <div className="emp-toolbar">
        <button className="btn-circle-exit" onClick={handleLogout} aria-label="Cerrar sesión">×</button>
        <div className="emp-brand">
          <div className="emp-logo-text">Gestión de Empleados</div>
        </div>
        <h1 className="emp-title">Gestión de Empleados</h1>
      </div>

      <div className="emp-actions">
        <button className="btn-primary" onClick={handleAdd}>
          <span className="btn-icon" role="img" aria-label="Agregar">👤➕</span> Agregar nuevo empleado
        </button>

        <button className="btn-secondary" onClick={handleReport}>
          <span className="btn-icon" role="img" aria-label="Reporte">🧾</span> Generar Reporte
        </button>

        <form className="emp-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar por Nombre o ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-search" type="submit">Buscar</button>
        </form>
      </div>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>Hora de envío</th>
              <th>Nombre completo</th>
              <th>ID de Empleado</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Área</th>
              <th>Días a Trabajar</th>
              <th>De</th>
              <th>A</th>
              <th className="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(emp => (
              <tr key={emp.id} className={emp.admin ? 'row-admin' : ''}>
                <td>{new Date().toLocaleDateString('es-MX')}</td>
                <td>{emp.name}</td>
                <td>{emp.id}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.role}</td>
                <td>{emp.area}</td>
                <td>{emp.days || '—'}</td>
                <td>{emp.from}</td>
                <td>{emp.to}</td>
                <td className="cell-actions">
                  <button className="btn-mini" onClick={() => handleEdit(emp.id)}>✏️ Modificar</button>
                  <button className="btn-mini danger" onClick={() => handleDelete(emp.id)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={11} className="empty">Sin resultados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {deleteId && (
        <div className="modal-overlay" style={{zIndex: 2222}}>
          <div className="admin-modal" style={{minWidth: 340}}>
            <h2 className="modal-title" style={{fontSize: "1.2rem", marginBottom: 20}}>¿Eliminar este empleado?</h2>
            <div style={{display: "flex", gap: 12, justifyContent: "center"}}>
              <button className="btn-primary" onClick={confirmDelete}>Sí, eliminar</button>
              <button className="btn-secondary" onClick={cancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ÚNICO DE AGREGAR/MODIFICAR */}
      {modalData && (
        <div className="modal-overlay" style={{ zIndex: 3333 }} onClick={toggleModal}>
          <div className="admin-modal add-employee-modal" onClick={(e) => e.stopPropagation()}>
            
            {/* TÍTULO DINÁMICO */}
            <h2 className="modal-title">
                {modalData.isNew ? 'Agregar nuevo empleado' : `Modificar empleado: ${modalData.name}`}
            </h2>
            
            <form onSubmit={handleModalSubmit} className="add-employee-form">
                
                <label>Nombre completo *</label>
                <input 
                    type="text" 
                    required 
                    value={modalData.name} 
                    onChange={(e) => handleModalDataChange('name', e.target.value)} 
                />
                
                <label>ID de empleado *</label>
                <input 
                    type="text" 
                    required 
                    value={modalData.id} 
                    disabled={!modalData.isNew} 
                    onChange={(e) => handleModalDataChange('id', e.target.value)} 
                />

                <div className="form-row">
                    <div className="form-group">
                        <label>Email *</label>
                        <input 
                            type="email" 
                            required 
                            value={modalData.email} 
                            onChange={(e) => handleModalDataChange('email', e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input 
                            type="tel" 
                            value={modalData.phone} 
                            onChange={(e) => handleModalDataChange('phone', e.target.value)} 
                        />
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="form-group">
                        <label>Posicion</label>
                        <select 
                            value={modalData.position} 
                            onChange={(e) => handleModalDataChange('position', e.target.value)}
                        >
                            <option value="">-- Seleccionar --</option>
                            <option value="Docente">Docente</option>
                            <option value="Coordinador">Coordinador</option>
                            <option value="Auxiliar">Auxiliar</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Area</label>
                        <select 
                            value={modalData.area} 
                            onChange={(e) => handleModalDataChange('area', e.target.value)}
                        >
                            <option value="">-- Seleccionar --</option>
                            <option value="Ciber-escuela">Ciber-escuela</option>
                            <option value="Cultura">Cultura</option>
                            <option value="Deporte">Deporte</option>
                            <option value="Dirección">Dirección</option>
                        </select>
                    </div>
                </div>
                
                {/* Horarios Grid */}
                <div className="horario-grid">
                    <span className="grid-label"></span>
                    {daysOfWeek.map(day => (
                        <span key={day} className="grid-day">{day}</span>
                    ))}
                    
                    <span className="grid-label">Hora de entrada</span>
                    {modalData.schedule.map((slot, index) => (
                        <input 
                            key={`in-${index}`} 
                            type="time" 
                            className="time-input" 
                            value={slot.entry}
                            onChange={(e) => handleScheduleChange(index, 'entry', e.target.value)}
                        />
                    ))}
                    
                    <span className="grid-label">Hora de salida</span>
                    {modalData.schedule.map((slot, index) => (
                        <input 
                            key={`out-${index}`} 
                            type="time" 
                            className="time-input" 
                            value={slot.exit}
                            onChange={(e) => handleScheduleChange(index, 'exit', e.target.value)}
                        />
                    ))}
                </div>

                {/* Botón de Envío Dinámico */}
                <button type="submit" className="submit-button">
                    {modalData.isNew ? 'Enviar' : 'Guardar Cambios'}
                    <span onClick={toggleModal}>&times;</span>
                </button>
                
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;