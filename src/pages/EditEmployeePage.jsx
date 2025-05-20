import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Radio, Select, message, Modal } from 'antd';
import api from '../services/api';

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cafes, setCafes] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const isEdit = Boolean(id);
  const isMounted = useRef(false);


  useEffect(() => {
    api.get('/cafes?location=').then(res => setCafes(res.data || []));
  }, []);


  useEffect(() => {
    if (isEdit) {
      api.get(`/employees`)
        .then(res => {
          const emp = res.data.find(e => e.empId === id);
          if (emp) {
            setInitialValues(emp);
            form.setFieldsValue(emp);
          } else {
            message.error('Employee not found');
            navigate('/employees');
          }
        });
    }
  }, [id]);


  useEffect(() => {
    isMounted.current = true;
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);


  useEffect(() => {
    const unblock = navigate.block?.((tx) => {
      if (isDirty) {
        Modal.confirm({
          title: 'Unsaved changes',
          content: 'You have unsaved changes. Are you sure you want to leave?',
          onOk: () => {
            unblock();
            tx.retry();
          }
        });
        return false;
      }
      return true;
    });
    return unblock;
  }, [isDirty, navigate]);

  const handleFormChange = () => {
    if (isMounted.current) setIsDirty(true);
  };


  function generateEmpId() {
    const num = Math.floor(1000000 + Math.random() * 9000000);
    return `UI${num}`;
  }

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const payload = { ...values };
      if (isEdit) {
        await api.put(`/employees/${id}`, payload);
        message.success('Employee updated successfully');
      } else {
        payload.empId = generateEmpId();
        payload.days = 0;
        await api.post('/employees', payload);
        message.success('Employee created successfully');
      }
      setIsDirty(false);
      navigate('/employees');
    } catch (err) {
      message.error('Save failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column'
    }}>

      <div style={{
        width: '100%',
        background: '#222',
        color: '#fff',
        padding: '32px 0 24px 0',
        fontWeight: 'bold',
        fontSize: '2.5rem',
        textAlign: 'left',
        paddingLeft: 24,
        letterSpacing: 1
      }}>
        {isEdit ? 'Edit Employee' : 'Add New Employee'}
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '32px 32px 24px 32px',
          minWidth: 380,
          width: '100%',
          maxWidth: 480
        }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={initialValues || {}}
            onValuesChange={handleFormChange}
          >
            <Form.Item
              label="Name"
              name="empName"
              rules={[
                { required: true, message: 'Name is required' },
                { min: 6, max: 10, message: 'Name must be 6-10 characters' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email address' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: 'Phone number is required' },
                {
                  pattern: /^(8|9)\d{7}$/,
                  message: 'Phone number must start with 8 or 9 and be 8 digits'
                }
              ]}
            >
              <Input maxLength={8} />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Gender is required' }]}
            >
              <Radio.Group>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Assigned Café"
              name="cafe"
              rules={[{ required: true, message: 'Assigned Café is required' }]}
            >
              <Select placeholder="Select a café">
                {cafes.map(cafe => (
                  <Select.Option key={cafe.cafeId} value={cafe.cafeName}>
                    {cafe.cafeName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <Button
                htmlType="submit"
                loading={isSubmitting}
                style={{
                  background: '#fff',
                  color: '#222',
                  border: '1px solid #d9d9d9'
                }}
              >
                Submit
              </Button>
              <Button
                onClick={() => navigate('/employees')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}