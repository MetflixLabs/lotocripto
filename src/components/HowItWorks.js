import React from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import {
  SettingOutlined,
  GoldOutlined,
  ApiOutlined,
  WalletOutlined,
} from '@ant-design/icons';

import colors from '../components/utils/colors';
import media from '../components/utils/media';

const HowItWorks = ({ setHowItWorksVisible }) => {
  return (
    <HowItWorksModal
      title="Funcionamento"
      visible
      onCancel={() => setHowItWorksVisible(false)}
      cancelText="Voltar"
      style={{ top: 20 }}
    >
      <BlockWrapper>
        <Title>
          <SettingOutlined /> Mecânica geral
        </Title>
        <Paragraph>
          No LotoCripto, você e todos os outros participantes se juntam para
          minerar coletivamente uma criptomoeda (MINTME).
        </Paragraph>
        <Paragraph>
          Quando a quantia minerada atinge o valor estipulado em "Meta do
          próximo sorteio", um sorteio é realizado entre todos aqueles membros
          elegíveis a ganharem o prêmio total, e quem for o sorteado, será o
          vencedor do prêmio.
        </Paragraph>
        <Paragraph>
          Você se torna elegível a ser um dos sorteados após minerar por pelo
          menos 20 minutos e permanecer na rodada até seu encerramento.
        </Paragraph>
      </BlockWrapper>
      <BlockWrapper>
        <Title>
          <GoldOutlined /> Quanto posso ganhar?
        </Title>
        <Paragraph>
          O valor total ganho pelo sorteado será de 90% da quantia total
          estipulada. Os outros 10% serão retidos como taxa de administração
          para os coordenadores da plataforma.
        </Paragraph>
        <Paragraph>
          Dos 90% do prêmio, há uma taxa de transferência de 0.01 MINTME
          cobradas pela corretora.
        </Paragraph>
      </BlockWrapper>
      <BlockWrapper>
        <Title>
          <ApiOutlined /> Tenho que pagar algo para participar?
        </Title>
        <Paragraph>
          A resposta é <strong>não</strong>. Entretanto, ao entrar em uma
          rodada, você estará emprestando um pouco do seu poder computacional
          para minerar a moeda em questão podendo aumentar um pouco o valor da
          sua conta de luz (baseado no tempo total minerado). Seu único e
          exclusivo gasto será esse.
        </Paragraph>
      </BlockWrapper>
      <BlockWrapper>
        <Title>
          <WalletOutlined /> Quando vou receber meu prêmio?
        </Title>
        <Paragraph>
          A transferência do valor premiado será feita imediatamente após o
          sorteio, isto é, assim que o valor total minerado atingir o valor
          estipulado em "Meta do próximo sorteio".
        </Paragraph>
        <Paragraph>
          O seu nickname será automaticamente adicionado a lista dos "Últimos
          vencedores", assim como a quantia ganha e um link do recibo da sua
          transação na blockchain. O valor deve cair na sua carteira em
          aproximadamente 15 minutos.
        </Paragraph>
      </BlockWrapper>
    </HowItWorksModal>
  );
};

const HowItWorksModal = styled(Modal)`
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
    display: none;
  }

  ${media.tablet`
    width: 70% !important;
    max-width: 865px !important;
  `};
`;

const BlockWrapper = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h4`
  color: ${colors.green};
`;

const Paragraph = styled.div`
  color: ${colors.gray};
  font-size: 14px;
  margin-bottom: 5px;
`;

export default HowItWorks;
