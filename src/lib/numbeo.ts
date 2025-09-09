// Numbeo API service for cost of living data
// Documentation: https://www.numbeo.com/cost-of-living/api.jsp

const NUMBEO_API_KEY = process.env.NUMBEO_API_KEY;
const NUMBEO_BASE_URL = 'https://www.numbeo.com/api';

export interface NumbeoCityData {
  city_id: number;
  city_name: string;
  country_name: string;
  cost_of_living_index: number;
  rent_index: number;
  groceries_index: number;
  restaurant_price_index: number;
  local_purchasing_power_index: number;
  population?: number;
}

export interface NumbeoItemPrice {
  item_name: string;
  average_price: number;
  currency: string;
}

export interface NumbeoSearchResult {
  cities: Array<{
    city_id: number;
    city_name: string;
    country_name: string;
  }>;
}

export class NumbeoService {
  private apiKey: string;

  constructor() {
    this.apiKey = NUMBEO_API_KEY || '';
  }

  // Search for cities by name
  async searchCities(query: string): Promise<NumbeoSearchResult> {
    try {
      const response = await fetch(
        `${NUMBEO_BASE_URL}/cities?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error(`Numbeo API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  }

  // Get cost of living data for a specific city
  async getCityData(cityId: number): Promise<NumbeoCityData> {
    try {
      const response = await fetch(
        `${NUMBEO_BASE_URL}/city_prices?api_key=${this.apiKey}&city_id=${cityId}`
      );
      
      if (!response.ok) {
        throw new Error(`Numbeo API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching city data:', error);
      throw error;
    }
  }

  // Get specific item prices (like coffee, meals, etc.)
  async getItemPrices(cityId: number): Promise<NumbeoItemPrice[]> {
    try {
      const response = await fetch(
        `${NUMBEO_BASE_URL}/city_prices?api_key=${this.apiKey}&city_id=${cityId}&item_ids=1,2,3,4,5` // Common items
      );
      
      if (!response.ok) {
        throw new Error(`Numbeo API error: ${response.status}`);
      }

      const data = await response.json();
      return data.prices || [];
    } catch (error) {
      console.error('Error fetching item prices:', error);
      throw error;
    }
  }

  // Get city ranking by cost of living
  async getCityRanking(cityId: number): Promise<{ rank: number; total_cities: number }> {
    try {
      const response = await fetch(
        `${NUMBEO_BASE_URL}/rankings_by_city?api_key=${this.apiKey}&city_id=${cityId}`
      );
      
      if (!response.ok) {
        throw new Error(`Numbeo API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        rank: data.rank || 0,
        total_cities: data.total_cities || 0
      };
    } catch (error) {
      console.error('Error fetching city ranking:', error);
      return { rank: 0, total_cities: 0 };
    }
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

// Singleton instance
export const numbeoService = new NumbeoService();
