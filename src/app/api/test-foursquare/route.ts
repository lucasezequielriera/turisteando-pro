import { NextResponse } from "next/server";
import { foursquareService } from "@/lib/foursquare";

export async function GET() {
  try {
    // Check if API key is configured
    const isConfigured = foursquareService.isConfigured();
    
    if (!isConfigured) {
      return NextResponse.json({
        error: "Foursquare API key not configured",
        message: "Add FOURSQUARE_API_KEY to your .env.local file",
        status: "not_configured"
      }, { status: 400 });
    }

    // Test searching for cafes in Madrid
    let madridCafes: unknown[] = [];
    try {
      madridCafes = await foursquareService.searchCafes("Madrid", "ES");
    } catch (error) {
      console.log("Could not fetch Madrid cafes:", error);
    }

    // Test searching for coworking spaces
    let madridCoworking: unknown[] = [];
    try {
      madridCoworking = await foursquareService.searchCoworkingSpaces("Madrid", "ES");
    } catch (error) {
      console.log("Could not fetch Madrid coworking:", error);
    }

    // Test searching for restaurants
    let madridRestaurants: unknown[] = [];
    try {
      madridRestaurants = await foursquareService.searchRestaurants("Madrid", "ES");
    } catch (error) {
      console.log("Could not fetch Madrid restaurants:", error);
    }

    return NextResponse.json({
      status: "success",
      is_configured: isConfigured,
      madrid_cafes: madridCafes.slice(0, 3),
      madrid_coworking: madridCoworking.slice(0, 3),
      madrid_restaurants: madridRestaurants.slice(0, 3),
      total_cafes: madridCafes.length,
      total_coworking: madridCoworking.length,
      total_restaurants: madridRestaurants.length,
      message: "Foursquare API is working correctly!"
    });

  } catch (error) {
    console.error("Foursquare API test error:", error);
    return NextResponse.json({
      error: "Foursquare API test failed",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}

// POST endpoint to test specific search
export async function POST(req: Request) {
  try {
    const { cityName, countryCode, category } = await req.json();
    
    if (!cityName) {
      return NextResponse.json({
        error: "City name required",
        message: "Send { cityName: 'Madrid', countryCode: 'ES', category: 'cafes' } in request body"
      }, { status: 400 });
    }

    let results = [];
    let total = 0;

    switch (category) {
      case 'cafes':
        results = await foursquareService.searchCafes(cityName, countryCode);
        break;
      case 'coworking':
        results = await foursquareService.searchCoworkingSpaces(cityName, countryCode);
        break;
      case 'restaurants':
        results = await foursquareService.searchRestaurants(cityName, countryCode);
        break;
      default:
        const searchResponse = await foursquareService.searchPlaces({
          query: category || 'cafe',
          near: countryCode ? `${cityName}, ${countryCode}` : cityName,
          limit: 10
        });
        results = searchResponse.response.venues || [];
    }

    total = results.length;

    return NextResponse.json({
      status: "success",
      city_name: cityName,
      country_code: countryCode,
      category: category || 'general',
      total_results: total,
      results: results.slice(0, 5), // First 5 results
      message: `Successfully fetched ${category || 'places'} data for ${cityName}`
    });

  } catch (error) {
    console.error("Foursquare API search test error:", error);
    return NextResponse.json({
      error: "Failed to search places",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}
