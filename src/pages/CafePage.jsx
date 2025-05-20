import React, { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import api from '../services/api';


ModuleRegistry.registerModules([AllCommunityModule]);

export default function CafePage() {
  const [cafes, setCafes] = useState([]);
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const fetchCafes = async () => {
    try {
      const res = await api.get(`/cafes?location=${location}`);
      setCafes(res.data);
    } catch (e) {
      message.error('Failed to fetch cafes');
    }
  };

  useEffect(() => {
    fetchCafes();
  }, [location]);

  const commonCellStyle = {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    borderRight: '1px solid #dcdcdc',
  };

  const columns = [
    {
      field: 'logo',
      headerName: 'Logo',
      flex: 1,
      cellStyle: commonCellStyle,
      cellRenderer: ({ value }) =>
        value ? <img src={value} alt="logo" height={60}/> : ''
      
    },
    { field: 'cafeName', headerName: 'Name', flex: 1, cellStyle: commonCellStyle },
    { field: 'description', headerName: 'Description', flex: 1, cellStyle: commonCellStyle },
    { field: 'location', headerName: 'Location', flex: 1, cellStyle: commonCellStyle },
    {
      field: 'employees',
      headerName: 'Employees',
      flex: 1,
      cellStyle: commonCellStyle,
      cellRenderer: (params) => (
        <Button
          type="link"
          onClick={() =>
            navigate(`/employees?cafeName=${encodeURIComponent(params.data.cafeName)}`)
          }
        >
          {params.value}
        </Button>
      )
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        cellStyle: commonCellStyle,
        cellRenderer: (params) => (
          <div style={{ display: 'flex', gap: '25px' }}>
            <Button onClick={() => navigate(`/cafes/edit/${params.data.cafeId}`)}>Edit</Button>
            <Button danger onClick={() => handleDelete(params.data.cafeId)}>Delete</Button>
          </div>
        )
    }
  ];

  const handleDelete = async (cafeId) => {
    if (window.confirm('Are you sure to delete this cafe?')) {
      try {
        await api.delete(`/cafes/${cafeId}`);
        fetchCafes();
      } catch {
        message.error('Delete failed');
      }
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <h1 className="text-3xl font-bold mb-6">Cafes</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 16, gap: 16, width: '100%' }}>
        <Input
          placeholder="Filter by location"
          onChange={e => setLocation(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => navigate('/cafes/add')}>Add New Café</Button>
        <div style={{ marginLeft: 'auto' }}>
          <Button onClick={() => navigate('/employees')}>Go to Employees</Button>
        </div>
      </div>
      <div style={{ flex: 1, width: '100%' }}>
        <div
          className="ag-theme-alpine"
          style={{ height: '100%', width: '100%' }}
        >
          <AgGridReact
            rowData={cafes}
            columnDefs={columns}
            pagination={true}
            rowHeight={60}
          />
        </div>
      </div>
    </div>
  );
}
