import { NextRequest, NextResponse } from "next/server";
import CountriesService from "@/lib/countries";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    console.log('🌍 Testing Countries Service...');
    
    const countriesService = CountriesService.getInstance();
    const countries = await countriesService.getAllCountries();
    
    console.log(`✅ Successfully fetched ${countries.length} countries`);
    
    return NextResponse.json({
      success: true,
      count: countries.length,
      countries: countries.slice(0, 10), // Solo mostrar los primeros 10 para la prueba
      message: `Successfully fetched ${countries.length} countries from API`
    });
    
  } catch (error) {
    console.error('❌ Error in test-countries API:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to fetch countries'
      },
      { status: 500 }
    );
  }
}
