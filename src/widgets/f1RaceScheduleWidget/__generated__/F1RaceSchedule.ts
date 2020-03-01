/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: F1RaceSchedule
// ====================================================

export interface F1RaceSchedule_f1Data_raceSchedule_races {
  __typename: "F1DataCircuit";
  round: number;
  raceName: string;
  circuitName: string;
  date: string;
  country: string;
  location: string;
}

export interface F1RaceSchedule_f1Data_raceSchedule {
  __typename: "F1RaceSchedule";
  numberOfRaces: number;
  races: F1RaceSchedule_f1Data_raceSchedule_races[];
}

export interface F1RaceSchedule_f1Data {
  __typename: "F1Data";
  raceSchedule: F1RaceSchedule_f1Data_raceSchedule;
}

export interface F1RaceSchedule {
  f1Data: F1RaceSchedule_f1Data;
}

export interface F1RaceScheduleVariables {
  year: string;
}
