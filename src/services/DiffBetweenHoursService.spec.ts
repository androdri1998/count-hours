import DiffBetweenHourService from './DiffBetweenHoursService';

let diffBetweenHourService: DiffBetweenHourService;

describe('DiffBetweenHourService', () => {
  beforeAll(() => {
    diffBetweenHourService = new DiffBetweenHourService();
  });

  it('should be able to diff minutes between two dates', () => {
    const minutes = diffBetweenHourService.execute({
      input: '08:00',
      exit: '08:30',
    });

    expect(minutes).toBe(30);
  });
});

export {};
