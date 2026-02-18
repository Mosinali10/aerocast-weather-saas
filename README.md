# AeroCast - Premium Weather Intelligence Platform

AeroCast is a production-grade, glassmorphism-themed weather dashboard built with React, Vite, and Tailwind CSS. It provides real-time weather analytics, historical archives, and maritime metrics with a focus on visual excellence and performance.

![Screen Preview](https://via.placeholder.com/1200x600/0f172a/38bdf8?text=AeroCast+Weather+Intelligence)

## ✨ Features

- **Real-time Analytics**: Live atmospheric data for any global location.
- **Atmospheric Archives**: Access historical weather data with precision filters.
- **Maritime Telemetry**: Deep-sea metrics for oceanic navigation.
- **Glassmorphism UI**: High-end aesthetic with backdrop blurs and animated gradients.
- **Intelligent Search**: Debounced search with local history persistence.
- **Resilient Architecture**: Robust state management and error boundaries.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom Glassmorphism utilities)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: Axios + Weatherstack API

## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd aerocast
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_WEATHER_API_KEY=your_weatherstack_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment to Vercel

AeroCast is optimized for Vercel deployment:

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. In the "Environment Variables" section, add:
   - Key: `VITE_WEATHER_API_KEY`
   - Value: `6f0b88fb119538cdd3211f63616adcf2` (or your personal key)
4. Click **Deploy**.

## ⚠️ API Plan Limitations

The application uses the **Weatherstack Free Tier**, which has the following restrictions:
- **No HTTPS support**: Standard HTTP is used for requests.
- **Historical Data**: Limited availability depending on the region/date.
- **Marine Weather**: Mocked data is used as the free plan restricts maritime endpoints.
- **Forecasts**: Daily forecasts are limited to 7 days on higher tiers.

---
Designed with ❤️ for premium atmospheric analysis.
