import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Post('cities')
  getCitiesAnalytics(@Body() body: { cities: string[] }) {
    return this.analyticsService.getCitiesAnalytics(body.cities);
  }

  @Get('city/:name')
  getCityAnalytics(@Param('name') name: string) {
    return this.analyticsService.getCityAnalytics(name);
  }
}