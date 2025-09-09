export type City = {
    slug: string;
    name: string;
    country: string;
    tags: string[];
    preferences: string[]; // Nuevas categorías de preferencias de viajeros
    lastUpdated: string;
    score: number;
    summary: string;
    
    // Numbeo API integration
    numbeoCityId?: number; // ID for Numbeo API calls
    
    // Enhanced metrics with real-time data
    metrics: { 
        dayPassFrom: number; 
        coffeeFrom: number; 
        coworkCount: number; 
        bestWifi: string;
        // New fields from Numbeo
        population?: number;
        costOfLivingIndex?: number;
        rentIndex?: number;
        restaurantPriceIndex?: number;
        purchasingPowerIndex?: number;
    };
    
    essentials: {
      esim: { plan: string; price: number; provider: string; hotspot: boolean }[];
      banks: { name: string; fee: string; fx: string; online: boolean }[];
      // Airalo API integration
      airaloCountryCode?: string; // Country code for Airalo API calls
      // Foursquare API integration
      foursquareCountryCode?: string; // Country code for Foursquare API calls
    };
    work: {
      coworks: { name: string; area: string; price: number; hours: string; wifi: string }[];
      cafes: { name: string; area: string; plugs: boolean; wifi: string }[];
    };
    stay: {
      areas: { name: string; vibe: string; priceIndex: string }[];
      deals: { name: string; nights: number; pricePerNight: number; fees: number }[];
    };
    budget: { dailyLow: number; dailyMid: number; sampleBasket: { item: string; price: number }[]; };
    emergency: { embassy: string; emergencyNumbers: string[]; hospitals: { name: string; phone: string }[]; };
};

// Categorías de preferencias disponibles
export const TRAVELER_PREFERENCES = [
    "Ciudades de cuento",      // Arquitectura histórica, calles empedradas
    "Playas increíbles",       // Costa, mar, actividades acuáticas
    "Ciudades entre montañas", // Vistas panorámicas, senderismo
    "Ciudades sin turistas",   // Destinos menos conocidos, auténticos
    "Ciudades tech",           // Escena tecnológica, startups
    "Ciudades culturales",     // Museos, arte, historia
    "Ciudades gastronómicas",  // Comida local, restaurantes
    "Ciudades nocturnas",      // Vida nocturna, bares, fiesta
    "Ciudades tranquilas",     // Ritmo lento, relax
    "Ciudades económicas",     // Bajo costo de vida
    "Ciudades románticas",     // Perfecto para parejas, ambiente íntimo
    "Ciudades históricas",     // Patrimonio mundial, monumentos antiguos
    "Ciudades artísticas",     // Galerías, arte callejero, creatividad
    "Ciudades de aventura",    // Deportes extremos, naturaleza salvaje
    "Ciudades cosmopolitas"    // Diversidad cultural, vida internacional
];
  
export const CITIES: City[] = [
// CIUDADES EXISTENTES
{
    slug: "madrid",
    name: "Madrid",
    country: "España",
    tags: ["capital","wifi","trenes"],
    preferences: ["Ciudades culturales", "Ciudades gastronómicas", "Ciudades nocturnas"],
    lastUpdated: "2025-08-21",
    score: 92,
    summary: "Guía práctica para trabajar y turistear: barrios, day-pass, cafés con enchufes, eSIM y presupuesto.",
    numbeoCityId: 100, // Madrid, Spain
    metrics: { dayPassFrom: 12, coffeeFrom: 2.2, coworkCount: 48, bestWifi: "900 Mbps" },
    essentials: {
    esim: [
        { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
        { plan: "10GB/15d", price: 9.99, provider: "AirFast", hotspot: true },
        { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true },
    ],
    banks: [
        { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
        { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true },
    ],
    airaloCountryCode: "ES", // Spain
    foursquareCountryCode: "ES", // Spain
    },
    work: {
    coworks: [
        { name: "Cowork Gran Vía", area: "Centro", price: 15, hours: "9–19", wifi: "600 Mbps" },
        { name: "Cowork Retiro", area: "Retiro", price: 12, hours: "9–18", wifi: "500 Mbps" },
    ],
    cafes: [
        { name: "Café Productivo", area: "Lavapiés", plugs: true, wifi: "300 Mbps" },
        { name: "Flat-white Studio", area: "Malasaña", plugs: true, wifi: "250 Mbps" },
    ],
    },
    stay: {
    areas: [
        { name: "Chamberí", vibe: "local + tranquilo", priceIndex: "€€" },
        { name: "Lavapiés", vibe: "cultural + bares", priceIndex: "€€" },
        { name: "Centro", vibe: "turístico + ruido", priceIndex: "€€€" },
    ],
    deals: [
        { name: "Airbnb Centro", nights: 7, pricePerNight: 65, fees: 30 },
        { name: "Hotel Atocha", nights: 3, pricePerNight: 85, fees: 0 },
    ],
    },
    budget: {
    dailyLow: 45,
    dailyMid: 85,
    sampleBasket: [
        { item: "Menú del día", price: 12.5 },
        { item: "Metro 10 viajes", price: 12.2 },
        { item: "Café americano", price: 2.2 },
    ],
    },
    emergency: {
    embassy: "Embajada/Consulado: C/ de Serrano, 75",
    emergencyNumbers: ["112 (emergencias)","091 (policía)"],
    hospitals: [{ name: "Hospital General Universitario Gregorio Marañón", phone: "+34 91 586 80 00" }],
    },
},
{
    slug: "valencia",
    name: "Valencia",
    country: "España",
    tags: ["playas", "paella", "ciencia", "moderna", "cultura"],
    preferences: ["Playas increíbles", "Ciudades gastronómicas", "Ciudades culturales", "Ciudades tech"],
    lastUpdated: "2025-01-03",
    score: 88,
    summary: "Ciudad mediterránea con playas urbanas, la mejor paella del mundo, arquitectura futurista y festivales culturales.",
    metrics: {
        dayPassFrom: 10,
        coffeeFrom: 2.0,
        coworkCount: 22,
        bestWifi: "Excellent",
        population: 800000,
        costOfLivingIndex: 65
    },
    essentials: {
        esim: [
            { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
            { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true }
        ],
        banks: [
            { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
            { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Valencia Centro", area: "Centro", price: 14, hours: "9–19", wifi: "600 Mbps" },
            { name: "Spaces Valencia", area: "Ciudad de las Artes", price: 18, hours: "24/7", wifi: "500 Mbps" }
        ],
        cafes: [
            { name: "Café Central", area: "Plaza del Ayuntamiento", plugs: true, wifi: "400 Mbps" },
            { name: "Bluebell Coffee", area: "Ruzafa", plugs: true, wifi: "300 Mbps" }
        ]
    },
    stay: {
        areas: [
            { name: "Ruzafa", vibe: "hipster + gastronomía", priceIndex: "€€" },
            { name: "Centro Histórico", vibe: "tradicional + turístico", priceIndex: "€€" },
            { name: "Ciudad de las Artes", vibe: "moderno + cultural", priceIndex: "€€€" }
        ],
        deals: [
            { name: "Airbnb Ruzafa", nights: 5, pricePerNight: 55, fees: 25 },
            { name: "Hotel Valencia Center", nights: 3, pricePerNight: 75, fees: 0 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 75,
        sampleBasket: [
            { item: "Paella valenciana", price: 15 },
            { item: "Horchata", price: 2.5 },
            { item: "Metro día", price: 4.5 }
        ]
    },
    emergency: {
        embassy: "Consulado: C/ de la Pau, 10",
        emergencyNumbers: ["112 (emergencias)", "091 (policía)"],
        hospitals: [{ name: "Hospital Clínico Universitario", phone: "+34 96 197 30 00" }]
    }
},
{
    slug: "sevilla",
    name: "Sevilla",
    country: "España",
    tags: ["flamenco", "tapas", "historia", "patios", "romántica"],
    preferences: ["Ciudades románticas", "Ciudades culturales", "Ciudades gastronómicas", "Ciudades históricas"],
    lastUpdated: "2025-01-03",
    score: 90,
    summary: "Capital andaluza con flamenco auténtico, tapas legendarias, patios sevillanos y una historia que se respira en cada esquina.",
    metrics: {
        dayPassFrom: 11,
        coffeeFrom: 2.1,
        coworkCount: 18,
        bestWifi: "Good",
        population: 690000,
        costOfLivingIndex: 68
    },
    essentials: {
        esim: [
            { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
            { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true }
        ],
        banks: [
            { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
            { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Sevilla Centro", area: "Centro", price: 15, hours: "9–19", wifi: "500 Mbps" },
            { name: "Impact Hub Sevilla", area: "Triana", price: 16, hours: "8–20", wifi: "400 Mbps" }
        ],
        cafes: [
            { name: "Café Central", area: "Plaza Nueva", plugs: true, wifi: "300 Mbps" },
            { name: "La Cacharrería", area: "Santa Cruz", plugs: true, wifi: "250 Mbps" }
        ]
    },
    stay: {
        areas: [
            { name: "Santa Cruz", vibe: "histórico + romántico", priceIndex: "€€€" },
            { name: "Triana", vibe: "auténtico + flamenco", priceIndex: "€€" },
            { name: "Centro", vibe: "turístico + comercial", priceIndex: "€€" }
        ],
        deals: [
            { name: "Airbnb Santa Cruz", nights: 4, pricePerNight: 70, fees: 20 },
            { name: "Hotel Triana", nights: 3, pricePerNight: 80, fees: 0 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 80,
        sampleBasket: [
            { item: "Tapas (3 platos)", price: 12 },
            { item: "Espectáculo flamenco", price: 25 },
            { item: "Visita catedral", price: 10 }
        ]
    },
    emergency: {
        embassy: "Consulado: C/ de la Constitución, 21",
        emergencyNumbers: ["112 (emergencias)", "091 (policía)"],
        hospitals: [{ name: "Hospital Virgen del Rocío", phone: "+34 95 501 20 00" }]
    }
},
{
    slug: "cuenca",
    name: "Cuenca",
    country: "España",
    tags: ["casas colgadas", "historia", "arte", "montañas", "tranquila"],
    preferences: ["Ciudades de cuento", "Ciudades históricas", "Ciudades tranquilas", "Ciudades entre montañas"],
    lastUpdated: "2025-01-03",
    score: 85,
    summary: "Ciudad medieval suspendida en el aire con las famosas Casas Colgadas, arte abstracto de vanguardia y un casco histórico declarado Patrimonio de la Humanidad.",
    metrics: {
        dayPassFrom: 8,
        coffeeFrom: 1.8,
        coworkCount: 5,
        bestWifi: "Good",
        population: 54000,
        costOfLivingIndex: 58
    },
    essentials: {
        esim: [
            { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
            { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true }
        ],
        banks: [
            { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
            { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Cuenca", area: "Centro", price: 12, hours: "9–18", wifi: "400 Mbps" },
            { name: "Espacio Creativo", area: "Casas Colgadas", price: 15, hours: "9–19", wifi: "300 Mbps" }
        ],
        cafes: [
            { name: "Café del Arte", area: "Plaza Mayor", plugs: true, wifi: "350 Mbps" },
            { name: "La Tasca del Abuelo", area: "Barrio de San Martín", plugs: true, wifi: "250 Mbps" }
        ]
    },
    stay: {
        areas: [
            { name: "Casas Colgadas", vibe: "único + histórico", priceIndex: "€€" },
            { name: "Centro Histórico", vibe: "medieval + cultural", priceIndex: "€€" },
            { name: "Barrio de San Martín", vibe: "auténtico + local", priceIndex: "€" }
        ],
        deals: [
            { name: "Parador de Cuenca", nights: 3, pricePerNight: 120, fees: 15 },
            { name: "Casa Rural Hoz del Huécar", nights: 2, pricePerNight: 80, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 35,
        dailyMid: 65,
        sampleBasket: [
            { item: "Museo de Arte Abstracto", price: 3 },
            { item: "Migas manchegas", price: 8 },
            { item: "Vino de la tierra", price: 4 }
        ]
    },
    emergency: {
        embassy: "Consulado: C/ de la Paz, 8",
        emergencyNumbers: ["112 (emergencias)", "091 (policía)"],
        hospitals: [{ name: "Hospital Virgen de la Luz", phone: "+34 969 17 90 00" }]
    }
},
{
    slug: "ronda",
    name: "Ronda",
    country: "España",
    tags: ["puente", "toro", "montañas", "romántica", "historia"],
    preferences: ["Ciudades románticas", "Ciudades de cuento", "Ciudades entre montañas", "Ciudades históricas"],
    lastUpdated: "2025-01-03",
    score: 87,
    summary: "Ciudad de ensueño dividida por un desfiladero de 100 metros, con el Puente Nuevo, la plaza de toros más antigua y vistas panorámicas de la serranía.",
    metrics: {
        dayPassFrom: 9,
        coffeeFrom: 2.0,
        coworkCount: 3,
        bestWifi: "Fair",
        population: 34000,
        costOfLivingIndex: 62
    },
    essentials: {
        esim: [
            { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
            { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true }
        ],
        banks: [
            { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
            { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Ronda", area: "Centro", price: 13, hours: "9–18", wifi: "350 Mbps" },
            { name: "Espacio Serrano", area: "Barrio de San Francisco", price: 14, hours: "9–19", wifi: "300 Mbps" }
        ],
        cafes: [
            { name: "Café Central", area: "Plaza de España", plugs: true, wifi: "300 Mbps" },
            { name: "La Bodega", area: "Centro", plugs: true, wifi: "250 Mbps" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro Histórico", vibe: "romántico + histórico", priceIndex: "€€" },
            { name: "Barrio de San Francisco", vibe: "tranquilo + local", priceIndex: "€" },
            { name: "La Ciudad", vibe: "noble + monumental", priceIndex: "€€€" }
        ],
        deals: [
            { name: "Hotel Parador de Ronda", nights: 2, pricePerNight: 180, fees: 20 },
            { name: "Casa Rural El Molino", nights: 3, pricePerNight: 90, fees: 12 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 75,
        sampleBasket: [
            { item: "Visita plaza de toros", price: 8 },
            { item: "Rabo de toro", price: 15 },
            { item: "Vino de Ronda", price: 5 }
        ]
    },
    emergency: {
        embassy: "Consulado: C/ de la Bola, 12",
        emergencyNumbers: ["112 (emergencias)", "091 (policía)"],
        hospitals: [{ name: "Hospital de la Serranía", phone: "+34 952 87 40 00" }]
    }
},
{
    slug: "asturias",
    name: "Asturias",
    country: "España",
    tags: ["montañas", "mar", "sidra", "tranquila", "naturaleza"],
    preferences: ["Ciudades tranquilas", "Ciudades entre montañas", "Ciudades sin turistas", "Ciudades de cuento"],
    lastUpdated: "2025-01-03",
    score: 86,
    summary: "Paraíso natural entre montañas y mar Cantábrico, con sidra tradicional, pueblos pesqueros y los Picos de Europa.",
    metrics: {
        dayPassFrom: 9,
        coffeeFrom: 1.8,
        coworkCount: 6,
        bestWifi: "Good",
        population: 1000000,
        costOfLivingIndex: 60
    },
    essentials: {
        esim: [
            { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
            { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true }
        ],
        banks: [
            { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
            { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Asturias", area: "Oviedo", price: 13, hours: "9–18", wifi: "400 Mbps" },
            { name: "Espacio Gijón", area: "Gijón", price: 14, hours: "9–19", wifi: "350 Mbps" }
        ],
        cafes: [
            { name: "Café Central", area: "Oviedo Centro", plugs: true, wifi: "300 Mbps" },
            { name: "La Sidrería", area: "Gijón Puerto", plugs: true, wifi: "250 Mbps" }
        ]
    },
    stay: {
        areas: [
            { name: "Oviedo Centro", vibe: "histórico + cultural", priceIndex: "€€" },
            { name: "Gijón Puerto", vibe: "marítimo + gastronómico", priceIndex: "€€" },
            { name: "Picos de Europa", vibe: "montaña + aventura", priceIndex: "€" }
        ],
        deals: [
            { name: "Hotel de la Reconquista", nights: 2, pricePerNight: 120, fees: 15 },
            { name: "Casa Rural Picos", nights: 3, pricePerNight: 70, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 35,
        dailyMid: 70,
        sampleBasket: [
            { item: "Sidra tradicional", price: 3 },
            { item: "Fabada asturiana", price: 12 },
            { item: "Ruta Picos de Europa", price: 0 }
        ]
    },
    emergency: {
        embassy: "Consulado: C/ de la Independencia, 13",
        emergencyNumbers: ["112 (emergencias)", "091 (policía)"],
        hospitals: [{ name: "Hospital Universitario Central de Asturias", phone: "+34 985 65 80 00" }]
    }
},
{
    slug: "granada",
    name: "Granada",
    country: "España",
    tags: ["alhambra", "flamenco", "tapas", "montañas", "historia"],
    preferences: ["Ciudades históricas", "Ciudades culturales", "Ciudades entre montañas", "Ciudades gastronómicas"],
    lastUpdated: "2025-01-03",
    score: 89,
    summary: "Ciudad morisca con la Alhambra, tapas gratuitas, flamenco en cuevas y vistas a Sierra Nevada.",
    metrics: {
        dayPassFrom: 10,
        coffeeFrom: 2.0,
        coworkCount: 15,
        bestWifi: "Good",
        population: 230000,
        costOfLivingIndex: 65
    },
    essentials: {
        esim: [
            { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
            { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true }
        ],
        banks: [
            { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
            { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Granada", area: "Centro", price: 14, hours: "9–19", wifi: "450 Mbps" },
            { name: "Impact Hub Granada", area: "Realejo", price: 16, hours: "8–20", wifi: "400 Mbps" }
        ],
        cafes: [
            { name: "Café Central", area: "Plaza Nueva", plugs: true, wifi: "350 Mbps" },
            { name: "La Tetera del Bañuelo", area: "Albayzín", plugs: true, wifi: "300 Mbps" }
        ]
    },
    stay: {
        areas: [
            { name: "Albayzín", vibe: "morisco + romántico", priceIndex: "€€" },
            { name: "Realejo", vibe: "judío + histórico", priceIndex: "€€" },
            { name: "Centro", vibe: "comercial + turístico", priceIndex: "€€" }
        ],
        deals: [
            { name: "Parador de Granada", nights: 2, pricePerNight: 200, fees: 20 },
            { name: "Hostal Granada", nights: 3, pricePerNight: 60, fees: 8 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 80,
        sampleBasket: [
            { item: "Alhambra", price: 18 },
            { item: "Tapas (3 platos)", price: 15 },
            { item: "Flamenco en cueva", price: 25 }
        ]
    },
    emergency: {
        embassy: "Consulado: C/ de la Cárcel Baja, 2",
        emergencyNumbers: ["112 (emergencias)", "091 (policía)"],
        hospitals: [{ name: "Hospital Universitario San Cecilio", phone: "+34 958 02 30 00" }]
    }
},
{
    slug: "bilbao",
    name: "Bilbao",
    country: "España",
    tags: ["guggenheim", "gastronomía", "río", "moderna", "cultura"],
    preferences: ["Ciudades culturales", "Ciudades gastronómicas", "Ciudades artísticas", "Ciudades cosmopolitas"],
    lastUpdated: "2025-01-03",
    score: 87,
    summary: "Ciudad vasca transformada con el Guggenheim, gastronomía de vanguardia y arquitectura contemporánea junto al río Nervión.",
    metrics: {
        dayPassFrom: 12,
        coffeeFrom: 2.2,
        coworkCount: 25,
        bestWifi: "Excellent",
        population: 350000,
        costOfLivingIndex: 70
    },
    essentials: {
        esim: [
            { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
            { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true }
        ],
        banks: [
            { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
            { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Bilbao", area: "Indautxu", price: 16, hours: "9–19", wifi: "500 Mbps" },
            { name: "Spaces Bilbao", area: "Abando", price: 18, hours: "8–20", wifi: "450 Mbps" }
        ],
        cafes: [
            { name: "Café Iruña", area: "Plaza Nueva", plugs: true, wifi: "400 Mbps" },
            { name: "La Ribera", area: "Casco Viejo", plugs: true, wifi: "350 Mbps" }
        ]
    },
    stay: {
        areas: [
            { name: "Indautxu", vibe: "moderno + elegante", priceIndex: "€€€" },
            { name: "Casco Viejo", vibe: "tradicional + gastronómico", priceIndex: "€€" },
            { name: "Abando", vibe: "comercial + cultural", priceIndex: "€€" }
        ],
        deals: [
            { name: "Hotel Gran Bilbao", nights: 2, pricePerNight: 150, fees: 18 },
            { name: "Hostal Bilbao", nights: 3, pricePerNight: 75, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 90,
        sampleBasket: [
            { item: "Guggenheim", price: 16 },
            { item: "Pintxos (5 piezas)", price: 18 },
            { item: "Metro día", price: 4.5 }
        ]
    },
    emergency: {
        embassy: "Consulado: C/ de la Gran Vía, 45",
        emergencyNumbers: ["112 (emergencias)", "091 (policía)"],
        hospitals: [{ name: "Hospital de Basurto", phone: "+34 944 00 60 00" }]
    }
},
{
    slug: "córdoba",
    name: "Córdoba",
    country: "España",
    tags: ["mezquita", "patios", "historia", "romántica", "flores"],
    preferences: ["Ciudades románticas", "Ciudades históricas", "Ciudades culturales", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 88,
    summary: "Ciudad de las tres culturas con la Mezquita-Catedral, patios floridos declarados Patrimonio de la Humanidad y calles empedradas.",
    metrics: {
        dayPassFrom: 11,
        coffeeFrom: 2.1,
        coworkCount: 12,
        bestWifi: "Good",
        population: 320000,
        costOfLivingIndex: 63
    },
    essentials: {
        esim: [
            { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
            { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true }
        ],
        banks: [
            { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
            { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Córdoba", area: "Centro", price: 15, hours: "9–19", wifi: "400 Mbps" },
            { name: "Espacio Córdoba", area: "Judería", price: 16, hours: "8–20", wifi: "350 Mbps" }
        ],
        cafes: [
            { name: "Café Central", area: "Plaza de las Tendillas", plugs: true, wifi: "350 Mbps" },
            { name: "La Tetera", area: "Judería", plugs: true, wifi: "300 Mbps" }
        ]
    },
    stay: {
        areas: [
            { name: "Judería", vibe: "histórico + romántico", priceIndex: "€€€" },
            { name: "Centro", vibe: "comercial + cultural", priceIndex: "€€" },
            { name: "San Basilio", vibe: "patios + auténtico", priceIndex: "€€" }
        ],
        deals: [
            { name: "Hotel Hacienda Posada de Vallina", nights: 2, pricePerNight: 180, fees: 20 },
            { name: "Hostal Córdoba", nights: 3, pricePerNight: 80, fees: 12 }
        ]
    },
    budget: {
        dailyLow: 42,
        dailyMid: 82,
        sampleBasket: [
            { item: "Mezquita-Catedral", price: 12 },
            { item: "Salmorejo", price: 8 },
            { item: "Visita patios", price: 8 }
        ]
    },
    emergency: {
        embassy: "Consulado: C/ de la Feria, 15",
        emergencyNumbers: ["112 (emergencias)", "091 (policía)"],
        hospitals: [{ name: "Hospital Universitario Reina Sofía", phone: "+34 957 01 00 00" }]
    }
},
{
    slug: "salamanca",
    name: "Salamanca",
    country: "España",
    tags: ["universidad", "historia", "piedra", "cultura", "estudiantes"],
    preferences: ["Ciudades históricas", "Ciudades culturales", "Ciudades artísticas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 86,
    summary: "Ciudad universitaria dorada con la Universidad más antigua de España, arquitectura plateresca y ambiente estudiantil vibrante.",
    metrics: {
        dayPassFrom: 9,
        coffeeFrom: 2.0,
        coworkCount: 18,
        bestWifi: "Excellent",
        population: 150000,
        costOfLivingIndex: 58
    },
    essentials: {
        esim: [
            { plan: "5GB/7d", price: 5.99, provider: "ExampleSIM", hotspot: true },
            { plan: "20GB/30d", price: 14.99, provider: "RoamGo", hotspot: true }
        ],
        banks: [
            { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
            { name: "Revolut (ej)", fee: "0–€16", fx: "Multi", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Salamanca", area: "Centro", price: 14, hours: "9–19", wifi: "500 Mbps" },
            { name: "Espacio Salamanca", area: "Universidad", price: 15, hours: "8–20", wifi: "450 Mbps" }
        ],
        cafes: [
            { name: "Café Novelty", area: "Plaza Mayor", plugs: true, wifi: "400 Mbps" },
            { name: "Café Central", area: "Rúa Mayor", plugs: true, wifi: "350 Mbps" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro Histórico", vibe: "universitario + histórico", priceIndex: "€€" },
            { name: "Plaza Mayor", vibe: "monumental + cultural", priceIndex: "€€€" },
            { name: "Universidad", vibe: "académico + vibrante", priceIndex: "€€" }
        ],
        deals: [
            { name: "Hotel Rector", nights: 2, pricePerNight: 140, fees: 18 },
            { name: "Hostal Salamanca", nights: 3, pricePerNight: 70, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 38,
        dailyMid: 75,
        sampleBasket: [
            { item: "Universidad", price: 10 },
            { item: "Jamón ibérico", price: 15 },
            { item: "Plaza Mayor", price: 0 }
        ]
    },
    emergency: {
        embassy: "Consulado: C/ de la Compañía, 25",
        emergencyNumbers: ["112 (emergencias)", "091 (policía)"],
        hospitals: [{ name: "Hospital Universitario de Salamanca", phone: "+34 923 29 10 00" }]
    }
},

// NUEVAS CIUDADES DE CUENTO
{
    slug: "hallstatt",
    name: "Hallstatt",
    country: "Austria",
    tags: ["lagos","montañas","historia"],
    preferences: ["Ciudades de cuento", "Ciudades entre montañas", "Ciudades tranquilas"],
    lastUpdated: "2025-08-21",
    score: 95,
    summary: "Pueblo de cuento de hadas junto al lago, Patrimonio de la Humanidad UNESCO, arquitectura alpina perfecta.",
    metrics: { dayPassFrom: 8, coffeeFrom: 3.5, coworkCount: 2, bestWifi: "200 Mbps" },
    essentials: {
    esim: [{ plan: "5GB/7d", price: 7.99, provider: "A1", hotspot: true }],
    banks: [{ name: "Erste Bank", fee: "0–€15", fx: "EUR", online: true }],
    },
    work: {
    coworks: [{ name: "Café Central", area: "Centro", price: 0, hours: "8–18", wifi: "150 Mbps" }],
    cafes: [{ name: "Café Hallstatt", area: "Plaza", plugs: true, wifi: "100 Mbps" }],
    },
    stay: {
    areas: [{ name: "Centro histórico", vibe: "cuento de hadas", priceIndex: "€€€" }],
    deals: [{ name: "Gasthof Hallstatt", nights: 3, pricePerNight: 120, fees: 0 }],
    },
    budget: { dailyLow: 80, dailyMid: 140, sampleBasket: [{ item: "Strudel de manzana", price: 4.5 }] },
    emergency: {
    embassy: "Embajada en Viena",
    emergencyNumbers: ["112"],
    hospitals: [{ name: "Krankenhaus Bad Ischl", phone: "+43 6132 24 01" }],
    },
},



{
    slug: "brugge",
    name: "Brujas",
    country: "Bélgica",
    tags: ["canales","medieval","chocolate"],
    preferences: ["Ciudades de cuento", "Ciudades culturales", "Ciudades tranquilas"],
    lastUpdated: "2025-08-21",
    score: 93,
    summary: "Ciudad medieval perfectamente conservada, canales, arquitectura gótica y chocolate belga.",
    metrics: { dayPassFrom: 8, coffeeFrom: 2.8, coworkCount: 12, bestWifi: "500 Mbps" },
    essentials: {
    esim: [{ plan: "5GB/7d", price: 8.99, provider: "Proximus", hotspot: true }],
    banks: [{ name: "KBC", fee: "0–€12", fx: "EUR", online: true }],
    },
    work: {
    coworks: [{ name: "Bruges Cowork", area: "Centro", price: 18, hours: "9–19", wifi: "400 Mbps" }],
    cafes: [{ name: "Café Vlissinghe", area: "Markt", plugs: true, wifi: "300 Mbps" }],
    },
    stay: {
    areas: [{ name: "Centro histórico", vibe: "medieval + romántico", priceIndex: "€€€" }],
    deals: [{ name: "Hotel B&B", nights: 3, pricePerNight: 110, fees: 0 }],
    },
    budget: { dailyLow: 70, dailyMid: 130, sampleBasket: [{ item: "Waffle belga", price: 3.5 }] },
    emergency: {
    embassy: "Embajada en Bruselas",
    emergencyNumbers: ["112"],
    hospitals: [{ name: "AZ Sint-Jan", phone: "+32 50 45 21 21" }],
    },
},

// NUEVAS CIUDADES CON PLAYAS INCREÍBLES
{
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    tags: ["playas","templos","naturaleza"],
    preferences: ["Playas increíbles", "Ciudades culturales", "Ciudades económicas"],
    lastUpdated: "2025-08-21",
    score: 91,
    summary: "Isla paradisíaca con playas de arena blanca, templos hindúes y cultura balinesa.",
    metrics: { dayPassFrom: 5, coffeeFrom: 1.5, coworkCount: 45, bestWifi: "400 Mbps" },
    essentials: {
    esim: [{ plan: "10GB/30d", price: 8.99, provider: "Telkomsel", hotspot: true }],
    banks: [{ name: "BCA", fee: "0–€5", fx: "IDR", online: true }],
    },
    work: {
    coworks: [{ name: "Dojo Bali", area: "Canggu", price: 12, hours: "24/7", wifi: "300 Mbps" }],
    cafes: [{ name: "Café Organic", area: "Ubud", plugs: true, wifi: "250 Mbps" }],
    },
    stay: {
    areas: [{ name: "Canggu", vibe: "surf + digital nomad", priceIndex: "€€" }],
    deals: [{ name: "Villa Canggu", nights: 7, pricePerNight: 45, fees: 15 }],
    },
    budget: { dailyLow: 25, dailyMid: 55, sampleBasket: [{ item: "Nasi goreng", price: 2.5 }] },
    emergency: {
    embassy: "Embajada en Denpasar",
    emergencyNumbers: ["112"],
    hospitals: [{ name: "BIMC Hospital", phone: "+62 361 761 263" }],
    },
},

{
    slug: "maldives",
    name: "Maldivas",
    country: "Maldivas",
    tags: ["playas","buceo","lujo"],
    preferences: ["Playas increíbles", "Ciudades tranquilas", "Ciudades sin turistas"],
    lastUpdated: "2025-08-21",
    score: 96,
    summary: "Archipiélago de atolones con las playas más cristalinas del mundo, perfecto para buceo y relax.",
    metrics: { dayPassFrom: 20, coffeeFrom: 4.0, coworkCount: 3, bestWifi: "200 Mbps" },
    essentials: {
    esim: [{ plan: "5GB/7d", price: 15.99, provider: "Dhiraagu", hotspot: true }],
    banks: [{ name: "Bank of Maldives", fee: "0–€8", fx: "MVR", online: true }],
    },
    work: {
    coworks: [{ name: "Café Male", area: "Male", price: 0, hours: "8–20", wifi: "150 Mbps" }],
    cafes: [{ name: "Café Male", area: "Male", plugs: true, wifi: "150 Mbps" }],
    },
    stay: {
    areas: [{ name: "Male", vibe: "capital + isla", priceIndex: "€€€" }],
    deals: [{ name: "Guesthouse Male", nights: 3, pricePerNight: 80, fees: 0 }],
    },
    budget: { dailyLow: 120, dailyMid: 250, sampleBasket: [{ item: "Té maldivo", price: 2.0 }] },
    emergency: {
    embassy: "Embajada en Male",
    emergencyNumbers: ["119"],
    hospitals: [{ name: "Indira Gandhi Memorial", phone: "+960 333 5335" }],
    },
},

// NUEVAS CIUDADES ENTRE MONTAÑAS
{
    slug: "interlaken",
    name: "Interlaken",
    country: "Suiza",
    tags: ["alpes","lagos","aventura"],
    preferences: ["Ciudades entre montañas", "Ciudades tranquilas", "Ciudades de cuento"],
    lastUpdated: "2025-08-21",
    score: 94,
    summary: "Pueblo alpino entre dos lagos, vistas panorámicas a Eiger, Mönch y Jungfrau, capital de la aventura.",
    metrics: { dayPassFrom: 25, coffeeFrom: 4.5, coworkCount: 5, bestWifi: "600 Mbps" },
    essentials: {
    esim: [{ plan: "10GB/30d", price: 19.99, provider: "Swisscom", hotspot: true }],
    banks: [{ name: "UBS", fee: "0–€20", fx: "CHF", online: true }],
    },
    work: {
    coworks: [{ name: "Café Central", area: "Centro", price: 0, hours: "7–22", wifi: "400 Mbps" }],
    cafes: [{ name: "Café Schuh", area: "Höheweg", plugs: true, wifi: "300 Mbps" }],
    },
    stay: {
    areas: [{ name: "Centro", vibe: "alpino + turístico", priceIndex: "€€€" }],
    deals: [{ name: "Hotel Alpenblick", nights: 3, pricePerNight: 180, fees: 0 }],
    },
    budget: { dailyLow: 120, dailyMid: 200, sampleBasket: [{ item: "Fondue", price: 25.0 }] },
    emergency: {
    embassy: "Embajada en Berna",
    emergencyNumbers: ["112"],
    hospitals: [{ name: "Spital Interlaken", phone: "+41 33 826 26 26" }],
    },
},

{
    slug: "queenstown",
    name: "Queenstown",
    country: "Nueva Zelanda",
    tags: ["aventura","lagos","deportes"],
    preferences: ["Ciudades entre montañas", "Ciudades sin turistas", "Ciudades tranquilas"],
    lastUpdated: "2025-08-21",
    score: 92,
    summary: "Capital mundial de la aventura, rodeada de montañas nevadas, lagos cristalinos y deportes extremos.",
    metrics: { dayPassFrom: 12, coffeeFrom: 3.5, coworkCount: 8, bestWifi: "500 Mbps" },
    essentials: {
    esim: [{ plan: "10GB/30d", price: 15.99, provider: "Spark", hotspot: true }],
    banks: [{ name: "ANZ", fee: "0–€10", fx: "NZD", online: true }],
    },
    work: {
    coworks: [{ name: "Queenstown Hub", area: "Centro", price: 18, hours: "8–18", wifi: "400 Mbps" }],
    cafes: [{ name: "Café Central", area: "Centro", plugs: true, wifi: "300 Mbps" }],
    },
    stay: {
    areas: [{ name: "Centro", vibe: "aventura + montaña", priceIndex: "€€€" }],
    deals: [{ name: "Hostel Queenstown", nights: 4, pricePerNight: 65, fees: 0 }],
    },
    budget: { dailyLow: 80, dailyMid: 140, sampleBasket: [{ item: "Flat white", price: 4.5 }] },
    emergency: {
    embassy: "Consulado en Queenstown",
    emergencyNumbers: ["111"],
    hospitals: [{ name: "Lakes District Hospital", phone: "+64 3 441 0015" }],
    },
},

// NUEVAS CIUDADES SIN TURISTAS
{
    slug: "luang-prabang",
    name: "Luang Prabang",
    country: "Laos",
    tags: ["templos","monjes","tradición"],
    preferences: ["Ciudades sin turistas", "Ciudades culturales", "Ciudades económicas"],
    lastUpdated: "2025-08-21",
    score: 89,
    summary: "Antigua capital real con templos budistas dorados, ceremonia de los monjes y arquitectura colonial francesa.",
    metrics: { dayPassFrom: 3, coffeeFrom: 1.2, coworkCount: 4, bestWifi: "200 Mbps" },
    essentials: {
    esim: [{ plan: "5GB/15d", price: 5.99, provider: "Unitel", hotspot: true }],
    banks: [{ name: "BCEL", fee: "0–€3", fx: "LAK", online: true }],
    },
    work: {
    coworks: [{ name: "Café Joma", area: "Centro", price: 0, hours: "7–21", wifi: "150 Mbps" }],
    cafes: [{ name: "Café Joma", area: "Centro", plugs: true, wifi: "150 Mbps" }],
    },
    stay: {
    areas: [{ name: "Centro histórico", vibe: "templario + colonial", priceIndex: "€" }],
    deals: [{ name: "Guesthouse Wat Xieng", nights: 5, pricePerNight: 25, fees: 5 }],
    },
    budget: { dailyLow: 20, dailyMid: 45, sampleBasket: [{ item: "Café laosiano", price: 1.0 }] },
    emergency: {
    embassy: "Embajada en Vientiane",
    emergencyNumbers: ["1191"],
    hospitals: [{ name: "Provincial Hospital", phone: "+856 71 254 025" }],
    },
},

// NUEVAS CIUDADES TECH
{
    slug: "singapore",
    name: "Singapur",
    country: "Singapur",
    tags: ["tech","futurista","startups"],
    preferences: ["Ciudades tech", "Ciudades gastronómicas", "Ciudades culturales"],
    lastUpdated: "2025-08-21",
    score: 95,
    summary: "Ciudad-estado futurista, hub tecnológico de Asia, arquitectura vanguardista y ecosistema de startups.",
    metrics: { dayPassFrom: 18, coffeeFrom: 4.0, coworkCount: 85, bestWifi: "1.2 Gbps" },
    essentials: {
    esim: [{ plan: "10GB/30d", price: 12.99, provider: "Singtel", hotspot: true }],
    banks: [{ name: "DBS", fee: "0–€8", fx: "SGD", online: true }],
    },
    work: {
    coworks: [{ name: "WeWork Marina Bay", area: "Marina Bay", price: 25, hours: "24/7", wifi: "800 Mbps" }],
    cafes: [{ name: "Café Kith", area: "Orchard", plugs: true, wifi: "400 Mbps" }],
    },
    stay: {
    areas: [{ name: "Marina Bay", vibe: "futurista + lujo", priceIndex: "€€€€" }],
    deals: [{ name: "Hotel Marina Bay", nights: 3, pricePerNight: 300, fees: 50 }],
    },
    budget: { dailyLow: 100, dailyMid: 180, sampleBasket: [{ item: "Laksa", price: 8.0 }] },
    emergency: {
    embassy: "Embajada en Singapur",
    emergencyNumbers: ["995"],
    hospitals: [{ name: "Singapore General Hospital", phone: "+65 6222 3322" }],
    },
},

// NUEVAS CIUDADES GASTRONÓMICAS
{
    slug: "tokyo",
    name: "Tokio",
    country: "Japón",
    tags: ["sushi","ramen","tecnología"],
    preferences: ["Ciudades gastronómicas", "Ciudades tech", "Ciudades culturales"],
    lastUpdated: "2025-08-21",
    score: 96,
    summary: "Capital gastronómica del mundo, desde sushi de 3 estrellas Michelin hasta ramen callejero, tecnología punta.",
    metrics: { dayPassFrom: 20, coffeeFrom: 3.5, coworkCount: 120, bestWifi: "1 Gbps" },
    essentials: {
    esim: [{ plan: "10GB/30d", price: 18.99, provider: "NTT Docomo", hotspot: true }],
    banks: [{ name: "MUFG", fee: "0–€12", fx: "JPY", online: true }],
    },
    work: {
    coworks: [{ name: "WeWork Shibuya", area: "Shibuya", price: 28, hours: "24/7", wifi: "800 Mbps" }],
    cafes: [{ name: "Blue Bottle Coffee", area: "Ginza", plugs: true, wifi: "500 Mbps" }],
    },
    stay: {
    areas: [{ name: "Shibuya", vibe: "joven + tech", priceIndex: "€€€" }],
    deals: [{ name: "Hotel Shibuya", nights: 4, pricePerNight: 120, fees: 20 }],
    },
    budget: { dailyLow: 80, dailyMid: 150, sampleBasket: [{ item: "Ramen", price: 12.0 }] },
    emergency: {
    embassy: "Embajada en Tokio",
    emergencyNumbers: ["110", "119"],
    hospitals: [{ name: "Tokyo Medical Center", phone: "+81 3 3444 1181" }],
    },
},

// NUEVAS CIUDADES NOCTURNAS
{
    slug: "bangkok",
    name: "Bangkok",
    country: "Tailandia",
    tags: ["vida nocturna","templos","street food"],
    preferences: ["Ciudades nocturnas", "Ciudades gastronómicas", "Ciudades económicas"],
    lastUpdated: "2025-08-21",
    score: 90,
    summary: "Ciudad que nunca duerme, templos dorados, street food legendario y vida nocturna vibrante.",
    metrics: { dayPassFrom: 8, coffeeFrom: 2.0, coworkCount: 35, bestWifi: "600 Mbps" },
    essentials: {
    esim: [{ plan: "10GB/30d", price: 9.99, provider: "AIS", hotspot: true }],
    banks: [{ name: "Bangkok Bank", fee: "0–€5", fx: "THB", online: true }],
    },
    work: {
    coworks: [{ name: "Hubba Bangkok", area: "Sukhumvit", price: 15, hours: "24/7", wifi: "400 Mbps" }],
    cafes: [{ name: "Café Amazon", area: "Siam", plugs: true, wifi: "300 Mbps" }],
    },
    stay: {
    areas: [{ name: "Sukhumvit", vibe: "expat + moderno", priceIndex: "€€" }],
    deals: [{ name: "Hotel Sukhumvit", nights: 5, pricePerNight: 55, fees: 10 }],
    },
    budget: { dailyLow: 35, dailyMid: 70, sampleBasket: [{ item: "Pad thai", price: 3.5 }] },
    emergency: {
    embassy: "Embajada en Bangkok",
    emergencyNumbers: ["191"],
    hospitals: [{ name: "Bangkok Hospital", phone: "+66 2 310 3000" }],
    },
},

// NUEVAS CIUDADES TRANQUILAS


// NUEVAS CIUDADES ECONÓMICAS
{
    slug: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    tags: ["historia","street food","cultura"],
    preferences: ["Ciudades económicas", "Ciudades gastronómicas", "Ciudades culturales"],
    lastUpdated: "2025-08-21",
    score: 88,
    summary: "Capital histórica con barrio antiguo laberíntico, street food increíble y costos ultra bajos.",
    metrics: { dayPassFrom: 4, coffeeFrom: 1.0, coworkCount: 25, bestWifi: "400 Mbps" },
    essentials: {
    esim: [{ plan: "10GB/30d", price: 7.99, provider: "Viettel", hotspot: true }],
    banks: [{ name: "Vietcombank", fee: "0–€3", fx: "VND", online: true }],
    },
    work: {
    coworks: [{ name: "Hanoi Hub", area: "Old Quarter", price: 8, hours: "9–19", wifi: "300 Mbps" }],
    cafes: [{ name: "Café Giang", area: "Old Quarter", plugs: true, wifi: "250 Mbps" }],
    },
    stay: {
    areas: [{ name: "Old Quarter", vibe: "histórico + caótico", priceIndex: "€" }],
    deals: [{ name: "Hostel Old Quarter", nights: 5, pricePerNight: 20, fees: 5 }],
    },
    budget: { dailyLow: 18, dailyMid: 40, sampleBasket: [{ item: "Pho", price: 2.0 }] },
    emergency: {
    embassy: "Embajada en Hanoi",
    emergencyNumbers: ["113"],
    hospitals: [{ name: "Bach Mai Hospital", phone: "+84 24 3869 3731" }],
    },
},

// CIUDADES EXISTENTES CONTINUAN...
{
    slug: "lisboa",
    name: "Lisboa",
    country: "Portugal",
    tags: ["oceano","colinas","cafés"],
    preferences: ["Ciudades de cuento", "Playas increíbles", "Ciudades entre montañas"],
    lastUpdated: "2025-08-21",
    score: 89,
    summary: "Bairros con encanto, day-pass, cafés con vista y eSIM/transferencias para EU.",
    metrics: { dayPassFrom: 15, coffeeFrom: 1.8, coworkCount: 27, bestWifi: "700 Mbps" },
    essentials: {
    esim: [
        { plan: "5GB/7d", price: 5.49, provider: "ExampleSIM", hotspot: true },
        { plan: "20GB/30d", price: 13.99, provider: "RoamGo", hotspot: true },
    ],
    banks: [{ name: "ActivoBank (ej)", fee: "0–€5", fx: "EUR", online: true }],
    },
    work: {
    coworks: [{ name: "Cowork Baixa", area: "Baixa", price: 15, hours: "9–18", wifi: "500 Mbps" }],
    cafes: [{ name: "Café Alfama", area: "Alfama", plugs: true, wifi: "150 Mbps" }],
    },
    stay: {
    areas: [
        { name: "Alfama", vibe: "histórico + escaleras", priceIndex: "€€" },
        { name: "Cais do Sodré", vibe: "nocturno", priceIndex: "€€€" },
    ],
    deals: [{ name: "Estudio Alfama", nights: 5, pricePerNight: 70, fees: 25 }],
    },
    budget: {
    dailyLow: 40, dailyMid: 78,
    sampleBasket: [
        { item: "Bica (espresso)", price: 1.2 },
        { item: "Pastel de nata", price: 1.3 },
    ],
    },
    emergency: {
    embassy: "Consulado en Lisboa: Av. da Liberdade",
    emergencyNumbers: ["112 (emergencias)"],
    hospitals: [{ name: "Hospital de Santa Maria", phone: "+351 21 780 50 00" }],
    },
},

// ... resto de ciudades existentes
{
    slug: "barcelona",
    name: "Barcelona",
    country: "España",
    tags: ["playa","tech","wifi"],
    preferences: ["Playas increíbles", "Ciudades tech", "Ciudades culturales"],
    lastUpdated: "2025-08-21",
    score: 91,
    summary: "Coworks con vista, cafés third-wave, barrios con mar y transporte conectado.",
    metrics: { dayPassFrom: 15, coffeeFrom: 2.1, coworkCount: 52, bestWifi: "1 Gbps" },
    essentials: {
    esim: [
        { plan: "5GB/7d", price: 6.49, provider: "ExampleSIM", hotspot: true },
        { plan: "15GB/30d", price: 12.99, provider: "AirFast", hotspot: true },
    ],
    banks: [
        { name: "N26 (ej)", fee: "0–€9", fx: "EUR/USD/GBP", online: true },
        { name: "Wise (ej)", fee: "0–€7", fx: "Multi", online: true },
    ],
    },
    work: {
    coworks: [
        { name: "BCN Tech Hub", area: "Poblenou", price: 18, hours: "9–19", wifi: "700 Mbps" },
        { name: "Cowork Gòtic", area: "Gòtic", price: 16, hours: "9–18", wifi: "500 Mbps" },
    ],
    cafes: [
        { name: "Flat White BCN", area: "Eixample", plugs: true, wifi: "300 Mbps" },
        { name: "Nomad Café", area: "Born", plugs: true, wifi: "250 Mbps" },
    ],
    },
    stay: {
    areas: [
        { name: "Gràcia", vibe: "bohemio + plazas", priceIndex: "€€" },
        { name: "Poblenou", vibe: "playa + tech", priceIndex: "€€€" },
        { name: "Eixample", vibe: "central + modernista", priceIndex: "€€€" },
    ],
    deals: [
        { name: "Apto Poblenou", nights: 7, pricePerNight: 85, fees: 30 },
        { name: "Hostal Gràcia", nights: 4, pricePerNight: 60, fees: 0 },
    ],
    },
    budget: {
    dailyLow: 50, dailyMid: 92,
    sampleBasket: [
        { item: "Menú del día", price: 13.5 },
        { item: "T-Usual (día)", price: 4.5 },
        { item: "Café latte", price: 2.5 },
    ],
    },
    emergency: {
    embassy: "Embajada/Consulado en Barcelona: Av. Diagonal",
    emergencyNumbers: ["112 (emergencias)"],
    hospitals: [{ name: "Hospital Clínic de Barcelona", phone: "+34 93 227 54 00" }],
    },
},

// NUEVAS CIUDADES ROMÁNTICAS Y DESTINOS IMPORTANTES
{
    slug: "paris",
    name: "París",
    country: "Francia",
    tags: ["romántica", "arte", "cultura", "historia", "gastronomía"],
    preferences: ["Ciudades románticas", "Ciudades culturales", "Ciudades gastronómicas", "Ciudades artísticas", "Ciudades históricas"],
    lastUpdated: "2025-01-03",
    score: 95,
    summary: "La ciudad del amor y la luz, con arquitectura icónica, museos mundiales y una atmósfera romántica incomparable.",
    metrics: {
        dayPassFrom: 25,
        coffeeFrom: 4,
        coworkCount: 45,
        bestWifi: "Excellent",
        population: 2161000,
        costOfLivingIndex: 85
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Louvre", area: "1er", price: 35, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Opéra", area: "9ème", price: 30, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café de Flore", area: "Saint-Germain", plugs: true, wifi: "Good" },
            { name: "Ten Belles", area: "Marais", plugs: true, wifi: "Excellent" }
        ]
    },
    stay: {
        areas: [
            { name: "Marais", vibe: "Historic & trendy", priceIndex: "High" },
            { name: "Saint-Germain", vibe: "Intellectual & chic", priceIndex: "Very High" },
            { name: "Belleville", vibe: "Artistic & affordable", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel des Grands Boulevards", nights: 3, pricePerNight: 180, fees: 15 },
            { name: "Mama Shelter", nights: 2, pricePerNight: 120, fees: 8 }
        ]
    },
    budget: {
        dailyLow: 60,
        dailyMid: 120,
        sampleBasket: [
            { item: "Croissant", price: 2 },
            { item: "Metro ticket", price: 2 },
            { item: "Museum entry", price: 15 },
            { item: "Dinner for two", price: 80 }
        ]
    },
    emergency: {
        embassy: "Embajada de España: 22 Avenue Marceau",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "Hôpital Cochin", phone: "+33 1 58 41 41 41" }]
    }
},
{
    slug: "lyon",
    name: "Lyon",
    country: "Francia",
    tags: ["gastronomía", "historia", "romántica", "cultura", "ríos"],
    preferences: ["Ciudades románticas", "Ciudades gastronómicas", "Ciudades culturales", "Ciudades históricas"],
    lastUpdated: "2025-01-03",
    score: 89,
    summary: "Capital gastronómica de Francia con bouchons tradicionales, arquitectura renacentista y la confluencia de dos ríos.",
    metrics: {
        dayPassFrom: 22,
        coffeeFrom: 3.5,
        coworkCount: 28,
        bestWifi: "Excellent",
        population: 515000,
        costOfLivingIndex: 78
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Lyon", area: "Presqu'île", price: 32, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Lyon", area: "Part-Dieu", price: 28, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café 203", area: "Vieux Lyon", plugs: true, wifi: "Good" },
            { name: "Slake Coffee", area: "Croix-Rousse", plugs: true, wifi: "Excellent" }
        ]
    },
    stay: {
        areas: [
            { name: "Vieux Lyon", vibe: "Historic & romantic", priceIndex: "High" },
            { name: "Presqu'île", vibe: "Central & shopping", priceIndex: "High" },
            { name: "Croix-Rousse", vibe: "Bohemian & authentic", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel des Celestins", nights: 2, pricePerNight: 160, fees: 12 },
            { name: "Aparthotel Adagio", nights: 3, pricePerNight: 95, fees: 8 }
        ]
    },
    budget: {
        dailyLow: 55,
        dailyMid: 110,
        sampleBasket: [
            { item: "Bouchon lyonnais", price: 25 },
            { item: "Metro ticket", price: 2 },
            { item: "Museum entry", price: 12 },
            { item: "Dinner for two", price: 70 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Lyon: 22 Rue de la République",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "Hôpital de la Croix-Rousse", phone: "+33 4 72 07 10 00" }]
    }
},
{
    slug: "nice",
    name: "Niza",
    country: "Francia",
    tags: ["playas", "costa azul", "romántica", "arte", "moda"],
    preferences: ["Ciudades románticas", "Playas increíbles", "Ciudades culturales", "Ciudades artísticas"],
    lastUpdated: "2025-01-03",
    score: 91,
    summary: "Perla de la Costa Azul con playas de guijarros, paseo marítimo legendario y arte moderno de clase mundial.",
    metrics: {
        dayPassFrom: 24,
        coffeeFrom: 3.8,
        coworkCount: 20,
        bestWifi: "Good",
        population: 340000,
        costOfLivingIndex: 82
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Nice", area: "Promenade des Anglais", price: 35, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Nice", area: "Vieux Nice", price: 30, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café de Turin", area: "Place Garibaldi", plugs: true, wifi: "Good" },
            { name: "Le Café des Artistes", area: "Vieux Nice", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Vieux Nice", vibe: "Historic & authentic", priceIndex: "High" },
            { name: "Promenade des Anglais", vibe: "Beachfront & luxury", priceIndex: "Very High" },
            { name: "Cimiez", vibe: "Quiet & residential", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Negresco", nights: 2, pricePerNight: 500, fees: 30 },
            { name: "Hotel Windsor", nights: 3, pricePerNight: 180, fees: 15 }
        ]
    },
    budget: {
        dailyLow: 65,
        dailyMid: 130,
        sampleBasket: [
            { item: "Socca (street food)", price: 3 },
            { item: "Beach day", price: 20 },
            { item: "MAMAC museum", price: 10 },
            { item: "Dinner for two", price: 90 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Niza: 165 Promenade des Anglais",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "Hôpital Pasteur", phone: "+33 4 92 03 77 77" }]
    }
},
{
    slug: "annecy",
    name: "Annecy",
    country: "Francia",
    tags: ["lago", "montañas", "romántica", "tranquila", "cuento"],
    preferences: ["Ciudades de cuento", "Ciudades románticas", "Ciudades tranquilas", "Ciudades entre montañas"],
    lastUpdated: "2025-01-03",
    score: 89,
    summary: "La 'Venecia de los Alpes' con canales medievales, lago turquesa, castillo del siglo XII y vistas panorámicas de montañas nevadas.",
    metrics: {
        dayPassFrom: 20,
        coffeeFrom: 3.2,
        coworkCount: 12,
        bestWifi: "Good",
        population: 125000,
        costOfLivingIndex: 75
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Annecy", area: "Vieille Ville", price: 25, hours: "9-19", wifi: "Good" },
            { name: "Spaces Annecy", area: "Centre", price: 28, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café des Arts", area: "Vieille Ville", plugs: true, wifi: "Good" },
            { name: "Le Petit Café", area: "Quai de l'Évêché", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Vieille Ville", vibe: "Medieval & romantic", priceIndex: "High" },
            { name: "Quai de l'Évêché", vibe: "Lakefront & peaceful", priceIndex: "High" },
            { name: "Centre", vibe: "Modern & convenient", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hôtel du Palais de l'Isle", nights: 2, pricePerNight: 180, fees: 15 },
            { name: "Aparthotel Adagio", nights: 3, pricePerNight: 110, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 50,
        dailyMid: 95,
        sampleBasket: [
            { item: "Boat tour", price: 15 },
            { item: "Castle entry", price: 8 },
            { item: "Fondue savoyarde", price: 25 },
            { item: "Bike rental", price: 20 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Lyon: 22 Rue de la République",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "Centre Hospitalier Annecy", phone: "+33 4 50 63 63 63" }]
    }
},
{
    slug: "colmar",
    name: "Colmar",
    country: "Francia",
    tags: ["alsacia", "cuento", "vino", "romántica", "historia"],
    preferences: ["Ciudades de cuento", "Ciudades románticas", "Ciudades históricas", "Ciudades gastronómicas"],
    lastUpdated: "2025-01-03",
    score: 88,
    summary: "Pueblo de cuento de hadas en Alsacia con casas de entramado de madera, canales del siglo XVII y la ruta del vino alsaciano.",
    metrics: {
        dayPassFrom: 18,
        coffeeFrom: 3.0,
        coworkCount: 8,
        bestWifi: "Good",
        population: 68000,
        costOfLivingIndex: 72
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Colmar", area: "Petite Venise", price: 22, hours: "9-18", wifi: "Good" },
            { name: "Espace de Travail", area: "Centre", price: 25, hours: "8-19", wifi: "Good" }
        ],
        cafes: [
            { name: "Café de la Petite Venise", area: "Petite Venise", plugs: true, wifi: "Good" },
            { name: "Le Comptoir", area: "Place des 6 Montagnes", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Petite Venise", vibe: "Fairytale & canals", priceIndex: "High" },
            { name: "Centre Historique", vibe: "Medieval & authentic", priceIndex: "Medium-High" },
            { name: "Quartier des Tanneurs", vibe: "Traditional & quiet", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hôtel Le Maréchal", nights: 2, pricePerNight: 160, fees: 12 },
            { name: "Aparthotel Adagio", nights: 3, pricePerNight: 95, fees: 8 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 85,
        sampleBasket: [
            { item: "Wine tasting", price: 20 },
            { item: "Boat tour", price: 12 },
            { item: "Choucroute garnie", price: 18 },
            { item: "Museum entry", price: 8 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Estrasburgo: 6 Rue de la Nuée-Bleue",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "Centre Hospitalier de Colmar", phone: "+33 3 89 12 40 00" }]
    }
},
{
    slug: "strasbourg",
    name: "Estrasburgo",
    country: "Francia",
    tags: ["alsacia", "europa", "canales", "historia", "romántica"],
    preferences: ["Ciudades románticas", "Ciudades históricas", "Ciudades culturales", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 87,
    summary: "Capital de Alsacia y sede del Parlamento Europeo, con casas de entramado de madera, canales y la catedral gótica más alta de Europa.",
    metrics: {
        dayPassFrom: 20,
        coffeeFrom: 3.3,
        coworkCount: 22,
        bestWifi: "Good",
        population: 280000,
        costOfLivingIndex: 75
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Strasbourg", area: "Grande Île", price: 30, hours: "24/7", wifi: "Good" },
            { name: "Spaces Strasbourg", area: "Centre", price: 28, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Bretelles", area: "Grande Île", plugs: true, wifi: "Good" },
            { name: "Le Café des Artistes", area: "Petite France", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Grande Île", vibe: "Historic heart & UNESCO", priceIndex: "High" },
            { name: "Petite France", vibe: "Medieval & canals", priceIndex: "High" },
            { name: "Centre", vibe: "Modern & European", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Cour du Corbeau", nights: 2, pricePerNight: 160, fees: 15 },
            { name: "Aparthotel Adagio", nights: 3, pricePerNight: 100, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 50,
        dailyMid: 95,
        sampleBasket: [
            { item: "Cathedral entry", price: 0 },
            { item: "Boat tour", price: 18 },
            { item: "Choucroute garnie", price: 20 },
            { item: "Tram pass", price: 4 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Estrasburgo: 6 Rue de la Nuée-Bleue",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "Hôpital Civil", phone: "+33 3 88 11 67 68" }]
    }
},
{
    slug: "avignon",
    name: "Aviñón",
    country: "Francia",
    tags: ["provenza", "palacio", "historia", "romántica", "arte"],
    preferences: ["Ciudades románticas", "Ciudades históricas", "Ciudades culturales", "Ciudades artísticas"],
    lastUpdated: "2025-01-03",
    score: 86,
    summary: "Ciudad papal medieval con el Palacio de los Papas, puente legendario y festival de teatro más importante del mundo francófono.",
    metrics: {
        dayPassFrom: 19,
        coffeeFrom: 3.1,
        coworkCount: 10,
        bestWifi: "Good",
        population: 92000,
        costOfLivingIndex: 72
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Avignon", area: "Centre", price: 24, hours: "9-19", wifi: "Good" },
            { name: "Espace de Travail", area: "Palais", price: 26, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café de la Place", area: "Place de l'Horloge", plugs: true, wifi: "Good" },
            { name: "Le Petit Café", area: "Rue de la République", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centre Historique", vibe: "Medieval & papal", priceIndex: "High" },
            { name: "Palais des Papes", vibe: "Historic & monumental", priceIndex: "High" },
            { name: "Rocher des Doms", vibe: "Panoramic & peaceful", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel de l'Europe", nights: 2, pricePerNight: 140, fees: 15 },
            { name: "Aparthotel Adagio", nights: 3, pricePerNight: 90, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 85,
        sampleBasket: [
            { item: "Palace entry", price: 12 },
            { item: "Wine tasting", price: 25 },
            { item: "Bridge visit", price: 5 },
            { item: "Local bus", price: 3 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Marsella: 362 Avenue du Prado",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "Centre Hospitalier Avignon", phone: "+33 4 32 75 33 33" }]
    }
},
{
    slug: "bordeaux",
    name: "Burdeos",
    country: "Francia",
    tags: ["vino", "arquitectura", "gastronomía", "río", "cultura"],
    preferences: ["Ciudades gastronómicas", "Ciudades culturales", "Ciudades artísticas", "Ciudades románticas"],
    lastUpdated: "2025-01-03",
    score: 88,
    summary: "Capital mundial del vino con arquitectura neoclásica, gastronomía de vanguardia y el mayor espejo de agua urbano del mundo.",
    metrics: {
        dayPassFrom: 21,
        coffeeFrom: 3.4,
        coworkCount: 35,
        bestWifi: "Excellent",
        population: 260000,
        costOfLivingIndex: 78
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Bordeaux", area: "Centre", price: 32, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Bordeaux", area: "Quais", price: 30, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café de la Presse", area: "Place de la Bourse", plugs: true, wifi: "Good" },
            { name: "Le Comptoir", area: "Rue Sainte-Catherine", plugs: true, wifi: "Excellent" }
        ]
    },
    stay: {
        areas: [
            { name: "Centre Historique", vibe: "Neoclassical & elegant", priceIndex: "High" },
            { name: "Quais", vibe: "Riverside & modern", priceIndex: "High" },
            { name: "Saint-Pierre", vibe: "Historic & authentic", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel de la Tour Intendance", nights: 2, pricePerNight: 180, fees: 18 },
            { name: "Aparthotel Adagio", nights: 3, pricePerNight: 110, fees: 12 }
        ]
    },
    budget: {
        dailyLow: 55,
        dailyMid: 100,
        sampleBasket: [
            { item: "Wine tour", price: 35 },
            { item: "Canelés", price: 3 },
            { item: "Tram pass", price: 5 },
            { item: "Dinner for two", price: 80 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Burdeos: 3 Cours de l'Intendance",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "CHU de Bordeaux", phone: "+33 5 57 82 11 11" }]
    }
},
{
    slug: "toulouse",
    name: "Toulouse",
    country: "Francia",
    tags: ["rosa", "espacio", "tecnología", "cultura", "juvenil"],
    preferences: ["Ciudades tech", "Ciudades culturales", "Ciudades cosmopolitas", "Ciudades artísticas"],
    lastUpdated: "2025-01-03",
    score: 85,
    summary: "La 'Ciudad Rosa' con arquitectura de ladrillo, capital europea del espacio, universidades prestigiosas y ambiente juvenil vibrante.",
    metrics: {
        dayPassFrom: 20,
        coffeeFrom: 3.2,
        coworkCount: 28,
        bestWifi: "Excellent",
        population: 480000,
        costOfLivingIndex: 75
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Toulouse", area: "Centre", price: 30, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Toulouse", area: "Capitole", price: 28, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café du Théâtre", area: "Place du Capitole", plugs: true, wifi: "Good" },
            { name: "Le Florida", area: "Place Wilson", plugs: true, wifi: "Excellent" }
        ]
    },
    stay: {
        areas: [
            { name: "Centre", vibe: "Historic & pink", priceIndex: "Medium" },
            { name: "Capitole", vibe: "Main square & elegant", priceIndex: "High" },
            { name: "Saint-Cyprien", vibe: "Student & affordable", priceIndex: "Low" }
        ],
        deals: [
            { name: "Grand Hôtel de l'Opéra", nights: 2, pricePerNight: 160, fees: 18 },
            { name: "Aparthotel Adagio", nights: 3, pricePerNight: 95, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 50,
        dailyMid: 90,
        sampleBasket: [
            { item: "Space museum", price: 12 },
            { item: "Cassoulet", price: 18 },
            { item: "Metro pass", price: 4 },
            { item: "Local wine", price: 8 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Toulouse: 1 Rue de la Fonderie",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "CHU de Toulouse", phone: "+33 5 61 32 25 33" }]
    }
},
{
    slug: "biarritz",
    name: "Biarritz",
    country: "Francia",
    tags: ["playas", "surf", "lujo", "gastronomía", "atlántico"],
    preferences: ["Playas increíbles", "Ciudades románticas", "Ciudades gastronómicas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 87,
    summary: "Elegante ciudad costera del Atlántico con playas de surf legendarias, gastronomía vasca y arquitectura Belle Époque.",
    metrics: {
        dayPassFrom: 23,
        coffeeFrom: 3.6,
        coworkCount: 15,
        bestWifi: "Good",
        population: 25000,
        costOfLivingIndex: 85
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "Orange", hotspot: true },
            { plan: "3GB/30days", price: 20, provider: "SFR", hotspot: true }
        ],
        banks: [
            { name: "BNP Paribas", fee: "Free", fx: "Good", online: true },
            { name: "Credit Agricole", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Biarritz", area: "Centre", price: 26, hours: "9-19", wifi: "Good" },
            { name: "Espace de Travail", area: "Plage", price: 28, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café de la Grande Plage", area: "Grande Plage", plugs: true, wifi: "Good" },
            { name: "Le Comptoir", area: "Centre", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centre", vibe: "Elegant & Belle Époque", priceIndex: "Very High" },
            { name: "Grande Plage", vibe: "Beachfront & luxury", priceIndex: "Very High" },
            { name: "Port des Pêcheurs", vibe: "Authentic & local", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hôtel du Palais", nights: 2, pricePerNight: 400, fees: 30 },
            { name: "Aparthotel Adagio", nights: 3, pricePerNight: 150, fees: 15 }
        ]
    },
    budget: {
        dailyLow: 60,
        dailyMid: 120,
        sampleBasket: [
            { item: "Surf lesson", price: 45 },
            { item: "Axoa de veau", price: 22 },
            { item: "Beach day", price: 15 },
            { item: "Local bus", price: 3 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Bayona: 1 Rue des Gouverneurs",
        emergencyNumbers: ["112", "15 (médico)", "17 (policía)"],
        hospitals: [{ name: "Centre Hospitalier de la Côte Basque", phone: "+33 5 59 44 35 35" }]
    }
},
{
    slug: "venice",
    name: "Venecia",
    country: "Italia",
    tags: ["romántica", "canales", "historia", "arte", "única"],
    preferences: ["Ciudades románticas", "Ciudades de cuento", "Ciudades históricas", "Ciudades artísticas"],
    lastUpdated: "2025-01-03",
    score: 92,
    summary: "Ciudad flotante única en el mundo, con canales navegables, arquitectura gótica y una atmósfera mágica perfecta para el romance.",
    metrics: {
        dayPassFrom: 22,
        coffeeFrom: 3,
        coworkCount: 8,
        bestWifi: "Good",
        population: 260000,
        costOfLivingIndex: 78
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "5GB/30days", price: 18, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Intesa Sanpaolo", fee: "€1.5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Impact Hub Venice", area: "Giudecca", price: 25, hours: "9-19", wifi: "Good" },
            { name: "Alisea Lab", area: "Cannaregio", price: 20, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè Florian", area: "San Marco", plugs: false, wifi: "Fair" },
            { name: "Rosa Salva", area: "Castello", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "San Marco", vibe: "Tourist central", priceIndex: "Very High" },
            { name: "Dorsoduro", vibe: "Artsy & authentic", priceIndex: "High" },
            { name: "Cannaregio", vibe: "Local & affordable", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Danieli", nights: 2, pricePerNight: 400, fees: 25 },
            { name: "Generator Venice", nights: 3, pricePerNight: 80, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 50,
        dailyMid: 100,
        sampleBasket: [
            { item: "Gondola ride", price: 80 },
            { item: "Aperol Spritz", price: 8 },
            { item: "Pizza slice", price: 4 },
            { item: "Water taxi", price: 15 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Venecia: Palazzo Morosini",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale SS. Giovanni e Paolo", phone: "+39 041 529 4111" }]
    }
},
{
    slug: "rome",
    name: "Roma",
    country: "Italia",
    tags: ["historia", "arte", "cultura", "romántica", "imperial"],
    preferences: ["Ciudades románticas", "Ciudades históricas", "Ciudades culturales", "Ciudades artísticas"],
    lastUpdated: "2025-01-03",
    score: 94,
    summary: "Ciudad eterna con el Coliseo, el Vaticano, la Fontana di Trevi y una historia que abarca más de 2,500 años.",
    metrics: {
        dayPassFrom: 23,
        coffeeFrom: 2.5,
        coworkCount: 35,
        bestWifi: "Good",
        population: 2873000,
        costOfLivingIndex: 75
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Monte dei Paschi", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Impact Hub Rome", area: "Centro", price: 25, hours: "9-19", wifi: "Good" },
            { name: "Spaces Rome", area: "Prati", price: 28, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè Greco", area: "Via dei Condotti", plugs: true, wifi: "Fair" },
            { name: "Barnum Café", area: "Campo de' Fiori", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro Storico", vibe: "Historic heart", priceIndex: "High" },
            { name: "Trastevere", vibe: "Bohemian & nightlife", priceIndex: "Medium-High" },
            { name: "Monti", vibe: "Trendy & authentic", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel de Russie", nights: 2, pricePerNight: 400, fees: 25 },
            { name: "Generator Rome", nights: 3, pricePerNight: 45, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 50,
        dailyMid: 95,
        sampleBasket: [
            { item: "Colosseum ticket", price: 16 },
            { item: "Gelato", price: 3 },
            { item: "Pizza al taglio", price: 8 },
            { item: "Metro day pass", price: 7 }
        ]
    },
    emergency: {
        embassy: "Embajada de España: Piazza di Spagna, 57",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale San Giovanni", phone: "+39 06 770 51" }]
    }
},
{
    slug: "milan",
    name: "Milán",
    country: "Italia",
    tags: ["moda", "diseño", "arte", "negocios", "cosmopolita"],
    preferences: ["Ciudades cosmopolitas", "Ciudades artísticas", "Ciudades culturales", "Ciudades tech"],
    lastUpdated: "2025-01-03",
    score: 89,
    summary: "Capital de la moda y el diseño italiano, con la catedral gótica, La Scala y una escena creativa vibrante.",
    metrics: {
        dayPassFrom: 26,
        coffeeFrom: 3.2,
        coworkCount: 42,
        bestWifi: "Excellent",
        population: 1352000,
        costOfLivingIndex: 80
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Intesa Sanpaolo", fee: "€1.5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Milan", area: "Centro", price: 32, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Milan", area: "Porta Nuova", price: 30, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè Cova", area: "Via Montenapoleone", plugs: true, wifi: "Good" },
            { name: "Pasticceria Marchesi", area: "Centro", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro Storico", vibe: "Historic & shopping", priceIndex: "High" },
            { name: "Brera", vibe: "Artistic & bohemian", priceIndex: "Medium-High" },
            { name: "Navigli", vibe: "Trendy & nightlife", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Park Hyatt Milan", nights: 2, pricePerNight: 600, fees: 35 },
            { name: "Ostello Bello", nights: 3, pricePerNight: 35, fees: 3 }
        ]
    },
    budget: {
        dailyLow: 55,
        dailyMid: 105,
        sampleBasket: [
            { item: "Duomo entry", price: 8 },
            { item: "Aperitivo", price: 10 },
            { item: "Shopping district", price: 0 },
            { item: "Metro ticket", price: 2 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Milán: Via Monte Napoleone, 12",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale Maggiore", phone: "+39 02 5503 1" }]
    }
},
{
    slug: "matera",
    name: "Matera",
    country: "Italia",
    tags: ["cuevas", "historia", "única", "tranquila", "patrimonio"],
    preferences: ["Ciudades de cuento", "Ciudades históricas", "Ciudades tranquilas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 90,
    summary: "Ciudad de las cuevas (Sassi) excavadas en la roca, Patrimonio de la Humanidad, con iglesias rupestres y una historia que se remonta a 9,000 años.",
    metrics: {
        dayPassFrom: 20,
        coffeeFrom: 2.8,
        coworkCount: 6,
        bestWifi: "Good",
        population: 60000,
        costOfLivingIndex: 70
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Intesa Sanpaolo", fee: "€1.5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Matera", area: "Sassi", price: 20, hours: "9-19", wifi: "Good" },
            { name: "Spazio Lavoro", area: "Centro", price: 22, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè San Pietro", area: "Sassi", plugs: true, wifi: "Good" },
            { name: "Bar Tripoli", area: "Piazza Vittorio", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Sassi", vibe: "Cave dwellings & unique", priceIndex: "Medium" },
            { name: "Centro Storico", vibe: "Historic & authentic", priceIndex: "Medium" },
            { name: "Piano", vibe: "Modern & convenient", priceIndex: "Low" }
        ],
        deals: [
            { name: "Sextantio Le Grotte", nights: 2, pricePerNight: 200, fees: 20 },
            { name: "B&B Il Belvedere", nights: 3, pricePerNight: 80, fees: 8 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 75,
        sampleBasket: [
            { item: "Sassi tour", price: 15 },
            { item: "Pasta alla materana", price: 12 },
            { item: "Church visit", price: 8 },
            { item: "Local wine", price: 6 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Nápoles: Via dei Mille, 40",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale Madonna delle Grazie", phone: "+39 0835 256 111" }]
    }
},
{
    slug: "ortigia",
    name: "Ortigia",
    country: "Italia",
    tags: ["isla", "sicilia", "mar", "historia", "romántica"],
    preferences: ["Ciudades de cuento", "Ciudades románticas", "Ciudades históricas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 87,
    summary: "Isla histórica de Siracusa con arquitectura barroca, templos griegos, mercados de pescado fresco y vistas al mar Jónico.",
    metrics: {
        dayPassFrom: 18,
        coffeeFrom: 2.5,
        coworkCount: 4,
        bestWifi: "Fair",
        population: 45000,
        costOfLivingIndex: 68
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Banca Popolare", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Ortigia", area: "Centro", price: 18, hours: "9-18", wifi: "Fair" },
            { name: "Spazio Lavoro", area: "Fonte Aretusa", price: 20, hours: "8-19", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè dell'Arte", area: "Piazza Duomo", plugs: true, wifi: "Fair" },
            { name: "Bar Sicilia", area: "Fonte Aretusa", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Piazza Duomo", vibe: "Baroque & historic", priceIndex: "Medium" },
            { name: "Fonte Aretusa", vibe: "Seaside & romantic", priceIndex: "Medium" },
            { name: "Mercato", vibe: "Local & authentic", priceIndex: "Low" }
        ],
        deals: [
            { name: "Hotel Gutkowski", nights: 2, pricePerNight: 120, fees: 12 },
            { name: "B&B Ortigia", nights: 3, pricePerNight: 70, fees: 8 }
        ]
    },
    budget: {
        dailyLow: 35,
        dailyMid: 70,
        sampleBasket: [
            { item: "Greek theater", price: 10 },
            { item: "Fresh seafood", price: 15 },
            { item: "Boat tour", price: 20 },
            { item: "Granita", price: 3 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Palermo: Via Libertà, 30",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale Umberto I", phone: "+39 0931 449 111" }]
    }
},
{
    slug: "sintra",
    name: "Sintra",
    country: "Portugal",
    tags: ["palacios", "montañas", "cuento", "romántica", "historia"],
    preferences: ["Ciudades de cuento", "Ciudades románticas", "Ciudades históricas", "Ciudades entre montañas"],
    lastUpdated: "2025-01-03",
    score: 89,
    summary: "Ciudad de ensueño con palacios de cuento de hadas, castillos medievales, jardines exóticos y vistas panorámicas desde las montañas de Sintra.",
    metrics: {
        dayPassFrom: 15,
        coffeeFrom: 2.2,
        coworkCount: 8,
        bestWifi: "Good",
        population: 380000,
        costOfLivingIndex: 65
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 7, provider: "Vodafone", hotspot: true },
            { plan: "3GB/30days", price: 18, provider: "MEO", hotspot: true }
        ],
        banks: [
            { name: "Millennium BCP", fee: "Free", fx: "Good", online: true },
            { name: "Caixa Geral", fee: "€1", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Sintra", area: "Centro", price: 20, hours: "9-19", wifi: "Good" },
            { name: "Spaces Sintra", area: "Estefânia", price: 22, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Saudade", area: "Centro", plugs: true, wifi: "Good" },
            { name: "Pastelaria Piriquita", area: "Estefânia", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro Histórico", vibe: "medieval + romántico", priceIndex: "€€" },
            { name: "Estefânia", vibe: "noble + palacios", priceIndex: "€€€" },
            { name: "São Pedro", vibe: "local + auténtico", priceIndex: "€" }
        ],
        deals: [
            { name: "Tivoli Palácio de Seteais", nights: 2, pricePerNight: 300, fees: 25 },
            { name: "Casa da Pia", nights: 3, pricePerNight: 80, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 85,
        sampleBasket: [
            { item: "Palácio da Pena", price: 14 },
            { item: "Pastel de nata", price: 1.5 },
            { item: "Tren desde Lisboa", price: 5 },
            { item: "Queijada de Sintra", price: 2 }
        ]
    },
    emergency: {
        embassy: "Embajada de España en Lisboa: Rua do Salitre, 1",
        emergencyNumbers: ["112", "117 (policía)", "118 (bomberos)"],
        hospitals: [{ name: "Hospital de Sintra", phone: "+351 21 923 6000" }]
    }
},
{
    slug: "napoli",
    name: "Nápoles",
    country: "Italia",
    tags: ["pizza", "historia", "caos", "auténtica", "mar"],
    preferences: ["Ciudades gastronómicas", "Ciudades históricas", "Ciudades culturales", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 88,
    summary: "Ciudad auténtica del sur con la mejor pizza del mundo, historia milenaria, caos encantador y vistas al Vesubio y Capri.",
    metrics: {
        dayPassFrom: 20,
        coffeeFrom: 2.8,
        coworkCount: 20,
        bestWifi: "Good",
        population: 960000,
        costOfLivingIndex: 68
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Intesa Sanpaolo", fee: "€1.5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Napoli", area: "Centro", price: 22, hours: "9-19", wifi: "Good" },
            { name: "Spaces Napoli", area: "Chiaia", price: 25, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè Gambrinus", area: "Piazza del Plebiscito", plugs: true, wifi: "Good" },
            { name: "Bar Mexico", area: "Centro", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro Storico", vibe: "Historic & authentic", priceIndex: "Low" },
            { name: "Chiaia", vibe: "Elegant & seaside", priceIndex: "Medium" },
            { name: "Vomero", vibe: "Residential & quiet", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel San Francesco al Monte", nights: 2, pricePerNight: 120, fees: 15 },
            { name: "Hostel of the Sun", nights: 3, pricePerNight: 35, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 80,
        sampleBasket: [
            { item: "Pizza margherita", price: 6 },
            { item: "Espresso", price: 1 },
            { item: "Metro day pass", price: 4.5 },
            { item: "Castel dell'Ovo", price: 0 }
        ]
    },
    emergency: {
        embassy: "Embajada de España en Roma: Piazza di Spagna, 57",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale Cardarelli", phone: "+39 081 747 1111" }]
    }
},
{
    slug: "verona",
    name: "Verona",
    country: "Italia",
    tags: ["romántica", "shakespeare", "historia", "vino", "arena"],
    preferences: ["Ciudades románticas", "Ciudades históricas", "Ciudades culturales", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 87,
    summary: "Ciudad de Romeo y Julieta con arena romana, centro histórico medieval y excelente vino del Valpolicella.",
    metrics: {
        dayPassFrom: 19,
        coffeeFrom: 2.6,
        coworkCount: 12,
        bestWifi: "Good",
        population: 260000,
        costOfLivingIndex: 72
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Banca Popolare", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Verona", area: "Centro", price: 20, hours: "9-19", wifi: "Good" },
            { name: "Spazio Lavoro", area: "Piazza Bra", price: 22, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè Borsari", area: "Piazza delle Erbe", plugs: true, wifi: "Good" },
            { name: "Bar Al Duomo", area: "Piazza Bra", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro Storico", vibe: "Medieval & romantic", priceIndex: "Medium" },
            { name: "Piazza Bra", vibe: "Arena & central", priceIndex: "Medium" },
            { name: "Castelvecchio", vibe: "Historic & quiet", priceIndex: "Low" }
        ],
        deals: [
            { name: "Hotel Accademia", nights: 2, pricePerNight: 140, fees: 18 },
            { name: "B&B Verona", nights: 3, pricePerNight: 75, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 85,
        sampleBasket: [
            { item: "Arena entry", price: 10 },
            { item: "Wine tasting", price: 25 },
            { item: "Juliet's balcony", price: 6 },
            { item: "Local bus", price: 3 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Milán: Via Monte Napoleone, 12",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale Borgo Roma", phone: "+39 045 601 1111" }]
    }
},
{
    slug: "bologna",
    name: "Bolonia",
    country: "Italia",
    tags: ["gastronomía", "universidad", "torres", "cultura", "historia"],
    preferences: ["Ciudades gastronómicas", "Ciudades culturales", "Ciudades históricas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 86,
    summary: "Capital gastronómica de Italia con las torres medievales inclinadas, universidad más antigua de Europa y tortellini legendarios.",
    metrics: {
        dayPassFrom: 18,
        coffeeFrom: 2.5,
        coworkCount: 30,
        bestWifi: "Excellent",
        population: 390000,
        costOfLivingIndex: 70
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Banca Popolare", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Bologna", area: "Centro", price: 28, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Bologna", area: "Università", price: 26, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè Zamboni", area: "Via Zamboni", plugs: true, wifi: "Excellent" },
            { name: "Bar San Petronio", area: "Piazza Maggiore", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro Storico", vibe: "Historic & gastronomic", priceIndex: "Medium" },
            { name: "Università", vibe: "Student & vibrant", priceIndex: "Low" },
            { name: "Piazza Maggiore", vibe: "Main square & cultural", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Internazionale", nights: 2, pricePerNight: 130, fees: 15 },
            { name: "B&B Bologna", nights: 3, pricePerNight: 70, fees: 8 }
        ]
    },
    budget: {
        dailyLow: 42,
        dailyMid: 80,
        sampleBasket: [
            { item: "Tortellini", price: 12 },
            { item: "Torre degli Asinelli", price: 5 },
            { item: "University tour", price: 0 },
            { item: "Local bus", price: 3 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Milán: Via Monte Napoleone, 12",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale Sant'Orsola", phone: "+39 051 636 1111" }]
    }
},
{
    slug: "siena",
    name: "Siena",
    country: "Italia",
    tags: ["medieval", "palio", "historia", "toscana", "romántica"],
    preferences: ["Ciudades de cuento", "Ciudades románticas", "Ciudades históricas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 89,
    summary: "Ciudad medieval perfectamente conservada con la Piazza del Campo, Palio histórico y arquitectura gótica toscana.",
    metrics: {
        dayPassFrom: 17,
        coffeeFrom: 2.4,
        coworkCount: 8,
        bestWifi: "Good",
        population: 54000,
        costOfLivingIndex: 68
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Banca Monte dei Paschi", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Siena", area: "Centro", price: 20, hours: "9-18", wifi: "Good" },
            { name: "Spazio Lavoro", area: "Piazza del Campo", price: 22, hours: "8-19", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè Fiorella", area: "Piazza del Campo", plugs: true, wifi: "Good" },
            { name: "Bar Il Palio", area: "Centro", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro Storico", vibe: "Medieval & perfect", priceIndex: "Medium" },
            { name: "Piazza del Campo", vibe: "Main square & iconic", priceIndex: "High" },
            { name: "San Domenico", vibe: "Quiet & authentic", priceIndex: "Low" }
        ],
        deals: [
            { name: "Hotel Athena", nights: 2, pricePerNight: 160, fees: 20 },
            { name: "B&B Siena", nights: 3, pricePerNight: 85, fees: 12 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 78,
        sampleBasket: [
            { item: "Piazza del Campo", price: 0 },
            { item: "Panforte", price: 8 },
            { item: "Cathedral entry", price: 8 },
            { item: "Local bus", price: 2.5 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Florencia: Via dei Bardi, 28",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale Santa Maria alle Scotte", phone: "+39 0577 58 51 11" }]
    }
},
{
    slug: "cinque-terre",
    name: "Cinque Terre",
    country: "Italia",
    tags: ["playas", "montañas", "colorida", "romántica", "naturaleza"],
    preferences: ["Ciudades de cuento", "Ciudades románticas", "Playas increíbles", "Ciudades entre montañas"],
    lastUpdated: "2025-01-03",
    score: 91,
    summary: "Cinco pueblos de colores colgados en acantilados sobre el mar, conectados por senderos panorámicos y trenes costeros.",
    metrics: {
        dayPassFrom: 25,
        coffeeFrom: 3.0,
        coworkCount: 5,
        bestWifi: "Fair",
        population: 4000,
        costOfLivingIndex: 75
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Banca Popolare", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Cinque Terre", area: "Monterosso", price: 25, hours: "9-18", wifi: "Fair" },
            { name: "Spazio Lavoro", area: "Vernazza", price: 28, hours: "8-19", wifi: "Good" }
        ],
        cafes: [
            { name: "Caffè Aurora", area: "Monterosso", plugs: true, wifi: "Fair" },
            { name: "Bar Vernazza", area: "Vernazza", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Monterosso", vibe: "Beach & largest", priceIndex: "High" },
            { name: "Vernazza", vibe: "Most picturesque", priceIndex: "High" },
            { name: "Manarola", vibe: "Romantic & quiet", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Porto Roca", nights: 2, pricePerNight: 200, fees: 25 },
            { name: "B&B Cinque Terre", nights: 3, pricePerNight: 120, fees: 15 }
        ]
    },
    budget: {
        dailyLow: 50,
        dailyMid: 95,
        sampleBasket: [
            { item: "Hiking pass", price: 18 },
            { item: "Train pass", price: 16 },
            { item: "Seafood dinner", price: 25 },
            { item: "Boat tour", price: 30 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Florencia: Via dei Bardi, 28",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale di La Spezia", phone: "+39 0187 52 21 11" }]
    }
},
{
    slug: "santorini",
    name: "Santorini",
    country: "Grecia",
    tags: ["romántica", "islas", "volcán", "atardeceres", "lunamiel"],
    preferences: ["Ciudades románticas", "Playas increíbles", "Ciudades de cuento", "Ciudades tranquilas"],
    lastUpdated: "2025-01-03",
    score: 94,
    summary: "Isla volcánica griega famosa por sus atardeceres espectaculares, arquitectura blanca y azul, y vistas al mar Egeo.",
    metrics: {
        dayPassFrom: 18,
        coffeeFrom: 3,
        coworkCount: 3,
        bestWifi: "Fair",
        population: 15500,
        costOfLivingIndex: 65
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 5, provider: "Cosmote", hotspot: true },
            { plan: "3GB/30days", price: 15, provider: "Wind", hotspot: true }
        ],
        banks: [
            { name: "Alpha Bank", fee: "Free", fx: "Good", online: true },
            { name: "Eurobank", fee: "€2", fx: "Fair", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Santorini Hub", area: "Fira", price: 15, hours: "9-18", wifi: "Good" },
            { name: "Oia Workspace", area: "Oia", price: 20, hours: "8-19", wifi: "Fair" }
        ],
        cafes: [
            { name: "Lucky's Souvlakis", area: "Fira", plugs: true, wifi: "Good" },
            { name: "Sphinx Restaurant", area: "Firostefani", plugs: false, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Oia", vibe: "Postcard perfect", priceIndex: "Very High" },
            { name: "Fira", vibe: "Lively center", priceIndex: "High" },
            { name: "Perissa", vibe: "Beach town", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Grace Hotel", nights: 2, pricePerNight: 600, fees: 40 },
            { name: "Villa Renos", nights: 3, pricePerNight: 120, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 80,
        sampleBasket: [
            { item: "Sunset dinner", price: 50 },
            { item: "Wine tasting", price: 20 },
            { item: "Beach day", price: 15 },
            { item: "Ferry ticket", price: 35 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Atenas (cubre islas)",
        emergencyNumbers: ["112", "166 (ambulancia)", "100 (policía)"],
        hospitals: [{ name: "Santorini General Hospital", phone: "+30 22860 35500" }]
    }
},
{
    slug: "prague",
    name: "Praga",
    country: "República Checa",
    tags: ["romántica", "medieval", "castillo", "cerveza", "affordable"],
    preferences: ["Ciudades románticas", "Ciudades de cuento", "Ciudades históricas", "Ciudades económicas", "Ciudades gastronómicas"],
    lastUpdated: "2025-01-03",
    score: 89,
    summary: "Capital de cuento de hadas con arquitectura medieval, castillo imponente y una de las cervezas más baratas de Europa.",
    metrics: {
        dayPassFrom: 12,
        coffeeFrom: 2,
        coworkCount: 25,
        bestWifi: "Excellent",
        population: 1335000,
        costOfLivingIndex: 52
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 4, provider: "O2", hotspot: true },
            { plan: "5GB/30days", price: 12, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "ČSOB", fee: "Free", fx: "Good", online: true },
            { name: "Komerční banka", fee: "30 CZK", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Impact Hub Prague", area: "Karlín", price: 18, hours: "24/7", wifi: "Excellent" },
            { name: "Locus Workspace", area: "Vinohrady", price: 15, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Louvre", area: "New Town", plugs: true, wifi: "Good" },
            { name: "Slavia", area: "Old Town", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Old Town", vibe: "Historic center", priceIndex: "High" },
            { name: "Lesser Town", vibe: "Baroque charm", priceIndex: "Medium-High" },
            { name: "Vinohrady", vibe: "Hip & local", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Golden Well", nights: 2, pricePerNight: 150, fees: 8 },
            { name: "Hostel One Home", nights: 3, pricePerNight: 25, fees: 2 }
        ]
    },
    budget: {
        dailyLow: 25,
        dailyMid: 50,
        sampleBasket: [
            { item: "Czech beer", price: 2 },
            { item: "Goulash meal", price: 8 },
            { item: "Castle entry", price: 12 },
            { item: "Tram ticket", price: 1 }
        ]
    },
    emergency: {
        embassy: "Embajada de España: Pevnostní 18",
        emergencyNumbers: ["112", "155 (ambulancia)", "158 (policía)"],
        hospitals: [{ name: "Nemocnice Na Homolce", phone: "+420 257 271 111" }]
    }
},
{
    slug: "florence",
    name: "Florencia",
    country: "Italia",
    tags: ["arte", "renacimiento", "romántica", "historia", "toscana"],
    preferences: ["Ciudades románticas", "Ciudades artísticas", "Ciudades históricas", "Ciudades culturales", "Ciudades gastronómicas"],
    lastUpdated: "2025-01-03",
    score: 91,
    summary: "Cuna del Renacimiento con arte mundial, arquitectura espectacular y la romántica región de la Toscana.",
    metrics: {
        dayPassFrom: 20,
        coffeeFrom: 2,
        coworkCount: 15,
        bestWifi: "Good",
        population: 383000,
        costOfLivingIndex: 72
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 6, provider: "TIM", hotspot: true },
            { plan: "3GB/30days", price: 16, provider: "Vodafone", hotspot: true }
        ],
        banks: [
            { name: "UniCredit", fee: "Free", fx: "Good", online: true },
            { name: "Monte dei Paschi", fee: "€2", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Impact Hub Florence", area: "Centro", price: 22, hours: "9-19", wifi: "Good" },
            { name: "Nana Bianca", area: "Oltrarno", price: 18, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Gilli", area: "Piazza Repubblica", plugs: true, wifi: "Fair" },
            { name: "Ditta Artigianale", area: "Oltrarno", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Historic Center", vibe: "Renaissance heart", priceIndex: "High" },
            { name: "Oltrarno", vibe: "Artisan quarter", priceIndex: "Medium-High" },
            { name: "Santa Croce", vibe: "Young & vibrant", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Davanzati", nights: 2, pricePerNight: 180, fees: 12 },
            { name: "Plus Florence", nights: 3, pricePerNight: 45, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 75,
        sampleBasket: [
            { item: "Uffizi ticket", price: 25 },
            { item: "Aperitivo", price: 8 },
            { item: "Pasta lunch", price: 12 },
            { item: "Gelato", price: 3 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Florencia: Via dei Servi 9",
        emergencyNumbers: ["112", "118 (ambulancia)", "113 (policía)"],
        hospitals: [{ name: "Ospedale di Careggi", phone: "+39 055 794 111" }]
    }
},
{
    slug: "vienna",
    name: "Viena",
    country: "Austria",
    tags: ["romántica", "imperial", "música", "cultura", "elegant"],
    preferences: ["Ciudades románticas", "Ciudades históricas", "Ciudades culturales", "Ciudades artísticas", "Ciudades gastronómicas"],
    lastUpdated: "2025-01-03",
    score: 90,
    summary: "Capital imperial con palacios barrocos, tradición musical clásica y elegantes cafeterías vienesas.",
    metrics: {
        dayPassFrom: 24,
        coffeeFrom: 3,
        coworkCount: 30,
        bestWifi: "Excellent",
        population: 1897000,
        costOfLivingIndex: 75
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 7, provider: "A1", hotspot: true },
            { plan: "5GB/30days", price: 18, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Erste Bank", fee: "Free", fx: "Good", online: true },
            { name: "Raiffeisen", fee: "€3", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Spaces Belvedere", area: "3rd District", price: 28, hours: "24/7", wifi: "Excellent" },
            { name: "Impact Hub Vienna", area: "2nd District", price: 25, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Central", area: "1st District", plugs: true, wifi: "Good" },
            { name: "Café Sacher", area: "1st District", plugs: false, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Inner City", vibe: "Imperial center", priceIndex: "High" },
            { name: "Leopoldstadt", vibe: "Modern & trendy", priceIndex: "Medium" },
            { name: "Neubau", vibe: "Artsy district", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Sacher", nights: 2, pricePerNight: 400, fees: 20 },
            { name: "Wombats Hostel", nights: 3, pricePerNight: 35, fees: 3 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 85,
        sampleBasket: [
            { item: "Opera ticket", price: 50 },
            { item: "Schnitzel meal", price: 15 },
            { item: "Coffee & cake", price: 8 },
            { item: "Museum entry", price: 12 }
        ]
    },
    emergency: {
        embassy: "Embajada de España: Argentinierstraße 34",
        emergencyNumbers: ["112", "144 (ambulancia)", "133 (policía)"],
        hospitals: [{ name: "AKH Wien", phone: "+43 1 404 00" }]
    }
},
{
    slug: "new-york",
    name: "Nueva York",
    country: "Estados Unidos",
    tags: ["cosmopolita", "rascacielos", "diversidad", "cultura", "nunca-duerme"],
    preferences: ["Ciudades cosmopolitas", "Ciudades culturales", "Ciudades artísticas", "Ciudades nocturnas", "Ciudades tech"],
    lastUpdated: "2025-01-03",
    score: 96,
    summary: "La gran manzana que nunca duerme, centro financiero mundial con diversidad cultural incomparable y energía vibrante.",
    metrics: {
        dayPassFrom: 40,
        coffeeFrom: 5,
        coworkCount: 180,
        bestWifi: "Excellent",
        population: 8336000,
        costOfLivingIndex: 120
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Times Square", area: "Midtown", price: 65, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Bryant Park", area: "Midtown", price: 55, hours: "24/7", wifi: "Excellent" }
        ],
        cafes: [
            { name: "Blue Bottle Coffee", area: "SoHo", plugs: true, wifi: "Excellent" },
            { name: "Stumptown", area: "Greenwich Village", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Manhattan", vibe: "City center", priceIndex: "Very High" },
            { name: "Brooklyn", vibe: "Hip & creative", priceIndex: "High" },
            { name: "Queens", vibe: "Diverse & affordable", priceIndex: "Medium" }
        ],
        deals: [
            { name: "The Plaza", nights: 2, pricePerNight: 800, fees: 50 },
            { name: "Pod Hotels", nights: 3, pricePerNight: 150, fees: 15 }
        ]
    },
    budget: {
        dailyLow: 80,
        dailyMid: 180,
        sampleBasket: [
            { item: "Broadway show", price: 120 },
            { item: "Pizza slice", price: 3 },
            { item: "Subway ticket", price: 3 },
            { item: "Museum entry", price: 25 }
        ]
    },
    emergency: {
        embassy: "Consulado de España: 150 E 58th Street",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "Mount Sinai Hospital", phone: "+1 212 241 6500" }]
    }
},
{
    slug: "san-francisco",
    name: "San Francisco",
    country: "Estados Unidos",
    tags: ["tech", "startups", "cultura", "puente", "diversidad"],
    preferences: ["Ciudades tech", "Ciudades cosmopolitas", "Ciudades culturales", "Ciudades artísticas"],
    lastUpdated: "2025-01-03",
    score: 92,
    summary: "Capital tecnológica con Silicon Valley, Golden Gate Bridge, cultura hippie y una de las escenas gastronómicas más innovadoras.",
    metrics: {
        dayPassFrom: 35,
        coffeeFrom: 4.5,
        coworkCount: 120,
        bestWifi: "Excellent",
        population: 873000,
        costOfLivingIndex: 130
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork San Francisco", area: "SOMA", price: 70, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces San Francisco", area: "Financial District", price: 65, hours: "24/7", wifi: "Excellent" }
        ],
        cafes: [
            { name: "Blue Bottle Coffee", area: "Hayes Valley", plugs: true, wifi: "Excellent" },
            { name: "Ritual Coffee", area: "Mission District", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Mission District", vibe: "Hipster & foodie", priceIndex: "High" },
            { name: "North Beach", vibe: "Italian & historic", priceIndex: "High" },
            { name: "Hayes Valley", vibe: "Trendy & boutique", priceIndex: "Very High" }
        ],
        deals: [
            { name: "Hotel Drisco", nights: 2, pricePerNight: 350, fees: 25 },
            { name: "HI San Francisco", nights: 3, pricePerNight: 45, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 90,
        dailyMid: 200,
        sampleBasket: [
            { item: "Cable car ride", price: 8 },
            { item: "Mission burrito", price: 12 },
            { item: "Museum entry", price: 20 },
            { item: "Dinner for two", price: 100 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en San Francisco: 1405 Sutter Street",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "UCSF Medical Center", phone: "+1 415 476 1000" }]
    }
},
{
    slug: "miami",
    name: "Miami",
    country: "Estados Unidos",
    tags: ["playas", "latino", "nocturna", "arte", "moda"],
    preferences: ["Playas increíbles", "Ciudades nocturnas", "Ciudades cosmopolitas", "Ciudades artísticas"],
    lastUpdated: "2025-01-03",
    score: 88,
    summary: "Ciudad latina con playas de arena blanca, vida nocturna legendaria, arte callejero y cultura caribeña vibrante.",
    metrics: {
        dayPassFrom: 30,
        coffeeFrom: 4.0,
        coworkCount: 65,
        bestWifi: "Good",
        population: 442000,
        costOfLivingIndex: 110
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Miami", area: "Brickell", price: 60, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Miami", area: "Wynwood", price: 55, hours: "24/7", wifi: "Good" }
        ],
        cafes: [
            { name: "Panther Coffee", area: "Wynwood", plugs: true, wifi: "Excellent" },
            { name: "All Day", area: "Downtown", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "South Beach", vibe: "Beach & nightlife", priceIndex: "High" },
            { name: "Wynwood", vibe: "Artsy & hipster", priceIndex: "Medium" },
            { name: "Brickell", vibe: "Business & luxury", priceIndex: "Very High" }
        ],
        deals: [
            { name: "Fontainebleau", nights: 2, pricePerNight: 400, fees: 30 },
            { name: "Freehand Miami", nights: 3, pricePerNight: 80, fees: 8 }
        ]
    },
    budget: {
        dailyLow: 75,
        dailyMid: 160,
        sampleBasket: [
            { item: "Beach day", price: 15 },
            { item: "Cuban sandwich", price: 8 },
            { item: "Wynwood Walls", price: 0 },
            { item: "Metro pass", price: 6 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Miami: 2655 Le Jeune Road",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "Jackson Memorial Hospital", phone: "+1 305 585 1111" }]
    }
},
{
    slug: "portland",
    name: "Portland",
    country: "Estados Unidos",
    tags: ["hipster", "cerveza", "naturaleza", "tech", "sostenible"],
    preferences: ["Ciudades tech", "Ciudades tranquilas", "Ciudades sin turistas", "Ciudades cosmopolitas"],
    lastUpdated: "2025-01-03",
    score: 86,
    summary: "Ciudad hipster del Pacífico con más de 70 cervecerías artesanales, parques urbanos, cultura sostenible y escena tech emergente.",
    metrics: {
        dayPassFrom: 25,
        coffeeFrom: 4.0,
        coworkCount: 45,
        bestWifi: "Excellent",
        population: 650000,
        costOfLivingIndex: 105
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Portland", area: "Pearl District", price: 55, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Portland", area: "Downtown", price: 50, hours: "24/7", wifi: "Excellent" }
        ],
        cafes: [
            { name: "Stumptown Coffee", area: "Pearl District", plugs: true, wifi: "Excellent" },
            { name: "Coava Coffee", area: "Industrial District", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Pearl District", vibe: "Hipster & trendy", priceIndex: "Medium" },
            { name: "Alberta Arts", vibe: "Creative & local", priceIndex: "Low" },
            { name: "Hawthorne", vibe: "Bohemian & relaxed", priceIndex: "Low" }
        ],
        deals: [
            { name: "Hotel Lucia", nights: 2, pricePerNight: 180, fees: 20 },
            { name: "HI Portland", nights: 3, pricePerNight: 40, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 60,
        dailyMid: 120,
        sampleBasket: [
            { item: "Food truck meal", price: 12 },
            { item: "Craft beer", price: 8 },
            { item: "Forest Park hike", price: 0 },
            { item: "Streetcar pass", price: 5 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en San Francisco: 1405 Sutter Street",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "OHSU Hospital", phone: "+1 503 494 8311" }]
    }
},
{
    slug: "asheville",
    name: "Asheville",
    country: "Estados Unidos",
    tags: ["montañas", "arte", "cerveza", "tranquila", "naturaleza"],
    preferences: ["Ciudades tranquilas", "Ciudades entre montañas", "Ciudades artísticas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 84,
    summary: "Joyita de los Apalaches con más de 30 cervecerías, arte callejero, Blue Ridge Parkway y una escena creativa vibrante en las montañas.",
    metrics: {
        dayPassFrom: 22,
        coffeeFrom: 3.8,
        coworkCount: 18,
        bestWifi: "Good",
        population: 92000,
        costOfLivingIndex: 95
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Asheville", area: "Downtown", price: 45, hours: "24/7", wifi: "Good" },
            { name: "Spaces Asheville", area: "River Arts", price: 42, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "High Five Coffee", area: "Downtown", plugs: true, wifi: "Good" },
            { name: "Trade & Lore", area: "West Asheville", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Downtown", vibe: "Artsy & walkable", priceIndex: "Medium" },
            { name: "West Asheville", vibe: "Hipster & local", priceIndex: "Low" },
            { name: "River Arts District", vibe: "Creative & industrial", priceIndex: "Low" }
        ],
        deals: [
            { name: "Aloft Asheville", nights: 2, pricePerNight: 150, fees: 18 },
            { name: "Sweet Peas Hostel", nights: 3, pricePerNight: 35, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 50,
        dailyMid: 100,
        sampleBasket: [
            { item: "Local craft beer", price: 7 },
            { item: "Farm-to-table meal", price: 20 },
            { item: "Blue Ridge hike", price: 0 },
            { item: "Art gallery tour", price: 0 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Atlanta: 245 Peachtree Center Ave",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "Mission Hospital", phone: "+1 828 213 1111" }]
    }
},
{
    slug: "charleston",
    name: "Charleston",
    country: "Estados Unidos",
    tags: ["historia", "sur", "romántica", "gastronomía", "plantaciones"],
    preferences: ["Ciudades románticas", "Ciudades históricas", "Ciudades gastronómicas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 86,
    summary: "Ciudad sureña elegante con arquitectura colonial, plantaciones históricas, gastronomía de vanguardia y encanto del Viejo Sur.",
    metrics: {
        dayPassFrom: 28,
        coffeeFrom: 4.2,
        coworkCount: 22,
        bestWifi: "Good",
        population: 150000,
        costOfLivingIndex: 100
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Charleston", area: "Downtown", price: 55, hours: "24/7", wifi: "Good" },
            { name: "Spaces Charleston", area: "Historic District", price: 52, hours: "24/7", wifi: "Good" }
        ],
        cafes: [
            { name: "Second State Coffee", area: "Downtown", plugs: true, wifi: "Good" },
            { name: "The Daily", area: "Historic District", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Historic District", vibe: "Colonial & romantic", priceIndex: "High" },
            { name: "French Quarter", vibe: "Charming & historic", priceIndex: "High" },
            { name: "Mount Pleasant", vibe: "Suburban & family", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Belmond Charleston Place", nights: 2, pricePerNight: 350, fees: 30 },
            { name: "HI Charleston", nights: 3, pricePerNight: 45, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 65,
        dailyMid: 130,
        sampleBasket: [
            { item: "Plantation tour", price: 25 },
            { item: "Shrimp & grits", price: 18 },
            { item: "Historic walking tour", price: 20 },
            { item: "Local bus", price: 4 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Atlanta: 245 Peachtree Center Ave",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "Medical University of South Carolina", phone: "+1 843 792 1414" }]
    }
},
{
    slug: "nashville",
    name: "Nashville",
    country: "Estados Unidos",
    tags: ["música", "country", "gastronomía", "nocturna", "cultura"],
    preferences: ["Ciudades nocturnas", "Ciudades culturales", "Ciudades gastronómicas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 85,
    summary: "Capital mundial de la música country con Broadway, hot chicken, honky tonks y una escena musical vibrante las 24 horas.",
    metrics: {
        dayPassFrom: 26,
        coffeeFrom: 4.0,
        coworkCount: 35,
        bestWifi: "Excellent",
        population: 690000,
        costOfLivingIndex: 95
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Nashville", area: "Downtown", price: 58, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Nashville", area: "Gulch", price: 55, hours: "24/7", wifi: "Excellent" }
        ],
        cafes: [
            { name: "Barista Parlor", area: "Gulch", plugs: true, wifi: "Excellent" },
            { name: "Frothy Monkey", area: "Downtown", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Downtown", vibe: "Music & nightlife", priceIndex: "High" },
            { name: "Gulch", vibe: "Trendy & hipster", priceIndex: "Medium" },
            { name: "East Nashville", vibe: "Artistic & local", priceIndex: "Low" }
        ],
        deals: [
            { name: "The Hermitage Hotel", nights: 2, pricePerNight: 300, fees: 25 },
            { name: "HI Nashville", nights: 3, pricePerNight: 50, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 60,
        dailyMid: 120,
        sampleBasket: [
            { item: "Country Music Hall of Fame", price: 25 },
            { item: "Hot chicken", price: 15 },
            { item: "Broadway night", price: 40 },
            { item: "Local bus", price: 4 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Atlanta: 245 Peachtree Center Ave",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "Vanderbilt University Medical Center", phone: "+1 615 322 5000" }]
    }
},
{
    slug: "austin",
    name: "Austin",
    country: "Estados Unidos",
    tags: ["tech", "música", "comida", "naturaleza", "hipster"],
    preferences: ["Ciudades tech", "Ciudades nocturnas", "Ciudades gastronómicas", "Ciudades cosmopolitas"],
    lastUpdated: "2025-01-03",
    score: 88,
    summary: "Capital tecnológica de Texas con SXSW, música en vivo, tacos legendarios y el ambiente más liberal del estado.",
    metrics: {
        dayPassFrom: 30,
        coffeeFrom: 4.3,
        coworkCount: 80,
        bestWifi: "Excellent",
        population: 950000,
        costOfLivingIndex: 110
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Austin", area: "Downtown", price: 65, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Austin", area: "East Austin", price: 60, hours: "24/7", wifi: "Excellent" }
        ],
        cafes: [
            { name: "Houndstooth Coffee", area: "Downtown", plugs: true, wifi: "Excellent" },
            { name: "Cuvée Coffee", area: "East Austin", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Downtown", vibe: "Tech & business", priceIndex: "High" },
            { name: "East Austin", vibe: "Hipster & creative", priceIndex: "Medium" },
            { name: "South Congress", vibe: "Trendy & shopping", priceIndex: "Medium" }
        ],
        deals: [
            { name: "The Driskill", nights: 2, pricePerNight: 280, fees: 25 },
            { name: "HI Austin", nights: 3, pricePerNight: 55, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 70,
        dailyMid: 140,
        sampleBasket: [
            { item: "Tacos (3 pieces)", price: 12 },
            { item: "Live music", price: 20 },
            { item: "Barton Springs", price: 8 },
            { item: "Local bus", price: 3.5 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Houston: 1800 Bering Drive",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "Dell Seton Medical Center", phone: "+1 512 324 7000" }]
    }
},
{
    slug: "denver",
    name: "Denver",
    country: "Estados Unidos",
    tags: ["montañas", "outdoor", "cerveza", "tech", "naturaleza"],
    preferences: ["Ciudades entre montañas", "Ciudades tech", "Ciudades tranquilas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 84,
    summary: "Ciudad de las Montañas Rocosas con más de 200 cervecerías, acceso a esquí y senderismo, y una escena tech emergente.",
    metrics: {
        dayPassFrom: 24,
        coffeeFrom: 4.1,
        coworkCount: 45,
        bestWifi: "Excellent",
        population: 730000,
        costOfLivingIndex: 105
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Denver", area: "Downtown", price: 60, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Denver", area: "RiNo", price: 55, hours: "24/7", wifi: "Excellent" }
        ],
        cafes: [
            { name: "Huckleberry Roasters", area: "Downtown", plugs: true, wifi: "Excellent" },
            { name: "Corvus Coffee", area: "RiNo", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Downtown", vibe: "Business & modern", priceIndex: "Medium" },
            { name: "RiNo", vibe: "Artistic & hipster", priceIndex: "Medium" },
            { name: "LoDo", vibe: "Historic & nightlife", priceIndex: "Medium" }
        ],
        deals: [
            { name: "The Brown Palace", nights: 2, pricePerNight: 250, fees: 25 },
            { name: "HI Denver", nights: 3, pricePerNight: 45, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 65,
        dailyMid: 125,
        sampleBasket: [
            { item: "Craft beer", price: 8 },
            { item: "Ski pass", price: 120 },
            { item: "Hiking", price: 0 },
            { item: "Light rail", price: 6 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Denver: 400 S Colorado Blvd",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "Denver Health Medical Center", phone: "+1 303 436 6000" }]
    }
},
{
    slug: "seattle",
    name: "Seattle",
    country: "Estados Unidos",
    tags: ["tech", "café", "lluvia", "naturaleza", "cultura"],
    preferences: ["Ciudades tech", "Ciudades culturales", "Ciudades tranquilas", "Ciudades cosmopolitas"],
    lastUpdated: "2025-01-03",
    score: 86,
    summary: "Ciudad de la lluvia con Microsoft, Amazon, Starbucks, Space Needle y acceso a la naturaleza del Pacífico Noroeste.",
    metrics: {
        dayPassFrom: 32,
        coffeeFrom: 4.8,
        coworkCount: 65,
        bestWifi: "Excellent",
        population: 750000,
        costOfLivingIndex: 120
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Verizon", hotspot: true },
            { plan: "10GB/30days", price: 35, provider: "T-Mobile", hotspot: true }
        ],
        banks: [
            { name: "Chase", fee: "Free", fx: "Excellent", online: true },
            { name: "Bank of America", fee: "$5", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Seattle", area: "Downtown", price: 70, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Seattle", area: "Capitol Hill", price: 65, hours: "24/7", wifi: "Excellent" }
        ],
        cafes: [
            { name: "Starbucks Reserve", area: "Downtown", plugs: true, wifi: "Excellent" },
            { name: "Victrola Coffee", area: "Capitol Hill", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Downtown", vibe: "Tech & business", priceIndex: "High" },
            { name: "Capitol Hill", vibe: "Hipster & LGBTQ+", priceIndex: "Medium" },
            { name: "Fremont", vibe: "Artistic & local", priceIndex: "Low" }
        ],
        deals: [
            { name: "Hotel Sorrento", nights: 2, pricePerNight: 300, fees: 30 },
            { name: "HI Seattle", nights: 3, pricePerNight: 55, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 75,
        dailyMid: 150,
        sampleBasket: [
            { item: "Space Needle", price: 35 },
            { item: "Coffee", price: 6 },
            { item: "Pike Place Market", price: 0 },
            { item: "Light rail", price: 5 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Seattle: 520 Pike Street",
        emergencyNumbers: ["911", "311 (no emergencia)"],
        hospitals: [{ name: "Harborview Medical Center", phone: "+1 206 744 3000" }]
    }
},
{
    slug: "cape-town",
    name: "Ciudad del Cabo",
    country: "Sudáfrica",
    tags: ["aventura", "naturaleza", "montañas", "océano", "vino"],
    preferences: ["Ciudades de aventura", "Ciudades entre montañas", "Playas increíbles", "Ciudades gastronómicas", "Ciudades económicas"],
    lastUpdated: "2025-01-03",
    score: 88,
    summary: "Espectacular ciudad entre montañas y océanos, perfecta para aventuras al aire libre, safaris y cata de vinos.",
    metrics: {
        dayPassFrom: 8,
        coffeeFrom: 2,
        coworkCount: 25,
        bestWifi: "Good",
        population: 4618000,
        costOfLivingIndex: 45
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 3, provider: "MTN", hotspot: true },
            { plan: "5GB/30days", price: 10, provider: "Vodacom", hotspot: true }
        ],
        banks: [
            { name: "Standard Bank", fee: "Free", fx: "Good", online: true },
            { name: "FNB", fee: "R20", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Workshop17", area: "V&A Waterfront", price: 12, hours: "24/7", wifi: "Excellent" },
            { name: "The Business Exchange", area: "CBD", price: 10, hours: "8-18", wifi: "Good" }
        ],
        cafes: [
            { name: "Truth Coffee", area: "CBD", plugs: true, wifi: "Good" },
            { name: "Kloof Street House", area: "Gardens", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "V&A Waterfront", vibe: "Tourist hub", priceIndex: "High" },
            { name: "City Bowl", vibe: "Central & convenient", priceIndex: "Medium" },
            { name: "Observatory", vibe: "Bohemian & cheap", priceIndex: "Low" }
        ],
        deals: [
            { name: "One&Only Cape Town", nights: 2, pricePerNight: 300, fees: 20 },
            { name: "Cape Town Backpackers", nights: 4, pricePerNight: 15, fees: 2 }
        ]
    },
    budget: {
        dailyLow: 20,
        dailyMid: 45,
        sampleBasket: [
            { item: "Table Mountain cable car", price: 20 },
            { item: "Wine tasting", price: 15 },
            { item: "Local meal", price: 8 },
            { item: "Uber ride", price: 5 }
        ]
    },
    emergency: {
        embassy: "Consulado de España: 37 Shortmarket Street",
        emergencyNumbers: ["10111 (policía)", "10177 (ambulancia)"],
        hospitals: [{ name: "Groote Schuur Hospital", phone: "+27 21 404 9111" }]
    }
},
{
    slug: "kyoto",
    name: "Kioto",
    country: "Japón",
    tags: ["tradicional", "templos", "cultura", "zen", "historia"],
    preferences: ["Ciudades históricas", "Ciudades culturales", "Ciudades tranquilas", "Ciudades de cuento", "Ciudades gastronómicas"],
    lastUpdated: "2025-01-03",
    score: 93,
    summary: "Antigua capital japonesa con miles de templos, jardines zen tradicionales y la auténtica cultura japonesa.",
    metrics: {
        dayPassFrom: 20,
        coffeeFrom: 4,
        coworkCount: 15,
        bestWifi: "Excellent",
        population: 1464000,
        costOfLivingIndex: 88
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "SoftBank", hotspot: true },
            { plan: "3GB/30days", price: 22, provider: "DoCoMo", hotspot: true }
        ],
        banks: [
            { name: "Japan Post Bank", fee: "Free", fx: "Good", online: true },
            { name: "MUFG", fee: "¥200", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Impact Hub Kyoto", area: "Kawaramachi", price: 25, hours: "9-20", wifi: "Excellent" },
            { name: "Kotobuki", area: "Gion", price: 20, hours: "8-19", wifi: "Good" }
        ],
        cafes: [
            { name: "% Arabica", area: "Arashiyama", plugs: true, wifi: "Good" },
            { name: "Starbucks Ninenzaka", area: "Higashiyama", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Gion", vibe: "Traditional geisha district", priceIndex: "High" },
            { name: "Arashiyama", vibe: "Bamboo forest area", priceIndex: "Medium-High" },
            { name: "Kyoto Station", vibe: "Transport hub", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Ritz Carlton Kyoto", nights: 2, pricePerNight: 600, fees: 30 },
            { name: "K's House Kyoto", nights: 3, pricePerNight: 35, fees: 3 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 90,
        sampleBasket: [
            { item: "Temple visit", price: 5 },
            { item: "Kaiseki dinner", price: 80 },
            { item: "Matcha tea", price: 8 },
            { item: "Bus day pass", price: 5 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Osaka (cubre Kyoto)",
        emergencyNumbers: ["110 (policía)", "119 (bomberos/ambulancia)"],
        hospitals: [{ name: "Kyoto University Hospital", phone: "+81 75 751 3111" }]
    }
},
{
    slug: "osaka",
    name: "Osaka",
    country: "Japón",
    tags: ["gastronomía", "nocturna", "cultura", "historia", "diversión"],
    preferences: ["Ciudades gastronómicas", "Ciudades nocturnas", "Ciudades culturales", "Ciudades económicas"],
    lastUpdated: "2025-01-03",
    score: 87,
    summary: "Capital gastronómica de Japón con street food increíble, vida nocturna vibrante y el castillo de Osaka.",
    metrics: {
        dayPassFrom: 18,
        coffeeFrom: 3.5,
        coworkCount: 25,
        bestWifi: "Excellent",
        population: 2750000,
        costOfLivingIndex: 82
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "SoftBank", hotspot: true },
            { plan: "3GB/30days", price: 22, provider: "DoCoMo", hotspot: true }
        ],
        banks: [
            { name: "Japan Post Bank", fee: "Free", fx: "Good", online: true },
            { name: "MUFG", fee: "¥200", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Impact Hub Osaka", area: "Namba", price: 22, hours: "9-20", wifi: "Excellent" },
            { name: "WeWork Osaka", area: "Umeda", price: 28, hours: "24/7", wifi: "Excellent" }
        ],
        cafes: [
            { name: "Streamer Coffee", area: "Namba", plugs: true, wifi: "Good" },
            { name: "% Arabica", area: "Dotonbori", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Namba", vibe: "Food & entertainment", priceIndex: "Medium" },
            { name: "Umeda", vibe: "Business & shopping", priceIndex: "Medium-High" },
            { name: "Dotonbori", vibe: "Nightlife & food", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Ritz Carlton Osaka", nights: 2, pricePerNight: 400, fees: 25 },
            { name: "Hostel 64 Osaka", nights: 3, pricePerNight: 30, fees: 3 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 80,
        sampleBasket: [
            { item: "Takoyaki (6 pieces)", price: 4 },
            { item: "Castle entry", price: 6 },
            { item: "Metro day pass", price: 8 },
            { item: "Ramen bowl", price: 8 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Osaka: 2-3-17 Nakanoshima",
        emergencyNumbers: ["110 (policía)", "119 (bomberos/ambulancia)"],
        hospitals: [{ name: "Osaka University Hospital", phone: "+81 6 6879 5111" }]
    }
},
{
    slug: "kanazawa",
    name: "Kanazawa",
    country: "Japón",
    tags: ["jardines", "samurái", "tradición", "tranquila", "arte"],
    preferences: ["Ciudades de cuento", "Ciudades tranquilas", "Ciudades culturales", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 88,
    summary: "La 'Pequeña Kioto' con jardines Kenroku-en, barrio de samuráis, barrio de geishas y artesanías tradicionales como la laca y la cerámica.",
    metrics: {
        dayPassFrom: 16,
        coffeeFrom: 3.2,
        coworkCount: 8,
        bestWifi: "Good",
        population: 465000,
        costOfLivingIndex: 78
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "SoftBank", hotspot: true },
            { plan: "3GB/30days", price: 22, provider: "DoCoMo", hotspot: true }
        ],
        banks: [
            { name: "Japan Post Bank", fee: "Free", fx: "Good", online: true },
            { name: "Hokuriku Bank", fee: "¥200", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Kanazawa", area: "Korimbo", price: 20, hours: "9-19", wifi: "Good" },
            { name: "Spaces Kanazawa", area: "Katamachi", price: 22, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Kanazawa", area: "Korimbo", plugs: true, wifi: "Good" },
            { name: "Doutor Coffee", area: "Katamachi", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Higashi Chaya", vibe: "Geisha district & traditional", priceIndex: "Medium" },
            { name: "Nagamachi", vibe: "Samurai houses & quiet", priceIndex: "Medium" },
            { name: "Korimbo", vibe: "Modern & convenient", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Nikko Kanazawa", nights: 2, pricePerNight: 180, fees: 15 },
            { name: "Guesthouse Pongyi", nights: 3, pricePerNight: 45, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 85,
        sampleBasket: [
            { item: "Kenroku-en garden", price: 6 },
            { item: "Gold leaf ice cream", price: 8 },
            { item: "Samurai house", price: 5 },
            { item: "Local bus pass", price: 8 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Osaka: 2-3-17 Nakanoshima",
        emergencyNumbers: ["110 (policía)", "119 (bomberos/ambulancia)"],
        hospitals: [{ name: "Kanazawa University Hospital", phone: "+81 76 265 2000" }]
    }
},
{
    slug: "takayama",
    name: "Takayama",
    country: "Japón",
    tags: ["montañas", "tradición", "sake", "tranquila", "historia"],
    preferences: ["Ciudades de cuento", "Ciudades tranquilas", "Ciudades entre montañas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 86,
    summary: "Pueblo de montaña preservado en el tiempo con casas tradicionales machiya, festivales antiguos, sake local y acceso a los Alpes Japoneses.",
    metrics: {
        dayPassFrom: 14,
        coffeeFrom: 3.0,
        coworkCount: 3,
        bestWifi: "Fair",
        population: 89000,
        costOfLivingIndex: 72
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "SoftBank", hotspot: true },
            { plan: "3GB/30days", price: 22, provider: "DoCoMo", hotspot: true }
        ],
        banks: [
            { name: "Japan Post Bank", fee: "Free", fx: "Good", online: true },
            { name: "Hachijuni Bank", fee: "¥200", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Takayama", area: "Sanmachi", price: 18, hours: "9-18", wifi: "Fair" },
            { name: "Spazio Lavoro", area: "Centro", price: 20, hours: "8-19", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Sanmachi", area: "Sanmachi", plugs: true, wifi: "Fair" },
            { name: "Doutor Coffee", area: "Station", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Sanmachi", vibe: "Traditional & historic", priceIndex: "Medium" },
            { name: "Station area", vibe: "Modern & convenient", priceIndex: "Low" },
            { name: "Hida Folk Village", vibe: "Cultural & peaceful", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Ryokan Asunaro", nights: 2, pricePerNight: 120, fees: 12 },
            { name: "Guesthouse Tomaru", nights: 3, pricePerNight: 50, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 40,
        dailyMid: 75,
        sampleBasket: [
            { item: "Hida beef", price: 25 },
            { item: "Sake tasting", price: 15 },
            { item: "Folk village", price: 8 },
            { item: "Local bus", price: 6 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Osaka: 2-3-17 Nakanoshima",
        emergencyNumbers: ["110 (policía)", "119 (bomberos/ambulancia)"],
        hospitals: [{ name: "Takayama Red Cross Hospital", phone: "+81 577 32 1111" }]
    }
},
{
    slug: "nara",
    name: "Nara",
    country: "Japón",
    tags: ["ciervos", "templos", "historia", "tranquila", "naturaleza"],
    preferences: ["Ciudades de cuento", "Ciudades tranquilas", "Ciudades históricas", "Ciudades sin turistas"],
    lastUpdated: "2025-01-03",
    score: 87,
    summary: "Primera capital de Japón con templos budistas milenarios, ciervos sagrados que deambulan libremente y el Buda más grande del país.",
    metrics: {
        dayPassFrom: 15,
        coffeeFrom: 3.0,
        coworkCount: 6,
        bestWifi: "Good",
        population: 360000,
        costOfLivingIndex: 75
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "SoftBank", hotspot: true },
            { plan: "3GB/30days", price: 22, provider: "DoCoMo", hotspot: true }
        ],
        banks: [
            { name: "Japan Post Bank", fee: "Free", fx: "Good", online: true },
            { name: "Nara Bank", fee: "¥200", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Nara", area: "Centro", price: 18, hours: "9-18", wifi: "Good" },
            { name: "Spaces Nara", area: "Nara Park", price: 20, hours: "8-19", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Nara", area: "Centro", plugs: true, wifi: "Good" },
            { name: "Doutor Coffee", area: "Station", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro", vibe: "Historic & convenient", priceIndex: "Medium" },
            { name: "Nara Park", vibe: "Nature & temples", priceIndex: "Medium" },
            { name: "Station area", vibe: "Modern & accessible", priceIndex: "Low" }
        ],
        deals: [
            { name: "Hotel Nara", nights: 2, pricePerNight: 140, fees: 15 },
            { name: "Guesthouse Nara", nights: 3, pricePerNight: 60, fees: 8 }
        ]
    },
    budget: {
        dailyLow: 42,
        dailyMid: 80,
        sampleBasket: [
            { item: "Todaiji Temple", price: 8 },
            { item: "Deer crackers", price: 2 },
            { item: "Local bus", price: 6 },
            { item: "Matcha ice cream", price: 4 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Osaka: 2-3-17 Nakanoshima",
        emergencyNumbers: ["110 (policía)", "119 (bomberos/ambulancia)"],
        hospitals: [{ name: "Nara Medical University Hospital", phone: "+81 744 22 3051" }]
    }
},
{
    slug: "hiroshima",
    name: "Hiroshima",
    country: "Japón",
    tags: ["historia", "paz", "cultura", "moderna", "islas"],
    preferences: ["Ciudades históricas", "Ciudades culturales", "Ciudades sin turistas", "Ciudades tranquilas"],
    lastUpdated: "2025-01-03",
    score: 85,
    summary: "Ciudad de paz y reconciliación con el Parque Memorial, isla de Miyajima, okonomiyaki local y espíritu de superación.",
    metrics: {
        dayPassFrom: 16,
        coffeeFrom: 3.2,
        coworkCount: 18,
        bestWifi: "Good",
        population: 1200000,
        costOfLivingIndex: 78
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "SoftBank", hotspot: true },
            { plan: "3GB/30days", price: 22, provider: "DoCoMo", hotspot: true }
        ],
        banks: [
            { name: "Japan Post Bank", fee: "Free", fx: "Good", online: true },
            { name: "Hiroshima Bank", fee: "¥200", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Hiroshima", area: "Centro", price: 20, hours: "9-19", wifi: "Good" },
            { name: "Spaces Hiroshima", area: "Peace Park", price: 22, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Hiroshima", area: "Centro", plugs: true, wifi: "Good" },
            { name: "Doutor Coffee", area: "Station", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro", vibe: "Modern & convenient", priceIndex: "Medium" },
            { name: "Peace Park", vibe: "Memorial & peaceful", priceIndex: "Medium" },
            { name: "Station area", vibe: "Business & accessible", priceIndex: "Low" }
        ],
        deals: [
            { name: "Hotel Granvia Hiroshima", nights: 2, pricePerNight: 160, fees: 18 },
            { name: "Guesthouse Hiroshima", nights: 3, pricePerNight: 70, fees: 10 }
        ]
    },
    budget: {
        dailyLow: 45,
        dailyMid: 85,
        sampleBasket: [
            { item: "Peace Museum", price: 0 },
            { item: "Okonomiyaki", price: 12 },
            { item: "Miyajima ferry", price: 8 },
            { item: "Local tram", price: 6 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Osaka: 2-3-17 Nakanoshima",
        emergencyNumbers: ["110 (policía)", "119 (bomberos/ambulancia)"],
        hospitals: [{ name: "Hiroshima University Hospital", phone: "+81 82 257 5555" }]
    }
},
{
    slug: "fukuoka",
    name: "Fukuoka",
    country: "Japón",
    tags: ["ramen", "playas", "moderna", "gastronomía", "cultura"],
    preferences: ["Ciudades gastronómicas", "Ciudades culturales", "Ciudades cosmopolitas", "Playas increíbles"],
    lastUpdated: "2025-01-03",
    score: 84,
    summary: "Ciudad portuaria moderna con el mejor ramen de Japón, playas urbanas, yatai (puestos callejeros) y ambiente juvenil.",
    metrics: {
        dayPassFrom: 17,
        coffeeFrom: 3.3,
        coworkCount: 25,
        bestWifi: "Excellent",
        population: 1600000,
        costOfLivingIndex: 80
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "SoftBank", hotspot: true },
            { plan: "3GB/30days", price: 22, provider: "DoCoMo", hotspot: true }
        ],
        banks: [
            { name: "Japan Post Bank", fee: "Free", fx: "Good", online: true },
            { name: "Fukuoka Bank", fee: "¥200", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Fukuoka", area: "Centro", price: 24, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Fukuoka", area: "Hakata", price: 26, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Fukuoka", area: "Centro", plugs: true, wifi: "Excellent" },
            { name: "Doutor Coffee", area: "Hakata", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro", vibe: "Modern & business", priceIndex: "Medium" },
            { name: "Hakata", vibe: "Historic & foodie", priceIndex: "Medium" },
            { name: "Tenjin", vibe: "Shopping & entertainment", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Nikko Fukuoka", nights: 2, pricePerNight: 180, fees: 20 },
            { name: "Guesthouse Fukuoka", nights: 3, pricePerNight: 80, fees: 12 }
        ]
    },
    budget: {
        dailyLow: 48,
        dailyMid: 88,
        sampleBasket: [
            { item: "Tonkotsu ramen", price: 10 },
            { item: "Beach day", price: 0 },
            { item: "Yatai dinner", price: 15 },
            { item: "Subway pass", price: 6 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Osaka: 2-3-17 Nakanoshima",
        emergencyNumbers: ["110 (policía)", "119 (bomberos/ambulancia)"],
        hospitals: [{ name: "Fukuoka University Hospital", phone: "+81 92 801 1011" }]
    }
},
{
    slug: "sapporo",
    name: "Sapporo",
    country: "Japón",
    tags: ["cerveza", "nieve", "montañas", "gastronomía", "naturaleza"],
    preferences: ["Ciudades gastronómicas", "Ciudades entre montañas", "Ciudades sin turistas", "Ciudades tranquilas"],
    lastUpdated: "2025-01-03",
    score: 83,
    summary: "Capital de Hokkaido famosa por su cerveza, festival de nieve, ramen miso y acceso a estaciones de esquí de clase mundial.",
    metrics: {
        dayPassFrom: 18,
        coffeeFrom: 3.5,
        coworkCount: 20,
        bestWifi: "Good",
        population: 1900000,
        costOfLivingIndex: 82
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "SoftBank", hotspot: true },
            { plan: "3GB/30days", price: 22, provider: "DoCoMo", hotspot: true }
        ],
        banks: [
            { name: "Japan Post Bank", fee: "Free", fx: "Good", online: true },
            { name: "Hokkaido Bank", fee: "¥200", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Cowork Sapporo", area: "Centro", price: 22, hours: "9-19", wifi: "Good" },
            { name: "Spaces Sapporo", area: "Susukino", price: 24, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Sapporo", area: "Centro", plugs: true, wifi: "Good" },
            { name: "Doutor Coffee", area: "Susukino", plugs: true, wifi: "Fair" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro", vibe: "Modern & convenient", priceIndex: "Medium" },
            { name: "Susukino", vibe: "Entertainment & nightlife", priceIndex: "Medium" },
            { name: "Odori", vibe: "Park & cultural", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Gracery Sapporo", nights: 2, pricePerNight: 170, fees: 20 },
            { name: "Guesthouse Sapporo", nights: 3, pricePerNight: 85, fees: 12 }
        ]
    },
    budget: {
        dailyLow: 50,
        dailyMid: 90,
        sampleBasket: [
            { item: "Sapporo beer", price: 8 },
            { item: "Miso ramen", price: 12 },
            { item: "Ski pass", price: 60 },
            { item: "Subway pass", price: 7 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Osaka: 2-3-17 Nakanoshima",
        emergencyNumbers: ["110 (policía)", "119 (bomberos/ambulancia)"],
        hospitals: [{ name: "Sapporo Medical University Hospital", phone: "+81 11 611 2111" }]
    }
},
{
    slug: "nagoya",
    name: "Nagoya",
    country: "Japón",
    tags: ["industria", "castillo", "gastronomía", "moderna", "cultura"],
    preferences: ["Ciudades culturales", "Ciudades gastronómicas", "Ciudades sin turistas", "Ciudades cosmopolitas"],
    lastUpdated: "2025-01-03",
    score: 82,
    summary: "Centro industrial de Japón con castillo reconstruido, miso local, Toyota y una mezcla perfecta de tradición y modernidad.",
    metrics: {
        dayPassFrom: 19,
        coffeeFrom: 3.4,
        coworkCount: 30,
        bestWifi: "Excellent",
        population: 2300000,
        costOfLivingIndex: 85
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 8, provider: "SoftBank", hotspot: true },
            { plan: "3GB/30days", price: 22, provider: "DoCoMo", hotspot: true }
        ],
        banks: [
            { name: "Japan Post Bank", fee: "Free", fx: "Good", online: true },
            { name: "Nagoya Bank", fee: "¥200", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "WeWork Nagoya", area: "Centro", price: 26, hours: "24/7", wifi: "Excellent" },
            { name: "Spaces Nagoya", area: "Sakae", price: 28, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Café Nagoya", area: "Centro", plugs: true, wifi: "Excellent" },
            { name: "Doutor Coffee", area: "Sakae", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Centro", vibe: "Business & modern", priceIndex: "Medium" },
            { name: "Sakae", vibe: "Shopping & entertainment", priceIndex: "Medium" },
            { name: "Castle area", vibe: "Historic & cultural", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Nagoya Castle", nights: 2, pricePerNight: 190, fees: 22 },
            { name: "Guesthouse Nagoya", nights: 3, pricePerNight: 90, fees: 15 }
        ]
    },
    budget: {
        dailyLow: 52,
        dailyMid: 95,
        sampleBasket: [
            { item: "Castle entry", price: 8 },
            { item: "Miso katsu", price: 15 },
            { item: "Subway pass", price: 7 },
            { item: "Toyota museum", price: 0 }
        ]
    },
    emergency: {
        embassy: "Consulado de España en Osaka: 2-3-17 Nakanoshima",
        emergencyNumbers: ["110 (policía)", "119 (bomberos/ambulancia)"],
        hospitals: [{ name: "Nagoya University Hospital", phone: "+81 52 741 2111" }]
    }
},
{
    slug: "reykjavik",
    name: "Reikiavik",
    country: "Islandia",
    tags: ["aventura", "naturaleza", "aurora", "géiseres", "único"],
    preferences: ["Ciudades de aventura", "Ciudades sin turistas", "Ciudades tranquilas", "Ciudades de cuento", "Ciudades entre montañas"],
    lastUpdated: "2025-01-03",
    score: 87,
    summary: "Capital nórdica única con naturaleza espectacular, auroras boreales, géiseres y la cultura vikinga moderna.",
    metrics: {
        dayPassFrom: 35,
        coffeeFrom: 5,
        coworkCount: 8,
        bestWifi: "Excellent",
        population: 135000,
        costOfLivingIndex: 110
    },
    essentials: {
        esim: [
            { plan: "1GB/7days", price: 12, provider: "Siminn", hotspot: true },
            { plan: "5GB/30days", price: 30, provider: "Nova", hotspot: true }
        ],
        banks: [
            { name: "Landsbankinn", fee: "Free", fx: "Good", online: true },
            { name: "Arion Bank", fee: "1000 ISK", fx: "Good", online: true }
        ]
    },
    work: {
        coworks: [
            { name: "Startup Reykjavik", area: "Downtown", price: 40, hours: "9-17", wifi: "Excellent" },
            { name: "Klak", area: "Hafnarfjörður", price: 30, hours: "8-20", wifi: "Good" }
        ],
        cafes: [
            { name: "Reykjavik Roasters", area: "Downtown", plugs: true, wifi: "Excellent" },
            { name: "Café Paris", area: "Austurstræti", plugs: true, wifi: "Good" }
        ]
    },
    stay: {
        areas: [
            { name: "Downtown", vibe: "Vibrant center", priceIndex: "Very High" },
            { name: "Laugardalur", vibe: "Quiet residential", priceIndex: "High" },
            { name: "Hafnarfjörður", vibe: "Suburban charm", priceIndex: "Medium" }
        ],
        deals: [
            { name: "Hotel Borg", nights: 2, pricePerNight: 250, fees: 20 },
            { name: "KEX Hostel", nights: 3, pricePerNight: 60, fees: 5 }
        ]
    },
    budget: {
        dailyLow: 70,
        dailyMid: 140,
        sampleBasket: [
            { item: "Northern Lights tour", price: 80 },
            { item: "Hot dog", price: 4 },
            { item: "Blue Lagoon", price: 60 },
            { item: "Local beer", price: 12 }
        ]
    },
    emergency: {
        embassy: "Embajada de España en Copenhague (cubre Islandia)",
        emergencyNumbers: ["112"],
        hospitals: [{ name: "Landspítali University Hospital", phone: "+354 543 1000" }]
    }
}

// ... continuar con el resto de ciudades existentes
];

export function findCity(slug: string) { return CITIES.find(c => c.slug === slug); }

// Función para obtener países únicos disponibles en nuestras ciudades
export function getAvailableCountries(): string[] {
  const countries = [...new Set(CITIES.map(city => city.country))];
  return countries.sort();
}