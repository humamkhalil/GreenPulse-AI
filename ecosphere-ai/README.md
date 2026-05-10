# GreenPulse AI 🌱

**GreenPulse AI** is an advanced, fully responsive AI-powered agricultural intelligence platform developed by **Quantum Minds** (Humam Khalil, Muhammad Amin, and Dawood Shah) for the AtomCamp Hackathon.

## 🚀 Project Overview

The agriculture sector in Pakistan faces severe challenges from climate change, water scarcity, market exploitation by middlemen, and environmental crimes. GreenPulse AI solves these problems by providing farmers and agricultural officers with an all-in-one, highly intuitive dashboard powered by Artificial Intelligence. 

The application is built to be **100% responsive**, working seamlessly across mobile phones, tablets, and laptops.

---

## 🧠 Core AI Agent Modules

The application is driven by 5 distinct AI agent portals, located in `frontend/src/components/AgentInterfaces.tsx`:

### 1. 🌿 Crop Doctor (Computer Vision)
* **What it does:** Farmers can upload photos of diseased crops directly from their phones or laptops. 
* **Details:** The AI analyzes the image, identifies the specific disease, and provides immediate, organic treatment recommendations, reducing the reliance on toxic and expensive chemical pesticides.

### 2. 💧 Smart Irrigation System
* **What it does:** Generates a hyper-optimized watering schedule.
* **Details:** The farmer inputs the **Crop**, **Farm Area (Hectares)**, **Soil Type** (Clay, Sandy, Loam), and their **District**. The AI calculates exactly how much water is needed, taking into account the local microclimate (e.g., Dir requires 40% less water than Peshawar). It shows exactly how much diesel fuel and groundwater is saved compared to traditional "flood irrigation."

### 3. 📈 Market Advisor (Financial Intelligence)
* **What it does:** Protects farmers from middlemen by providing real-time crop pricing and financial strategy.
* **Details:** The user inputs their **Crop Type**, **Target Market** (e.g., Lahore Mandi), and **Quantity**. The AI calculates the Live Rate, Total Crop Value, and specifically calculates the **"Middleman Cut"**—showing the farmer exactly how much money they lose by selling to brokers. It provides an AI action ("HOLD" or "SELL") and a market forecast.

### 4. 🚨 Climate Risk & Preparedness
* **What it does:** Location-specific disaster survival tips.
* **Details:** Users input their **District** and select an incoming weather disaster (Heatwave, Flash Flood, Frost, or Drought). The AI generates an instant, customized survival plan (e.g., "Clear drainage channels" for floods or "Deploy shade nets" for heatwaves) to save the harvest.

### 5. 🛡️ Eco-Watch (Anonymous Reporting)
* **What it does:** A civic-responsibility portal to report environmental crimes.
* **Details:** Users can anonymously report illegal deforestation (Timber Mafia), factory pollution, wildlife poaching, or water contamination. It generates a secure Tracking ID and provides direct contact buttons for the Forestry Helpline, WhatsApp, and the Ministry of Climate Change.

---

## 🗺️ Interactive Dashboard Features

* **Live Leaflet Map (`components/LeafletMap.tsx`):** A fully interactive, 100% free OpenStreetMap implementation. Features a custom search bar with autocomplete for all major districts in Pakistan, allowing users to fly to specific locations instantly.
* **Dynamic Sustainability Scorecard (`components/Scorecard.tsx`):** Tracks Water Efficiency, Carbon Footprint, and Biodiversity. The scorecard dynamically adjusts based on the selected district (e.g., Peshawar shows a warning for high tubewell usage, while Dir shows high water efficiency).
* **Premium Glassmorphism UI (`app/page.tsx`):** Features a beautiful, responsive design with dark/light mode toggles, a frosted-glass header, and a sleek Quantum Minds developer footer.

---

## 💻 Tech Stack & Architecture

GreenPulse AI uses a decoupled, modern architecture:

### Frontend (Next.js & React)
* **Framework:** Next.js 14 App Router
* **Language:** TypeScript (`.tsx`)
* **Styling:** Tailwind CSS (fully responsive flex/grid layouts) & Lucide React Icons
* **Mapping:** `react-leaflet` & `leaflet` (Open-source mapping)

### Backend (FastAPI & Python)
* **Framework:** FastAPI (High performance, async)
* **Authentication:** JWT (JSON Web Tokens)
* **AI Orchestration:** LangChain (Designed for multi-agent routing via OpenAI)

---

## 📂 Source Code Directory Structure

```text
ecosphere-ai/
├── backend/                  # Python FastAPI Backend
│   ├── main.py               # API Endpoints & JWT Auth
│   ├── requirements.txt      # Python Dependencies
│   └── agents/               
│       └── orchestrator.py   # LangChain AI routing logic
├── frontend/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Main Dashboard Layout & Grid System
│   │   │   ├── layout.tsx    # Root HTML structure & Tab Metadata/Favicon
│   │   │   └── globals.css   # Global Tailwind styles
│   │   ├── components/       # Reusable UI Components
│   │   │   ├── AgentInterfaces.tsx # The 5 Core AI Agent logic & forms
│   │   │   ├── LeafletMap.tsx      # Interactive Map & Search Bar
│   │   │   ├── Scorecard.tsx       # Sustainability Metrics Dials
│   │   │   └── ui/                 # Base UI elements (Buttons, Cards)
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx   # Dark/Light mode logic
│   │   └── utils/
│   │       └── api.ts        # API Client for backend communication
└── start.ps1                 # Master script to run both servers
```

## ⚙️ How to Run Locally

### 1. One-Click Start (Windows)
Open PowerShell in the project root and run:
```powershell
.\start.ps1
```

### 2. Manual Start
**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
*(Runs on http://localhost:3000)*

**Backend:**
```bash
cd backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```
*(Runs on http://localhost:8000)*

---
*Developed by Quantum Minds. Built for the AtomCamp Hackathon.*
