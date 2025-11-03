import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

const INITIAL = [
  { id: 'ADMIN01', name: 'Admin General', email:'admin@demo.mx', phone:'+52 55 1234 5678', role: 'Administrador', area: 'Dirección', days:'Lun-Vie', from:'08:00:00', to:'17:00:00', active: true, admin: true },
  { id: 'EMP001', name: 'Ana Martínez',   email:'ana@demo.mx',   phone:'', role: 'Docente',     area: 'Ciber-escuela', days:'', from:'09:00:00', to:'20:00:00', active: true },
  { id: 'EMP002', name: 'Carlos Gómez',   email:'carlos@demo.mx', phone:'', role: 'Coordinador', area: 'Cultura',        days:'', from:'09:00:00', to:'17:00:00', active: true },
  { id: 'EMP003', name: 'Lucía Fernández',email:'lucia@demo.mx',  phone:'+52 55 5656 5464', role: 'Auxiliar', area: 'Deporte', days:'Lunes; Jueves', from:'05:00:00', to:'15:00:00', active: false },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState(INITIAL);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  // Filtro
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q)
    );
  }, [employees, query]);

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    const num = (employees.length + 1).toString().padStart(3, '0');
    const newEmp = {
      id: `EMP${num}`,
      name: `Nuevo Empleado ${num}`,
      email: `empleado${num}@demo.mx`,
      phone: '',
      role: 'Auxiliar',
      area: 'Ciber-escuela',
      days: '',
      from: '09:00:00',
      to: '17:00:00',
      active: true,
    };
    setEmployees([newEmp, ...employees]);
  };

  const handleReport = () => {
    navigate('/reportes');
  };

  const handleEdit = (id) => {
    alert(`Modificar empleado: ${id}`);
  };

  // Modal propio de confirmación (para evitar window.confirm)
  const [deleteId, setDeleteId] = useState(null);

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

  return (
    <div className="employee-screen">
      <div className="emp-toolbar">
        <button className="btn-circle-exit" onClick={handleLogout} aria-label="Cerrar sesión">×</button>
        <div className="emp-brand">
          <div className="emp-logo-text">Gestion de Empleados </div>
        </div>
        <h1 className="emp-title">Gestion de Empleados</h1>
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
              <th>Telefono</th>
              <th>Rol</th>
              <th>Area</th>
              <th>Dias a Trabajar</th>
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
    </div>
  );
};

export default EmployeeList;
