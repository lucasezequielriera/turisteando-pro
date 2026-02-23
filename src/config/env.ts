// Environment configuration
export const ENV = {
  // MercadoPago
  MERCADOPAGO_ACCESS_TOKEN: 'APP_USR-7883881838810275-090911-40ea09196c4379a69e2aaa1ef2a35246-210220411',
  MERCADOPAGO_WEBHOOK_SECRET: '2c649d52872b2cb6f336b640ae488bcc6ba11c2bbb81820ea56ebe1e4c780d6a',
  
  // Base URL
  NEXT_PUBLIC_BASE_URL: 'https://www.turisteandociudades.com',
  
  // Stripe (placeholder values - replace with your actual keys)
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_live_placeholder',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder',
  STRIPE_PRICE_CITY: process.env.STRIPE_PRICE_CITY || 'price_city_placeholder',
  STRIPE_PRICE_COUNTRY: process.env.STRIPE_PRICE_COUNTRY || 'price_country_placeholder',
  STRIPE_PRICE_ALL: process.env.STRIPE_PRICE_ALL || 'price_all_placeholder',
  STRIPE_PRICE_LIFE: process.env.STRIPE_PRICE_LIFE || 'price_life_placeholder',
  NEXT_PUBLIC_STRIPE_LINK_CITY: process.env.NEXT_PUBLIC_STRIPE_LINK_CITY || 'https://buy.stripe.com/placeholder',
  
  // Supabase (placeholder values - replace with your actual keys)
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key',
  SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE || 'placeholder_service_role',
  
  // Email
  RESEND_API_KEY: process.env.RESEND_API_KEY || 're_placeholder',
  EMAIL_FROM: process.env.EMAIL_FROM || 'Turisteando Ciudades <no-reply@turisteandociudades.com>',
  
  // Other APIs (placeholder values)
  GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY || 'placeholder_google_key',
  FOURSQUARE_CLIENT_ID: process.env.FOURSQUARE_CLIENT_ID || 'placeholder_foursquare_id',
  FOURSQUARE_CLIENT_SECRET: process.env.FOURSQUARE_CLIENT_SECRET || 'placeholder_foursquare_secret',
  AIRALO_API_KEY: process.env.AIRALO_API_KEY || 'placeholder_airalo_key',
  NUMBEO_API_KEY: process.env.NUMBEO_API_KEY || 'placeholder_numbeo_key',
  WEWORK_API_KEY: process.env.WEWORK_API_KEY || 'placeholder_wework_key',
};
