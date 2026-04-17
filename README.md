# Weather Analytics API

A Node.js / NestJS based API that fetches real-time weather data using OpenWeather API and provides analytics.

---

## Features

* Get current weather by city
* API integration with OpenWeather
* Error handling (invalid API key, city not found)
* Clean project structure

---

##  Tech Stack

* Node.js
* NestJS
* Axios
* OpenWeather API

---

##  Setup

```bash
git clone https://github.com/deepakgwala21/weather_api.git
cd weather_api
npm install
npm run start
```

---

##  Environment Variables

Create `.env` file:

```env
API_KEY=your_openweather_api_key
```

---

##  API Example

```bash
GET /weather?city=London
```

---

##  Common Errors

* 401 Unauthorized → Invalid API key
* 404 → City not found

---

##  Author

Deepak Gwala
