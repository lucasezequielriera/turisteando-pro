import { NextResponse } from "next/server";
import { googlePlacesService } from "@/lib/google-places";

export async function GET() {
  try {
    const isConfigured = googlePlacesService.isConfigured();
    
    if (!isConfigured) {
      return NextResponse.json({
        error: "Google Places API key not configured",
        message: "Add GOOGLE_PLACES_API_KEY to your .env.local file",
        status: "not_configured"
      }, { status: 400 });
    }

    // Test different search methods
    let madridCafes: unknown[] = [];
    let madridCoworking: unknown[] = [];
    let madridRestaurants: unknown[] = [];

    try {
      madridCafes = await googlePlacesService.searchCafes("Madrid", "ES");
    } catch (error) {
      console.error("Could not fetch Madrid cafes:", error);
    }

    try {
      madridCoworking = await googlePlacesService.searchCoworkingSpaces("Madrid", "ES");
    } catch (error) {
      console.error("Could not fetch Madrid coworking:", error);
    }

    try {
      madridRestaurants = await googlePlacesService.searchRestaurants("Madrid", "ES");
    } catch (error) {
      console.error("Could not fetch Madrid restaurants:", error);
    }

    return NextResponse.json({
      status: "success",
      is_configured: true,
      madrid_cafes: madridCafes,
      madrid_coworking: madridCoworking,
      madrid_restaurants: madridRestaurants,
      total_cafes: madridCafes.length,
      total_coworking: madridCoworking.length,
      total_restaurants: madridRestaurants.length,
      message: "Google Places API is working correctly!"
    });

  } catch (error) {
    console.error("Google Places API test error:", error);
    return NextResponse.json({
      error: "Google Places API test failed",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { cityName, countryCode, category } = await req.json();
    
    if (!cityName) {
      return NextResponse.json({
        error: "City name is required",
        message: "Please provide a city name",
        status: "error"
      }, { status: 400 });
    }

    let results: unknown[] = [];

    switch (category) {
      case 'cafes':
        results = await googlePlacesService.searchCafes(cityName, countryCode);
        break;
      case 'coworking':
        results = await googlePlacesService.searchCoworkingSpaces(cityName, countryCode);
        break;
      case 'restaurants':
        results = await googlePlacesService.searchRestaurants(cityName, countryCode);
        break;
      default:
        const searchResponse = await googlePlacesService.searchPlaces({ 
          query: cityName,
          radius: 5000
        });
        results = searchResponse.results;
    }

    return NextResponse.json({
      status: "success",
      category,
      city: cityName,
      country: countryCode,
      results,
      total: results.length,
      message: `Found ${results.length} places in ${cityName}`
    });

  } catch (error) {
    console.error("Google Places API POST error:", error);
    return NextResponse.json({
      error: "Google Places API request failed",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}
