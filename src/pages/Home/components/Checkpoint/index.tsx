import React, { useMemo } from 'react';
import { IPoint } from '../../../../@types';

import { Container } from './styles';

interface ICheckpointProps {
  point: IPoint;
}

const Checkpoint: React.FC<ICheckpointProps> = ({ point }) => {
  const typePoint = useMemo(() => {
    return point.type.slice(0, 2).toUpperCase();
  }, [point.type]);
  return <Container>{`${typePoint} ${point.hour} |`}</Container>;
};

export default Checkpoint;
