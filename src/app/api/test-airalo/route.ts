import { NextResponse } from "next/server";
import { airaloService } from "@/lib/airalo";

export async function GET() {
  try {
    // Check if API key is configured
    const isConfigured = airaloService.isConfigured();
    
    if (!isConfigured) {
      return NextResponse.json({
        error: "Airalo API key not configured",
        message: "Add AIRALO_API_KEY to your .env.local file",
        status: "not_configured"
      }, { status: 400 });
    }

    // Test API status
    const status = await airaloService.getStatus();
    
    // Test getting countries (limited to first 5 for testing)
    const countries = await airaloService.getCountries();
    const sampleCountries = countries.slice(0, 5);
    
    // Test getting packages for a specific country (Spain as example)
    let spainPackages: unknown[] = [];
    try {
      spainPackages = await airaloService.getCountryPackages("ES");
    } catch (error) {
      console.log("Could not fetch Spain packages:", error);
    }

    return NextResponse.json({
      status: "success",
      api_status: status,
      is_configured: isConfigured,
      sample_countries: sampleCountries,
      spain_packages: spainPackages.slice(0, 3), // First 3 packages
      total_countries: countries.length,
      message: "Airalo API is working correctly!"
    });

  } catch (error) {
    console.error("Airalo API test error:", error);
    return NextResponse.json({
      error: "Airalo API test failed",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}

// POST endpoint to test specific country
export async function POST(req: Request) {
  try {
    const { countryCode } = await req.json();
    
    if (!countryCode) {
      return NextResponse.json({
        error: "Country code required",
        message: "Send { countryCode: 'ES' } in request body"
      }, { status: 400 });
    }

    const packages = await airaloService.getCountryPackages(countryCode);
    const bestPackage = await airaloService.getBestPackage(countryCode);

    return NextResponse.json({
      status: "success",
      country_code: countryCode,
      total_packages: packages.length,
      packages: packages.slice(0, 5), // First 5 packages
      best_package: bestPackage,
      message: `Successfully fetched eSIM data for ${countryCode}`
    });

  } catch (error) {
    console.error("Airalo API country test error:", error);
    return NextResponse.json({
      error: "Failed to fetch country data",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}
