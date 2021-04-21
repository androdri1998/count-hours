import React from 'react';

import Checkpoint from '../Checkpoint';

import { Container } from './styles';

const CheckpointsLine: React.FC = () => {
  return (
    <Container>
      <span className="checkpoint-line__date">30/01/2021</span>
      <Checkpoint />
      <Checkpoint />
      <span className="checkpoint-line__describe">| 01h:02min</span>
    </Container>
  );
};

export default CheckpointsLine;
