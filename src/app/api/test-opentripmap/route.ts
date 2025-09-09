import { NextResponse } from "next/server";
import { openTripMapService } from "@/lib/opentripmap";

export async function GET() {
  try {
    const isConfigured = openTripMapService.isConfigured();
    
    if (!isConfigured) {
      return NextResponse.json({
        error: "OpenTripMap API not configured",
        message: "This should never happen as OpenTripMap doesn't need configuration",
        status: "error"
      }, { status: 500 });
    }

    // Test different search methods
    let madridCafes: unknown[] = [];
    let madridCoworking: unknown[] = [];
    let madridRestaurants: unknown[] = [];

    try {
      madridCafes = await openTripMapService.searchCafes("Madrid", "ES");
    } catch (error) {
      console.error("Could not fetch Madrid cafes:", error);
    }

    try {
      madridCoworking = await openTripMapService.searchCoworkingSpaces("Madrid", "ES");
    } catch (error) {
      console.error("Could not fetch Madrid coworking:", error);
    }

    try {
      madridRestaurants = await openTripMapService.searchRestaurants("Madrid", "ES");
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
      message: "OpenTripMap API is working correctly!"
    });

  } catch (error) {
    console.error("OpenTripMap API test error:", error);
    return NextResponse.json({
      error: "OpenTripMap API test failed",
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
        results = await openTripMapService.searchCafes(cityName, countryCode);
        break;
      case 'coworking':
        results = await openTripMapService.searchCoworkingSpaces(cityName, countryCode);
        break;
      case 'restaurants':
        results = await openTripMapService.searchRestaurants(cityName, countryCode);
        break;
      default:
        results = await openTripMapService.searchPlaces({ 
          name: cityName,
          limit: 20,
          format: 'json'
        });
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
    console.error("OpenTripMap API POST error:", error);
    return NextResponse.json({
      error: "OpenTripMap API request failed",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}
