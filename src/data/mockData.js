// src/data/mockData.js

export const services = [
  {
    id:1,
    title: "Customized Tour Packages",
    description: "Tailored travel experiences designed for your perfect getaway",
    icon: "🏛️",
    route: "/tour-packages",
    backgroundImage: "https://media.istockphoto.com/id/1215274990/photo/high-wide-angle-view-of-charminar-in-the-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=sQggGGYHLaIX4wlJzKYeLkEZHthBO6vLY-Rwwo75KxA="
  },
  {
    id:2,
    title: "Premium Rental Services",
    description: "Comfortable and reliable vehicles for your journey",
    icon: "🚗",
    route: "/rental-service",
    backgroundImage: "https://media.istockphoto.com/id/471170455/photo/hi-tec-city-building.webp?a=1&b=1&s=612x612&w=0&k=20&c=z0qB6HgA_zRS1n1oOL-Si6t0ND92B48jljIPYyIsDSY="
  }
];

export const tourPackages = [
  {
    id: 1,
    title: "Hyderabad City Tour",
    location: "Telangana",
    duration: "2 Day & 0 Nights",
    rating: 4.8,
    reviewCount: 245,
    price: 350,
    originalPrice: 2500,
    description:
      "A Hyderabad city tour offers a blend of historical monuments like Charminar and Golconda Fort, cultural experiences, and modern attractions.",
    images:  [
    "https://picsum.photos/id/1018/800/600",
    "https://picsum.photos/id/1015/800/600",
    "https://picsum.photos/id/1019/800/600",
    "https://picsum.photos/id/1020/800/600",
    "https://picsum.photos/id/1021/800/600",
  ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 350, maxPersons: 5, description: "Perfect for small families" },
      { id: "7-seater", name: "7-Seater Group", price: 500, maxPersons: 7, description: "Ideal for larger groups" },
      { id: "individual", name: "Individual", price: 350, maxPersons: 1, description: "Solo traveler special" },
    ],
    inclusions: [
      "Bus transportation for pickup, drop-off, and sightseeing",
      "Sightseeing of all places mentioned in the itinerary",
      "Professional tour guide",
      "Complimentary water bottles",
    ],
    exclusions: [
      "Entry tickets to attractions",
      "Food and beverages",
      "Personal expenses",
      "Any activities not mentioned in the itinerary",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Hyderabad Local Sightseeing",
        places: [
          { name: "Birla Mandir", type: "visit", entryFee: { adult: 0, child: 0 }, duration: "45 mins" },
          { name: "Charminar (No Climbing)", type: "visit", duration: "30 mins" },
          { name: "Chowmohalla Palace", type: "visit", entryFee: { adult: 100, child: 40 }, duration: "1 hour" },
          { name: "HEH Nizam Museum", type: "visit", entryFee: { adult: 125, child: 0 }, duration: "1 hour" },
          { name: "Salarjung Museum", type: "visit", entryFee: { adult: 50, child: 20 }, duration: "1.5 hours" },
          { name: "Golconda Fort", type: "visit", entryFee: { adult: 25, child: 0 }, duration: "2 hours" },
          { name: "Hyderabad History in 3D", type: "visit", entryFee: { adult: 130, child: 100 }, duration: "45 mins" },
          { name: "NTR Garden", type: "visit", entryFee: { adult: 20, child: 10 }, duration: "1 hour" },
          { name: "Dr. B R Ambedkar Statue", type: "drive", duration: "15 mins" },
          { name: "Lumbini Park", type: "drive", duration: "20 mins" },
          { name: "Hussain Sagar", type: "drive", duration: "30 mins" },
        ],
      },
      {
        day: "Day 2",
        title: "Hyderabad Local Sightseeing",
        places: [
          { name: "Birla Mandir", type: "visit", entryFee: { adult: 0, child: 0 }, duration: "45 mins" },
          { name: "Charminar (No Climbing)", type: "visit", duration: "30 mins" },
          { name: "Chowmohalla Palace", type: "visit", entryFee: { adult: 100, child: 40 }, duration: "1 hour" },
          { name: "HEH Nizam Museum", type: "visit", entryFee: { adult: 125, child: 0 }, duration: "1 hour" },
          { name: "Salarjung Museum", type: "visit", entryFee: { adult: 50, child: 20 }, duration: "1.5 hours" },
          { name: "Golconda Fort", type: "visit", entryFee: { adult: 25, child: 0 }, duration: "2 hours" },
          { name: "Hyderabad History in 3D", type: "visit", entryFee: { adult: 130, child: 100 }, duration: "45 mins" },
          { name: "NTR Garden", type: "visit", entryFee: { adult: 20, child: 10 }, duration: "1 hour" },
          { name: "Dr. B R Ambedkar Statue", type: "drive", duration: "15 mins" },
          { name: "Lumbini Park", type: "drive", duration: "20 mins" },
          { name: "Hussain Sagar", type: "drive", duration: "30 mins" },
        ],
      },
    ],
    category: "cultural",
    highlights: [
      "Experience serene spiritual views from a beautiful hilltop temple",
      "Explore the lavish history of the Nizams at Chowmahalla Palace",
      "Discover the ancient grandeur of Golconda Fort",
      "World-class artifacts at Salarjung Museum",
      "Enjoy leisure at NTR Gardens and 3D history show",
    ],
    bestTime: "October to March",
    difficulty: "Easy",
    groupSize: "2-15 people",
    languages: ["English", "Hindi", "Telugu"],
    cancellationPolicy: "Free cancellation up to 24 hours before the tour",
  },
  {
    id: 2,
    title: "Ramoji Film City",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.7,
    reviewCount: 180,
    price: 350,
    originalPrice: 2500,
    description:
      "Ramoji Film City is the world's largest film studio complex and a popular tourist destination in Hyderabad, India.",
    images:  [
    "https://picsum.photos/id/1022/800/600",
    "https://picsum.photos/id/1023/800/600",
    "https://picsum.photos/id/1024/800/600",
  ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 350, maxPersons: 5, description: "Perfect for small families" },
      { id: "7-seater", name: "7-Seater Group", price: 500, maxPersons: 7, description: "Ideal for larger groups" },
      { id: "individual", name: "Individual", price: 350, maxPersons: 1, description: "Solo traveler special" },
    ],
    inclusions: ["Transportation to Ramoji Film City", "Entry tickets included", "Guided tour"],
    exclusions: ["Food and beverages", "Personal expenses", "Optional activities"],
    itinerary: [
      {
        day: "Day 1",
        title: "Ramoji Film City Tour",
        places: [
          { name: "Film Studio Tour", type: "visit", duration: "3 hours" },
          { name: "Theme Park", type: "visit", duration: "2 hours" },
          { name: "Live Shows", type: "visit", duration: "1.5 hours" },
        ],
      },
    ],
    category: "entertainment",
    highlights: [
      "Explore the world's largest film studio complex",
      "Enjoy thrilling rides and attractions at the theme park",
      "Witness spectacular live shows and performances",
      "Experience cinematic magic firsthand",
    ],
    bestTime: "October to March",
    difficulty: "Easy",
    groupSize: "1-20 people",
    languages: ["English", "Hindi", "Telugu"],
    cancellationPolicy: "Free cancellation up to 48 hours before the tour",
  },
  {
    id: 3,
    title: "Wonderla",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.9,
    reviewCount: 310,
    price: 875,
    originalPrice: 1000,
    description:
      "Wonderla Amusement Park in Hyderabad offers a mix of water rides, roller coasters, and attractions for kids.",
    images: [
    "https://picsum.photos/id/1025/800/600",
    "https://picsum.photos/id/1026/800/600",
    "https://picsum.photos/id/1027/800/600",
  ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 875, maxPersons: 5, description: "Perfect for small families" },
      { id: "7-seater", name: "7-Seater Group", price: 1200, maxPersons: 7, description: "Ideal for larger groups" },
      { id: "individual", name: "Individual", price: 875, maxPersons: 1, description: "Solo traveler special" },
    ],
    inclusions: ["Transportation to Wonderla", "Entry tickets included", "All rides access"],
    exclusions: ["Food and beverages", "Personal expenses", "Locker charges"],
    itinerary: [
      {
        day: "Day 1",
        title: "Wonderla Adventure",
        places: [
          { name: "Water Rides", type: "visit", duration: "3 hours" },
          { name: "Roller Coasters", type: "visit", duration: "2 hours" },
          { name: "Kids Zone", type: "visit", duration: "1.5 hours" },
        ],
      },
    ],
    category: "entertainment",
    highlights: [
      "Enjoy thrilling water rides and slides",
      "Experience adrenaline-pumping roller coasters",
      "Dedicated fun zone for kids",
      "Full-day entertainment for all ages",
    ],
    bestTime: "All year round (avoid peak summer afternoons)",
    difficulty: "Easy",
    groupSize: "1-10 people",
    languages: ["English", "Hindi", "Telugu"],
    cancellationPolicy: "No cancellation within 24 hours of the tour",
  },
  {
    id: 4,
    title: "Statue of Equality",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.6,
    reviewCount: 150,
    price: 1125,
    originalPrice: 2500,
    description:
      "The Statue of Equality features a vast golden monument dedicated to the medieval guru Sri Ramanuja, with a meditation hall at its base.",
    images:  [
    "https://picsum.photos/id/1028/800/600",
    "https://picsum.photos/id/1029/800/600",
    "https://picsum.photos/id/1030/800/600",
  ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 1125, maxPersons: 5, description: "Perfect for small families" },
      { id: "7-seater", name: "7-Seater Group", price: 1600, maxPersons: 7, description: "Ideal for larger groups" },
      { id: "individual", name: "Individual", price: 1125, maxPersons: 1, description: "Solo traveler special" },
    ],
    inclusions: ["Transportation to Statue of Equality", "Entry tickets included", "Guided tour"],
    exclusions: ["Food and beverages", "Personal expenses", "Optional activities"],
    itinerary: [
      {
        day: "Day 1",
        title: "Statue of Equality Visit",
        places: [
          { name: "Statue viewing", type: "visit", duration: "1.5 hours" },
          { name: "Meditation Hall", type: "visit", duration: "1 hour" },
          { name: "Museum", type: "visit", duration: "1 hour" },
        ],
      },
    ],
    category: "cultural",
    highlights: [
      "Visit the grand Statue of Equality",
      "Experience tranquility in the meditation hall",
      "Learn about Sri Ramanuja's life and teachings",
      "Explore the museum and cultural exhibits",
    ],
    bestTime: "October to March",
    difficulty: "Easy",
    groupSize: "1-15 people",
    languages: ["English", "Hindi", "Telugu"],
    cancellationPolicy: "Free cancellation up to 24 hours before the tour",
  },
  {
    id: 5,
    title: "Anathagiri Hills",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.8,
    reviewCount: 90,
    price: 1125,
    originalPrice: 2000,
    description:
      "Anantha Giri Hills is a scenic, forested peak in Telangana with nature trails, a historic temple, old caves, and lodging and dining options.",
    images:  [
    "https://picsum.photos/id/1031/800/600",
    "https://picsum.photos/id/1032/800/600",
    "https://picsum.photos/id/1033/800/600",
  ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 1125, maxPersons: 5, description: "Perfect for small families" },
      { id: "7-seater", name: "7-Seater Group", price: 1600, maxPersons: 7, description: "Ideal for larger groups" },
      { id: "individual", name: "Individual", price: 1125, maxPersons: 1, description: "Solo traveler special" },
    ],
    inclusions: ["Transportation to Anathagiri Hills", "Nature trail guide", "Temple visit"],
    exclusions: ["Food and beverages", "Personal expenses", "Adventure activities"],
    itinerary: [
      {
        day: "Day 1",
        title: "Anathagiri Hills Adventure",
        places: [
          { name: "Nature Trails", type: "visit", duration: "2 hours" },
          { name: "Historic Temple", type: "visit", duration: "1 hour" },
          { name: "Ancient Caves", type: "visit", duration: "1.5 hours" },
        ],
      },
    ],
    category: "adventure",
    highlights: [
      "Trek through lush green nature trails",
      "Visit an ancient and serene hilltop temple",
      "Explore mysterious old caves",
      "Enjoy panoramic views of the surrounding landscape",
    ],
    bestTime: "July to March",
    difficulty: "Moderate",
    groupSize: "2-10 people",
    languages: ["English", "Hindi", "Telugu"],
    cancellationPolicy: "Free cancellation up to 48 hours before the tour",
  },
  {
    id: 6,
    title: "Yadagirigutta Temple",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.9,
    reviewCount: 200,
    price: 1125,
    originalPrice: 2000,
    description:
      "Yadagirigutta Sri Lakshmi Narasimha Swamy Devasthanam is a Dravidian-style Hindu temple atop a hill, featuring an ornate, towering gopuram entry gate.",
    images: [
    "https://picsum.photos/id/1034/800/600",
    "https://picsum.photos/id/1035/800/600",
    "https://picsum.photos/id/1036/800/600",
  ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 1125, maxPersons: 5, description: "Perfect for small families" },
      { id: "7-seater", name: "7-Seater Group", price: 1600, maxPersons: 7, description: "Ideal for larger groups" },
      { id: "individual", name: "Individual", price: 1125, maxPersons: 1, description: "Solo traveler special" },
    ],
    inclusions: ["Transportation to temple", "Temple darshan", "Guided tour"],
    exclusions: ["Special darshan tickets", "Food and beverages", "Personal expenses"],
    itinerary: [
      {
        day: "Day 1",
        title: "Yadagirigutta Temple Visit",
        places: [
          { name: "Temple Darshan", type: "visit", duration: "2 hours" },
          { name: "Gopuram viewing", type: "visit", duration: "30 mins" },
          { name: "Temple complex tour", type: "visit", duration: "1 hour" },
        ],
      },
    ],
    category: "temple",
    highlights: [
      "Seek blessings at the ancient Sri Lakshmi Narasimha Swamy Devasthanam",
      "Admire the intricate Dravidian architecture and towering gopuram",
      "Experience spiritual tranquility atop the hill",
      "Learn about the temple's rich history and legends",
    ],
    bestTime: "October to March",
    difficulty: "Easy",
    groupSize: "1-15 people",
    languages: ["English", "Hindi", "Telugu"],
    cancellationPolicy: "Free cancellation up to 24 hours before the tour",
  },
  {
    id: 7,
    title: "Srisailam",
    location: "Andhra Pradesh",
    duration: "1 Day & 0 Nights",
    rating: 4.8,
    reviewCount: 120,
    price: 2250,
    originalPrice: 3000,
    description:
      "Srisailam is a pilgrimage town in Andhra Pradesh, India, known for its ancient Sri Mallikarjuna Jyotirlinga temple and scenic surroundings.",
    images: [
    "https://picsum.photos/id/1037/800/600",
    "https://picsum.photos/id/1038/800/600",
    "https://picsum.photos/id/1039/800/600",
  ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 2250, maxPersons: 5, description: "Perfect for small families" },
      { id: "7-seater", name: "7-Seater Group", price: 3200, maxPersons: 7, description: "Ideal for larger groups" },
      { id: "individual", name: "Individual", price: 2250, maxPersons: 1, description: "Solo traveler special" },
    ],
    inclusions: ["Transportation to Srisailam", "Temple darshan", "Scenic viewpoints"],
    exclusions: ["Special darshan tickets", "Food and beverages", "Personal expenses"],
    itinerary: [
      {
        day: "Day 1",
        title: "Srisailam Pilgrimage",
        places: [
          { name: "Mallikarjuna Temple", type: "visit", duration: "3 hours" },
          { name: "Krishna River view", type: "visit", duration: "1 hour" },
          { name: "Patala Ganga", type: "visit", duration: "1 hour" },
        ],
      },
    ],
    category: "temple",
    highlights: [
      "Visit one of the twelve Jyotirlinga shrines of Lord Shiva",
      "Enjoy breathtaking views of the Krishna River",
      "Descend to Patala Ganga for a holy dip",
      "Experience the serene and spiritual atmosphere of Srisailam",
    ],
    bestTime: "October to March",
    difficulty: "Moderate",
    groupSize: "1-10 people",
    languages: ["English", "Hindi", "Telugu"],
    cancellationPolicy: "Free cancellation up to 48 hours before the tour",
  },
  {
    id: 8,
    title: "Nagarjuna Sagar",
    location: "Telangana",
    duration: "1 Day & 0 Nights",
    rating: 4.9,
    reviewCount: 190,
    price: 1125,
    originalPrice: 2000,
    description:
      "Nagarjuna Sagar is known for its massive irrigation and power-generating dam, which is especially popular to visit during the monsoon season.",
    images: [
    "https://picsum.photos/id/1040/800/600",
    "https://picsum.photos/id/1041/800/600",
    "https://picsum.photos/id/1042/800/600",
  ],
    plans: [
      { id: "5-seater", name: "5-Seater Group", price: 1125, maxPersons: 5, description: "Perfect for small families" },
      { id: "7-seater", name: "7-Seater Group", price: 1600, maxPersons: 7, description: "Ideal for larger groups" },
      { id: "individual", name: "Individual", price: 1125, maxPersons: 1, description: "Solo traveler special" },
    ],
    inclusions: ["Transportation to dam", "Dam visit", "Boat ride (if available)"],
    exclusions: ["Food and beverages", "Personal expenses", "Additional activities"],
    itinerary: [
      {
        day: "Day 1",
        title: "Nagarjuna Sagar Dam Visit",
        places: [
          { name: "Dam viewpoint", type: "visit", duration: "1 hour" },
          { name: "Nagarjunakonda Island", type: "visit", duration: "2 hours" },
          { name: "Museum visit", type: "visit", duration: "1 hour" },
        ],
      },
    ],
    category: "dams",
    highlights: [
      "Witness the grandeur of Nagarjuna Sagar Dam",
      "Explore the historical and archaeological sites on Nagarjunakonda Island",
      "Enjoy a scenic boat ride on the reservoir",
      "Visit the museum showcasing Buddhist relics",
    ],
    bestTime: "September to March",
    difficulty: "Easy",
    groupSize: "1-15 people",
    languages: ["English", "Hindi", "Telugu"],
    cancellationPolicy: "Free cancellation up to 24 hours before the tour",
  },
]


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
