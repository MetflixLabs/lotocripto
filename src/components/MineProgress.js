import React, { useState } from 'react';
import styled from 'styled-components';
import { Progress, Statistic, Button } from 'antd';
import Timer from 'react-compound-timer';

import colors from '../components/utils/colors';
import media from '../components/utils/media';

const { Countdown } = Statistic;

const getButtonText = (isLoggedIn, isMinerRunning) => {
  if (!isLoggedIn) {
    return 'Entre para participar!';
  }

  if (!isMinerRunning) {
    return 'Entrar na rodada';
  } else {
    return 'Sair da rodada';
  }
};

const MineProgress = ({
  buttonAction,
  isMinerReady,
  isMinerRunning,
  isLoggedIn,
  setHowItWorksVisible,
}) => {
  const [isEligible, setEligible] = useState(false);
  const [eligibleTimer, setEligibleTimer] = useState(0);
  const [hashes, setHashes] = useState(0);
  const percent = Math.floor((4.4 / 10.0) * 100); // replace 4.4 by 'reward' (mock)

  if (isMinerRunning && hashes === 0) {
    window.hashesInterval = setInterval(() => {
      setHashes(window.miner.getHashesPerSecond());
    }, 5000);
  } else if (!isMinerRunning) {
    clearInterval(typeof window !== 'undefined' && window.hashesInterval);
  }

  return (
    <Wrapper>
      <InfoWrapper>
        <SStatistic title="Quantia atual" value="0.00000000" />
        <SStatistic title="Quantia até o sorteio" value="10.00000000" />
      </InfoWrapper>
      <ProgressWrapper>
        <Progress
          percent={percent}
          showInfo={false}
          trailColor={colors.mediumGray}
          strokeColor={{
            from: colors.lightGreen,
            to: colors.green,
          }}
          strokeWidth={20}
        />
        {isMinerRunning && (
          <StatusWrapper>
            {!isEligible ? (
              <Status color={colors.red}>
                Continue minerando pelos próximos{' '}
                <SCountdown
                  value={eligibleTimer}
                  format="mm:ss"
                  onFinish={() => setEligible(true)}
                />{' '}
                para concorrer nessa rodada
              </Status>
            ) : (
              <Status color={colors.green}>
                Você está concorrendo a essa rodada
              </Status>
            )}
            <Status>Suas hashes por segundo: {hashes}</Status>
            <Status>
              Seu tempo total minerando:{' '}
              <Timer
                formatValue={value => `${value < 10 ? `0${value}` : value}`}
              >
                <Timer.Hours />
                {':'}
                <Timer.Minutes />
                {':'}
                <Timer.Seconds />
              </Timer>
            </Status>
          </StatusWrapper>
        )}
        <ButtonWrapper>
          <HowItWorks
            size="large"
            onClick={() => {
              setHowItWorksVisible(true);
            }}
          >
            Como funciona?
          </HowItWorks>
          <MineButton
            type="primary"
            size="large"
            isMinerRunning={isMinerRunning}
            disabled={!isLoggedIn}
            onClick={() => {
              buttonAction();
              setEligibleTimer(Date.now() + 1000 * 60 * 1);
              setHashes(0);
              isMinerRunning && setEligible(false);
            }}
            loading={!isMinerReady}
          >
            {getButtonText(isLoggedIn, isMinerRunning, isMinerReady)}
          </MineButton>
        </ButtonWrapper>
        <DiscordEmbed
          title="discord"
          src="https://titanembeds.com/embed/402212992273350657?defaultchannel=808025051240333333&theme=IceWyvern"
          height="400"
          width="100%"
          frameborder="0"
        ></DiscordEmbed>
      </ProgressWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  margin: auto;

  ${media.tablet`
    min-width: 200px;
    max-width: 500px;
    margin: 0 20px;
  `};
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 0 -10px;
`;

const ProgressWrapper = styled.div`
  width: 100%;
`;

const SStatistic = styled(Statistic)`
  margin: 0 10px 0 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 10px -4px 0;
`;

const MineButton = styled(Button)`
  margin: 0 4px;
  border-color: ${props =>
    props.isMinerRunning ? colors.red : colors.green} !important;

  &:not(:disabled) {
    background-color: ${props =>
      props.isMinerRunning ? colors.red : colors.green} !important;
  }
`;

const HowItWorks = styled(Button)`
  margin: 0 4px;
  border-color: ${colors.green} !important;
  color: ${colors.green} !important;

  &:hover {
    color: ${colors.green} !important;
  }
`;

const StatusWrapper = styled.div`
  margin-top: 5px;
`;

const SCountdown = styled(Countdown)`
  div {
    line-height: 14px;
  }
  span {
    color: ${colors.red};
    font-size: 12px;
    font-weight: bold;
    padding: 0 3px;
  }
`;

const Status = styled.div`
  display: flex;
  color: ${props => (props.color ? props.color : colors.mediumGray)};
`;

const DiscordEmbed = styled.iframe`
  margin-top: 26px;
  border-radius: 4px;
  border: 1px solid ${colors.green};
`;

export default MineProgress;
