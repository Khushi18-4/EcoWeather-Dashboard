# EcoWeather-Dashboard
A real-time nature-themed weather dashboard built using asynchronous JavaScript, Fetch API, and Open-Meteo REST API.
# 🌿 EcoWeather Dashboard - Real-Time Atmospheric Insights

A lightweight, real-time weather dashboard styled with a premium **Eco-Nature / Botanical Glassmorphic** aesthetic. This application showcases advanced asynchronous JavaScript practices by fetching, processing, and dynamically rendering live nested JSON data from public REST APIs.

---

## 📸 Visual Interface

<img width="1820" height="905" alt="Screenshot 2026-06-17 230931" src="https://github.com/user-attachments/assets/96c3227b-f6e6-442d-93f4-ebb28ef12ded" />


---

## 🚀 Key Features

- **Asynchronous Dual-Fetch Pipeline:** Implements sequential `async/await` and the modern `Fetch API` to chain requests (resolves city names into coordinates via Geocoding API before calling the core Weather data).
- **Graceful Error Handling:** Comprehensive `try/catch` block configurations to intercept network drops, API service downs, or invalid city queries without crashing the interface.
- **Dynamic JSON Parsing:** Decodes complex, deeply nested JSON objects from WMO (World Meteorological Organization) standard weather code maps into human-readable conditions.
- **Eco-Botanical Layout (CSS Grid & Flexbox):** Built with a fluid design that scales elegantly from phones to large desktops. Uses CSS Grid for the 3-column sub-metrics and modern frosted-glass effects.

---

## 📊 How It Works (Behind the Scenes)

1. **User Request:** The user inputs a city name (e.g., *Delhi*) in the search form.
2. **Geocoding Thread:** The app shoots an async call to map the text input into absolute `latitude` and `longitude` objects.
3. **Weather Thread:** Those coordinates are dynamically injected into the main weather REST API.
4. **DOM Injection:** The application captures live temperature, humidity, wind speeds, and real-time environment alerts and pushes them straight into the browser DOM safely.

---

## 📂 Repository Structure

```text
Weather Dashboard/
├── index.html       # Semantic HTML5 layout architecture
├── style.css        # Glassmorphic botanical stylesheet
├── script.js        # Asynchronous API and state handler
