/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Forecast
// ====================================================

export interface Forecast_weather_forecast_maxTemperature {
  __typename: "WeatherTemperature";
  celsius: number;
}

export interface Forecast_weather_forecast_minTemperature {
  __typename: "WeatherTemperature";
  celsius: number;
}

export interface Forecast_weather_forecast_averageTemperature {
  __typename: "WeatherTemperature";
  celsius: number;
}

export interface Forecast_weather_forecast_condition {
  __typename: "WeatherCondition";
  text: string;
  id: string;
  iconSrc: string;
}

export interface Forecast_weather_forecast {
  __typename: "WeatherForecast";
  date: string;
  dateEpoch: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  maxTemperature: Forecast_weather_forecast_maxTemperature;
  minTemperature: Forecast_weather_forecast_minTemperature;
  averageTemperature: Forecast_weather_forecast_averageTemperature;
  condition: Forecast_weather_forecast_condition;
}

export interface Forecast_weather {
  __typename: "Weather";
  forecast: Forecast_weather_forecast[];
}

export interface Forecast {
  weather: Forecast_weather;
}

export interface ForecastVariables {
  location: string;
  days: string;
}
