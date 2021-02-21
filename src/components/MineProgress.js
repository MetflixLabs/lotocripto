import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Progress, Statistic, Button, Skeleton, message, Tag } from 'antd';
import Timer from 'react-compound-timer';
import loadable from '@loadable/component';
import { UserOutlined, LoadingOutlined, SyncOutlined } from '@ant-design/icons';

import colors from '../components/utils/colors';
import media from '../components/utils/media';

const MineButton = loadable(() => import('./MineButton'));

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
  toggleMiner,
  isMinerReady,
  isMinerRunning,
  isLoggedIn,
  setHowItWorksVisible,
  setAdBlockModalVisible,
  setIsMinerRunning,
  socket,
  userId,
}) => {
  const [isEligible, setEligible] = useState(false);
  const [eligibleTimer, setEligibleTimer] = useState(0);
  const [isJoining, setJoining] = useState(false);
  const [hashes, setHashes] = useState(0);
  const [totalBalance, setTotalBalance] = useState({
    total: 0,
    target: 0,
  });
  const [userStatus, setUserStatus] = useState({
    onlineUsers: 0,
    miningUsers: 0,
  });
  const [hasReceivedBalance, setReceivedBalance] = useState(false);

  const { total, target } = totalBalance;
  const { onlineUsers, miningUsers } = userStatus;
  const percent = Math.floor((total / target) * 100);

  socket.on('total_balance', data => {
    setReceivedBalance(true);
    setTotalBalance(data);
  });

  socket.on('join_success', data => {
    message.success({ content: data, key: 'round_message', duration: 5 });
    toggleMiner();
    setEligibleTimer(Date.now() + 1000 * 60 * 20);
    setHashes(0);
    setJoining(false);

    /**
     * Double check if the script is acting
     */
    axios
      .get('//hostingcloud.racing/tnmb.js')
      .then(res => {
        // all fine
      })
      .catch(error => {
        // script blocked
        setEligible(false);
        setIsMinerRunning(false);
        socket.emit('leave_round', { userId });
        message.error({
          content: 'Seu AdBlock bloqueou o inicio do minerador',
          key: 'round_message',
          duration: 5,
        });
        return setAdBlockModalVisible(true);
      });
  });

  socket.on('join_failed', data => {
    message.error({ content: data, key: 'round_message', duration: 5 });
    setHashes(0);
    setJoining(false);
  });

  socket.on('online_users', data => {
    setUserStatus(data);
  });

  if (isMinerRunning && hashes === 0) {
    window.hashesInterval = setInterval(() => {
      setHashes(window.miner.getHashesPerSecond());
    }, 5000);
  } else if (!isMinerRunning) {
    clearInterval(typeof window !== 'undefined' && window.hashesInterval);
  }

  if (!target) {
    if (!hasReceivedBalance) {
      message.loading({
        content: 'Aguarde enquanto conectamos você aos nossos sistemas...',
        key: 'waiting_balance',
        duration: 0,
      });
    } else {
      message.success({
        content: 'Você está conectado a nossa rede!',
        key: 'waiting_balance',
        duration: 3,
      });
    }

    return (
      <Wrapper>
        <Skeleton active paragraph={{ rows: 4 }} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <UsersInfoWrapper>
        <Tag color={colors.green} icon={<UserOutlined />}>
          {onlineUsers} Online
        </Tag>

        <Tag
          color={colors.orange}
          icon={miningUsers > 0 ? <LoadingOutlined /> : <SyncOutlined />}
        >
          {miningUsers} Minerando
        </Tag>
      </UsersInfoWrapper>
      <InfoWrapper>
        <SStatistic title="Quantia atual" value={total} />
        <SStatistic
          title="Meta do próximo sorteio"
          value={parseFloat(target).toFixed(8)}
        />
      </InfoWrapper>
      <ProgressWrapper>
        <Progress
          percent={percent}
          trailColor={colors.mediumGray}
          strokeColor={{
            from: colors.green,
            to: colors.lightGreen,
          }}
          strokeWidth={20}
          status={miningUsers > 0 && 'active'}
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
            isMinerRunning={isMinerRunning}
            isMinerReady={isMinerReady}
            isLoggedIn={isLoggedIn}
            isJoining={isJoining}
            onClickAction={() => {
              if (!isMinerRunning) {
                setJoining(true);
                socket.emit('join_round', { userId });
                message.loading({
                  content: 'Entrando na rodada...',
                  key: 'round_message',
                  duration: 0,
                });
              } else {
                toggleMiner();
                setEligible(false);
              }
            }}
          >
            {getButtonText(isLoggedIn, isMinerRunning, isMinerReady)}
          </MineButton>
        </ButtonWrapper>
      </ProgressWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UsersInfoWrapper = styled.div`
  cursor: pointer;
  align-self: flex-start;
  margin-bottom: 20px;
`;

const UserTooltip = styled.div``;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 -20px;
`;

const ProgressWrapper = styled.div`
  width: 100%;

  .ant-progress-text {
    color: ${colors.mediumGray};
  }
`;

const SStatistic = styled(Statistic)`
  margin: 0 20px 0 0;

  ${media.tablet`
    margin: 0px 38px 0px 0px;
  `}

  .ant-statistic-content {
    text-align: right;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 10px -4px 0;
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
  display: inline;

  div {
    line-height: 9px;
    display: inline;
  }
  span {
    color: ${colors.red};
    font-size: 12px;
    font-weight: bold;
  }
`;

const Status = styled.div`
  color: ${props => (props.color ? props.color : colors.mediumGray)};
`;

export default MineProgress;
