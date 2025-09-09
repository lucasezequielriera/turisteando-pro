// Foursquare API service for places data
// Documentation: https://docs.foursquare.com/fsq-developers-places/reference/

const FOURSQUARE_CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID;
const FOURSQUARE_CLIENT_SECRET = process.env.FOURSQUARE_CLIENT_SECRET;
const FOURSQUARE_BASE_URL = 'https://api.foursquare.com/v2';

export interface FoursquarePlace {
  id: string;
  name: string;
  categories: Array<{
    id: string;
    name: string;
    icon: {
      prefix: string;
      suffix: string;
    };
  }>;
  location: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    crossStreet?: string;
    formattedAddress?: string[];
    lat?: number;
    lng?: number;
  };
  rating?: number;
  price?: {
    tier: number;
    message: string;
  };
  features?: {
    wifi?: boolean;
    power_outlets?: boolean;
    coffee?: boolean;
    outdoor_seating?: boolean;
    meeting_rooms?: boolean;
    gym?: boolean;
  };
  tips?: {
    groups: Array<{
      items: Array<{
        text: string;
        agreeCount: number;
        disagreeCount: number;
      }>;
    }>;
  };
  hours?: {
    status: string;
    isOpen: boolean;
    timeframes: Array<{
      days: string;
      open: Array<{
        renderedTime: string;
      }>;
    }>;
  };
  stats?: {
    checkinsCount: number;
    usersCount: number;
    tipCount: number;
  };
  venuePage?: {
    id: string;
  };
}

export interface FoursquareSearchParams {
  query?: string;
  near?: string;
  ll?: string;
  radius?: number;
  categoryId?: string;
  limit?: number;
  sort?: 'RATING' | 'POPULARITY' | 'DISTANCE';
}

export interface FoursquareSearchResponse {
  response: {
    venues: FoursquarePlace[];
    geocode: {
      center: {
        lat: number;
        lng: number;
      };
      bounds: {
        ne: { lat: number; lng: number };
        sw: { lat: number; lng: number };
      };
    };
  };
}

export interface FoursquareCategory {
  id: string;
  name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
  categories?: FoursquareCategory[];
}

export class FoursquareService {
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.clientId = FOURSQUARE_CLIENT_ID || '';
    this.clientSecret = FOURSQUARE_CLIENT_SECRET || '';
  }

  isConfigured(): boolean {
    return !!(this.clientId && this.clientSecret);
  }

  private async makeRequest(endpoint: string, params?: Record<string, string>): Promise<Response> {
    const url = new URL(`${FOURSQUARE_BASE_URL}${endpoint}`);
    
    // Add client_id and client_secret for v2 API
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('client_secret', this.clientSecret);
    url.searchParams.append('v', '20240801'); // API version
    
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
      throw new Error(`Foursquare API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  async searchPlaces(params: FoursquareSearchParams): Promise<FoursquareSearchResponse> {
    const searchParams: Record<string, string> = {};
    
    if (params.query) searchParams.query = params.query;
    if (params.near) searchParams.near = params.near;
    if (params.ll) searchParams.ll = params.ll;
    if (params.radius) searchParams.radius = params.radius.toString();
    if (params.categoryId) searchParams.categoryId = params.categoryId;
    if (params.limit) searchParams.limit = params.limit.toString();
    if (params.sort) searchParams.sort = params.sort;

    const response = await this.makeRequest('/venues/search', searchParams);
    return response.json();
  }

  async searchCafes(cityName: string, countryCode?: string): Promise<FoursquarePlace[]> {
    const searchParams: Record<string, string> = {
      near: countryCode ? `${cityName},${countryCode}` : cityName,
      categoryId: '4bf58dd8d48988d1e0931735,4bf58dd8d48988d16d941735', // Coffee shops, cafes
      limit: '10'
    };

    try {
      const response = await this.searchPlaces(searchParams);
      return response.response.venues || [];
    } catch (error) {
      console.error(`Error searching cafes in ${cityName}:`, error);
      return [];
    }
  }

  async searchCoworkingSpaces(cityName: string, countryCode?: string): Promise<FoursquarePlace[]> {
    const searchParams: Record<string, string> = {
      near: countryCode ? `${cityName},${countryCode}` : cityName,
      query: 'coworking space',
      limit: '10'
    };

    try {
      const response = await this.searchPlaces(searchParams);
      return response.response.venues || [];
    } catch (error) {
      console.error(`Error searching coworking spaces in ${cityName}:`, error);
      return [];
    }
  }

  async searchRestaurants(cityName: string, countryCode?: string, cuisine?: string): Promise<FoursquarePlace[]> {
    const searchParams: Record<string, string> = {
      near: countryCode ? `${cityName},${countryCode}` : cityName,
      categoryId: '4d4b7105d754a06374d81259', // Restaurants
      limit: '10'
    };

    if (cuisine) {
      searchParams.query = cuisine;
    }

    try {
      const response = await this.searchPlaces(searchParams);
      return response.response.venues || [];
    } catch (error) {
      console.error(`Error searching restaurants in ${cityName}:`, error);
      return [];
    }
  }

  async getPlaceDetails(fsqId: string): Promise<FoursquarePlace> {
    const response = await this.makeRequest(`/venues/${fsqId}`);
    return response.json();
  }

  async getCategories(): Promise<FoursquareCategory[]> {
    const response = await this.makeRequest('/venues/categories');
    return response.json();
  }

  async getNearbyPlaces(lat: number, lng: number, radius: number = 1000): Promise<FoursquarePlace[]> {
    const searchParams: Record<string, string> = {
      ll: `${lat},${lng}`,
      radius: radius.toString(),
      limit: '20'
    };

    try {
      const response = await this.searchPlaces(searchParams);
      return response.response.venues || [];
    } catch (error) {
      console.error('Error searching nearby places:', error);
      return [];
    }
  }

  async getBestRatedPlaces(cityName: string, category: string, limit: number = 10): Promise<FoursquarePlace[]> {
    const searchParams: Record<string, string> = {
      near: cityName,
      query: category,
      limit: limit.toString()
    };

    try {
      const response = await this.searchPlaces(searchParams);
      return response.response.venues || [];
    } catch (error) {
      console.error(`Error searching best rated places in ${cityName}:`, error);
      return [];
    }
  }

  async getPlacesWithFeatures(cityName: string, features: string[]): Promise<FoursquarePlace[]> {
    const allPlaces = await this.searchPlaces({
      near: cityName,
      limit: 50
    });
    
    const venues = allPlaces.response.venues || [];
    return venues.filter(place => {
      if (!place.features) return false;
      return features.some(feature => 
        place.features && place.features[feature as keyof typeof place.features]
      );
    });
  }
}

// Singleton instance
export const foursquareService = new FoursquareService();
