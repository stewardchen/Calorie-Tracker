import React, { useState } from 'react';
import { RestaurantVenue, MacroBreakdown } from '../types';

interface SmartDiningProps {
  venues: RestaurantVenue[];
  remainingCalories: number;
  onOpenScanModal: () => void;
  onOrderMeal: (dish: string, calories: number, macros: MacroBreakdown) => void;
}

const ROUTES = [
  { id: 'soho', label: 'SoHo Corridor // Prince to Broome St', distance: '1.2 miles', venuesCount: 4 },
  { id: 'fidi', label: 'Financial District // Wall St to Battery Park', distance: '1.8 miles', venuesCount: 6 },
  { id: 'chelsea', label: 'Chelsea // High Line to Meatpacking', distance: '1.4 miles', venuesCount: 3 },
];

export const SmartDining: React.FC<SmartDiningProps> = ({
  venues,
  remainingCalories,
  onOpenScanModal,
  onOrderMeal,
}) => {
  const [selectedRoute, setSelectedRoute] = useState(ROUTES[0].id);
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0]?.id || '');
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [menuScanResult, setMenuScanResult] = useState<string | null>(null);

  const selectedVenue = venues.find((v) => v.id === selectedVenueId) || venues[0];

  const handleSimulateMenuScan = () => {
    setMenuScanResult('Scanning menu photography...');
    setTimeout(() => {
      setMenuScanResult('Identified 3 optimal dishes matching 460 kcal window: 1. Blackened Cod Bowl (440 kcal), 2. Kale Caesar without croutons (390 kcal), 3. Quinoa Herb Salad (450 kcal).');
    }, 700);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b-2 border-[#1a1a1a] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#ff3d00]"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-black text-[#ff3d00]">
              Geo-Spatial Calorie Intelligence
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-[#1a1a1a]">
            Smart <span className="italic font-light text-[#ff3d00]">Dining</span> & Cartography
          </h1>
        </div>

        {/* Location Privacy Capsule */}
        <div className="flex items-center gap-3 border-2 border-[#1a1a1a] bg-[#f5f2eb] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${locationEnabled ? 'bg-[#ff3d00] animate-pulse' : 'bg-gray-400'}`}></span>
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]">
              {locationEnabled ? 'Active GPS Tracking' : 'GPS Standby'}
            </span>
          </div>
          <button
            onClick={() => setLocationEnabled(!locationEnabled)}
            className="border border-[#1a1a1a] bg-white px-2 py-0.5 font-sans text-[9px] uppercase tracking-wider font-bold hover:bg-[#ff3d00] hover:text-white transition-colors cursor-pointer"
          >
            {locationEnabled ? 'Pause' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Route Selector Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a1a1a]/20 pb-4">
        <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest font-bold">
          <span className="w-6 h-[1px] bg-[#1a1a1a]"></span>
          Active Trajectory:
        </div>
        <div className="flex flex-wrap gap-2">
          {ROUTES.map((route) => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={`px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest border transition-all cursor-pointer ${
                selectedRoute === route.id
                  ? 'border-2 border-[#1a1a1a] bg-[#1a1a1a] text-white font-bold shadow-[2px_2px_0px_#ff3d00]'
                  : 'border-[#1a1a1a] bg-white hover:bg-[#f5f2eb] text-[#1a1a1a]'
              }`}
            >
              {route.label} ({route.distance})
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map Canvas + Selected Venue Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Artistic Styled Map Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60">
              Interactive Geo-Grid Map
            </span>
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#ff3d00] font-bold">
              Click Pin to Inspect Macro Fit
            </span>
          </div>

          <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] relative h-[420px] overflow-hidden shadow-[4px_4px_0px_#1a1a1a]">
            {/* Artistic Grid Background Pattern */}
            <div className="absolute inset-0 bg-pattern opacity-30 pointer-events-none"></div>

            {/* Stylized Streets & River lines (SVG) */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* River / Waterfront curve */}
              <path
                d="M 0,380 Q 250,320 500,420 T 900,340"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="18"
                opacity="0.08"
              />
              <path
                d="M 0,380 Q 250,320 500,420 T 900,340"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.3"
              />

              {/* Grid Street Lines */}
              <line x1="80" y1="0" x2="80" y2="500" stroke="#1a1a1a" strokeWidth="1" opacity="0.15" />
              <line x1="220" y1="0" x2="220" y2="500" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.2" />
              <line x1="380" y1="0" x2="380" y2="500" stroke="#1a1a1a" strokeWidth="1" opacity="0.15" />
              <line x1="520" y1="0" x2="520" y2="500" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.2" />

              <line x1="0" y1="100" x2="800" y2="100" stroke="#1a1a1a" strokeWidth="1" opacity="0.15" />
              <line x1="0" y1="220" x2="800" y2="220" stroke="#1a1a1a" strokeWidth="2" opacity="0.25" />
              <line x1="0" y1="320" x2="800" y2="320" stroke="#1a1a1a" strokeWidth="1" opacity="0.15" />

              {/* Active Route Trajectory Polyline */}
              <path
                d="M 120,320 L 220,220 L 380,220 L 520,100 L 680,100"
                fill="none"
                stroke="#ff3d00"
                strokeWidth="3"
                strokeDasharray="6 4"
              />

              {/* Current User GPS Point */}
              <circle cx="120" cy="320" r="7" fill="#ff3d00" />
              <circle cx="120" cy="320" r="16" fill="none" stroke="#ff3d00" strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" values="7;22;7" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* User GPS label */}
            <div className="absolute top-[328px] left-[132px] font-sans text-[8px] uppercase tracking-widest bg-black text-white px-1.5 py-0.5 pointer-events-none">
              CURRENT GPS
            </div>

            {/* Interactive Pins for Venues */}
            {venues.map((venue, idx) => {
              const isSelected = venue.id === selectedVenueId;
              return (
                <div
                  key={venue.id}
                  onClick={() => setSelectedVenueId(venue.id)}
                  style={{ left: `${venue.coordinates.x}%`, top: `${venue.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  <div
                    className={`w-9 h-9 border-2 flex items-center justify-center font-mono text-xs font-black transition-all ${
                      isSelected
                        ? 'border-[#ff3d00] bg-[#1a1a1a] text-white scale-125 shadow-[4px_4px_0px_#ff3d00]'
                        : 'border-[#1a1a1a] bg-white text-[#1a1a1a] hover:bg-[#ff3d00] hover:text-white'
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  {/* Popover Tooltip */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-white border border-[#1a1a1a] px-2.5 py-1 text-center shadow-[2px_2px_0px_#1a1a1a] pointer-events-none transition-all ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <div className="font-serif font-bold text-[11px] text-[#1a1a1a]">{venue.name}</div>
                    <div className="font-mono text-[9px] text-[#ff3d00] font-bold">{venue.calories} KCAL ({venue.aiFitScore}% fit)</div>
                  </div>
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-white/90 border border-[#1a1a1a] p-2.5 font-sans text-[8px] uppercase tracking-wider space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#ff3d00]"></span>
                <span>Active Route Trajectory</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 border border-[#1a1a1a] bg-white"></span>
                <span>Approved Nutrition Partner</span>
              </div>
            </div>
          </div>

          {/* Quick Menu Scanner Button Card */}
          <div className="border-2 border-[#1a1a1a] bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 font-bold">
                Unlisted Restaurant?
              </div>
              <div className="font-serif text-base font-bold text-[#1a1a1a]">
                Scan Any Printed Menu with Camera
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleSimulateMenuScan}
                className="flex-1 sm:flex-none bg-[#1a1a1a] text-white px-4 py-2.5 font-sans text-[9px] uppercase font-bold tracking-widest hover:bg-[#ff3d00] transition-colors cursor-pointer"
              >
                Scan Paper Menu
              </button>
              <button
                onClick={onOpenScanModal}
                className="border border-[#1a1a1a] px-3 py-2.5 font-sans text-[9px] uppercase font-bold tracking-widest hover:bg-[#f5f2eb] transition-colors cursor-pointer"
              >
                Upload Photo
              </button>
            </div>
          </div>

          {menuScanResult && (
            <div className="p-3 border border-[#ff3d00] bg-[#ff3d00]/10 text-xs font-serif text-[#1a1a1a] animate-fadeIn">
              <strong>OCR Engine Analysis:</strong> {menuScanResult}
            </div>
          )}
        </div>

        {/* Right: Selected Venue Specifications & Exact Counter Order */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-6 shadow-[4px_4px_0px_#1a1a1a] space-y-6">
            <div className="flex justify-between items-start border-b border-[#1a1a1a]/20 pb-4">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-widest bg-[#1a1a1a] text-white px-2 py-0.5">
                  Partner Profile
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2">
                  {selectedVenue.name}
                </h2>
                <p className="font-serif italic text-xs text-[#1a1a1a]/70">
                  {selectedVenue.category} • {selectedVenue.address}
                </p>
              </div>

              <div className="text-right">
                <div className="font-mono text-2xl font-black text-[#ff3d00]">
                  {selectedVenue.aiFitScore}%
                </div>
                <div className="font-sans text-[8px] uppercase tracking-widest text-[#1a1a1a]/60">
                  MACRO MATCH
                </div>
              </div>
            </div>

            {/* Recommended Dish */}
            <div className="space-y-2">
              <span className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 font-bold block">
                Algorithmic Recommendation
              </span>
              <div className="border border-[#1a1a1a] bg-white p-4">
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a]">
                  {selectedVenue.recommendedDish}
                </h3>
                <div className="flex justify-between items-baseline mt-2 pt-2 border-t border-[#e5e5e5]">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#1a1a1a]/60">
                    Energy Density
                  </span>
                  <span className="font-mono text-lg font-black text-[#1a1a1a]">
                    {selectedVenue.calories} <span className="text-xs text-[#1a1a1a]/60">kcal</span>
                  </span>
                </div>

                {/* Macros */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="bg-[#f5f2eb] p-1.5 border border-[#1a1a1a]/20">
                    <span className="text-[8px] uppercase block font-sans opacity-60">Protein</span>
                    <span className="font-mono text-sm font-bold">{selectedVenue.macros.protein}g</span>
                  </div>
                  <div className="bg-[#f5f2eb] p-1.5 border border-[#1a1a1a]/20">
                    <span className="text-[8px] uppercase block font-sans opacity-60">Carbs</span>
                    <span className="font-mono text-sm font-bold">{selectedVenue.macros.carbs}g</span>
                  </div>
                  <div className="bg-[#f5f2eb] p-1.5 border border-[#1a1a1a]/20">
                    <span className="text-[8px] uppercase block font-sans opacity-60">Fats</span>
                    <span className="font-mono text-sm font-bold">{selectedVenue.macros.fat}g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Ordering Cheat-Sheet */}
            <div className="space-y-2">
              <span className="font-sans text-[9px] uppercase tracking-widest text-[#ff3d00] font-bold flex items-center gap-1.5">
                <span className="w-4 h-[1px] bg-[#ff3d00]"></span>
                Exact Counter Ordering Script
              </span>
              <div className="p-3.5 bg-white border border-[#1a1a1a] font-serif text-xs text-[#1a1a1a] leading-relaxed italic border-l-4 border-l-[#ff3d00]">
                "{selectedVenue.customOrderingTip}"
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => onOrderMeal(selectedVenue.recommendedDish, selectedVenue.calories, selectedVenue.macros)}
                className="flex-1 bg-[#1a1a1a] text-white py-3 font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-[#ff3d00] transition-colors cursor-pointer"
              >
                Log Meal to Timeline
              </button>
              <div className="border border-[#1a1a1a] bg-white px-4 py-3 font-mono text-xs flex items-center justify-center">
                {selectedVenue.distance}
              </div>
            </div>
          </div>

          {/* List of all venues for quick switching */}
          <div className="border border-[#1a1a1a] divide-y divide-[#1a1a1a] bg-white">
            {venues.map((v, i) => (
              <div
                key={v.id}
                onClick={() => setSelectedVenueId(v.id)}
                className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                  v.id === selectedVenueId ? 'bg-[#f5f2eb] font-bold' : 'hover:bg-[#fdfcf8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#ff3d00]">0{i + 1}</span>
                  <div>
                    <div className="font-serif text-sm text-[#1a1a1a]">{v.name}</div>
                    <div className="font-sans text-[9px] text-[#1a1a1a]/60 uppercase tracking-wider">{v.distance}</div>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#1a1a1a]">
                  {v.calories} kcal
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
