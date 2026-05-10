"use client";

import dynamic from 'next/dynamic';

// Next.js dynamic import with ssr: false is REQUIRED for Leaflet to prevent 'window is not defined' errors
const DynamicLeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse text-gray-500 rounded-lg border dark:border-gray-700">Loading OpenStreetMap...</div>
});

export const EcoMap = () => {
  return <DynamicLeafletMap />;
};
