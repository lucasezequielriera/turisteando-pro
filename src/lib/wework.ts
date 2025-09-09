// WeWork API service for workspace data
// Documentation: https://developers.wework.com/

const WEWORK_API_KEY = process.env.WEWORK_API_KEY;
const WEWORK_BASE_URL = 'https://api.wework.com/v1';

export interface WeWorkLocation {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    formatted_address: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
  phone: string;
  email: string;
  website: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  amenities: string[];
  capacity: number;
  building_type: string;
  year_built: number;
  sustainability_rating?: string;
  accessibility_features: string[];
}

export interface WeWorkWorkspace {
  id: string;
  name: string;
  type: 'office' | 'dedicated_desk' | 'hot_desk' | 'meeting_room' | 'event_space';
  size: {
    square_feet: number;
    square_meters: number;
  };
  capacity: number;
  price: {
    amount: number;
    currency: string;
    period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  availability: {
    available: boolean;
    available_from?: string;
    available_until?: string;
  };
  features: {
    wifi: boolean;
    printing: boolean;
    coffee: boolean;
    kitchen: boolean;
    phone_booths: boolean;
    meeting_rooms: boolean;
    event_spaces: boolean;
    gym: boolean;
    showers: boolean;
    parking: boolean;
    bike_storage: boolean;
    pet_friendly: boolean;
  };
  images: Array<{
    url: string;
    alt_text: string;
    width: number;
    height: number;
  }>;
  description: string;
  location_id: string;
}

export interface WeWorkSearchParams {
  city?: string;
  country?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  workspace_type?: string;
  amenities?: string[];
  min_capacity?: number;
  max_price?: number;
  available_now?: boolean;
}

export interface WeWorkSearchResponse {
  locations: WeWorkLocation[];
  workspaces: WeWorkWorkspace[];
  total_results: number;
  pagination: {
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export interface WeWorkAmenity {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
}

export class WeWorkService {
  private apiKey: string;

  constructor() {
    this.apiKey = WEWORK_API_KEY || '';
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  private async makeRequest(endpoint: string, params?: Record<string, string>): Promise<Response> {
    const url = new URL(`${WEWORK_BASE_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`WeWork API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  async searchLocations(params: WeWorkSearchParams): Promise<WeWorkSearchResponse> {
    const searchParams: Record<string, string> = {};
    
    if (params.city) searchParams.city = params.city;
    if (params.country) searchParams.country = params.country;
    if (params.lat && params.lng) searchParams.coordinates = `${params.lat},${params.lng}`;
    if (params.radius) searchParams.radius = params.radius.toString();
    if (params.workspace_type) searchParams.workspace_type = params.workspace_type;
    if (params.amenities && params.amenities.length > 0) {
      searchParams.amenities = params.amenities.join(',');
    }
    if (params.min_capacity) searchParams.min_capacity = params.min_capacity.toString();
    if (params.max_price) searchParams.max_price = params.max_price.toString();
    if (params.available_now) searchParams.available_now = 'true';

    const response = await this.makeRequest('/search', searchParams);
    return response.json();
  }

  async getLocationsByCity(cityName: string, countryCode?: string): Promise<WeWorkLocation[]> {
    const response = await this.searchLocations({
      city: cityName,
      country: countryCode
    });
    
    return response.locations;
  }

  async getWorkspacesByLocation(locationId: string): Promise<WeWorkWorkspace[]> {
    const response = await this.makeRequest(`/locations/${locationId}/workspaces`);
    return response.json();
  }

  async getLocationDetails(locationId: string): Promise<WeWorkLocation> {
    const response = await this.makeRequest(`/locations/${locationId}`);
    return response.json();
  }

  async getWorkspaceDetails(workspaceId: string): Promise<WeWorkWorkspace> {
    const response = await this.makeRequest(`/workspaces/${workspaceId}`);
    return response.json();
  }

  async getNearbyLocations(lat: number, lng: number, radius: number = 5000): Promise<WeWorkLocation[]> {
    const response = await this.searchLocations({
      lat,
      lng,
      radius
    });
    
    return response.locations;
  }

  async getAvailableWorkspaces(cityName: string, workspaceType?: string): Promise<WeWorkWorkspace[]> {
    const locations = await this.getLocationsByCity(cityName);
    const allWorkspaces: WeWorkWorkspace[] = [];
    
    for (const location of locations) {
      try {
        const workspaces = await this.getWorkspacesByLocation(location.id);
        const filteredWorkspaces = workspaceType 
          ? workspaces.filter(w => w.type === workspaceType && w.availability.available)
          : workspaces.filter(w => w.availability.available);
        
        allWorkspaces.push(...filteredWorkspaces);
      } catch (error) {
        console.log(`Could not fetch workspaces for location ${location.id}:`, error);
      }
    }
    
    return allWorkspaces;
  }

  async getBestValueWorkspaces(cityName: string, maxPrice?: number): Promise<WeWorkWorkspace[]> {
    const workspaces = await this.getAvailableWorkspaces(cityName);
    
    let filtered = workspaces.filter(w => w.availability.available);
    
    if (maxPrice) {
      filtered = filtered.filter(w => w.price.amount <= maxPrice);
    }
    
    // Sort by price per square foot for best value
    return filtered.sort((a, b) => {
      const aPricePerSqFt = a.price.amount / a.size.square_feet;
      const bPricePerSqFt = b.price.amount / b.size.square_feet;
      return aPricePerSqFt - bPricePerSqFt;
    });
  }

  async getAmenities(): Promise<WeWorkAmenity[]> {
    const response = await this.makeRequest('/amenities');
    return response.json();
  }

  async getWorkspaceTypes(): Promise<string[]> {
    const response = await this.makeRequest('/workspace-types');
    return response.json();
  }

  // Helper method to get workspace statistics for a city
  async getCityWorkspaceStats(cityName: string): Promise<{
    total_locations: number;
    total_workspaces: number;
    average_price: number;
    workspace_types: Record<string, number>;
    amenities_breakdown: Record<string, number>;
  }> {
    const locations = await this.getLocationsByCity(cityName);
    const allWorkspaces: WeWorkWorkspace[] = [];
    
    for (const location of locations) {
      try {
        const workspaces = await this.getWorkspacesByLocation(location.id);
        allWorkspaces.push(...workspaces);
      } catch (error) {
        console.log(`Could not fetch workspaces for location ${location.id}:`, error);
      }
    }
    
    const totalLocations = locations.length;
    const totalWorkspaces = allWorkspaces.length;
    
    const prices = allWorkspaces
      .filter(w => w.price.currency === 'USD')
      .map(w => w.price.amount);
    
    const averagePrice = prices.length > 0 
      ? prices.reduce((sum, price) => sum + price, 0) / prices.length 
      : 0;
    
    const workspaceTypes: Record<string, number> = {};
    allWorkspaces.forEach(w => {
      workspaceTypes[w.type] = (workspaceTypes[w.type] || 0) + 1;
    });
    
    const amenitiesBreakdown: Record<string, number> = {};
    allWorkspaces.forEach(w => {
      Object.entries(w.features).forEach(([amenity, available]) => {
        if (available) {
          amenitiesBreakdown[amenity] = (amenitiesBreakdown[amenity] || 0) + 1;
        }
      });
    });
    
    return {
      total_locations: totalLocations,
      total_workspaces: totalWorkspaces,
      average_price: averagePrice,
      workspace_types: workspaceTypes,
      amenities_breakdown: amenitiesBreakdown,
    };
  }
}

// Singleton instance
export const weworkService = new WeWorkService();
