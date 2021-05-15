/* eslint-disable radix */
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

  const getCurrentDateString = useCallback(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const date =
      currentDate.getDate() < 10
        ? `0${currentDate.getDate()}`
        : currentDate.getDate();
    const month =
      currentDate.getMonth() + 1 < 10
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1;
    const dateString = `${year}-${month}-${date}`;

    return dateString;
  }, []);

  const [dateSelected, setDateSelected] = useState<string>(
    getCurrentDateString,
  );
  const [startsAt, setStartsAt] = useState<string>(() => {
    const currentDateArr = new Date().toISOString().split('T')[0].split('-');
    const currentMonth = `${currentDateArr[0]}-${currentDateArr[1]}-01`;
    return currentMonth;
  });
  const [endsAt, setEndsAt] = useState<string>(getCurrentDateString);
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
    const time = event.target.value;

    let newTime = time.replace(':', '');
    if (time.length > 2 && time.includes(':')) {
      const timeOnlyNumbers = time.replace(':', '');
      newTime = `${timeOnlyNumbers.slice(0, 2)}:${timeOnlyNumbers.slice(
        2,
        timeOnlyNumbers.length,
      )}`;
    } else if (time.length > 2 && !time.includes(':')) {
      newTime = `${time.slice(0, 2)}:${time.slice(2, time.length)}`;
    }
    setTimeSelected(newTime);
  }, []);

  const handleTypeSelected = useCallback(event => {
    setTypeSelected(event.target.value);
  }, []);

  const handleAddCheckpoint = useCallback(() => {
    const checkTime = timeSelected.split(':');

    const AMOUNT_HOURS_IN_ONE_DAY = 24;
    const AMOUNT_MINUTES_IN_ONE_HOUR = 60;
    if (
      timeSelected.length === 5 &&
      parseInt(checkTime[0]) < AMOUNT_HOURS_IN_ONE_DAY &&
      parseInt(checkTime[1]) < AMOUNT_MINUTES_IN_ONE_HOUR
    ) {
      dispatch(
        asyncSaveNewCheckpoint({
          date: dateSelected,
          startsAt,
          endsAt,
          time: timeSelected,
          type: typeSelected,
        }),
      );
    } else {
      console.log('Hour is not valid');
    }
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
