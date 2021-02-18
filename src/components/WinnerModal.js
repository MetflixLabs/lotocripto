import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import Confetti from 'react-confetti';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import colors from '../components/utils/colors';

const MySwal = withReactContent(Swal);

const WinnerModal = ({ setWinnerModalVisible, winnerNick }) => {
  useEffect(() => {
    MySwal.fire({
      icon: 'success',
      title: `${winnerNick} é o sorteado da vez!`,
      text: 'Não foi você? então continue minerando! Você pode ser o próximo!',
      showConfirmButton: false,
      footer: (
        <ButtonWrapper>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              Swal.clickConfirm();
              setWinnerModalVisible(false);
            }}
          >
            Continuar
          </Button>
        </ButtonWrapper>
      ),
    }).then(() => {
      setWinnerModalVisible(false);
    });
  }, []);

  return <Confetti numberOfPieces={500} />;
};

const ButtonWrapper = styled.div`
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

export default WinnerModal;
