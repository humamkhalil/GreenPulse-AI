"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Droplet, Leaf, Sprout, ShieldCheck } from 'lucide-react';

// District Data Mapping for Sustainability Metrics
const DISTRICT_DATA: Record<string, any> = {
  'overall': { water: 75, carbon: 60, bio: 45, overall: 68, trend: 'up', message: "National average shows a 5% IMPROVEMENT compared to last month. Keep optimizing irrigation schedules." },
  'dir': { water: 90, carbon: 75, bio: 80, overall: 82, trend: 'up', message: "Region is operating 15% ABOVE national average. Excellent water retention due to favorable climate and topography." },
  'peshawar': { water: 55, carbon: 40, bio: 35, overall: 43, trend: 'down', message: "Region is operating 10% BELOW national average. High tubewell usage detected resulting in carbon penalties." },
  'multan': { water: 45, carbon: 50, bio: 30, overall: 42, trend: 'down', message: "Intense heatwave impact detected. High evaporation rates in cotton fields require smart-irrigation intervention." },
  'lahore': { water: 50, carbon: 30, bio: 25, overall: 35, trend: 'down', message: "Urban heat island effect is impacting crop resilience. Air quality is severely affecting photosynthesis rates." },
  'swat': { water: 85, carbon: 80, bio: 90, overall: 85, trend: 'up', message: "Exceptional biodiversity score! Reforestation efforts in the valley are showing significant carbon-zero progress." },
  'islamabad': { water: 70, carbon: 65, bio: 60, overall: 65, trend: 'up', message: "Margalla Hills conservation is boosting regional biodiversity scores. Urban farming is on the rise." },
  'karachi': { water: 30, carbon: 45, bio: 20, overall: 32, trend: 'down', message: "Water scarcity warning! Desalination and wastewater recycling are critical for local peri-urban agriculture." },
  'chitral': { water: 95, carbon: 85, bio: 95, overall: 92, trend: 'up', message: "Pristine environmental conditions. Glacial meltwater management is highly efficient this season." },
  'gilgit': { water: 88, carbon: 90, bio: 88, overall: 89, trend: 'up', message: "Organic farming pioneer. The region is leading in carbon-neutral fruit production for export." }
};

const CircularProgress = ({ value, label, gradientId, fromColor, toColor, trend, icon: Icon }: { value: number, label: string, gradientId: string, fromColor: string, toColor: string, trend: 'up' | 'down', icon: any }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700 hover:shadow-sm">
      <div className="relative flex items-center justify-center w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fromColor} />
              <stop offset="100%" stopColor={toColor} />
            </linearGradient>
          </defs>
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100 dark:text-gray-800" />
          <circle 
            cx="48" cy="48" r={radius} 
            stroke={`url(#${gradientId})`} 
            strokeWidth="8" 
            fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out drop-shadow-md" 
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <Icon className={`w-4 h-4 mb-1`} style={{ color: fromColor }} />
          <div className="flex items-center gap-1">
            <span className="font-black text-lg text-gray-800 dark:text-gray-100">{value}</span>
            {trend === 'up' ? <ArrowUp className="w-3 h-3 text-emerald-500" /> : <ArrowDown className="w-3 h-3 text-rose-500" />}
          </div>
        </div>
      </div>
      <span className="text-[11px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
};

export const Scorecard = () => {
  const [location, setLocation] = useState('overall');

  // Dynamically select stats based on location
  const stats = useMemo(() => {
    const key = location.toLowerCase().trim();
    return DISTRICT_DATA[key] || DISTRICT_DATA['overall'];
  }, [location]);

  return (
    <Card className="w-full shadow-lg border-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900 overflow-hidden relative rounded-2xl">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <CardHeader className="relative z-10 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Eco-Scorecard</CardTitle>
            <p className="text-xs text-gray-500 mt-1 font-medium">Real-time sustainability metrics</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <input 
              type="text"
              list="scorecard-districts"
              placeholder="Search District..."
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="w-full sm:w-40 text-sm py-2 px-3 pl-8 border border-gray-200 dark:border-gray-700 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">📍</span>
            <datalist id="scorecard-districts">
              {Object.keys(DISTRICT_DATA).map(d => (
                <option key={d} value={d === 'overall' ? 'Overall' : d.charAt(0).toUpperCase() + d.slice(1)} />
              ))}
            </datalist>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <CircularProgress 
            value={stats.water} 
            label="Water Eff." 
            gradientId="waterGrad" fromColor="#3b82f6" toColor="#06b6d4" 
            trend={stats.trend} 
            icon={Droplet}
          />
          <CircularProgress 
            value={stats.carbon} 
            label="Carbon Zero" 
            gradientId="carbonGrad" fromColor="#10b981" toColor="#34d399" 
            trend={stats.trend} 
            icon={Leaf}
          />
          <CircularProgress 
            value={stats.bio} 
            label="Biodiversity" 
            gradientId="bioGrad" fromColor="#8b5cf6" toColor="#d946ef" 
            trend={stats.trend} 
            icon={Sprout}
          />
          <CircularProgress 
            value={stats.overall} 
            label="OVERALL" 
            gradientId="overallGrad" fromColor="#f59e0b" toColor="#fcd34d" 
            trend={stats.trend} 
            icon={ShieldCheck}
          />
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start gap-3">
          <div className="mt-1">
            {stats.trend === 'up' ? '🌟' : '⚠️'}
          </div>
          <p className="leading-relaxed">
            {stats.message}
          </p>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800 text-white dark:from-gray-700 dark:to-gray-600 border-0 shadow-md hover:shadow-lg transition-all rounded-xl py-6 font-semibold tracking-wide">
          Generate Detailed Report
        </Button>
      </CardContent>
    </Card>
  );
};

