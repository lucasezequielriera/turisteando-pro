// OpenTripMap API service for places data
// Documentation: https://opentripmap.io/docs
// No API key required - completely free!

const OPENTRIPMAP_BASE_URL = 'https://api.opentripmap.com/0.1/en/places';

export interface OpenTripMapPlace {
  xid: string;
  name: string;
  rate: number;
  osm_type: string;
  osm_id: string;
  kinds: string;
  point: {
    lon: number;
    lat: number;
  };
  bbox?: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
  // Additional details when fetched individually
  wikipedia?: string;
  image?: string;
  url?: string;
  otm?: string;
  sources?: {
    geometry: string;
    attributes: string[];
  };
  address?: {
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    road?: string;
    house_number?: string;
  };
  preview?: {
    source: string;
    height: number;
    width: number;
  };
}

export interface OpenTripMapSearchParams {
  name?: string;
  kinds?: string;
  rate?: number;
  format?: 'json' | 'geojson';
  limit?: number;
  radius?: number;
  lon?: number;
  lat?: number;
  bbox?: string;
}

export interface OpenTripMapSearchResponse {
  features: OpenTripMapPlace[];
  type: string;
}

export interface OpenTripMapPlaceDetails extends OpenTripMapPlace {
  wikipedia_extracts?: {
    title: string;
    text: string;
    html: string;
  };
  image?: string;
  url?: string;
  otm?: string;
  sources?: {
    geometry: string;
    attributes: string[];
  };
  address?: {
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    road?: string;
    house_number?: string;
  };
  preview?: {
    source: string;
    height: number;
    width: number;
  };
}

export class OpenTripMapService {
  constructor() {
    // No API key needed for OpenTripMap!
  }

  isConfigured(): boolean {
    return true; // Always configured since no API key needed
  }

  private async makeRequest(endpoint: string, params?: Record<string, string>): Promise<Response> {
    const url = new URL(`${OPENTRIPMAP_BASE_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Turisteando-Ciudades/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`OpenTripMap API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  async searchPlaces(params: OpenTripMapSearchParams): Promise<OpenTripMapPlace[]> {
    const searchParams: Record<string, string> = {};
    
    if (params.name) searchParams.name = params.name;
    if (params.kinds) searchParams.kinds = params.kinds;
    if (params.rate) searchParams.rate = params.rate.toString();
    if (params.format) searchParams.format = params.format;
    if (params.limit) searchParams.limit = params.limit.toString();
    if (params.radius) searchParams.radius = params.radius.toString();
    if (params.lon) searchParams.lon = params.lon.toString();
    if (params.lat) searchParams.lat = params.lat.toString();
    if (params.bbox) searchParams.bbox = params.bbox;

    const response = await this.makeRequest('/autosuggest', searchParams);
    return response.json();
  }

  async searchCafes(cityName: string, countryCode?: string): Promise<OpenTripMapPlace[]> {
    const searchParams: Record<string, string> = {
      name: cityName,
      kinds: 'cafes,coffee_shops,restaurants',
      rate: '3',
      limit: '20',
      format: 'json'
    };

    try {
      const results = await this.searchPlaces(searchParams);
      return results.filter(place => 
        place.kinds.includes('cafes') || 
        place.kinds.includes('coffee_shops')
      );
    } catch (error) {
      console.error(`Error searching cafes in ${cityName}:`, error);
      return [];
    }
  }

  async searchCoworkingSpaces(cityName: string, countryCode?: string): Promise<OpenTripMapPlace[]> {
    const searchParams: Record<string, string> = {
      name: cityName,
      kinds: 'offices,commercial,industrial',
      rate: '3',
      limit: '20',
      format: 'json'
    };

    try {
      const results = await this.searchPlaces(searchParams);
      return results.filter(place => 
        place.kinds.includes('offices') || 
        place.kinds.includes('commercial')
      );
    } catch (error) {
      console.error(`Error searching coworking spaces in ${cityName}:`, error);
      return [];
    }
  }

  async searchRestaurants(cityName: string, countryCode?: string, cuisine?: string): Promise<OpenTripMapPlace[]> {
    const searchParams: Record<string, string> = {
      name: cityName,
      kinds: 'restaurants,food_courts,fast_food',
      rate: '3',
      limit: '20',
      format: 'json'
    };

    try {
      const results = await this.searchPlaces(searchParams);
      return results.filter(place => 
        place.kinds.includes('restaurants') || 
        place.kinds.includes('food_courts')
      );
    } catch (error) {
      console.error(`Error searching restaurants in ${cityName}:`, error);
      return [];
    }
  }

  async getPlaceDetails(xid: string): Promise<OpenTripMapPlaceDetails> {
    const response = await this.makeRequest(`/xid/${xid}`);
    return response.json();
  }

  async searchNearbyPlaces(lat: number, lon: number, radius: number = 1000, kinds?: string): Promise<OpenTripMapPlace[]> {
    const searchParams: Record<string, string> = {
      lon: lon.toString(),
      lat: lat.toString(),
      radius: radius.toString(),
      limit: '20',
      format: 'json'
    };
    
    if (kinds) searchParams.kinds = kinds;

    try {
      const results = await this.searchPlaces(searchParams);
      return results;
    } catch (error) {
      console.error('Error searching nearby places:', error);
      return [];
    }
  }

  async getBestRatedPlaces(cityName: string, category: string, limit: number = 10): Promise<OpenTripMapPlace[]> {
    const searchParams: Record<string, string> = {
      name: cityName,
      kinds: category,
      rate: '3',
      limit: limit.toString(),
      format: 'json'
    };

    try {
      const results = await this.searchPlaces(searchParams);
      return results
        .filter(place => place.rate >= 3)
        .sort((a, b) => b.rate - a.rate)
        .slice(0, limit);
    } catch (error) {
      console.error(`Error searching best rated places in ${cityName}:`, error);
      return [];
    }
  }

  async searchPlacesWithFeatures(cityName: string, features: string[]): Promise<OpenTripMapPlace[]> {
    const allPlaces = await this.searchPlaces({
      name: cityName,
      limit: 50,
      format: 'json'
    });
    
    return allPlaces.filter(place => {
      return features.some(feature => 
        place.kinds.includes(feature)
      );
    });
  }

  // Helper method to get rating stars
  getRatingStars(rate?: number): string {
    if (!rate) return 'N/A';
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  }

  // Helper method to get place type label
  getPlaceTypeLabel(kinds: string): string {
    const typeMap: Record<string, string> = {
      'cafes': 'Café',
      'coffee_shops': 'Café',
      'restaurants': 'Restaurante',
      'food_courts': 'Food Court',
      'fast_food': 'Fast Food',
      'offices': 'Oficina',
      'commercial': 'Comercial',
      'industrial': 'Industrial',
      'historic': 'Histórico',
      'cultural': 'Cultural',
      'museums': 'Museo',
      'theatres_and_entertainments': 'Entretenimiento',
      'tourist_facilities': 'Turístico',
      'shops': 'Tienda',
      'sport': 'Deportes',
      'natural': 'Natural'
    };

    const primaryType = kinds.split(',')[0];
    return typeMap[primaryType] || primaryType.replace(/_/g, ' ');
  }

  // Helper method to get address string
  getAddressString(place: OpenTripMapPlace): string {
    if (!place.address) return place.name;
    
    const parts = [];
    if (place.address.road) parts.push(place.address.road);
    if (place.address.city) parts.push(place.address.city);
    if (place.address.state) parts.push(place.address.state);
    if (place.address.country) parts.push(place.address.country);
    
    return parts.length > 0 ? parts.join(', ') : place.name;
  }
}

// Singleton instance
export const openTripMapService = new OpenTripMapService();
