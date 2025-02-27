import React from 'react';

const ItineraryMap = ({ itinerary }) => {
  // These would be replaced with actual coordinates for a real implementation
  // For this example, we'll create a simplified visual representation
  const locations = {
    "Mysore Palace": { x: 100, y: 120 },
    "Mysore Zoo": { x: 150, y: 180 },
    "Chamundi Hills": { x: 200, y: 100 },
    "Abbey Falls": { x: 80, y: 60 },
    "Raja's Seat": { x: 140, y: 40 },
    "Coffee Plantation": { x: 220, y: 50 },
    "Golden Temple": { x: 260, y: 120 },
    "Nisargadhama": { x: 320, y: 140 }
  };

  // Define colors for each day
  const dayColors = {
    "Day 1": "#3B82F6", // blue
    "Day 2": "#10B981", // green
    "Day 3": "#8B5CF6"  // purple
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Tour Route Map</h3>
      
      <div className="relative w-full h-64 bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Map SVG */}
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Background elements */}
          <rect x="0" y="0" width="400" height="200" fill="#F0F9FF" />
          <path d="M0 120 C50 100, 150 160, 250 120 S350 80, 400 110" 
                fill="none" stroke="#E0E7FF" strokeWidth="60" strokeLinecap="round" />
          
          {/* Connect locations with paths */}
          {itinerary.map((day, dayIndex) => {
            const dayLocations = day.places.map(place => place.name);
            const points = dayLocations.map(loc => locations[loc]);
            
            if (points.length < 2) return null;
            
            // Create path between points
            const pathData = points.map((point, i) => 
              `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
            ).join(' ');
            
            return (
              <g key={`path-${dayIndex}`}>
                <path 
                  d={pathData} 
                  fill="none" 
                  stroke={dayColors[day.day]} 
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={dayIndex === 0 ? "none" : "none"}
                />
              </g>
            );
          })}
          
          {/* Draw location points */}
          {itinerary.flatMap((day, dayIndex) => 
            day.places.map((place, placeIndex) => {
              const location = locations[place.name];
              return (
                <g key={`location-${dayIndex}-${placeIndex}`}>
                  <circle 
                    cx={location.x} 
                    cy={location.y} 
                    r="8"
                    fill={dayColors[day.day]}
                  />
                  <circle 
                    cx={location.x} 
                    cy={location.y} 
                    r="4"
                    fill="white"
                  />
                </g>
              );
            })
          )}
          
          {/* Location labels */}
          {itinerary.flatMap((day, dayIndex) => 
            day.places.map((place, placeIndex) => {
              const location = locations[place.name];
              const textAnchor = location.x > 200 ? "end" : "start";
              const dx = location.x > 200 ? -12 : 12;
              
              return (
                <g key={`label-${dayIndex}-${placeIndex}`}>
                  <text 
                    x={location.x + dx} 
                    y={location.y} 
                    fontSize="10"
                    textAnchor={textAnchor}
                    fill="#1F2937"
                    fontWeight="500"
                  >
                    {place.name}
                  </text>
                </g>
              );
            })
          )}
          
          {/* Legend */}
          <g transform="translate(20, 20)">
            {Object.entries(dayColors).map(([day, color], index) => (
              <g key={`legend-${index}`} transform={`translate(0, ${index * 20})`}>
                <rect width="16" height="4" fill={color} y="6" rx="2" />
                <text x="24" y="10" fontSize="10" fill="#4B5563">{day}</text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Note:</strong> This map shows the approximate route of the tour. Actual distances and travel times may vary.</p>
      </div>
    </div>
  );
};

export default ItineraryMap;