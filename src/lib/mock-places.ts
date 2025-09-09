// Mock Places Service - Provides realistic data while APIs are being configured
// This gives users immediate value while we set up real APIs

export interface MockPlace {
  id: string;
  name: string;
  type: 'cafe' | 'coworking' | 'restaurant';
  rating: number;
  price: '€' | '€€' | '€€€';
  address: string;
  features: string[];
  description: string;
  openNow: boolean;
}

export interface MockPlacesData {
  cafes: MockPlace[];
  coworking: MockPlace[];
  restaurants: MockPlace[];
}

// Realistic mock data for Madrid
const MADRID_PLACES: MockPlacesData = {
  cafes: [
    {
      id: 'cafe_1',
      name: 'Café Central Madrid',
      type: 'cafe',
      rating: 4.7,
      price: '€€',
      address: 'Calle Gran Vía, 1, Madrid',
      features: ['WiFi', 'Enchufes', 'Café de especialidad', 'Terraza'],
      description: 'Café histórico con ambiente perfecto para trabajar',
      openNow: true
    },
    {
      id: 'cafe_2',
      name: 'Flat White Studio',
      type: 'cafe',
      rating: 4.9,
      price: '€€',
      address: 'Calle Malasaña, 15, Madrid',
      features: ['WiFi rápido', 'Enchufes', 'Café artesanal', 'Terraza'],
      description: 'El mejor flat white de Madrid, ideal para nómadas',
      openNow: true
    },
    {
      id: 'cafe_3',
      name: 'Toma Café',
      type: 'cafe',
      rating: 4.6,
      price: '€',
      address: 'Calle de la Palma, 49, Madrid',
      features: ['WiFi', 'Café de origen', 'Precio económico'],
      description: 'Café de barrio con excelente relación calidad-precio',
      openNow: true
    }
  ],
  coworking: [
    {
      id: 'cowork_1',
      name: 'WeWork Gran Vía',
      type: 'coworking',
      rating: 4.8,
      price: '€€€',
      address: 'Gran Vía, 28, Madrid',
      features: ['WiFi ultra-rápido', 'Sala de reuniones', 'Gimnasio', 'Café gratis'],
      description: 'Espacio premium con todas las comodidades para empresas',
      openNow: true
    },
    {
      id: 'cowork_2',
      name: 'Impact Hub Madrid',
      type: 'coworking',
      rating: 4.5,
      price: '€€',
      address: 'Calle Alameda, 22, Madrid',
      features: ['WiFi', 'Eventos', 'Comunidad', 'Sala de eventos'],
      description: 'Espacio colaborativo para emprendedores sociales',
      openNow: true
    },
    {
      id: 'cowork_3',
      name: 'La Terminal',
      type: 'coworking',
      rating: 4.3,
      price: '€€',
      address: 'Calle de la Princesa, 1, Madrid',
      features: ['WiFi', 'Terraza', 'Bar', 'Vistas panorámicas'],
      description: 'Coworking con las mejores vistas de Madrid',
      openNow: true
    }
  ],
  restaurants: [
    {
      id: 'rest_1',
      name: 'Restaurante La Bola',
      type: 'restaurant',
      rating: 4.6,
      price: '€€€',
      address: 'Calle de la Bola, 5, Madrid',
      features: ['Cocina tradicional', 'Terraza', 'Reservas online'],
      description: 'Cocina madrileña tradicional en ambiente familiar',
      openNow: true
    },
    {
      id: 'rest_2',
      name: 'Pescaderías Coruñesas',
      type: 'restaurant',
      rating: 4.4,
      price: '€€',
      address: 'Calle de la Cava Baja, 12, Madrid',
      features: ['Mariscos frescos', 'Terraza', 'Vino de la casa'],
      description: 'Los mejores mariscos de Galicia en Madrid',
      openNow: true
    },
    {
      id: 'rest_3',
      name: 'Casa Lucio',
      type: 'restaurant',
      rating: 4.7,
      price: '€€€',
      address: 'Calle Cava Baja, 35, Madrid',
      features: ['Huevos rotos', 'Tradicional', 'Famoso'],
      description: 'Famoso por sus huevos rotos, visita obligada',
      openNow: true
    }
  ]
};

// Mock data for other cities
const CITY_PLACES: Record<string, MockPlacesData> = {
  'barcelona': {
    cafes: [
      {
        id: 'bcn_cafe_1',
        name: 'Nomad Coffee',
        type: 'cafe',
        rating: 4.8,
        price: '€€',
        address: 'Carrer de Pujades, 95, Barcelona',
        features: ['WiFi', 'Café de especialidad', 'Nómadas'],
        description: 'Café favorito de nómadas digitales en Barcelona',
        openNow: true
      }
    ],
    coworking: [
      {
        id: 'bcn_cowork_1',
        name: 'Betahaus Barcelona',
        type: 'coworking',
        rating: 4.6,
        price: '€€',
        address: 'Carrer de Vilafranca, 7, Barcelona',
        features: ['WiFi', 'Comunidad', 'Eventos'],
        description: 'Espacio colaborativo en el corazón de Gràcia',
        openNow: true
      }
    ],
    restaurants: [
      {
        id: 'bcn_rest_1',
        name: 'El Xampanyet',
        type: 'restaurant',
        rating: 4.5,
        price: '€€',
        address: 'Carrer de Montcada, 22, Barcelona',
        features: ['Tapas', 'Champagne', 'Histórico'],
        description: 'Bar histórico famoso por sus tapas y cava',
        openNow: true
      }
    ]
  },
  'valencia': {
    cafes: [
      {
        id: 'val_cafe_1',
        name: 'Café de las Horas',
        type: 'cafe',
        rating: 4.4,
        price: '€€',
        address: 'Carrer de l\'Abadia de Sant Martí, 8, Valencia',
        features: ['WiFi', 'Terraza', 'Horchata'],
        description: 'Café con la mejor horchata de Valencia',
        openNow: true
      }
    ],
    coworking: [
      {
        id: 'val_cowork_1',
        name: 'La Marina Coworking',
        type: 'coworking',
        rating: 4.3,
        price: '€€',
        address: 'Carrer de la Marina, 15, Valencia',
        features: ['WiFi', 'Vistas al mar', 'Terraza'],
        description: 'Coworking con vistas al Mediterráneo',
        openNow: true
      }
    ],
    restaurants: [
      {
        id: 'val_rest_1',
        name: 'La Paella de la Reina',
        type: 'restaurant',
        rating: 4.6,
        price: '€€€',
        address: 'Carrer de la Reina, 12, Valencia',
        features: ['Paella', 'Tradicional', 'Terraza'],
        description: 'La mejor paella valenciana auténtica',
        openNow: true
      }
    ]
  }
};

export class MockPlacesService {
  constructor() {
    // Always configured
  }

  isConfigured(): boolean {
    return true;
  }

  async searchCafes(cityName: string, countryCode?: string): Promise<MockPlace[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const city = cityName.toLowerCase();
    if (CITY_PLACES[city]) {
      return CITY_PLACES[city].cafes;
    }
    
    // Default to Madrid data
    return MADRID_PLACES.cafes;
  }

  async searchCoworkingSpaces(cityName: string, countryCode?: string): Promise<MockPlace[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const city = cityName.toLowerCase();
    if (CITY_PLACES[city]) {
      return CITY_PLACES[city].coworking;
    }
    
    return MADRID_PLACES.coworking;
  }

  async searchRestaurants(cityName: string, countryCode?: string, cuisine?: string): Promise<MockPlace[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const city = cityName.toLowerCase();
    if (CITY_PLACES[city]) {
      return CITY_PLACES[city].restaurants;
    }
    
    return MADRID_PLACES.restaurants;
  }

  async searchPlaces(params: { name: string; limit?: number }): Promise<MockPlace[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const city = params.name.toLowerCase();
    if (CITY_PLACES[city]) {
      const allPlaces = [
        ...CITY_PLACES[city].cafes,
        ...CITY_PLACES[city].coworking,
        ...CITY_PLACES[city].restaurants
      ];
      return allPlaces.slice(0, params.limit || 20);
    }
    
    const allPlaces = [
      ...MADRID_PLACES.cafes,
      ...MADRID_PLACES.coworking,
      ...MADRID_PLACES.restaurants
    ];
    return allPlaces.slice(0, params.limit || 20);
  }

  // Helper methods
  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  }

  getPriceLabel(price: string): string {
    return price;
  }

  getFeaturesIcons(features: string[]): string {
    const iconMap: Record<string, string> = {
      'WiFi': '📶',
      'Enchufes': '🔌',
      'Café de especialidad': '☕',
      'Terraza': '🌳',
      'Sala de reuniones': '💼',
      'Gimnasio': '💪',
      'Café gratis': '☕',
      'Eventos': '🎉',
      'Comunidad': '👥',
      'Vistas panorámicas': '🏙️',
      'Cocina tradicional': '🍽️',
      'Reservas online': '📱',
      'Mariscos frescos': '🦐',
      'Vino de la casa': '🍷',
      'Huevos rotos': '🍳',
      'Famoso': '⭐',
      'Nómadas': '🌍',
      'Histórico': '🏛️',
      'Vistas al mar': '🌊',
      'Paella': '🥘',
      'Tradicional': '🏺',
      'Horchata': '🥤'
    };

    return features.map(feature => iconMap[feature] || '✨').join(' ');
  }
}

// Singleton instance
export const mockPlacesService = new MockPlacesService();
