import React from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';

import colors from '../components/utils/colors';

const MineProgress = () => (
  <Wrapper>
    <InnerWrapper>
      <Progress
        percent={80}
        showInfo={false}
        trailColor={colors.mediumGray}
        strokeColor={{
          from: colors.lightGreen,
          to: colors.green,
        }}
        strokeWidth={20}
      />
    </InnerWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  flex: 1;
  display: block;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 400px;
  width: 500px;
`;

export default MineProgress;
