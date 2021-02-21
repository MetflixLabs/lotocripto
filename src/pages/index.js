import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, message, Alert } from 'antd';
import axios from 'axios';
import io from 'socket.io-client';
import { isEmpty } from 'lodash';
import 'antd/dist/antd.css';

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
import WinnerModal from '../components/WinnerModal';
import AdBlock from '../components/AdBlock';

const socketUrl = process.env.GATSBY_SOCKET_URL;
const socket = io.connect(socketUrl, {
  path: '/ws',
});

const toggleMiner = (
  isAdblocked,
  isMinerRunning,
  setIsMinerRunning,
  setAdBlockModalVisible,
  userId
) => {
  if (isAdblocked) {
    socket.emit('leave_round', { userId });
    message.error({
      content: 'Seu AdBlock bloqueou o inicio do minerador',
      key: 'round_message',
      duration: 5,
    });
    return setAdBlockModalVisible(true);
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

const logout = (setUserState, setIsMinerRunning, id) => {
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

      socket.emit('leave_round', { userId: id });
      window.miner && window.miner.stop();
      setIsMinerRunning(false);

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
  const [userState, setUserState] = useState(
    (typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('lotocripto-userState'))) ||
      JSON.stringify({ isLoggedIn: false, id: null, name: null })
  );

  const [isSignupVisible, setSignupVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isHowItWorksVisible, setHowItWorksVisible] = useState(false);
  const [isWinnerModalVisible, setWinnerModalVisible] = useState(false);
  const [isAdBlockModalVisible, setAdBlockModalVisible] = useState(false);
  const [isNoWinnerEligible, setNoWinnerEligible] = useState(false);
  const [winnerNick, setWinnerNick] = useState(false);
  const { isLoggedIn, name, id } = userState;

  useEffect(() => {
    const apiUrl = process.env.GATSBY_API_URL;

    window.gtag &&
      window.gtag('config', 'UA-161435848-2', {
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

  socket.on('round_winner', data => {
    if (isEmpty(data)) {
      setNoWinnerEligible(true);
    } else {
      const { name } = data;

      setWinnerNick(name);
      setNoWinnerEligible(false);
      setWinnerModalVisible(false);
      setWinnerModalVisible(true);
    }
  });

  return (
    <Layout>
      <Miner
        setIsMinerReady={setIsMinerReady}
        setIsMinerRunning={setIsMinerRunning}
        setIsAdblocked={setIsAdblocked}
        name={name}
        id={id}
        socket={socket}
      />
      <SEO title="LotoCripto - Minere e concorra!" />
      <Wrapper>
        {isNoWinnerEligible && (
          <Alert
            message="A qualquer momento!"
            description={
              <div>
                A meta para o sorteio foi atingida mas ainda não há um sorteado
                elegível.{' '}
                <strong>
                  Continue minerando até entrar na rodada e o sorteado pode ser
                  você!
                </strong>
              </div>
            }
            type="info"
            showIcon
          />
        )}
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
        {isWinnerModalVisible && (
          <WinnerModal
            setWinnerModalVisible={setWinnerModalVisible}
            winnerNick={`@${winnerNick}`}
          />
        )}
        {isAdBlockModalVisible && <AdBlock />}

        <HeroWrapper>
          <HeroDescriptionWrapper>
            <HeroTitle>
              LotoCripto{' '}
              <HeroSubTitle
                href="https://twitter.com/MetflixLabs"
                target="_blank"
                rel="noopener noreferrer"
              >
                powered by @MetflixLabs
              </HeroSubTitle>
            </HeroTitle>
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
                <HeroLink
                  onClick={() => logout(setUserState, setIsMinerRunning, id)}
                >
                  Sair
                </HeroLink>
              </>
            )}
          </HeroCTA>
        </HeroWrapper>
        <ContentWrapper>
          <ContentInnerWrapper>
            <SideWrapper>
              <MineProgress
                toggleMiner={() =>
                  isMinerReady &&
                  toggleMiner(
                    isAdblocked,
                    isMinerRunning,
                    setIsMinerRunning,
                    setAdBlockModalVisible,
                    id
                  )
                }
                isMinerReady={isMinerReady}
                isMinerRunning={isMinerRunning}
                setHowItWorksVisible={setHowItWorksVisible}
                isLoggedIn={isLoggedIn}
                socket={socket}
                userId={id}
              />
              <Winners socket={socket} />
            </SideWrapper>
            <DiscordWrapper>
              <DiscordEmbed
                title="discord"
                src="https://titanembeds.com/embed/402212992273350657?defaultchannel=808025051240333333"
                height="400"
                width="100%"
                frameborder="0"
              ></DiscordEmbed>
            </DiscordWrapper>
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
              <a
                href="https://github.com/MetflixLabs/lotocripto-bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código fonte do bot
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
  cursor: pointer;
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
  display: flex;
  flex-direction: column;

  ${media.phoneLandscape`
    display: block;
    flex-direction: unset;
  `};
`;

const HeroSubTitle = styled.a`
  color: ${colors.mediumGray};
  font-size: 12px;
  line-height: 2px;
  font-weight: normal;

  &:hover {
    color: ${colors.blue};
  }

  ${media.phoneLandscape`
    line-height: inherit;
  `};
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
  min-height: 630px;
  margin: auto;

  ${media.tablet`
    flex-direction: row;
    margin: 0 -20px;
  `}
`;

const SideWrapper = styled.div`
  flex: 1;
  min-width: 100%;
  margin: auto;

  ${media.tablet`
    min-width: 385px;
    max-width: 500px;
    margin: 0 60px 0 20px;
  `};

  ${media.desktop`
    min-width: 400px;
  `};
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

const DiscordWrapper = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 26px;

  ${media.tablet`
    width: unset;
    max-width: 450px;
    margin-top: 0;
  `};
`;

const DiscordEmbed = styled.iframe`
  display: block;
  border-radius: 4px;
  border: 1px solid ${colors.lightGray};
`;

export default IndexPage;
