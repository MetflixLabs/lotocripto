import React from 'react';
import styled from 'styled-components';

import colors from '../components/utils/colors';
import media from '../components/utils/media';

const mockTransactionId =
  '0x39f34154152a439e3ee6eefab232b238520cd47676a7e68e9954480b63358fba';

const Winners = () => (
  <>
    <Wrapper>
      <Title>Últimos vencedores</Title>
      <WinnersWrapper>
        <WinnerWrapper>
          <Date>02 Fev</Date>
          <Nick>@pedrinho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@augustos</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>

        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
        <WinnerWrapper>
          <Date>03 Fev</Date>
          <Nick>@juninho</Nick>
          <TransactionDesktop
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 12)}...`}
          </TransactionDesktop>
          <TransactionMobile
            href={`https://www.mintme.com/explorer/tx/${mockTransactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${mockTransactionId.slice(0, 6)}...`}
          </TransactionMobile>
          <Amount>+9 MINTME</Amount>
        </WinnerWrapper>
      </WinnersWrapper>
    </Wrapper>
    <DiscordEmbed
      title="discord"
      src="https://titanembeds.com/embed/402212992273350657?defaultchannel=808025051240333333&theme=IceWyvern"
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
  margin: 20px 0 0;
  padding: 20px;

  ${media.tablet`
    min-width: 340px;
    margin: 0 20px;
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

  ${media.phoneLandscape`
    display: block;
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

const DiscordEmbed = styled.iframe`
  display: block;
  margin-top: 26px;
  border-radius: 4px;
  border: 1px solid ${colors.green};

  ${media.tablet`
    display: none;
  `};
`;

export default Winners;
