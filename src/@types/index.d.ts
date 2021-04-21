/* eslint-disable camelcase */
export interface Point {
  hour: string;
  type: string;
}

export interface Checkpoint {
  date: string;
  points: point[];
  resume: {
    hours_overworked: string;
    minutes_overworked: number;
    reliable: boolean;
  };
}

export interface Checkpoints {
  [key: string]: Checkpoint;
}
