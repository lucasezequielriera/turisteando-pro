// Airalo API service for eSIM data
// Documentation: https://docs.airalo.com/

const AIRALO_API_KEY = process.env.AIRALO_API_KEY;
const AIRALO_BASE_URL = 'https://api.airalo.com/v2';

export interface AiraloCountry {
  id: string;
  name: string;
  code: string;
  flag: string;
  packages: AiraloPackage[];
}

export interface AiraloPackage {
  id: string;
  name: string;
  data: string; // e.g., "1GB", "3GB", "5GB"
  validity: string; // e.g., "7 days", "30 days"
  price: number;
  currency: string;
  type: 'regional' | 'global' | 'local';
  description?: string;
  features?: string[];
}

export interface AiraloRegionalPackage {
  id: string;
  name: string;
  countries: string[];
  packages: AiraloPackage[];
}

export interface AiraloGlobalPackage {
  id: string;
  name: string;
  description: string;
  packages: AiraloPackage[];
}

export class AiraloService {
  private apiKey: string;

  constructor() {
    this.apiKey = AIRALO_API_KEY || '';
  }

  // Get all available countries
  async getCountries(): Promise<AiraloCountry[]> {
    try {
      const response = await fetch(`${AIRALO_BASE_URL}/countries`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Airalo API error: ${response.status}`);
      }

      const data = await response.json();
      return data.countries || [];
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }

  // Get packages for a specific country
  async getCountryPackages(countryCode: string): Promise<AiraloPackage[]> {
    try {
      const response = await fetch(`${AIRALO_BASE_URL}/countries/${countryCode}/packages`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Airalo API error: ${response.status}`);
      }

      const data = await response.json();
      return data.packages || [];
    } catch (error) {
      console.error('Error fetching country packages:', error);
      throw error;
    }
  }

  // Get regional packages (e.g., Europe, Asia)
  async getRegionalPackages(): Promise<AiraloRegionalPackage[]> {
    try {
      const response = await fetch(`${AIRALO_BASE_URL}/packages/regional`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Airalo API error: ${response.status}`);
      }

      const data = await response.json();
      return data.packages || [];
    } catch (error) {
      console.error('Error fetching regional packages:', error);
      throw error;
    }
    }

  // Get global packages (worldwide coverage)
  async getGlobalPackages(): Promise<AiraloGlobalPackage[]> {
    try {
      const response = await fetch(`${AIRALO_BASE_URL}/packages/global`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Airalo API error: ${response.status}`);
      }

      const data = await response.json();
      return data.packages || [];
    } catch (error) {
      console.error('Error fetching global packages:', error);
      throw error;
    }
  }

  // Search for packages by country name
  async searchPackages(query: string): Promise<AiraloPackage[]> {
    try {
      const countries = await this.getCountries();
      const matchingCountries = countries.filter(country => 
        country.name.toLowerCase().includes(query.toLowerCase()) ||
        country.code.toLowerCase().includes(query.toLowerCase())
      );

      const allPackages: AiraloPackage[] = [];
      for (const country of matchingCountries) {
        const packages = await this.getCountryPackages(country.code);
        allPackages.push(...packages);
      }

      return allPackages;
    } catch (error) {
      console.error('Error searching packages:', error);
      throw error;
    }
  }

  // Get best package for a country (lowest price per GB)
  async getBestPackage(countryCode: string): Promise<AiraloPackage | null> {
    try {
      const packages = await this.getCountryPackages(countryCode);
      if (packages.length === 0) return null;

      // Calculate price per GB and find the best value
      const packagesWithValue = packages.map(pkg => {
        const dataGB = parseFloat(pkg.data.replace('GB', ''));
        const pricePerGB = pkg.price / dataGB;
        return { ...pkg, pricePerGB };
      });

      packagesWithValue.sort((a, b) => a.pricePerGB - b.pricePerGB);
      return packagesWithValue[0];
    } catch (error) {
      console.error('Error getting best package:', error);
      return null;
    }
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  // Get API status
  async getStatus(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(`${AIRALO_BASE_URL}/status`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Airalo API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        status: data.status || 'unknown',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error checking API status:', error);
      return {
        status: 'error',
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Singleton instance
export const airaloService = new AiraloService();
