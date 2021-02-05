import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import axios from 'axios';
import Timer from 'react-compound-timer';
import moment from 'moment';
import io from 'socket.io-client';
import 'antd/dist/antd.css';

import powerButtonIcon from '../images/icons/powerButton.svg';
import loadingIcon from '../images/icons/loading.svg';

import Miner from '../components/core/Miner';
import colors from '../components/utils/colors';
import media from '../components/utils/media';
import Layout from '../components/layout';
import SEO from '../components/seo';
import MineProgress from '../components/MineProgress';

const socketURL =
  typeof window !== 'undefined' && !!window.location.href.match(/localhost/gi)
    ? 'http://localhost:5000'
    : 'https://gretchenless-cloud.xyz';

const socket = io.connect(socketURL, {
  path: '/corona',
});

const toggleMiner = (isAdblocked, isMinerRunning, setIsMinerRunning) => {
  if (isAdblocked) {
    return navigate('/ad-block');
  }

  if (isMinerRunning) {
    window.miner.stop();

    window.gtag &&
      window.gtag('event', 'click', {
        event_label: 'power-button-stop',
        event_category: 'power-button',
        non_interaction: 1,
      });

    return setIsMinerRunning(false);
  }

  window.gtag &&
    window.gtag('event', 'click', {
      event_label: 'power-button-start',
      event_category: 'power-button',
      non_interaction: 1,
    });

  window.miner.start();
  setIsMinerRunning(true);
};

const IndexPage = () => {
  const [isAdblocked, setIsAdblocked] = useState(false);
  const [isMinerReady, setIsMinerReady] = useState(false);
  const [isMinerRunning, setIsMinerRunning] = useState(false);
  const [currentThrottle, setCurrentThrottle] = useState(1);
  const [serverData, setServerData] = useState({
    balance: '-',
    onlineUsers: '-',
  });

  socket.on('serverData', data => {
    setServerData(data);
  });

  useEffect(() => {
    window.gtag &&
      window.gtag('config', 'UA-161435848-1', {
        page_title: 'home',
        page_path: '/',
      });
  }, []);

  return (
    <Layout>
      <Miner
        setIsMinerReady={setIsMinerReady}
        setIsAdblocked={setIsAdblocked}
        currentThrottle={currentThrottle}
      />
      <SEO title="LotoCripto - Minere e concorra!" />
      <Wrapper>
        <HeroWrapper>
          <HeroDescriptionWrapper>
            <HeroTitle>LotoCripto</HeroTitle>
          </HeroDescriptionWrapper>
          <HeroCTA>
            <HeroLink onClick={() => console.log('login')}>Entrar</HeroLink>
            {' / '}
            <HeroLink onClick={() => console.log('signup')}>Registrar</HeroLink>
          </HeroCTA>
        </HeroWrapper>
        <ContentWrapper>
          <ContentInnerWrapper>
            <MineProgress />
          </ContentInnerWrapper>
          <PowerWrapper>
            <PowerButton
              onClick={() =>
                isMinerReady &&
                toggleMiner(isAdblocked, isMinerRunning, setIsMinerRunning)
              }
              src={isMinerReady ? powerButtonIcon : loadingIcon}
              isMinerRunning={isMinerRunning}
            />
          </PowerWrapper>
          <BottomBlockWrapper>
            <BottomParagraph right>
              <a
                href="https://github.com/metflixlabs/lotocripto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código fonte do website
              </a>{' '}
              <a
                href="https://github.com/metflixlabs/lotocripto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código fonte da api
              </a>{' '}
              <a
                href="/politica-de-privacidade.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidade
              </a>{' '}
            </BottomParagraph>
          </BottomBlockWrapper>
        </ContentWrapper>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  background: ${colors.lightGray};
`;

const HeroWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  padding: 20px 15px 10px 15px;
  margin: auto;
  
  ${media.tablet`
    padding: 20px 40px 10px 40px;
  `};
`;

const HeroDescriptionWrapper = styled.div`
  font-weight: bold;
  font-size: 38px;
  line-height: 56px;
`;

const HeroCTA = styled.div`
  display: flex;
`;

const HeroLink = styled.div`
  cursor: pointer;
  margin: 0 5px;
`;

const HeroDataWrapper = styled.div`
  position: relative;
  margin: 40px 0 20px 0;

  ${media.large`
    padding: 0;
    min-width: 600px;
  `}

  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    width: 240px;
    height: 20px;
    left: 132px;
    top: 33px;
    background: ${colors.purple};
  }
`;

const HeroTitle = styled.div`
  cursor: pointer;
  font-size: 26px;
  line-height: 56px;
  font-weight: bold;
  z-index: 2;
  position: relative;
  color: ${colors.green};
`;

const CardsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  padding: 60px 40px;
`;

const ContentInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  max-width: 1200px;
  margin: auto;
  padding: 0 40px;
  ${media.large`
  flex-direction: row;
  `}
`;

const ControlWrapper = styled.div``;
const StatusWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  ${media.large`
    margin: 0;
  `}
`;

const StatusInnerWrapper = styled.div`
  width: 460px;
  max-width: 100%;
`;

const BottomTitle = styled.div`
  font-size: 36px;
  line-height: 42px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const BottomParagraph = styled.p`
  text-align: ${props => (props.right ? 'right' : 'left')};

  a {
    padding: ${props => (props.right ? '0 20px' : '0')};
  }
`;

const BottomBlockWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 40px 40px 0;
`;

const PowerWrapper = styled(BottomBlockWrapper)`
  text-align: right;
`;

const PowerButton = styled.img`
  cursor: pointer;
  opacity: ${props => (props.isMinerRunning ? '0.2' : '1')};
`;

export default IndexPage;
