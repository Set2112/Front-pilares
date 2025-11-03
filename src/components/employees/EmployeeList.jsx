import React from 'react';
import './EmployeeList.css';

const EmployeeList = () => {
  const employees = [
    { id: 'EMP001', name: 'Ana Martínez', area: 'Ciber-escuela', role: 'Docente', active: true },
    { id: 'EMP002', name: 'Carlos Gómez', area: 'Cultura', role: 'Coordinador', active: true },
    { id: 'EMP003', name: 'Lucía Fernández', area: 'Deporte', role: 'Auxiliar', active: false },
  ];

  return (
    <div className="employee-list">
      <h2>Gestión de Empleados</h2>
      <div className="employee-table">
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
            {employees.map(emp => (
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
      </div>
    </div>
  );
};

export default EmployeeList;
