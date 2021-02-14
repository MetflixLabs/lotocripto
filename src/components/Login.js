import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Modal, Form, Input, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import colors from '../components/utils/colors';

const submitLogin = (values, setSubmitting, setLoginVisible) => {
  const apiUrl = process.env.GATSBY_API_URL;
  const { name, password } = values;

  setSubmitting(true);
  message.loading({ content: 'Entrando...', key: 'login-message' });

  axios
    .post(`${apiUrl}/login`, { name, password }, { withCredentials: true })
    .then(res => {
      const successMessage = res.data.notification.message;

      message.success({
        content: successMessage,
        key: 'login-message',
        duration: 5,
      });

      setLoginVisible(false);
    })
    .catch(err => {
      const errorMessage = err.response.data.notification.message;

      message.error({
        content: errorMessage,
        key: 'login-message',
        duration: 10,
      });

      setSubmitting(false);
    });
};

const Login = ({ setLoginVisible }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <LoginModal
      title="Entrar"
      visible
      onOk={() => form.submit()}
      onCancel={() => !isSubmitting && setLoginVisible(false)}
      cancelText="Voltar"
      okText="Entrar"
      cancelButtonProps={{
        disabled: isSubmitting,
      }}
      okButtonProps={{
        loading: isSubmitting,
        disabled: isSubmitting,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark
        onFinish={values => submitLogin(values, setSubmitting, setLoginVisible)}
      >
        <Form.Item
          name="name"
          label="Nickname"
          required
          rules={[
            { required: true, message: 'Esse campo não pode ficar em branco' },
          ]}
        >
          <Input placeholder="Seu nome de usuário" addonBefore="@" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Senha"
          required
          rules={[
            { required: true, message: 'Esse campo não pode ficar em branco' },
          ]}
        >
          <Input.Password
            placeholder="Sua senha"
            addonBefore={<LockOutlined />}
          />
        </Form.Item>
      </Form>
    </LoginModal>
  );
};

const LoginModal = styled(Modal)`
  .ant-modal-title {
    color: ${colors.green} !important;
  }

  .ant-btn {
    border-color: ${colors.green} !important;
    color: ${colors.green} !important;

    &:hover {
      color: ${colors.green} !important;
    }
  }

  .ant-btn-primary {
    border-color: ${colors.green} !important;
    color: ${colors.white} !important;

    &:not(:disabled) {
      background-color: ${colors.green} !important;
    }

    &:disabled {
      color: ${colors.green} !important;

      &:hover {
        color: ${colors.green} !important;
      }
    }

    &:hover {
      color: ${colors.white} !important;
    }
  }
`;

export default Login;
