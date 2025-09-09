// Google Places API service for places data
// Documentation: https://developers.google.com/maps/documentation/places/web-service

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export interface GooglePlace {
  place_id: string;
  name: string;
  types: string[];
  vicinity: string;
  rating?: number;
  price_level?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_address?: string;
  international_phone_number?: string;
  website?: string;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
  // Custom fields for our app
  features?: {
    wifi?: boolean;
    power_outlets?: boolean;
    coffee?: boolean;
    outdoor_seating?: boolean;
    meeting_rooms?: boolean;
    gym?: boolean;
  };
}

export interface GooglePlacesSearchParams {
  query?: string;
  location?: string;
  radius?: number;
  type?: string;
  keyword?: string;
  maxprice?: number;
  opennow?: boolean;
  pagetoken?: string;
}

export interface GooglePlacesSearchResponse {
  results: GooglePlace[];
  next_page_token?: string;
  status: string;
  html_attributions: string[];
}

export interface GooglePlaceDetails {
  result: GooglePlace;
  status: string;
  html_attributions: string[];
}

export class GooglePlacesService {
  private apiKey: string;

  constructor() {
    this.apiKey = GOOGLE_PLACES_API_KEY || '';
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  private async makeRequest(endpoint: string, params: Record<string, string>): Promise<Response> {
    const url = new URL(`${GOOGLE_PLACES_BASE_URL}${endpoint}`);
    
    // Add API key
    params.key = this.apiKey;
    
    // Add parameters to URL
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Turisteando-Ciudades/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  async searchPlaces(params: GooglePlacesSearchParams): Promise<GooglePlacesSearchResponse> {
    const searchParams: Record<string, string> = {};
    
    if (params.query) searchParams.query = params.query;
    if (params.location) searchParams.location = params.location;
    if (params.radius) searchParams.radius = params.radius.toString();
    if (params.type) searchParams.type = params.type;
    if (params.keyword) searchParams.keyword = params.keyword;
    if (params.maxprice) searchParams.maxprice = params.maxprice.toString();
    if (params.opennow) searchParams.opennow = 'true';
    if (params.pagetoken) searchParams.pagetoken = params.pagetoken;

    const response = await this.makeRequest('/textsearch/json', searchParams);
    return response.json();
  }

  async searchNearbyPlaces(lat: number, lng: number, radius: number = 1000, type?: string): Promise<GooglePlacesSearchResponse> {
    const searchParams: Record<string, string> = {
      location: `${lat},${lng}`,
      radius: radius.toString()
    };
    
    if (type) searchParams.type = type;

    const response = await this.makeRequest('/nearbysearch/json', searchParams);
    return response.json();
  }

  async searchCafes(cityName: string, countryCode?: string): Promise<GooglePlace[]> {
    const searchParams: Record<string, string> = {
      query: `café coffee shop ${cityName} ${countryCode || ''}`.trim(),
      type: 'cafe',
      // radius handled in searchPlaces as number; omit here for text search
    };

    try {
      const response = await this.searchPlaces(searchParams);
      return response.results || [];
    } catch (error) {
      console.error(`Error searching cafes in ${cityName}:`, error);
      return [];
    }
  }

  async searchCoworkingSpaces(cityName: string, countryCode?: string): Promise<GooglePlace[]> {
    const searchParams: Record<string, string> = {
      query: `coworking space ${cityName} ${countryCode || ''}`.trim(),
      type: 'establishment',
      // radius handled in searchPlaces as number; omit here for text search
    };

    try {
      const response = await this.searchPlaces(searchParams);
      return response.results || [];
    } catch (error) {
      console.error(`Error searching coworking spaces in ${cityName}:`, error);
      return [];
    }
  }

  async searchRestaurants(cityName: string, countryCode?: string, cuisine?: string): Promise<GooglePlace[]> {
    const searchParams: Record<string, string> = {
      query: `${cuisine || 'restaurant'} ${cityName} ${countryCode || ''}`.trim(),
      type: 'restaurant',
      // radius handled in searchPlaces as number; omit here for text search
    };

    try {
      const response = await this.searchPlaces(searchParams);
      return response.results || [];
    } catch (error) {
      console.error(`Error searching restaurants in ${cityName}:`, error);
      return [];
    }
  }

  async getPlaceDetails(placeId: string): Promise<GooglePlaceDetails> {
    const searchParams: Record<string, string> = {
      place_id: placeId,
      fields: 'place_id,name,types,vicinity,rating,price_level,user_ratings_total,photos,opening_hours,geometry,formatted_address,international_phone_number,website,reviews'
    };

    const response = await this.makeRequest('/details/json', searchParams);
    return response.json();
  }

  async getPlacePhoto(photoReference: string, maxWidth: number = 400): Promise<string> {
    const searchParams: Record<string, string> = {
      photoreference: photoReference,
      maxwidth: maxWidth.toString()
    };

    const url = new URL(`${GOOGLE_PLACES_BASE_URL}/photo`);
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    url.searchParams.append('key', this.apiKey);

    return url.toString();
  }

  async searchPlacesWithFeatures(cityName: string, features: string[]): Promise<GooglePlace[]> {
    const allPlaces = await this.searchPlaces({
      query: cityName,
      radius: 5000
    });
    
    return (allPlaces.results || []).filter(place => {
      if (!place.features) return false;
      return features.some(feature => 
        place.features && place.features[feature as keyof typeof place.features]
      );
    });
  }

  async getBestRatedPlaces(cityName: string, category: string, limit: number = 10): Promise<GooglePlace[]> {
    const searchParams: Record<string, string> = {
      query: `${category} ${cityName}`
    };

    try {
      const response = await this.searchPlaces(searchParams);
      const places = response.results || [];
      
      // Sort by rating (highest first) and limit results
      return places
        .filter(place => place.rating && place.rating >= 4.0)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, limit);
    } catch (error) {
      console.error(`Error searching best rated places in ${cityName}:`, error);
      return [];
    }
  }

  // Helper method to get price level label
  getPriceLevelLabel(priceLevel?: number): string {
    if (!priceLevel) return 'N/A';
    switch (priceLevel) {
      case 0: return 'Gratis';
      case 1: return 'Económico';
      case 2: return 'Moderado';
      case 3: return 'Costoso';
      case 4: return 'Muy costoso';
      default: return 'N/A';
    }
  }

  // Helper method to get rating stars
  getRatingStars(rating?: number): string {
    if (!rating) return 'N/A';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  }
}

// Singleton instance
export const googlePlacesService = new GooglePlacesService();
