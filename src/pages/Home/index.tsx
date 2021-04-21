import React from 'react';

import CheckpointsLine from './components/CheckpointsLine';

import {
  Container,
  ContainerInputs,
  InputDate,
  Select,
  AddButton,
} from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <ContainerInputs>
        <InputDate type="date" />
        <InputDate maxLength={5} type="text" width={100} defaultValue="08:00" />
        <Select>
          <option value="Entrance">Entrance</option>
          <option value="Exit">Exit</option>
        </Select>
        <AddButton>Add</AddButton>
      </ContainerInputs>
      <span className="checkpoints-list__title">Checkpoints list</span>
      <CheckpointsLine />
    </Container>
  );
};

export default Home;
