import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Avatar, message } from 'antd';
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
import Winners from '../components/Winners';
import Signup from '../components/Signup';
import Login from '../components/Login';
import HowItWorks from '../components/HowItWorks';

// const apiUrl =
//   typeof window !== 'undefined' && !!window.location.href.match(/localhost/gi)
//     ? 'http://localhost:3333/api'
//     : 'https://gretchenless-cloud.xyz/api';

// const socketURL =
//   typeof window !== 'undefined' && !!window.location.href.match(/localhost/gi)
//     ? 'http://localhost:3333'
//     : 'https://gretchenless-cloud.xyz';

// const socket = io.connect(socketURL, {
//   path: '/corona',
// });

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

const logout = setUserState => {
  const apiUrl = process.env.GATSBY_API_URL;

  axios
    .get(`${apiUrl}/logout`, { withCredentials: true })
    .then(res => {
      const userState = { isLoggedIn: false, id: null, name: null };

      typeof window !== 'undefined' &&
        localStorage.setItem('lotocripto-userState', JSON.stringify(userState));

      const successMessage = res.data.notification.message;

      message.success({
        content: successMessage,
        key: 'logout-message',
        duration: 5,
      });

      setUserState(JSON.stringify(userState));
    })
    .catch(err => {
      const errorMessage = err.response.data.notification.message;

      message.error({
        content: errorMessage,
        key: 'logout-message',
        duration: 5,
      });
    });
};

const IndexPage = () => {
  const [isAdblocked, setIsAdblocked] = useState(false);
  const [isMinerReady, setIsMinerReady] = useState(false);
  const [isMinerRunning, setIsMinerRunning] = useState(false);
  const [currentThrottle, setCurrentThrottle] = useState(1);
  const [userState, setUserState] = useState(
    (typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('lotocripto-userState'))) ||
      JSON.stringify({ isLoggedIn: false, id: null, name: null })
  );
  const [serverData, setServerData] = useState({
    balance: '-',
    onlineUsers: '-',
  });
  const [isSignupVisible, setSignupVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isHowItWorksVisible, setHowItWorksVisible] = useState(false);
  const { isLoggedIn, name } = userState;

  // socket.on('serverData', data => {
  //   setServerData(data);
  // });

  useEffect(() => {
    const apiUrl = process.env.GATSBY_API_URL;

    window.gtag &&
      window.gtag('config', 'UA-161435848-1', {
        page_title: 'home',
        page_path: '/',
      });

    axios
      .get(`${apiUrl}/userState`, { withCredentials: true })
      .then(res => {
        const { id, name } = res.data.data;

        const userState = {
          isLoggedIn: true,
          id,
          name,
        };

        typeof window !== 'undefined' &&
          localStorage.setItem(
            'lotocripto-userState',
            JSON.stringify(userState)
          );
        setUserState(userState);
      })
      .catch(err => {
        /**
         * User not logged in or session expired
         */
        const userState = { isLoggedIn: false, id: null, name: null };
        const currentUserState = JSON.parse(
          typeof window !== 'undefined' &&
            localStorage.getItem('lotocripto-userState')
        );

        /**
         * Show a notification if user was previously logged in, but cookie expired
         */
        if (currentUserState && currentUserState.isLoggedIn) {
          message.warning({
            content: 'Sua sessão expirou. Por favor, entre novamente.',
            key: 'userState-message',
            duration: 5,
          });
        }

        typeof window !== 'undefined' &&
          localStorage.setItem(
            'lotocripto-userState',
            JSON.stringify(userState)
          );
        setUserState(JSON.stringify(userState));
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
        {isSignupVisible && (
          <Signup
            setSignupVisible={setSignupVisible}
            setLoginVisible={setLoginVisible}
          />
        )}
        {isLoginVisible && (
          <Login
            setLoginVisible={setLoginVisible}
            setUserState={setUserState}
          />
        )}
        {isHowItWorksVisible && (
          <HowItWorks setHowItWorksVisible={setHowItWorksVisible} />
        )}

        <HeroWrapper>
          <HeroDescriptionWrapper>
            <HeroTitle>LotoCripto</HeroTitle>
          </HeroDescriptionWrapper>
          <HeroCTA>
            {!isLoggedIn ? (
              <>
                <HeroLink onClick={() => setLoginVisible(true)}>
                  Entrar
                </HeroLink>
                {' / '}
                <HeroLink onClick={() => setSignupVisible(true)}>
                  Registrar
                </HeroLink>
              </>
            ) : (
              <>
                <Avatar style={{ backgroundColor: colors.green }}>
                  {name}
                </Avatar>
                <HeroLink onClick={() => logout(setUserState)}>Sair</HeroLink>
              </>
            )}
          </HeroCTA>
        </HeroWrapper>
        <ContentWrapper>
          <ContentInnerWrapper>
            <MineProgress
              buttonAction={() =>
                isMinerReady &&
                toggleMiner(isAdblocked, isMinerRunning, setIsMinerRunning)
              }
              isMinerReady={isMinerReady}
              isMinerRunning={isMinerRunning}
              setHowItWorksVisible={setHowItWorksVisible}
              isLoggedIn={isLoggedIn}
            />
            <Winners />
          </ContentInnerWrapper>
          <BottomBlockWrapper>
            <BottomParagraph>
              <a
                href="/Termos-e-Condicoes-LOTOCRIPTO.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Termos e Condições
              </a>{' '}
              <a
                href="/Politica-de-Privacidade-LOTOCRIPTO.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidade
              </a>{' '}
              <a
                href="https://github.com/metflixlabs/lotocripto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código fonte do website
              </a>{' '}
              <a
                href="https://github.com/MetflixLabs/lotocripto-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código fonte da api
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
  padding: 20px 20px 10px;
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
  display: flex;
  justify-content: center;
  align-items: center;
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

const ContentWrapper = styled.div`
  padding: 60px 20px 10px;
  max-width: 1200px;
  margin: auto;

  ${media.tablet`
    padding: 60px 40px 10px;
  `};
`;

const ContentInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;

  ${media.tablet`
    flex-direction: row;
    margin: 0 -20px;
  `}
`;

const BottomParagraph = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  ${media.tablet`
    flex-direction: row;
    justify-content: flex-end;
    margin: 0 -10px;

    a {
      margin: 0 10px;
    }
  `};
`;

const BottomBlockWrapper = styled.div`
  max-width: 1200px;
  margin: auto;

  ${media.tablet`
    padding: 40px 0;
  `};
`;

export default IndexPage;
