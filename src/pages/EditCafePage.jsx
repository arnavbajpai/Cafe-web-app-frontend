
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../services/api';
import { v4 as uuidv4 } from 'uuid';

export default function EditCafePage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      api.get(`/cafes?location=`) 
        .then(res => {
          const cafe = res.data.find(c => c.cafeId === id);
          if (cafe) {
            setInitialValues(cafe);
            form.setFieldsValue(cafe);
          } else {
            message.error('Café not found');
            navigate('/cafes');
          }
        });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ...values,
        logo: logoFile ? URL.createObjectURL(logoFile) : initialValues?.logo || ''
      };
      if (isEdit) {
        await api.put(`/cafes/${id}`, payload);
        message.success('Café updated successfully');
      } else {
        payload.cafeId = uuidv4();
        payload.employees = 0;
        await api.post('/cafes', payload);
        message.success('Café created successfully');
      }
      navigate('/cafes');
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
        {isEdit ? 'Edit Café' : 'Add New Café'}
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
          >
            <Form.Item
              label="Name"
              name="cafeName"
              rules={[
                { required: true, message: 'Name is required' },
                { min: 6, max: 10, message: 'Name must be 6-10 characters' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ max: 256, message: 'Max 256 characters' }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item 
              label="Logo"
              name="logo"
            >
              <Upload
                beforeUpload={(file) => {
                  if (file.size / 1024 / 1024 > 2) {
                    message.error('Logo must be smaller than 2MB');
                    return false;
                  }
                  setLogoFile(file);
                  return false; 
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select Logo</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: 'Location is required' }]}
            >
              <Input />
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
              <Button onClick={() => navigate('/cafes')} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

