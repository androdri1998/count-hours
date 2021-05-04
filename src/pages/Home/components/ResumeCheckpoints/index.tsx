import React from 'react';

import { Container } from './styles';

interface IResumeCheckpointsProps {
  hoursOverworked: string;
  minutesOverworked: number;
}

const ResumeCheckpoints: React.FC<IResumeCheckpointsProps> = ({
  hoursOverworked,
  minutesOverworked,
}) => {
  return (
    <Container>
      <span className="checkpoint-line__describe">
        Hours overworked:
        <strong>{` ${hoursOverworked}`}</strong>
      </span>
      <span className="checkpoint-line__describe">
        Minutes overworked:
        <strong>
          {` ${minutesOverworked}`}
          min
        </strong>
      </span>
    </Container>
  );
};

export default ResumeCheckpoints;
