import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Modal, Form, Input, Alert, message } from 'antd';
import { LockOutlined, WalletOutlined, MailOutlined } from '@ant-design/icons';

import colors from '../components/utils/colors';

const submitSignup = (values, setSubmitting, setSignupVisible) => {
  const apiUrl = process.env.GATSBY_API_URL;
  const { name, email, password, walletAddress } = values;

  setSubmitting(true);
  message.loading({ content: 'Criando sua conta...', key: 'signup-message' });

  axios
    .post(`${apiUrl}/users`, { name, email, password, walletAddress })
    .then(res => {
      message.success({
        content: 'Sua conta foi criada com sucesso! Você pode entrar agora.',
        key: 'signup-message',
        duration: 10,
      });

      setSignupVisible(false);
    })
    .catch(err => {
      const errorMessage = err.response.data.notification.message;

      message.error({
        content: errorMessage,
        key: 'signup-message',
        duration: 10,
      });

      setSubmitting(false);
    });
};

const Signup = ({ setSignupVisible }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <SignupModal
      title="Registrar"
      visible
      onOk={() => form.submit()}
      onCancel={() => !isSubmitting && setSignupVisible(false)}
      cancelText="Voltar"
      okText="Confirmar"
      cancelButtonProps={{
        disabled: isSubmitting,
      }}
      okButtonProps={{
        loading: isSubmitting,
        disabled: isSubmitting,
      }}
    >
      <AlertWrapper>
        <Alert
          message="Atenção"
          description={
            <div>
              Você não poderá alterar seus dados posteriormente. É importante{' '}
              <a
                href="https://www.mintme.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                criar uma carteira de MINTME
              </a>{' '}
              antes de se cadastrar.
            </div>
          }
          type="warning"
          showIcon
        />
      </AlertWrapper>
      <Form
        form={form}
        layout="vertical"
        requiredMark
        onFinish={values =>
          submitSignup(values, setSubmitting, setSignupVisible)
        }
      >
        <Form.Item
          name="name"
          label="Nickname"
          required
          rules={[
            { required: true, message: 'Esse campo não pode ficar em branco' },
            { min: 3, message: 'Mínimo de 3 caracteres' },
            { max: 8, message: 'Máximo de 8 caracteres' },
          ]}
        >
          <Input placeholder="De 3 a 8 caracteres" addonBefore="@" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          required
          rules={[
            { required: true, message: 'Esse campo não pode ficar em branco' },
            { type: 'email', message: 'Email inválido' },
          ]}
        >
          <Input placeholder="Seu email" addonBefore={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Senha"
          required
          rules={[
            { required: true, message: 'Esse campo não pode ficar em branco' },
            { min: 6, message: 'Mínimo de 6 caracteres' },
          ]}
        >
          <Input.Password
            placeholder="Use uma senha segura"
            addonBefore={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="walletAddress"
          label="Wallet de MINTME"
          required
          rules={[
            { required: true, message: 'Esse campo não pode ficar em branco' },
          ]}
          tooltip="Sua wallet é para onde enviaremos as moedas que você ganhar nos sorteios. Crie uma wallet no site oficial da moeda: mintme.com"
        >
          <Input
            placeholder="Exemplo: 0x0ef22e4bba275017d15ccb7b3f43a141f20ab3fe"
            addonBefore={<WalletOutlined />}
          />
        </Form.Item>
      </Form>
    </SignupModal>
  );
};

const SignupModal = styled(Modal)`
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

const AlertWrapper = styled.div`
  margin-bottom: 10px;
`;

export default Signup;
