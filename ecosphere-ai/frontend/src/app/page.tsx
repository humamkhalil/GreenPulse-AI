"use client";

import React, { useState } from 'react';
import { Leaf, Droplet, TrendingUp, CloudRain, Moon, Sun, Globe, ShieldAlert } from 'lucide-react';
import { AgentInterfaces } from '@/components/AgentInterfaces';
import { Scorecard } from '@/components/Scorecard';
import { EcoMap } from '@/components/Map';

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('crop-doctor');
  const [language, setLanguage] = useState('en');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const agents = [
    { id: 'crop-doctor', name: 'Crop Doctor', icon: <Leaf className="w-6 h-6" />, desc: 'AI disease detection from images' },
    { id: 'smart-irrigation', name: 'Smart Irrigation', icon: <Droplet className="w-6 h-6" />, desc: 'Optimized watering schedules' },
    { id: 'market-intel', name: 'Market Advisor', icon: <TrendingUp className="w-6 h-6" />, desc: 'Live Mandi prices & profit tips' },
    { id: 'climate-risk', name: 'Climate Risk', icon: <CloudRain className="w-6 h-6" />, desc: 'Weather alerts & preparedness' },
    { id: 'eco-watch', name: 'Eco-Watch', icon: <ShieldAlert className="w-6 h-6" />, desc: 'Report illegal deforestation & pollution' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-[#f4f7f6] text-gray-900'}`}>
      {/* Dynamic Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-emerald-500" />
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              GreenPulse AI
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Agent Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              onClick={() => setActiveTab(agent.id)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                activeTab === agent.id 
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg transform scale-[1.02]' 
                : 'border-gray-200 dark:border-gray-800 hover:border-emerald-300 bg-white dark:bg-gray-800/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className={`p-3 rounded-xl ${activeTab === agent.id ? 'bg-emerald-500 text-white shadow-inner' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                  {agent.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100">{agent.name}</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{agent.desc}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Agent Interface */}
          <section className="lg:col-span-2">
            <AgentInterfaces activeTab={activeTab} />
          </section>

          {/* Sidebar: Map & Scorecard */}
          <aside className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden shadow-sm h-[300px]">
              <EcoMap />
            </div>
            <Scorecard />
          </aside>
        </div>
      </main>

      {/* Minimal Formal Footer */}
      <footer className="mt-12 py-6 border-t bg-white dark:bg-gray-900 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400 relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-semibold text-gray-700 dark:text-gray-300">
            &copy; 2026 GreenPulse AI. Developed for AtomCamp Hackathon.
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Quantum Minds Team:</span>
            <a href="https://linkedin.com/in/humam-khalil-1122b0344" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors">Humam Khalil</a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">Muhammad Amin</span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">Dawood Shah</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
