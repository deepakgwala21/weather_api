import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
    
  constructor(private httpService: HttpService) {}

  async getCurrentWeather(city: string) {
    const url = `${process.env.WEATHER_BASE_URL}/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    console.log('BASE URL:', process.env.WEATHER_BASE_URL);
    console.log('API KEY:', process.env.WEATHER_API_KEY);
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getForecast(city: string) {
    const url = `${process.env.WEATHER_BASE_URL}/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
