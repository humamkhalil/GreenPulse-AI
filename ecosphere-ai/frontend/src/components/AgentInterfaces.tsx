"use client";

import React, { useState } from 'react';
import { Upload, Droplet, TrendingUp, AlertTriangle, Loader2, Save, Share2, Camera, ShieldAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const AgentInterfaces = ({ activeTab }: { activeTab: string }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const simulateLoading = (mockData: any) => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockData);
      setLoading(false);
    }, 1500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'crop-doctor':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <Upload className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 font-medium mb-4">Select a picture of your crop for analysis</p>
              <input 
                type="file" 
                accept="image/*" 
                id="crop-image-upload" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    simulateLoading({ disease: 'Leaf Blight', confidence: 92, treatment: 'Apply organic fungicide X immediately.' });
                  }
                }} 
              />
              <Button onClick={() => document.getElementById('crop-image-upload')?.click()}>
                Upload Picture
              </Button>
            </div>
            {loading && <div className="flex items-center justify-center py-8 text-green-600"><Loader2 className="w-8 h-8 animate-spin" /></div>}
            {result && (
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                <h4 className="font-bold text-green-800 dark:text-green-400 mb-2">Analysis Complete</h4>
                <p><strong>Detected:</strong> {result.disease} ({result.confidence}% confidence)</p>
                <p className="mt-2"><strong>Treatment:</strong> {result.treatment}</p>
              </div>
            )}
          </div>
        );
      
      case 'smart-irrigation':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input type="text" placeholder="Crop (e.g. Wheat)" className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white" />
              <input type="number" placeholder="Area (Hectares)" className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white" />
              <select className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-gray-500 dark:text-gray-300 outline-none">
                <option value="">Soil Type</option>
                <option value="clay">Clay (High Retention)</option>
                <option value="sandy">Sandy (Low Retention)</option>
                <option value="loam">Loam (Optimal)</option>
              </select>
              <input 
                type="text" 
                list="irrigation-districts"
                placeholder="District (e.g. Dir)" 
                className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white outline-none" 
              />
              <datalist id="irrigation-districts">
                <option value="Dir" />
                <option value="Peshawar" />
                <option value="Multan" />
                <option value="Lahore" />
                <option value="Islamabad" />
                <option value="Karachi" />
                <option value="Quetta" />
                <option value="Faisalabad" />
                <option value="Rawalpindi" />
                <option value="Swat" />
                <option value="Chitral" />
                <option value="Gilgit" />
                <option value="Mardan" />
                <option value="Sukkur" />
                <option value="Larkana" />
                <option value="Bahawalpur" />
                <option value="Sialkot" />
                <option value="Gujranwala" />
                <option value="Hyderabad" />
                <option value="Abbottabad" />
              </datalist>
            </div>
            <Button className="w-full" onClick={() => simulateLoading({ 
                schedule: 'Water for 1.5 hrs starting at 6:00 AM.', 
                volume: '9,000 Liters required for 2 Hectares',
                savings: 'Saved 6,500 Liters (approx. 4 liters of diesel) compared to flood irrigation.',
                advice: 'Location-based adjustment: Since your farm is located in Dir (Cool & Humid), water evaporation is extremely low compared to Peshawar. We have reduced your water volume by 40%. Soil is sandy, so use frequent short cycles.'
              })}>
              Generate Smart Schedule
            </Button>
            
            {loading && <div className="flex items-center justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>}
            {result && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold mb-4">
                  <Droplet className="w-5 h-5" /> Optimized Irrigation Plan
                </div>
                <div className="space-y-3 text-gray-800 dark:text-gray-200">
                  <p><strong>⏱️ Schedule:</strong> {result.schedule}</p>
                  <p><strong>💧 Volume:</strong> {result.volume}</p>
                  <p className="text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/30 p-2 rounded">
                    <strong>💰 Impact:</strong> {result.savings}
                  </p>
                  <p className="text-sm border-t border-blue-200 dark:border-blue-700 pt-2 mt-2">
                    <strong>🌱 AI Agronomist Note:</strong> {result.advice}
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 'market-intel':
        return (
          <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" id="mi-crop" list="crop-list" placeholder="Crop (e.g. Basmati Rice)" className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white outline-none" />
              <datalist id="crop-list">
                <option value="Wheat" />
                <option value="Basmati Rice" />
                <option value="Cotton" />
                <option value="Sugarcane" />
                <option value="Maize" />
                <option value="Potato" />
                <option value="Onion" />
                <option value="Mango" />
                <option value="Citrus (Kinnow)" />
              </datalist>
              <input type="text" id="mi-market" list="irrigation-districts" placeholder="Target Market (e.g. Lahore Mandi)" className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white outline-none" />
              <input type="number" id="mi-qty" placeholder="Quantity in KG (e.g. 5000)" className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white outline-none" />
            </div>
            <Button className="w-full" onClick={() => {
              const crop = (document.getElementById('mi-crop') as HTMLInputElement)?.value || 'Crop';
              const qty = Number((document.getElementById('mi-qty') as HTMLInputElement)?.value || 1000);
              const market = (document.getElementById('mi-market') as HTMLInputElement)?.value || 'Local Market';
              
              const pricePerKg = Math.floor(Math.random() * 150) + 50;
              const middlemanCut = Math.floor(pricePerKg * 0.3); // Middleman takes ~30%
              
              simulateLoading({ 
                price: `Rs ${pricePerKg}/kg`, 
                totalValue: `Rs ${(pricePerKg * qty).toLocaleString()}`,
                middlemanLoss: `Rs ${(middlemanCut * qty).toLocaleString()}`,
                forecast: '+8% expected next week due to high export demand', 
                rec: 'HOLD',
                insight: `If you bypass the middleman and sell directly in ${market}, you can save Rs ${(middlemanCut * qty).toLocaleString()}. Storage is recommended for 7 days as prices are currently rising.`
              });
            }}>
              Generate Financial Intelligence
            </Button>
            
            {loading && <div className="flex items-center justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>}
            
            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border text-center border-gray-200 dark:border-gray-700 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">Live Rate</p>
                    <p className="font-black text-xl text-gray-800 dark:text-gray-100">{result.price}</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border text-center border-green-200 dark:border-green-800 shadow-sm">
                    <p className="text-xs text-green-600 dark:text-green-500 uppercase tracking-wider mb-1 font-bold">Total Crop Value</p>
                    <p className="font-black text-xl text-green-700 dark:text-green-400">{result.totalValue}</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border text-center border-red-200 dark:border-red-800 shadow-sm">
                    <p className="text-xs text-red-600 dark:text-red-500 uppercase tracking-wider mb-1 font-bold">Middleman Cut</p>
                    <p className="font-black text-xl text-red-700 dark:text-red-400">-{result.middlemanLoss}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center relative overflow-hidden shadow-sm">
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-30"></div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 font-bold relative z-10">AI Action</p>
                    <p className="font-black text-2xl text-indigo-700 dark:text-indigo-300 relative z-10">{result.rec}</p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-5 rounded-xl shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900 dark:text-blue-200 text-lg">Market Forecast & Strategy</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1 font-medium">{result.forecast}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{result.insight}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'climate-risk':
        return (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                id="cr-district"
                type="text" 
                list="irrigation-districts"
                placeholder="District (e.g. Lahore)" 
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white outline-none" 
              />
              <select id="cr-weather" className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-gray-500 dark:text-gray-300 outline-none">
                <option value="heatwave">🌡️ Heatwave Alert</option>
                <option value="flood">🌧️ Flash Flood Warning</option>
                <option value="drought">🏜️ Prolonged Drought</option>
                <option value="frost">❄️ Unexpected Frost</option>
              </select>
            </div>
            <Button className="w-full" variant="destructive" onClick={() => {
               const dist = (document.getElementById('cr-district') as HTMLInputElement)?.value || 'your area';
               const weather = (document.getElementById('cr-weather') as HTMLSelectElement)?.value || 'heatwave';
               let alertText = '';
               let tips = [];
               
               if(weather === 'flood') {
                 alertText = `High Flash Flood Risk in ${dist}`;
                 tips = ['Clear drainage channels immediately', 'Delay fertilizer application', 'Harvest mature crops early if possible'];
               } else if (weather === 'drought') {
                 alertText = `Severe Drought Expected in ${dist}`;
                 tips = ['Implement drip irrigation', 'Apply organic mulch to retain moisture', 'Avoid planting water-intensive crops'];
               } else if (weather === 'frost') {
                 alertText = `Unexpected Frost Warning for ${dist}`;
                 tips = ['Cover sensitive plants overnight', 'Water soil lightly to trap heat', 'Use wind machines if available'];
               } else {
                 alertText = `Extreme Heatwave Expected in ${dist}`;
                 tips = ['Increase irrigation frequency by 30%', 'Provide shade nets over nursery beds', 'Harvest early morning or late evening'];
               }
               
               simulateLoading({ alert: alertText, tips });
            }}>
              Scan Local Risks
            </Button>
            {loading && <div className="flex items-center justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-red-500" /></div>}
            {result && (
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
                 <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold mb-2">
                  <AlertTriangle className="w-5 h-5" /> Critical Alert: {result.alert}
                </div>
                <ul className="list-disc ml-5 mt-2 text-gray-700 dark:text-gray-300">
                  {result.tips.map((tip: string, idx: number) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'eco-watch':
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg text-amber-800 dark:text-amber-200 text-sm mb-4">
              <p><strong>⚠️ Confidential Reporting:</strong> Use this portal to report illegal deforestation, unauthorized toxic dumping, or other environmental crimes to the authorities. Your identity remains completely anonymous.</p>
            </div>
            <div className="space-y-4">
              <select id="eco-type" className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white outline-none">
                <option value="deforestation">🪓 Illegal Deforestation / Timber Mafia</option>
                <option value="pollution">🏭 Factory / Chemical Pollution</option>
                <option value="wildlife">🐾 Poaching / Wildlife Crime</option>
                <option value="water">🚰 Water Contamination</option>
              </select>
              
              <input 
                id="eco-location"
                type="text" 
                placeholder="Specific Location (e.g., Swat Valley, Forest Sector 4)" 
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white outline-none" 
              />
              
              <textarea 
                placeholder="Provide details about the illegal activity... (Optional: Upload photo evidence below)" 
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white outline-none min-h-[100px]"
              />

              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload photo evidence</span> (Optional)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>

              <Button className="w-full" variant="default" onClick={() => simulateLoading({ 
                  success: true, 
                  reference: 'ECO-' + Math.floor(Math.random() * 90000 + 10000),
                  message: 'Your report has been securely encrypted and forwarded to the Environmental Protection Agency (EPA) and local Forestry Dept. They will investigate within 48 hours.'
                })}>
                Submit Anonymous Report
              </Button>
            </div>
            
            {loading && <div className="flex items-center justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-green-500" /></div>}
            
            {result && result.success && (
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                 <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold mb-2">
                  <ShieldAlert className="w-5 h-5" /> Report Submitted Successfully
                </div>
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p>{result.message}</p>
                  <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm text-center tracking-widest mt-4">
                    Tracking ID: {result.reference}
                  </p>
                </div>
              </div>
            )}

            {/* Direct Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center text-center hover:border-green-300 transition-colors">
                <span className="text-2xl mb-2">📞</span>
                <p className="font-bold text-gray-800 dark:text-gray-200">Forestry Helpline</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">1445 (Toll Free)</p>
              </div>
              <div className="p-4 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center text-center hover:border-green-300 transition-colors">
                <span className="text-2xl mb-2">💬</span>
                <p className="font-bold text-gray-800 dark:text-gray-200">WhatsApp Team</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">+92 300 1234567</p>
              </div>
              <div className="p-4 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center text-center hover:border-green-300 transition-colors">
                <span className="text-2xl mb-2">📍</span>
                <p className="font-bold text-gray-800 dark:text-gray-200">Ministry of Climate Change</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Local Government Complex, G-5/2</p>
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl capitalize">{activeTab.replace('-', ' ')} Portal</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
      {result && (
        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline" size="sm"><Save className="w-4 h-4 mr-2"/> Save</Button>
          <Button size="sm"><Share2 className="w-4 h-4 mr-2"/> Share</Button>
        </CardFooter>
      )}
    </Card>
  );
};
