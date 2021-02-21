import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert, Tag, Skeleton } from 'antd';
import moment from 'moment';
import 'moment/locale/pt';

import colors from '../components/utils/colors';
import media from '../components/utils/media';

const Winners = ({ socket }) => {
  const [winners, setWinners] = useState(false);

  socket.on('last_winners', data => {
    const winners = data.lastWinners.data || [];

    setWinners(winners);
  });

  return winners ? (
    <Wrapper>
      <Title>Últimos vencedores</Title>
      <WinnersWrapper>
        {winners.length > 0 ? (
          winners.map(({ date, name, transactionId, amount }) => (
            <WinnerWrapper key={`${name}-${transactionId}`}>
              <Date>
                {moment(date)
                  .locale('pt')
                  .format('DD MMM')}
              </Date>
              <Nick>@{name}</Nick>
              <TransactionDesktop
                href={`https://www.mintme.com/explorer/tx/${transactionId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${transactionId.slice(0, 26)}...`}
              </TransactionDesktop>
              <TransactionTablet
                href={`https://www.mintme.com/explorer/tx/${transactionId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${transactionId.slice(0, 10)}...`}
              </TransactionTablet>
              <TransactionMobile
                href={`https://www.mintme.com/explorer/tx/${transactionId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${transactionId.slice(0, 6)}...`}
              </TransactionMobile>
              <Tag color="green">
                <Amount>+{parseFloat(amount).toFixed(2)} MINTME</Amount>
              </Tag>
            </WinnerWrapper>
          ))
        ) : (
          <Alert
            message="Sem ganhadores por enquanto"
            description={
              <>
                Participe! Você pode ser o <strong>primeiro</strong> vencedor
              </>
            }
            type="info"
            showIcon
          />
        )}
      </WinnersWrapper>
    </Wrapper>
  ) : (
    <Skeleton active paragraph={{ rows: 6 }} />
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.white};
  border-radius: 4px;
  box-shadow: 0px 0px 2px 1px rgb(0 0 0 / 5%);
  min-width: 100%;
  margin: 26px auto 0;
  padding: 20px;

  ${media.tablet`
    min-width: unset;
    /* max-width: 395px; */
    max-width: 500px;
    margin: 40px auto 0;
  `};
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 26px;
  color: ${colors.gray};
  margin-bottom: 10px;
`;

const WinnersWrapper = styled.div`
  width: 100%;
  max-height: 560px;
  overflow: scroll;

  ${media.phoneLandscape`
    width: unset;
  `};
`;

const WinnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const Date = styled.div`
  color: ${colors.mediumGray};
  text-transform: capitalize;
`;

const Nick = styled.div`
  flex: 1;
  padding: 0 15px;
  color: ${colors.gray};
`;

const Transaction = styled.a`
  flex: 1;
  padding-right: 5px;
  text-overflow: ellipsis;
`;

const TransactionDesktop = styled(Transaction)`
  display: none;

  ${media.large`
    display: block;
  `};
`;

const TransactionTablet = styled(Transaction)`
  display: none;

  ${media.phoneLandscape`
    display: block;
  `};

  ${media.large`
    display: none;
  `};
`;

const TransactionMobile = styled(Transaction)`
  display: block;

  ${media.phoneLandscape`
    display: none;
  `};
`;

const Amount = styled.div`
  color: ${colors.green};
`;

export default Winners;
