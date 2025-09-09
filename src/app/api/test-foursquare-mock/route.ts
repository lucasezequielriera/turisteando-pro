import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Mock data para probar la UI
    const mockCafes = [
      {
        fsq_id: "mock_cafe_1",
        name: "Café Central Madrid",
        categories: [
          { id: 13032, name: "Coffee Shop", icon: { prefix: "https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_", suffix: ".png" } }
        ],
        location: {
          address: "Calle Gran Vía, 1",
          locality: "Madrid",
          country: "Spain"
        },
        rating: 8.5,
        price: 2,
        features: {
          wifi: true,
          power_outlets: true,
          coffee: true
        },
        tips: [
          {
            text: "Excelente café y ambiente perfecto para trabajar",
            agreeCount: 45,
            disagreeCount: 2
          }
        ]
      },
      {
        fsq_id: "mock_cafe_2",
        name: "Flat White Studio",
        categories: [
          { id: 13033, name: "Café", icon: { prefix: "https://ss3.4sqi.net/img/categories_v2/food/cafe_", suffix: ".png" } }
        ],
        location: {
          address: "Calle Malasaña, 15",
          locality: "Madrid",
          country: "Spain"
        },
        rating: 9.2,
        price: 3,
        features: {
          wifi: true,
          power_outlets: true,
          outdoor_seating: true
        },
        tips: [
          {
            text: "El mejor flat white de Madrid, WiFi rápido",
            agreeCount: 67,
            disagreeCount: 1
          }
        ]
      }
    ];

    const mockCoworking = [
      {
        fsq_id: "mock_cowork_1",
        name: "WeWork Gran Vía",
        categories: [
          { id: 10032, name: "Professional & Other Places", icon: { prefix: "https://ss3.4sqi.net/img/categories_v2/", suffix: ".png" } }
        ],
        location: {
          address: "Gran Vía, 28",
          locality: "Madrid",
          country: "Spain"
        },
        rating: 8.8,
        price: 4,
        features: {
          wifi: true,
          power_outlets: true,
          meeting_rooms: true,
          gym: true
        },
        tips: [
          {
            text: "Espacio moderno con todas las comodidades",
            agreeCount: 89,
            disagreeCount: 3
          }
        ]
      }
    ];

    const mockRestaurants = [
      {
        fsq_id: "mock_rest_1",
        name: "Restaurante La Bola",
        categories: [
          { id: 13065, name: "Restaurant", icon: { prefix: "https://ss3.4sqi.net/img/categories_v2/food/restaurant_", suffix: ".png" } }
        ],
        location: {
          address: "Calle de la Bola, 5",
          locality: "Madrid",
          country: "Spain"
        },
        rating: 9.0,
        price: 3,
        features: {
          wifi: true,
          outdoor_seating: true
        },
        tips: [
          {
            text: "Cocina tradicional madrileña, ambiente familiar",
            agreeCount: 156,
            disagreeCount: 8
          }
        ]
      }
    ];

    return NextResponse.json({
      status: "success",
      is_configured: true,
      is_mock: true,
      madrid_cafes: mockCafes,
      madrid_coworking: mockCoworking,
      madrid_restaurants: mockRestaurants,
      total_cafes: mockCafes.length,
      total_coworking: mockCoworking.length,
      total_restaurants: mockRestaurants.length,
      message: "Foursquare API mock data working correctly!"
    });

  } catch (error) {
    console.error("Foursquare mock API error:", error);
    return NextResponse.json({
      error: "Foursquare mock API failed",
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error"
    }, { status: 500 });
  }
}
