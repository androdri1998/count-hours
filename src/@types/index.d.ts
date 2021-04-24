/* eslint-disable camelcase */
export interface IPoint {
  hour: string;
  type: string;
}

export interface IResume {
  hours_overworked: string;
  minutes_overworked: number;
  reliable: boolean;
}

export interface ICheckpoint {
  date: string;
  points: IPoint[];
  resume: IResume;
}

export interface ICheckpoints {
  [key: string]: ICheckpoint;
}
