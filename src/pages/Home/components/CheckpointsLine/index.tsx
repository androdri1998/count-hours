import React, { useMemo } from 'react';
import { ICheckpoint } from '../../../../@types';

import Checkpoint from '../Checkpoint';

import { Container } from './styles';

interface ICheckpointsLineProps {
  checkpoint: ICheckpoint;
}

const CheckpointsLine: React.FC<ICheckpointsLineProps> = ({ checkpoint }) => {
  const date = useMemo(() => {
    const dateFull = checkpoint.date.split('T')[0];
    const dateArr = dateFull.split('-');
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  }, [checkpoint.date]);

  return (
    <Container>
      <span className="checkpoint-line__date">{date}</span>
      {checkpoint.points.map((point, index) => (
        <Checkpoint point={point} key={`key-${index + 1}`} />
      ))}
      <span className="checkpoint-line__describe">
        {`| ${checkpoint.resume.hours_overworked}`}
      </span>
    </Container>
  );
};

export default CheckpointsLine;
