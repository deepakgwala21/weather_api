import { Injectable } from '@nestjs/common';
import { WeatherService } from '../weather/weather.service';

type CityTemp = {
  city: string;
  temp: number;
};

@Injectable()
export class AnalyticsService {
  constructor(private weatherService: WeatherService) {}

  async getCitiesAnalytics(cities: string[]) {
    if (!cities || cities.length === 0) {
      throw new Error('Cities array is required');
    }

    const results: CityTemp[] = await Promise.all(
      cities.map(async (city) => {
        const data = await this.weatherService.getCurrentWeather(city);

        if (!data || !data.main) {
          throw new Error(`Invalid data for city: ${city}`);
        }

        return {
          city,
          temp: data.main.temp,
        };
      }),
    );

    const temps = results.map((r) => r.temp);

    const average =
      temps.reduce((a, b) => a + b, 0) / temps.length;

    const highest = results.reduce((a, b) =>
      a.temp > b.temp ? a : b,
    );

    const lowest = results.reduce((a, b) =>
      a.temp < b.temp ? a : b,
    );

    const hotCities = results
      .filter((r) => r.temp > 30)
      .map((r) => r.city);

    return {
      averageTemperature: Number(average.toFixed(2)),
      highestTemperature: highest,
      lowestTemperature: lowest,
      hotCities,
    };
  }

  async getCityAnalytics(city: string) {
    const current = await this.weatherService.getCurrentWeather(city);
    const forecast = await this.weatherService.getForecast(city);

    if (!current || !current.main) {
      throw new Error(`Invalid current weather for city: ${city}`);
    }

    if (!forecast || !forecast.list) {
      throw new Error(`Invalid forecast data for city: ${city}`);
    }

    const temps = forecast.list.map((f: any) => f.main.temp);

    const min = Math.min(...temps);
    const max = Math.max(...temps);

    return {
      city,
      currentTemperature: current.main.temp,
      minTempNext5Days: min,
      maxTempNext5Days: max,
      warning:
        current.main.temp > 35
          ? 'High Temperature Warning'
          : null,
    };
  }
}