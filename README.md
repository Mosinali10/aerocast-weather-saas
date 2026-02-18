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
- **API**: Axios + OpenWeather API (HTTPS)

## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mosinali10/aerocast-weather-saas.git
   cd aerocast-weather-saas
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_WEATHER_API_KEY=your_openweather_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev (or npm.cmd run dev on Windows)
   ```

## 🌐 Deployment to Vercel

AeroCast is fully optimized for Vercel with HTTPS support:

1. Import your GitHub repository in Vercel.
2. In the **Environment Variables** section, add:
   - Key: `VITE_WEATHER_API_KEY`
   - Value: (Your OpenWeather API Key)
3. Click **Deploy**.

## ⚠️ API Plan Limitations

The application uses the **OpenWeather Free Tier**:
- **HTTPS support**: Fully supported and secure for Vercel.
- **Archive Telemetry**: High-fidelity 5-day/3-hour forecast is used as a fallback for historical analysis.
- **Marine Weather**: Mocked data is used for oceanic dashboards.

---
Designed with ❤️ for premium atmospheric analysis.
