import React from 'react';
import styled from 'styled-components';
import { Modal, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

import colors from '../components/utils/colors';

const submitLogin = values => {
  console.log('submit!', values);
};

const Login = ({ setLoginVisible }) => {
  const [form] = Form.useForm();

  return (
    <LoginModal
      title="Entrar"
      visible
      onOk={() => form.submit()}
      onCancel={() => setLoginVisible(false)}
      cancelText="Voltar"
      okText="Entrar"
    >
      <Form form={form} layout="vertical" requiredMark onFinish={submitLogin}>
        <Form.Item
          name="nickname"
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

    &:hover {
      color: ${colors.white} !important;
    }
  }
`;

export default Login;
