import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

// Datos iniciales de ejemplo
const INITIAL_EMPLOYEES = [
  {
    id: 'ADMIN01',
    name: 'Admin General',
    email: 'admin@demo.mx',
    phone: '+52 55 1234 5678',
    role: 'Administrador',
    area: 'Dirección',
    days: 'Lun-Vie',
    from: '08:00',
    to: '17:00',
    active: true,
    admin: true
  },
  {
    id: 'EMP001',
    name: 'Ana Martínez',
    email: 'ana@demo.mx',
    phone: '',
    role: 'Docente',
    area: 'Ciber-escuela',
    days: 'Mar-Jue',
    from: '09:00',
    to: '20:00',
    active: true,
    admin: false
  },
  {
    id: 'EMP002',
    name: 'Carlos Gómez',
    email: 'carlos@demo.mx',
    phone: '',
    role: 'Coordinador',
    area: 'Cultura',
    days: 'Lun-Vie',
    from: '09:00',
    to: '17:00',
    active: true,
    admin: false
  },
  {
    id: 'EMP003',
    name: 'Lucía Fernández',
    email: 'lucia@demo.mx',
    phone: '+52 55 5656 5464',
    role: 'Auxiliar',
    area: 'Deporte',
    days: 'Lunes; Jueves',
    from: '05:00',
    to: '15:00',
    active: false,
    admin: false
  },
];

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    isNew: true,
    employee: null
  });

  // Filtrado y búsqueda
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = 
        filterActive === 'all' ||
        (filterActive === 'active' && emp.active) ||
        (filterActive === 'inactive' && !emp.active);

      return matchesSearch && matchesFilter;
    });
  }, [employees, searchQuery, filterActive]);

  // Abrir modal para agregar
  const handleAddEmployee = () => {
    setModalData({
      isNew: true,
      employee: {
        id: '',
        name: '',
        email: '',
        phone: '',
        role: '',
        area: '',
        schedule: {
          Lunes: { from: '', to: '' },
          Martes: { from: '', to: '' },
          Miercoles: { from: '', to: '' },
          Jueves: { from: '', to: '' },
          Viernes: { from: '', to: '' },
          Sabado: { from: '', to: '' },
          Domingo: { from: '', to: '' }
        }
      }
    });
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleEditEmployee = (employee) => {
    setModalData({
      isNew: false,
      employee: { ...employee }
    });
    setIsModalOpen(true);
  };

  // Cerrar modal
  const toggleModal = () => {
    setIsModalOpen(false);
  };

  // Guardar empleado (agregar o editar)
  const handleSaveEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newEmployee = {
      id: formData.get('id'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      area: formData.get('area'),
      active: true,
      admin: false,
      schedule: {
        Lunes: { 
          from: formData.get('Lunes-from'), 
          to: formData.get('Lunes-to') 
        },
        Martes: { 
          from: formData.get('Martes-from'), 
          to: formData.get('Martes-to') 
        },
        Miercoles: { 
          from: formData.get('Miercoles-from'), 
          to: formData.get('Miercoles-to') 
        },
        Jueves: { 
          from: formData.get('Jueves-from'), 
          to: formData.get('Jueves-to') 
        },
        Viernes: { 
          from: formData.get('Viernes-from'), 
          to: formData.get('Viernes-to') 
        },
        Sabado: { 
          from: formData.get('Sabado-from'), 
          to: formData.get('Sabado-to') 
        },
        Domingo: { 
          from: formData.get('Domingo-from'), 
          to: formData.get('Domingo-to') 
        }
      }
    };

    if (modalData.isNew) {
      setEmployees([...employees, newEmployee]);
    } else {
      setEmployees(employees.map(emp => 
        emp.id === newEmployee.id ? newEmployee : emp
      ));
    }

    setIsModalOpen(false);
  };

  // Eliminar empleado
  const handleDeleteEmployee = (id) => {
    if (window.confirm('¿Está seguro de eliminar este empleado?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  // Toggle estado activo/inactivo
  const toggleEmployeeStatus = (id) => {
    setEmployees(employees.map(emp =>
      emp.id === id ? { ...emp, active: !emp.active } : emp
    ));
  };

  return (
    <div className="employee-list-container">
      <h1 className="page-title">Gestión de Empleados</h1>

      {/* Panel de controles */}
      <div className="control-panel">
        <div className="control-panel-left">
          <button className="control-button" onClick={handleAddEmployee}>
            ➕ Agregar Empleado
          </button>
          <button className="control-button" onClick={() => navigate('/reports')}>
            📊 Ver Reportes
          </button>
        </div>

        <div className="control-panel-right">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            ← Volver
          </button>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Buscar por nombre, ID o email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterActive === 'all' ? 'active' : ''}`}
            onClick={() => setFilterActive('all')}
          >
            Todos
          </button>
          <button
            className={`filter-btn ${filterActive === 'active' ? 'active' : ''}`}
            onClick={() => setFilterActive('active')}
          >
            Activos
          </button>
          <button
            className={`filter-btn ${filterActive === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilterActive('inactive')}
          >
            Inactivos
          </button>
        </div>
      </div>

      {/* Tabla de empleados */}
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Posición</th>
              <th>Área</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className={emp.active ? '' : 'inactive-row'}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone || 'N/A'}</td>
                <td>{emp.role}</td>
                <td>{emp.area}</td>
                <td>
                  <span className={`status-badge ${emp.active ? 'active' : 'inactive'}`}>
                    {emp.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleEditEmployee(emp)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-toggle"
                      onClick={() => toggleEmployeeStatus(emp.id)}
                      title={emp.active ? 'Desactivar' : 'Activar'}
                    >
                      {emp.active ? '🔒' : '🔓'}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteEmployee(emp.id)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar empleado */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="add-employee-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {modalData.isNew ? 'Agregar nuevo empleado' : 'Editar empleado'}
            </h2>

            <form className="add-employee-form" onSubmit={handleSaveEmployee}>
              {/* Nombre completo */}
              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={modalData.employee?.name}
                  required
                />
              </div>

              {/* ID de empleado */}
              <div className="form-group">
                <label htmlFor="id">ID de empleado *</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  defaultValue={modalData.employee?.id}
                  required
                  disabled={!modalData.isNew}
                />
              </div>

              {/* Email y Teléfono en fila */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={modalData.employee?.email}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    defaultValue={modalData.employee?.phone}
                  />
                </div>
              </div>

              {/* Posición y Área en fila */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Posición</label>
                  <select
                    id="role"
                    name="role"
                    defaultValue={modalData.employee?.role}
                  >
                    <option value="">-- Seleccionar --</option>
                    <option value="Docente">Docente</option>
                    <option value="Coordinador">Coordinador</option>
                    <option value="Auxiliar">Auxiliar</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="area">Área</label>
                  <select
                    id="area"
                    name="area"
                    defaultValue={modalData.employee?.area}
                  >
                    <option value="">-- Seleccionar --</option>
                    <option value="Dirección">Dirección</option>
                    <option value="Ciber-escuela">Ciber-escuela</option>
                    <option value="Cultura">Cultura</option>
                    <option value="Deporte">Deporte</option>
                  </select>
                </div>
              </div>

              {/* Horarios - Versión optimizada */}
              <div className="horario-section">
                <div className="horario-grid">
                  <div className="grid-label"></div>
                  <div className="grid-day">Lun</div>
                  <div className="grid-day">Mar</div>
                  <div className="grid-day">Mié</div>
                  <div className="grid-day">Jue</div>
                  <div className="grid-day">Vie</div>
                  <div className="grid-day">Sáb</div>
                  <div className="grid-day">Dom</div>

                  <div className="grid-label">Entrada</div>
                  {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'].map(day => (
                    <input
                      key={`${day}-from`}
                      type="time"
                      name={`${day}-from`}
                      className="time-input"
                      defaultValue={modalData.employee?.schedule?.[day]?.from || ''}
                    />
                  ))}

                  <div className="grid-label">Salida</div>
                  {['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'].map(day => (
                    <input
                      key={`${day}-to`}
                      type="time"
                      name={`${day}-to`}
                      className="time-input"
                      defaultValue={modalData.employee?.schedule?.[day]?.to || ''}
                    />
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="modal-buttons">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={toggleModal}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="submit-button"
                >
                  {modalData.isNew ? 'AGREGAR' : 'GUARDAR'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
