import React from 'react';
import styled from 'styled-components';
import { Alert, Tag } from 'antd';

import colors from '../components/utils/colors';
import media from '../components/utils/media';

const mockWinners = [
  {
    date: '02 Fev',
    name: '@pedrinho',
    transaction:
      '0x39f34154152a439e3ee6eefab232b238520cd47676a7e68e9954480b63358fba',
    amount: 9,
  },
  {
    date: '02 Fev',
    name: '@augustos',
    transaction:
      '0x39f34154152a439e3ee6eefab232b238520cd47676a7e68e9954480b63358fba',
    amount: 9,
  },
  {
    date: '02 Fev',
    name: '@juninho',
    transaction:
      '0x39f34154152a439e3ee6eefab232b238520cd47676a7e68e9954480b63358fba',
    amount: 9,
  },
  {
    date: '02 Fev',
    name: '@joao',
    transaction:
      '0x39f34154152a439e3ee6eefab232b238520cd47676a7e68e9954480b63358fba',
    amount: 9,
  },
];

const Winners = () => (
  <>
    <Wrapper>
      <Title>Últimos vencedores</Title>
      <WinnersWrapper>
        {mockWinners.length > 0 ? (
          mockWinners.map(({ date, name, transaction, amount }) => (
            <WinnerWrapper key={`${name}-${transaction}`}>
              <Date>{date}</Date>
              <Nick>{name}</Nick>
              <TransactionDesktop
                href={`https://www.mintme.com/explorer/tx/${transaction}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${transaction.slice(0, 12)}...`}
              </TransactionDesktop>
              <TransactionMobile
                href={`https://www.mintme.com/explorer/tx/${transaction}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${transaction.slice(0, 6)}...`}
              </TransactionMobile>
              <Tag color="green">
                <Amount>+{amount} MINTME</Amount>
              </Tag>
            </WinnerWrapper>
          ))
        ) : (
          <Alert
            message="Sem ganhadores por enquanto!"
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
    <DiscordEmbed
      title="discord"
      src="https://titanembeds.com/embed/402212992273350657?defaultchannel=808025051240333333"
      height="400"
      width="100%"
      frameborder="0"
    ></DiscordEmbed>
  </>
);

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
    min-width: 340px;
    margin: 0 auto;
  `};

  ${media.desktop`
    min-width: 400px;
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
`;

const Nick = styled.div`
  flex: 1;
  padding: 0 15px;
  color: ${colors.gray};
`;

const Transaction = styled.a`
  flex: 1;
  padding-right: 5px;
`;

const TransactionDesktop = styled(Transaction)`
  display: none;
  text-overflow: ellipsis;

  ${media.phoneLandscape`
    display: block;
  `};
`;

const TransactionMobile = styled(Transaction)`
  display: block;
  text-overflow: ellipsis;

  ${media.phoneLandscape`
    display: none;
  `};
`;

const Amount = styled.div`
  color: ${colors.green};
`;

const DiscordEmbed = styled.iframe`
  display: block;
  margin-top: 26px;
  border-radius: 4px;
  border: 1px solid ${colors.lightGray};

  ${media.tablet`
    display: none;
  `};
`;

export default Winners;
