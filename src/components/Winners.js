import React from 'react';
import styled from 'styled-components';

import colors from '../components/utils/colors';

const mockTransactionId =
  '0x39f34154152a439e3ee6eefab232b238520cd47676a7e68e9954480b63358fba';

'0x39f34154152a439e3ee6eefab232b238520cd47676a7e68e9954480b63358fba'.slice(
  0,
  6
);

const Winners = () => (
  <Wrapper>
    <InnerWrapper>
      <Title>Últimos vencedores</Title>
      <WinnersWrapper>
        <WinnerWrapper>
          <Date>02 Fev</Date>
          <Nick>@pedrinho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@augustos</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>

        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <Transaction
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </Transaction>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
      </WinnersWrapper>
    </InnerWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  flex: 1;
  display: block;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 0px 2px 1px rgb(0 0 0 / 5%);
  max-width: 400px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 26px;
  color: ${colors.gray};
  margin-bottom: 10px;
`;

const WinnersWrapper = styled.div`
  max-height: 560px;
  overflow: scroll;
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

const Amount = styled.div`
  color: ${colors.green};
`;

export default Winners;
