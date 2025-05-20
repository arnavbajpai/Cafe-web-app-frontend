import React, { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import api from '../services/api';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function EmployeePage() {
  const [searchParams] = useSearchParams();
  const initialCafe = searchParams.get('cafeName') || '';
  const [cafeName, setCafeName] = useState(initialCafe);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await api.get(`/employees?cafe=${cafeName}`);
      setEmployees(res.data);
    } catch (e) {
      message.error('Failed to fetch employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [cafeName]);

  const commonCellStyle = {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    borderRight: '1px solid #dcdcdc'
  };

  const columns = [
    { field: 'empId', headerName: 'Employee ID', flex: 1, cellStyle: commonCellStyle },
    { field: 'empName', headerName: 'Name', flex: 1, cellStyle: commonCellStyle },
    { field: 'email', headerName: 'Email Address', flex: 1, cellStyle: commonCellStyle },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, cellStyle: commonCellStyle },
    { field: 'days', headerName: 'Days Worked', flex: 1, cellStyle: commonCellStyle },
    { field: 'cafe', headerName: 'Café', flex: 1, cellStyle: commonCellStyle },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      cellStyle: commonCellStyle,
        cellRenderer: (params) => (
            <div style={{ display: 'flex', gap: '25px' }}>
            <Button onClick={() => navigate(`/employees/edit/${params.data.empId}`)}>Edit</Button>
            <Button danger onClick={() => handleDelete(params.data.empId)}>Delete</Button>
            </div>
        )
    }
  ];

  const handleDelete = async (empId) => {
    if (window.confirm('Are you sure to delete this employee?')) {
      try {
        await api.delete(`/employees/${empId}`);
        fetchEmployees();
      } catch {
        message.error('Delete failed');
      }
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <h1 className="text-3xl font-bold mb-6">Employees</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 16, gap: 16, width: '100%' }}>
        <Input
          placeholder="Filter by cafe name"
          value={cafeName}
          onChange={e => setCafeName(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => navigate('/employees/add')}>Add New Employee</Button>
        <div style={{ marginLeft: 'auto' }}>
          <Button onClick={() => navigate('/cafes')}>Go to Cafes</Button>
        </div>
      </div>
      <div style={{ flex: 1, width: '100%' }}>
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            rowData={employees}
            columnDefs={columns}
            pagination={true}
            rowHeight={60}
          />
        </div>
      </div>
    </div>
  );
}
