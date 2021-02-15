import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import colors from '../components/utils/colors';

const MineButton = ({
  isMinerRunning,
  isMinerReady,
  isLoggedIn,
  onClickAction,
  children,
}) => (
  <Wrapper
    type="primary"
    size="large"
    isMinerRunning={isMinerRunning}
    disabled={!isLoggedIn}
    onClick={() => onClickAction()}
    loading={!isMinerReady}
  >
    {children}
  </Wrapper>
);

const Wrapper = styled(Button)`
  margin: 0 4px;
  border-color: ${props =>
    props.isMinerRunning ? colors.red : colors.green} !important;

  &:not(:disabled) {
    background-color: ${props =>
      props.isMinerRunning ? colors.red : colors.green} !important;
  }
`;

export default MineButton;
