import React from 'react';

import { Container } from './styles';

const ResumeCheckpoints: React.FC = () => {
  return (
    <Container>
      <span className="checkpoint-line__describe">
        Hours overworked:
        <strong>01h:02min</strong>
      </span>
      <span className="checkpoint-line__describe">
        Minutes overworked:
        <strong>560min</strong>
      </span>
    </Container>
  );
};

export default ResumeCheckpoints;
