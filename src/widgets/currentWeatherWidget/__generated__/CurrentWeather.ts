/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentWeather
// ====================================================

export interface CurrentWeather_weather_current_temperature {
  __typename: "WeatherTemperature";
  celsius: number;
  fahrenheit: number;
}

export interface CurrentWeather_weather_current_feelsLike {
  __typename: "WeatherTemperature";
  celsius: number;
  fahrenheit: number;
}

export interface CurrentWeather_weather_current_condition {
  __typename: "WeatherCondition";
  text: string;
  iconSrc: string;
  id: string;
}

export interface CurrentWeather_weather_current {
  __typename: "WeatherCurrent";
  humidityPercentage: number;
  cloudCoverPercentage: number;
  temperature: CurrentWeather_weather_current_temperature;
  feelsLike: CurrentWeather_weather_current_feelsLike;
  condition: CurrentWeather_weather_current_condition;
}

export interface CurrentWeather_weather {
  __typename: "Weather";
  current: CurrentWeather_weather_current;
}

export interface CurrentWeather {
  weather: CurrentWeather_weather;
}

export interface CurrentWeatherVariables {
  location: string;
}
