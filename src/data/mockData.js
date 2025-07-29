// src/data/mockData.js

export const services = [
  {
    id: 1,
    title: "Explore Tour Packages",
    description: "Discover amazing destinations with our curated tour packages",
    icon: "🗺️",
    route: "/tour-packages",
    color: "bg-blue-500",
    backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "Car & Bus Rental Service",
    description: "Rent cars and buses for your travel needs",
    icon: "🚗",
    route: "/rental-service",
    color: "bg-green-500",
    backgroundImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhciUyMHJlbnRhbHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000"
  }
];

export const tourPackages = [
  {
    id: 1,
    title: "Hyderabad City Tour",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.8,
    price: 350,
    originalPrice: 2500,
    description: "A Hyderabad city tour offers a blend of historical monuments like Charminar and Golconda Fort, cultural experiences, and modern attractions.",
    images: [
      "https://srivinayakatours.com/thumbnail/buddha_banner.webp",
      "https://srivinayakatours.com/thumbnail/Golconda_Fort.webp",
      "https://srivinayakatours.com/thumbnail/Charminar.webp"
    ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 350, maxPersons: 5 },
      { id: "7-seater", name: "7-Seater Group", price: 500, maxPersons: 7 },
      { id: "individual", name: "Individual", price: 350, maxPersons: 1 }
    ],
    inclusions: [
      "Bus transportation for pickup, drop-off, and sightseeing",
      "Sightseeing of all places mentioned in the itinerary"
    ],
    exclusions: [
      "Entry tickets to attractions",
      "Food and beverages",
      "Personal expenses",
      "Any activities not mentioned in the itinerary"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Hyderabad Local Sightseeing",
        places: [
          { name: "Birla Mandir", type: "visit", entryFee: { adult: 0, child: 0 } },
          { name: "Charminar (No Climbing)", type: "visit" },
          { name: "Chowmohalla Palace", type: "visit", entryFee: { adult: 100, child: 40 } },
          { name: "HEH Nizam Museum", type: "visit", entryFee: { adult: 125, child: 0 } },
          { name: "Salarjung Museum", type: "visit", entryFee: { adult: 50, child: 20 } },
          { name: "Golconda Fort", type: "visit", entryFee: { adult: 25, child: 0 } },
          { name: "Hyderabad History in 3D", type: "visit", entryFee: { adult: 130, child: 100 } },
          { name: "NTR Garden", type: "visit", entryFee: { adult: 20, child: 10 } },
          { name: "Dr. B R Ambedkar Statue", type: "drive" },
          { name: "Lumbini Park", type: "drive" },
          { name: "Hussain Sagar", type: "drive" }
        ]
      }
    ],
    category: "cultural"
  },
  {
    id: 2,
    title: "Ramoji Film City",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.7,
    price: 350,
    originalPrice: 2500,
    description: "Ramoji Film City is the world's largest film studio complex and a popular tourist destination in Hyderabad, India.",
    images: [
      "https://srivinayakatours.com/thumbnail/ramoji_film_city.webp"
    ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 350, maxPersons: 5 },
      { id: "7-seater", name: "7-Seater Group", price: 500, maxPersons: 7 },
      { id: "individual", name: "Individual", price: 350, maxPersons: 1 }
    ],
    inclusions: [
      "Transportation to Ramoji Film City",
      "Entry tickets included",
      "Guided tour"
    ],
    exclusions: [
      "Food and beverages",
      "Personal expenses",
      "Optional activities"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Ramoji Film City Tour",
        places: [
          { name: "Film Studio Tour", type: "visit" },
          { name: "Theme Park", type: "visit" },
          { name: "Live Shows", type: "visit" }
        ]
      }
    ],
    category: "entertainment"
  },
  {
    id: 3,
    title: "Wonderla",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.9,
    price: 875,
    originalPrice: 1000,
    description: "Wonderla Amusement Park in Hyderabad offers a mix of water rides, roller coasters, and attractions for kids.",
    images: [
      "https://srivinayakatours.com/thumbnail/wonderla.jpg"
    ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 875, maxPersons: 5 },
      { id: "7-seater", name: "7-Seater Group", price: 1200, maxPersons: 7 },
      { id: "individual", name: "Individual", price: 875, maxPersons: 1 }
    ],
    inclusions: [
      "Transportation to Wonderla",
      "Entry tickets included",
      "All rides access"
    ],
    exclusions: [
      "Food and beverages",
      "Personal expenses",
      "Locker charges"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Wonderla Adventure",
        places: [
          { name: "Water Rides", type: "visit" },
          { name: "Roller Coasters", type: "visit" },
          { name: "Kids Zone", type: "visit" }
        ]
      }
    ],
    category: "entertainment"
  },
  {
    id: 4,
    title: "Statue of Equality",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.6,
    price: 1125,
    originalPrice: 2500,
    description: "The Statue of Equality features a vast golden monument dedicated to the medieval guru Sri Ramanuja, with a meditation hall at its base.",
    images: [
      "https://srivinayakatours.com/thumbnail/statue_of_equality_tour.webp"
    ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 1125, maxPersons: 5 },
      { id: "7-seater", name: "7-Seater Group", price: 1600, maxPersons: 7 },
      { id: "individual", name: "Individual", price: 1125, maxPersons: 1 }
    ],
    inclusions: [
      "Transportation to Statue of Equality",
      "Entry tickets included",
      "Guided tour"
    ],
    exclusions: [
      "Food and beverages",
      "Personal expenses",
      "Optional activities"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Statue of Equality Visit",
        places: [
          { name: "Statue viewing", type: "visit" },
          { name: "Meditation Hall", type: "visit" },
          { name: "Museum", type: "visit" }
        ]
      }
    ],
    category: "cultural"
  },
  {
    id: 5,
    title: "Anathagiri Hills",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.8,
    price: 1125,
    originalPrice: 2000,
    description: "Anantha Giri Hills is a scenic, forested peak in Telangana with nature trails, a historic temple, old caves, and lodging and dining options.",
    images: [
      "https://srivinayakatours.com/thumbnail/ananthagiri_hills_tour.webp"
    ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 1125, maxPersons: 5 },
      { id: "7-seater", name: "7-Seater Group", price: 1600, maxPersons: 7 },
      { id: "individual", name: "Individual", price: 1125, maxPersons: 1 }
    ],
    inclusions: [
      "Transportation to Anathagiri Hills",
      "Nature trail guide",
      "Temple visit"
    ],
    exclusions: [
      "Food and beverages",
      "Personal expenses",
      "Adventure activities"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Anathagiri Hills Adventure",
        places: [
          { name: "Nature Trails", type: "visit" },
          { name: "Historic Temple", type: "visit" },
          { name: "Ancient Caves", type: "visit" }
        ]
      }
    ],
    category: "adventure"
  },
  {
    id: 6,
    title: "Yadagirigutta Temple",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.9,
    price: 1125,
    originalPrice: 2000,
    description: "Yadagirigutta Sri Lakshmi Narasimha Swamy Devasthanam is a Dravidian-style Hindu temple atop a hill, featuring an ornate, towering gopuram entry gate.",
    images: [
      "https://srivinayakatours.com/thumbnail/yadadri_tour.webp"
    ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 1125, maxPersons: 5 },
      { id: "7-seater", name: "7-Seater Group", price: 1600, maxPersons: 7 },
      { id: "individual", name: "Individual", price: 1125, maxPersons: 1 }
    ],
    inclusions: [
      "Transportation to temple",
      "Temple darshan",
      "Guided tour"
    ],
    exclusions: [
      "Special darshan tickets",
      "Food and beverages",
      "Personal expenses"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Yadagirigutta Temple Visit",
        places: [
          { name: "Temple Darshan", type: "visit" },
          { name: "Gopuram viewing", type: "visit" },
          { name: "Temple complex tour", type: "visit" }
        ]
      }
    ],
    category: "temple"
  },
  {
    id: 7,
    title: "Srisailam",
    location: "Andhra Pradesh",
    duration: "1 Day & 0 Nights",
    rating: 4.8,
    price: 2250,
    originalPrice: 3000,
    description: "Srisailam is a pilgrimage town in Andhra Pradesh, India, known for its ancient Sri Mallikarjuna Jyotirlinga temple and scenic surroundings.",
    images: [
      "https://srivinayakatours.com/thumbnail/srisailam_tour_cover.webp"
    ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 2250, maxPersons: 5 },
      { id: "7-seater", name: "7-Seater Group", price: 3200, maxPersons: 7 },
      { id: "individual", name: "Individual", price: 2250, maxPersons: 1 }
    ],
    inclusions: [
      "Transportation to Srisailam",
      "Temple darshan",
      "Scenic viewpoints"
    ],
    exclusions: [
      "Special darshan tickets",
      "Food and beverages",
      "Personal expenses"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Srisailam Pilgrimage",
        places: [
          { name: "Mallikarjuna Temple", type: "visit" },
          { name: "Krishna River view", type: "visit" },
          { name: "Patala Ganga", type: "visit" }
        ]
      }
    ],
    category: "temple"
  },
  {
    id: 8,
    title: "Nagarjuna Sagar",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.9,
    price: 1125,
    originalPrice: 2000,
    description: "Nagarjuna Sagar is known for its massive irrigation and power-generating dam, which is especially popular to visit during the monsoon season.",
    images: [
      "https://srivinayakatours.com/thumbnail/sagar_tour.webp"
    ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 1125, maxPersons: 5 },
      { id: "7-seater", name: "7-Seater Group", price: 1600, maxPersons: 7 },
      { id: "individual", name: "Individual", price: 1125, maxPersons: 1 }
    ],
    inclusions: [
      "Transportation to dam",
      "Dam visit",
      "Boat ride (if available)"
    ],
    exclusions: [
      "Food and beverages",
      "Personal expenses",
      "Additional activities"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Nagarjuna Sagar Dam Visit",
        places: [
          { name: "Dam viewpoint", type: "visit" },
          { name: "Nagarjunakonda Island", type: "visit" },
          { name: "Museum visit", type: "visit" }
        ]
      }
    ],
    category: "dams"
  }
];

export const vehicles = {
  cars: [
    {
      id: 1,
      name: "Swift Dzire",
      type: "car",
      capacity: "4+1",
      images: [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500",
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500"
      ],
      plans: [
        { id: "with-driver", name: "With Driver", price: 2500, description: "Includes professional driver" },
        { id: "without-driver", name: "Without Driver", price: 2000, description: "Self-drive option" }
      ],
      inclusions: [
        "Fuel up to 100km",
        "Basic insurance",
        "24/7 roadside assistance",
        "GPS navigation"
      ],
      exclusions: [
        "Toll charges",
        "Parking fees",
        "Extra fuel beyond 100km",
        "Damage repairs"
      ],
      notes: "Damages are chargeable based on severity. Security deposit required."
    },
    {
      id: 2,
      name: "Toyota Innova",
      type: "car",
      capacity: "7+1",
      images: [
        "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=500"
      ],
      plans: [
        { id: "with-driver", name: "With Driver", price: 3500, description: "Includes professional driver" },
        { id: "without-driver", name: "Without Driver", price: 3000, description: "Self-drive option" }
      ],
      inclusions: [
        "Fuel up to 120km",
        "Comprehensive insurance",
        "24/7 roadside assistance",
        "GPS navigation",
        "Air conditioning"
      ],
      exclusions: [
        "Toll charges",
        "Parking fees",
        "Extra fuel beyond 120km",
        "Damage repairs"
      ],
      notes: "Damages are chargeable based on severity. Security deposit required."
    }
  ],
  buses: [
    {
      id: 1,
      name: "Luxury AC Bus",
      type: "bus",
      capacity: "35+1",
      images: [
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=500",
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500"
      ],
      plans: [
        { id: "group", name: "Group Booking", price: 8500, description: "Full bus booking" }
      ],
      inclusions: [
        "Professional driver",
        "Fuel for intercity travel",
        "Basic insurance",
        "Air conditioning",
        "Music system"
      ],
      exclusions: [
        "Toll charges",
        "Parking fees",
        "Driver accommodation",
        "Damage repairs"
      ],
      notes: "Damages are chargeable based on severity. Driver details will be provided.",
      drivers: [
        {
          id: 1,
          name: "Ravi Kumar",
          license: "TN12345678",
          experience: "8 years",
          rating: 4.8
        },
        {
          id: 2,
          name: "Suresh Babu",
          license: "TN87654321",
          experience: "12 years",
          rating: 4.9
        }
      ]
    }
  ]
};

export const drivers = [
  {
    id: 1,
    name: "Ravi Kumar",
    license: "TN12345678",
    experience: "8 years",
    rating: 4.8,
    phone: "+91 9876543210",
    languages: ["Telugu", "Hindi", "English"]
  },
  {
    id: 2,
    name: "Suresh Babu",
    license: "TN87654321",
    experience: "12 years",
    rating: 4.9,
    phone: "+91 9876543211",
    languages: ["Telugu", "Tamil", "English"]
  }
];
