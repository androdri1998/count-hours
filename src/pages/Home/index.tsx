import React, { useCallback, useState } from 'react';

import CheckpointsLine from './components/CheckpointsLine';
import ResumeCheckpoints from './components/ResumeCheckpoints';

import {
  Container,
  ContainerInputs,
  InputDate,
  Select,
  AddButton,
} from './styles';

const Home: React.FC = () => {
  const [dateSelected, setDateSelected] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [timeSelected, setTimeSelected] = useState<string>('08:00');
  const [typeSelected, setTypeSelected] = useState<string>('Entrance');

  const handleDateSelected = useCallback(event => {
    setDateSelected(event.target.value);
  }, []);

  const handleTimeSelected = useCallback(event => {
    setTimeSelected(event.target.value);
  }, []);

  const handleTypeSelected = useCallback(event => {
    setTypeSelected(event.target.value);
  }, []);

  return (
    <Container>
      <ContainerInputs>
        <InputDate
          type="date"
          value={dateSelected}
          onChange={handleDateSelected}
        />
        <InputDate
          value={timeSelected}
          onChange={handleTimeSelected}
          maxLength={5}
          type="text"
          width={100}
          defaultValue="08:00"
        />
        <Select value={typeSelected} onChange={handleTypeSelected}>
          <option value="Entrance">Entrance</option>
          <option value="Exit">Exit</option>
        </Select>
        <AddButton>Add</AddButton>
      </ContainerInputs>
      <span className="checkpoints-list__title">Checkpoints list</span>
      <CheckpointsLine />
      <CheckpointsLine />
      <CheckpointsLine />
      <CheckpointsLine />
      <CheckpointsLine />
      <CheckpointsLine />
      <CheckpointsLine />
      <CheckpointsLine />
      <CheckpointsLine />
      <CheckpointsLine />
      <ResumeCheckpoints />
    </Container>
  );
};

export default Home;
