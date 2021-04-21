const checkpointsArr = {
    '2021-04-16T00:00:00': [
        {
            hour: '08:00',
            type: 'Entrance'
        },
        {
            hour: '12:00',
            type: 'Exit'
        },
        {
            hour: '13:00',
            type: 'Entrance'
        },
        {
            hour: '18:22',
            type: 'Exit'
        },
    ],
    '2021-04-15T00:00:00': [
        {
            hour: '08:00',
            type: 'Entrance'
        },
        {
            hour: '12:00',
            type: 'Exit'
        },
        {
            hour: '13:00',
            type: 'Entrance'
        },
        {
            hour: '19:17',
            type: 'Exit'
        },
    ],
};

const diffBetweenHours = ({ input, exit }) => {
    const inputArr = input.split(':');
    const hourInput = parseInt(inputArr[0]);
    const minuteInput = parseInt(inputArr[1]);

    const exitArr = exit.split(':');
    const hourExit = parseInt(exitArr[0]);
    const minuteExit = parseInt(exitArr[1]);

    const MINUTES_IN_AN_HOUR = 60;
    const diffBetweenHoursInMinutes = (hourExit - hourInput) * MINUTES_IN_AN_HOUR;
    const fractionOfMinutes = minuteInput + minuteExit;
    const amountTotalMinutes = diffBetweenHoursInMinutes + fractionOfMinutes;

    return amountTotalMinutes;
}

const sumDiffBetweeHours = ({ checkpoints = [] }) => {
    const sortedCheckpoits = checkpoints.sort((a, b) => {
        if (a.hour > b.hour) {
          return 1;
        }
        if (a.hour < b.hour) {
          return -1;
        }
        return 0;
    });

    const hoursToDiff = [];
    for(let index = 0; index < sortedCheckpoits.length; index+=2) {
        const inputIndex = index;
        const inputHour = sortedCheckpoits[inputIndex].hour;
        
        const exitIndex = index+1;
        const exitHour = sortedCheckpoits[exitIndex].hour;

        hoursToDiff.push({ input: inputHour, exit: exitHour });
    }

    let amountMinutes = 0;
    hoursToDiff.map(checkpoint => {
        amountMinutes += diffBetweenHours(checkpoint);
    });

    return amountMinutes;
}

const checkReliabityOfCheckpoints = ({ checkpoints = [] }) => {
    let amountEntrance = 0;
    let amountExit = 0;

    checkpoints.forEach( checkpoint => {
        if(checkpoint.type === 'Entrance') {
            amountEntrance += 1;
        } else if(checkpoint.type === 'Exit') {
            amountExit += 1;
        }
    });

    isCheckpointsRealiable = amountEntrance === amountExit;
    return isCheckpointsRealiable;
}

const amountMinutesRequiredToDayWork = ({ date }) => {
    const dateToCheck = new Date(date);
    const day = dateToCheck.getDay();

    const MINUTES_REQUIRED_AT_WEEKEND = 0;
    const MINUTES_REQUIRED_AT_FRIDAY = 480;
    const MINUTES_REQUIRED_AT_NORMAL_DAY_WEEK = 540;

    const FRIDAY = 5;
    const SUNDAY = 0;
    const SATURDAY = 6;

    if(day === FRIDAY) {
        return MINUTES_REQUIRED_AT_FRIDAY;
    } else if(day !== FRIDAY && day > SUNDAY && day < SATURDAY) {
        return MINUTES_REQUIRED_AT_NORMAL_DAY_WEEK;
    } else {
        return MINUTES_REQUIRED_AT_WEEKEND;
    }
}

const diffMinutesWorkedAtDay = ({ checkpoints = [], date }) => {
    let amountDiffWorkedInMinutes = 0;
    const minutesRequiredOfWork = amountMinutesRequiredToDayWork({ date });
    const workedMinutes = sumDiffBetweeHours({ checkpoints });

    amountDiffWorkedInMinutes = workedMinutes - minutesRequiredOfWork;

    return { date, amount_diff_worked_in_minutes: amountDiffWorkedInMinutes }
}

const amountMinutesOverworkedByDays = ({ checkpoints }) => {
    let amountOverworkedMinutes = 0;
    const checkpointNoReliable = [];

    Object.keys(checkpoints).forEach(date => {
        const isCheckpointsRealiable = checkReliabityOfCheckpoints({ checkpoints: checkpointsArr[date] });

        if(isCheckpointsRealiable) {
            const { 
                amount_diff_worked_in_minutes: amountDiffWorkedInMinutes,
            } = diffMinutesWorkedAtDay({ checkpoints: checkpointsArr[date], date });

            amountOverworkedMinutes += amountDiffWorkedInMinutes;
        } else {
            checkpointNoReliable.push({
                date
            });
        }
    });

    const AMOUNT_MINUTES_IN_1_HOUR = 60;
    const hoursFloat = amountOverworkedMinutes / AMOUNT_MINUTES_IN_1_HOUR;
    const minutesRemais = amountOverworkedMinutes % AMOUNT_MINUTES_IN_1_HOUR
    const hoursOverworked = parseInt(hoursFloat);
    const hoursOverWorkedString = `${hoursOverworked < 10? `0${hoursOverworked}`: hoursOverworked}h:${minutesRemais}min`;

    return { 
        amount_overworked_minutes: amountOverworkedMinutes, 
        hours_overworked: hoursOverWorkedString, 
        checkpoint_no_reliable: checkpointNoReliable
    };
}

console.log(amountMinutesOverworkedByDays({ checkpoints: checkpointsArr }));