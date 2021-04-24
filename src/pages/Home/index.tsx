import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  asyncSaveNewCheckpoint,
  asyncFetchCheckpoints,
} from '../../store/actions/checkpoints.actions';

import CheckpointsLine from './components/CheckpointsLine';
import ResumeCheckpoints from './components/ResumeCheckpoints';

import { IReducerState } from '../../store/rootReducer';

import {
  Container,
  ContainerInputs,
  Input,
  Select,
  AddButton,
  ContainerFilters,
} from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const checkpoints = useSelector(
    (state: IReducerState) => state.checkpointsReducer.checkpoints,
  );
  const resumeCheckpoints = useSelector(
    (state: IReducerState) => state.checkpointsReducer.resume,
  );

  const [dateSelected, setDateSelected] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [startsAt, setStartsAt] = useState<string>(() => {
    const currentDateArr = new Date().toISOString().split('T')[0].split('-');
    const currentMonth = `${currentDateArr[0]}-${currentDateArr[1]}-01`;
    return currentMonth;
  });
  const [endsAt, setEndsAt] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [timeSelected, setTimeSelected] = useState<string>('08:00');
  const [typeSelected, setTypeSelected] = useState<string>('Entrance');

  useEffect(() => {
    dispatch(asyncFetchCheckpoints({ endsAt, startsAt }));
  }, [dispatch, startsAt, endsAt]);

  const handleDateSelected = useCallback(event => {
    setDateSelected(event.target.value);
  }, []);

  const handleStartsAt = useCallback(event => {
    setStartsAt(event.target.value);
  }, []);

  const handleEndsAt = useCallback(event => {
    setEndsAt(event.target.value);
  }, []);

  const handleTimeSelected = useCallback(event => {
    setTimeSelected(event.target.value);
  }, []);

  const handleTypeSelected = useCallback(event => {
    setTypeSelected(event.target.value);
  }, []);

  const handleAddCheckpoint = useCallback(() => {
    dispatch(
      asyncSaveNewCheckpoint({
        date: dateSelected,
        startsAt,
        endsAt,
        time: timeSelected,
        type: typeSelected,
      }),
    );
  }, [dispatch, dateSelected, timeSelected, typeSelected, startsAt, endsAt]);

  return (
    <Container>
      <ContainerInputs>
        <Input type="date" value={dateSelected} onChange={handleDateSelected} />
        <Input
          value={timeSelected}
          onChange={handleTimeSelected}
          maxLength={5}
          type="text"
          width={100}
        />
        <Select value={typeSelected} onChange={handleTypeSelected}>
          <option value="Entrance">Entrance</option>
          <option value="Exit">Exit</option>
        </Select>
        <AddButton onClick={handleAddCheckpoint}>Add</AddButton>
      </ContainerInputs>
      <span className="checkpoints-list__title">Checkpoints list</span>
      <ContainerFilters>
        <Input type="date" value={startsAt} onChange={handleStartsAt} />
        <Input type="date" value={endsAt} onChange={handleEndsAt} />
      </ContainerFilters>
      {checkpoints.map((checkpoint, index) => (
        <CheckpointsLine checkpoint={checkpoint} key={`key-${index + 1}`} />
      ))}
      <ResumeCheckpoints
        hoursOverworked={resumeCheckpoints.hours_overworked}
        minutesOverworked={resumeCheckpoints.minutes_overworked}
      />
    </Container>
  );
};

export default Home;
