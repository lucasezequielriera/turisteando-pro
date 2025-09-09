# 🚀 API Setup Guide - Turisteando Ciudades

## 📋 APIs Requeridas para Datos de Ciudades

### 1. 🌍 **Numbeo API** - Costo de Vida (PRIORITARIA)
- **URL**: https://www.numbeo.com/cost-of-living/api.jsp
- **Costo**: Gratuita
- **Límites**: 20,000 requests por hora
- **Datos**: Costo de vida, alquiler, restaurantes, poder adquisitivo
- **Variable de entorno**: `NUMBEO_API_KEY`

### 2. 📱 **Airalo API** - eSIM y Conectividad
- **URL**: https://docs.airalo.com/
- **Costo**: Gratuita con límites
- **Datos**: Precios eSIM, cobertura, planes
- **Variable de entorno**: `AIRALO_API_KEY`

### 3. ☕ **Foursquare Places API** - Cafés y Lugares
- **URL**: https://developer.foursquare.com/
- **Costo**: Gratuita con límites
- **Datos**: Cafés, restaurantes, reviews, ratings
- **Variables de entorno**: `FOURSQUARE_CLIENT_ID`, `FOURSQUARE_CLIENT_SECRET`

### 4. 🏢 **WeWork API** - Espacios de Coworking
- **URL**: https://developers.wework.com/
- **Costo**: Gratuita con límites
- **Datos**: Coworks, precios, disponibilidad
- **Variable de entorno**: `WEWORK_API_KEY`

### 5. 🗺️ **Google Maps API** - Transporte y Lugares
- **URL**: https://developers.google.com/maps
- **Costo**: Gratuita con límites generosos
- **Datos**: Transporte público, rutas, lugares
- **Variable de entorno**: `GOOGLE_MAPS_API_KEY`

### 6. 📊 **World Bank API** - Datos Económicos
- **URL**: https://datahelpdesk.worldbank.org/
- **Costo**: Completamente gratuita
- **Datos**: Población, economía, indicadores
- **Variable de entorno**: No requiere

### 7. 🏛️ **OECD Data API** - Indicadores Económicos
- **URL**: https://data.oecd.org/api/
- **Costo**: Completamente gratuita
- **Datos**: Indicadores económicos, calidad de vida
- **Variable de entorno**: No requiere

## 🔧 Configuración de Variables de Entorno

Agrega estas variables a tu archivo `.env.local`:

```bash
# Numbeo API - Costo de Vida
NUMBEO_API_KEY=tu_api_key_aqui

# Airalo API - eSIM
AIRALO_API_KEY=tu_api_key_aqui

# Foursquare Places API
FOURSQUARE_CLIENT_ID=3GWPBPONILDTSLFW4032HFMD2UTRPDAEN4EATMLI2NVLO4BV
FOURSQUARE_CLIENT_SECRET=B05OIDT2CZO54LWRNITZV3IBOZX1DYV3LLRSPJYDP4VG1CI3

# WeWork API
WEWORK_API_KEY=tu_api_key_aqui

# Google Maps API
GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

## 📊 Datos que Obtendremos

### **Información Básica:**
- ✅ Población
- ✅ Coordenadas geográficas
- ✅ Clima básico

### **Costo de Vida:**
- ✅ Índice de costo de vida
- ✅ Índice de alquiler
- ✅ Índice de precios de restaurantes
- ✅ Poder adquisitivo local

### **Conectividad:**
- ✅ Precios eSIM por país
- ✅ Cobertura de redes
- ✅ Planes de datos

### **Lugares de Trabajo:**
- ✅ Coworks disponibles
- ✅ Precios por día/mes
- ✅ Horarios y amenities

### **Gastronomía:**
- ✅ Cafés con enchufes
- ✅ Restaurantes locales
- ✅ Precios promedio

### **Transporte:**
- ✅ Opciones de transporte público
- ✅ Precios de day-pass
- ✅ Rutas principales

## 🎯 Orden de Implementación

1. **FASE 1**: Numbeo API (costo de vida)
2. **FASE 2**: Airalo API (eSIM)
3. **FASE 3**: Foursquare API (cafés y lugares)
4. **FASE 4**: WeWork API (coworks)
5. **FASE 5**: Google Maps API (transporte)
6. **FASE 6**: World Bank + OECD (datos económicos)

## 💡 Beneficios de la Implementación

- **Datos en Tiempo Real**: Información actualizada automáticamente
- **Escalabilidad**: Fácil agregar nuevas ciudades
- **Precisión**: Datos verificados por las APIs oficiales
- **Experiencia del Usuario**: Información completa y confiable
- **Monetización**: Más valor para usuarios premium

## 🚨 Consideraciones Importantes

- **Rate Limiting**: Respetar los límites de cada API
- **Caching**: Implementar cache para optimizar requests
- **Fallbacks**: Plan B si alguna API falla
- **Costos**: Monitorear uso de APIs pagas
- **Privacidad**: Cumplir con políticas de cada API
