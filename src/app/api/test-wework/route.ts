import { NextResponse } from "next/server";
import { weworkService } from "@/lib/wework";

export async function GET() {
  try {
    const isConfigured = weworkService.isConfigured();
    
    if (!isConfigured) {
      return NextResponse.json({
        error: "WeWork API key not configured",
        message: "Add WEWORK_API_KEY to your .env.local file",
        status: "not_configured"
      }, { status: 400 });
    }

    // Test searching for workspaces in Madrid
    let madridLocations: unknown[] = [];
    let madridWorkspaces: unknown[] = [];
    
    try {
      madridLocations = await weworkService.getLocationsByCity("Madrid", "ES");
      if (madridLocations.length > 0) {
        const firstLocation = madridLocations[0] as { id: string };
        madridWorkspaces = await weworkService.getWorkspacesByLocation(firstLocation.id);
      }
    } catch (error) {
      console.log("Could not fetch Madrid data:", error);
    }

    return NextResponse.json({
      status: "success",
      is_configured: isConfigured,
      madrid_locations: madridLocations.slice(0, 3),
      madrid_workspaces: madridWorkspaces.slice(0, 3),
      total_locations: madridLocations.length,
      total_workspaces: madridWorkspaces.length,
      message: "WeWork API is working correctly!"
    });

  } catch (error) {
    console.error("WeWork API test error:", error);
    return NextResponse.json({
      error: "WeWork API test failed",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { cityName, countryCode, workspaceType } = await req.json();
    
    if (!cityName) {
      return NextResponse.json({
        error: "City name required",
        message: "Send { cityName: 'Madrid', countryCode: 'ES', workspaceType: 'office' } in request body"
      }, { status: 400 });
    }

    const locations = await weworkService.getLocationsByCity(cityName, countryCode);
    const workspaces = await weworkService.getAvailableWorkspaces(cityName, workspaceType);

    return NextResponse.json({
      status: "success",
      city_name: cityName,
      country_code: countryCode,
      workspace_type: workspaceType || 'all',
      total_locations: locations.length,
      total_workspaces: workspaces.length,
      locations: locations.slice(0, 3),
      workspaces: workspaces.slice(0, 3),
      message: `Successfully fetched WeWork data for ${cityName}`
    });

  } catch (error) {
    console.error("WeWork API search test error:", error);
    return NextResponse.json({
      error: "Failed to fetch WeWork data",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}
