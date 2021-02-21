import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Modal, Alert, Steps, Divider } from 'antd';
import { StopOutlined } from '@ant-design/icons';

import colors from '../components/utils/colors';
import media from '../components/utils/media';

const { Step } = Steps;

const AdBlock = () => {
  useEffect(() => {
    window.gtag &&
      window.gtag('event', 'ad_block_modal', {
        event_label: `AdBlock Modal`,
        event_category: 'AdBlock Modal',
        non_interaction: true,
      });
  }, []);

  return (
    <AdBlockModal
      title="Seu AdBlock está ligado"
      visible
      onOk={() => window.location.reload()}
      okText="Tudo certo!"
      style={{ top: 20 }}
      closable={false}
    >
      <Alert
        message="AdBlockers não permitem mineração de criptomoedas"
        description="Mas calma! Você não precisa remover o seu AdBlock - apenas permita que ele não bloqueie a sua mineração no LotoCripto."
        type="error"
        showIcon
      />
      <BlockWrapper>
        <Title>
          <StopOutlined /> AdBlock Plus
        </Title>
        <Paragraph>
          <Steps progressDot current={5} direction="vertical">
            <Step title="Clique no ícone do AdBlock Plus, localizado à direita da barra de endereços do seu navegador" />
            <Step title="Um menu drop-down aparecerá na tela" />
            <Step title="Clique em “Enabled on this site” para desativar o bloqueio do minerador no LotoCripto" />
            <Step title="Após o clique, o texto será substituído por “Disabled on this site”" />
            <Step title="Clique em ”Tudo certo!” logo abaixo ou atualize a página" />
          </Steps>
          <Divider />
        </Paragraph>
      </BlockWrapper>
      <BlockWrapper>
        <Title>
          <StopOutlined /> uBlock Origin
        </Title>
        <Paragraph>
          <Steps progressDot current={4} direction="vertical">
            <Step title="Clique no ícone do uBlock Origin, localizado à direita da barra de endereços do seu navegador" />
            <Step title="Um menu drop-down aparecerá na tela" />
            <Step title="Clique no grande botão ”Power” para desativar o bloqueio do minerador no LotoCripto" />
            <Step title="Clique em ”Tudo certo!” logo abaixo ou atualize a página" />
          </Steps>
        </Paragraph>
      </BlockWrapper>
      <BlockWrapper>
        <Title>
          <StopOutlined /> Anti minerador do Firefox
        </Title>
        <Paragraph>
          <Steps progressDot current={4} direction="vertical">
            <Step title="Vá até as configurações do navegador" />
            <Step title="Encontre o menu “Privacidade e Segurança“" />
            <Step title="Desmarque a opção “Criptomineradores“" />
            <Step title="Clique em ”Tudo certo!” logo abaixo ou atualize a página" />
          </Steps>
          <Divider />
        </Paragraph>
      </BlockWrapper>
      <BlockWrapper>
        <Title>
          <StopOutlined /> Módulo web do Avast
        </Title>
        <Paragraph>
          <Steps progressDot current={5} direction="vertical">
            <Step title="Vá até as configurações do Avast" />
            <Step title="Encontre a aba “Proteção“" />
            <Step title="Clique em “Módulos Principais“" />
            <Step title="Desmarque a opção “Módulo Internet“" />
            <Step title="Clique em ”Tudo certo!” logo abaixo ou atualize a página" />
          </Steps>
          <Divider />
        </Paragraph>
      </BlockWrapper>
      <BlockWrapper>
        <Title>
          <StopOutlined /> AdBlock
        </Title>
        <Paragraph>
          <Steps progressDot current={5} direction="vertical">
            <Step title="Clique no ícone do AdBlock, localizado à direita da barra de endereços do seu navegador" />
            <Step title="Um menu drop-down aparecerá na tela" />
            <Step title="Clique em “Don’t run on pages on this domain” para desativar o bloqueio do minerador no LotoCripto" />
            <Step title="Uma nova janela abrirá e você precisará clicar no botão “Exclude”" />
            <Step title="Clique em ”Tudo certo!” logo abaixo ou atualize a página" />
          </Steps>
          <Divider />
        </Paragraph>
      </BlockWrapper>
      <BlockWrapper>
        <Title>
          <StopOutlined /> AdBlock Pro
        </Title>
        <Paragraph>
          <Steps progressDot current={4} direction="vertical">
            <Step title="Clique no ícone do AdBlock Pro, localizado à direita da barra de endereços do seu navegador" />
            <Step title="Um menu drop-down aparecerá na tela" />
            <Step title="Clique no primeiro ícone (ligar) para desativar o bloqueio do minerador no LotoCripto" />
            <Step title="Clique em ”Tudo certo!” logo abaixo ou atualize a página" />
          </Steps>
          <Divider />
        </Paragraph>
      </BlockWrapper>
    </AdBlockModal>
  );
};

const AdBlockModal = styled(Modal)`
  .ant-modal-title {
    color: ${colors.red} !important;
  }

  .ant-btn {
    border-color: ${colors.green} !important;
    color: ${colors.green} !important;

    &:hover {
      color: ${colors.green} !important;
    }

    :not(.ant-btn-primary) {
      display: none;
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

  .ant-steps-icon-dot,
  .ant-steps-item-tail:after {
    background-color: ${colors.orange} !important;
  }

  ${media.tablet`
    width: 70% !important;
    max-width: 865px !important;
  `};
`;

const BlockWrapper = styled.div`
  margin-top: 20px;
`;

const Title = styled.h3`
  color: ${colors.red};
`;

const Paragraph = styled.div`
  color: ${colors.gray};
  font-size: 14px;
  margin-bottom: 5px;
`;

export default AdBlock;
