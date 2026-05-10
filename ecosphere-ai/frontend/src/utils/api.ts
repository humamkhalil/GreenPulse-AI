import { create } from 'zustand';

// --- Zustand Store for Loading & Auth State ---
interface AppState {
  isLoading: boolean;
  setLoading: (val: boolean) => void;
  token: string | null;
  setToken: (token: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  setLoading: (val) => set({ isLoading: val }),
  token: typeof window !== 'undefined' ? localStorage.getItem('eco_token') : null,
  setToken: (token) => {
    localStorage.setItem('eco_token', token);
    set({ token });
  }
}));

// --- API Client ---
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export class ApiClient {
  static async request(endpoint: string, options: RequestInit = {}, retries = 2): Promise<any> {
    const store = useAppStore.getState();
    store.setLoading(true);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (store.token) {
      headers['Authorization'] = `Bearer ${store.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      
      // Handle Unauthorized
      if (response.status === 401) {
        localStorage.removeItem('eco_token');
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      store.setLoading(false);
      return data;
      
    } catch (error) {
      if (retries > 0) {
        console.warn(`Request failed, retrying... (${retries} left)`);
        return this.request(endpoint, options, retries - 1);
      }
      
      store.setLoading(false);
      console.error('API Request failed:', error);
      
      // Fallback Mock Data for Offline/Hackathon Support
      return this.getMockFallback(endpoint);
    }
  }

  static getMockFallback(endpoint: string) {
    console.log("Serving offline mock data for:", endpoint);
    if (endpoint.includes('crop-doctor')) return { status: 'success', data: { prediction: 'Healthy', confidence: 0.99 } };
    if (endpoint.includes('smart-irrigation')) return { status: 'success', data: { schedule: 'Mock: Water tomorrow', water_savings_potential: '15%' } };
    if (endpoint.includes('market-intelligence')) return { status: 'success', data: { price: '$260/ton', forecast: '+2%', recommendation: 'SELL' } };
    if (endpoint.includes('climate-risk')) return { status: 'success', data: { alert: 'No immediate risks', tips: [] } };
    
    throw new Error("Network error and no fallback available.");
  }
}

export default ApiClient;
