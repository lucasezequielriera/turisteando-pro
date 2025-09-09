// Interfaz para la respuesta de la API de REST Countries
interface CountryApiResponse {
  name: {
    common: string;
  };
  flags: {
    emoji?: string;
    svg?: string;
  };
  cca2: string;
  region: string;
}

export interface Country {
  name: string;
  flag: string;
  code: string;
  region: string;
}

class CountriesService {
  private static instance: CountriesService;
  private countries: Country[] = [];
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

  private constructor() {}

  static getInstance(): CountriesService {
    if (!CountriesService.instance) {
      CountriesService.instance = new CountriesService();
    }
    return CountriesService.instance;
  }

  // Obtener URL de bandera SVG real
  private getFlagUrl(countryCode: string): string {
    if (countryCode === "ALL") return "🌍";
    
    // Usar flagcdn.com para banderas SVG reales
    return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
  }

  // Mapeo de nombres de países en español
  private getSpanishName(englishName: string, countryCode: string): string {
    const spanishNames: { [key: string]: string } = {
      // Países principales
      "Spain": "España",
      "Argentina": "Argentina", 
      "Mexico": "México",
      "Colombia": "Colombia",
      "Chile": "Chile",
      "Germany": "Alemania",
      "Portugal": "Portugal",
      "Czech Republic": "República Checa",
      "Czechia": "República Checa",
      "Hungary": "Hungría",
      "Austria": "Austria",
      "Greece": "Grecia",
      "Belgium": "Bélgica",
      "Indonesia": "Indonesia",
      "Maldives": "Maldivas",
      "Switzerland": "Suiza",
      "New Zealand": "Nueva Zelanda",
      "Laos": "Laos",
      "Singapore": "Singapur",
      "Japan": "Japón",
      "Thailand": "Tailandia",
      "Vietnam": "Vietnam",
      
      // Países adicionales
      "United States": "Estados Unidos",
      "United Kingdom": "Reino Unido",
      "France": "Francia",
      "Italy": "Italia",
      "Netherlands": "Países Bajos",
      "Sweden": "Suecia",
      "Norway": "Noruega",
      "Denmark": "Dinamarca",
      "Finland": "Finlandia",
      "Poland": "Polonia",
      "Russia": "Rusia",
      "Turkey": "Turquía",
      "India": "India",
      "China": "China",
      "South Korea": "Corea del Sur",
      "Australia": "Australia",
      "Canada": "Canadá",
      "Brazil": "Brasil",
      "South Africa": "Sudáfrica",
      "Egypt": "Egipto",
      "Morocco": "Marruecos",
      "Tunisia": "Túnez",
      "Kenya": "Kenia",
      "Nigeria": "Nigeria",
      "Peru": "Perú",
      "Ecuador": "Ecuador",
      "Uruguay": "Uruguay",
      "Paraguay": "Paraguay",
      "Bolivia": "Bolivia",
      "Venezuela": "Venezuela",
      "Costa Rica": "Costa Rica",
      "Panama": "Panamá",
      "Guatemala": "Guatemala",
      "Honduras": "Honduras",
      "Nicaragua": "Nicaragua",
      "El Salvador": "El Salvador",
      "Dominican Republic": "República Dominicana",
      "Cuba": "Cuba",
      "Puerto Rico": "Puerto Rico",
      
      // Europa
      "Ireland": "Irlanda",
      "Iceland": "Islandia",
      "Luxembourg": "Luxemburgo",
      "Monaco": "Mónaco",
      "Andorra": "Andorra",
      "San Marino": "San Marino",
      "Vatican City": "Ciudad del Vaticano",
      "Malta": "Malta",
      "Cyprus": "Chipre",
      "Croatia": "Croacia",
      "Slovenia": "Eslovenia",
      "Slovakia": "Eslovaquia",
      "Estonia": "Estonia",
      "Latvia": "Letonia",
      "Lithuania": "Lituania",
      "Romania": "Rumania",
      "Bulgaria": "Bulgaria",
      "Serbia": "Serbia",
      "Montenegro": "Montenegro",
      "Bosnia and Herzegovina": "Bosnia y Herzegovina",
      "North Macedonia": "Macedonia del Norte",
      "Albania": "Albania",
      "Moldova": "Moldavia",
      "Ukraine": "Ucrania",
      "Belarus": "Bielorrusia",
      
      // Asia
      "Afghanistan": "Afganistán",
      "Pakistan": "Pakistán",
      "Bangladesh": "Bangladés",
      "Sri Lanka": "Sri Lanka",
      "Nepal": "Nepal",
      "Bhutan": "Bután",
      "Myanmar": "Myanmar",
      "Cambodia": "Camboya",
      "Malaysia": "Malasia",
      "Philippines": "Filipinas",
      "North Korea": "Corea del Norte",
      "Mongolia": "Mongolia",
      "Kazakhstan": "Kazajistán",
      "Uzbekistan": "Uzbekistán",
      "Turkmenistan": "Turkmenistán",
      "Kyrgyzstan": "Kirguistán",
      "Tajikistan": "Tayikistán",
      "Azerbaijan": "Azerbaiyán",
      "Armenia": "Armenia",
      "Georgia": "Georgia",
      "Iran": "Irán",
      "Iraq": "Irak",
      "Syria": "Siria",
      "Lebanon": "Líbano",
      "Jordan": "Jordania",
      "Israel": "Israel",
      "Palestine": "Palestina",
      "Saudi Arabia": "Arabia Saudí",
      "United Arab Emirates": "Emiratos Árabes Unidos",
      "Qatar": "Catar",
      "Kuwait": "Kuwait",
      "Bahrain": "Baréin",
      "Oman": "Omán",
      "Yemen": "Yemen",
      
      // África
      "Algeria": "Argelia",
      "Libya": "Libia",
      "Sudan": "Sudán",
      "Ethiopia": "Etiopía",
      "Somalia": "Somalia",
      "Djibouti": "Yibuti",
      "Eritrea": "Eritrea",
      "Chad": "Chad",
      "Niger": "Níger",
      "Mali": "Malí",
      "Burkina Faso": "Burkina Faso",
      "Senegal": "Senegal",
      "Gambia": "Gambia",
      "Guinea": "Guinea",
      "Guinea-Bissau": "Guinea-Bisáu",
      "Sierra Leone": "Sierra Leona",
      "Liberia": "Liberia",
      "Ivory Coast": "Costa de Marfil",
      "Ghana": "Ghana",
      "Togo": "Togo",
      "Benin": "Benín",
      "Cameroon": "Camerún",
      "Central African Republic": "República Centroafricana",
      "Democratic Republic of the Congo": "República Democrática del Congo",
      "Republic of the Congo": "República del Congo",
      "Gabon": "Gabón",
      "Equatorial Guinea": "Guinea Ecuatorial",
      "São Tomé and Príncipe": "Santo Tomé y Príncipe",
      "Angola": "Angola",
      "Zambia": "Zambia",
      "Zimbabwe": "Zimbabue",
      "Botswana": "Botsuana",
      "Namibia": "Namibia",
      "Lesotho": "Lesoto",
      "Eswatini": "Esuatini",
      "Mozambique": "Mozambique",
      "Madagascar": "Madagascar",
      "Mauritius": "Mauricio",
      "Seychelles": "Seychelles",
      "Comoros": "Comoras",
      "Malawi": "Malaui",
      "Tanzania": "Tanzania",
      "Uganda": "Uganda",
      "Rwanda": "Ruanda",
      "Burundi": "Burundi",
      
      // Oceanía
      "Papua New Guinea": "Papúa Nueva Guinea",
      "Fiji": "Fiyi",
      "Solomon Islands": "Islas Salomón",
      "Vanuatu": "Vanuatu",
      "Samoa": "Samoa",
      "Tonga": "Tonga",
      "Kiribati": "Kiribati",
      "Tuvalu": "Tuvalu",
      "Nauru": "Nauru",
      "Palau": "Palaos",
      "Marshall Islands": "Islas Marshall",
      "Micronesia": "Micronesia"
    };
    
    return spanishNames[englishName] || englishName;
  }

  async getAllCountries(): Promise<Country[]> {
    // Verificar si tenemos datos en caché y no han expirado
    if (this.countries.length > 0 && Date.now() - this.lastFetch < this.CACHE_DURATION) {
      return this.countries;
    }

    try {
      console.log('🌍 Fetching countries from API...');
      
      // Usar la API de REST Countries
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2,region');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.status}`);
      }

      const data = await response.json() as CountryApiResponse[];
      
      // Transformar los datos al formato que necesitamos
      this.countries = data.map((country: CountryApiResponse) => {
        const countryCode = country.cca2;
        const englishName = country.name.common;
        const spanishName = this.getSpanishName(englishName, countryCode);
        
        return {
          name: spanishName,
          flag: this.getFlagUrl(countryCode),
          code: countryCode,
          region: country.region
        };
      });

      // Ordenar alfabéticamente por nombre
      this.countries.sort((a, b) => a.name.localeCompare(b.name));
      
      // Agregar "Todos los países" al inicio
      this.countries.unshift({
        name: "Todos los países",
        flag: "🌍",
        code: "ALL",
        region: "Global"
      });

      this.lastFetch = Date.now();
      console.log(`✅ Fetched ${this.countries.length} countries`);
      
      return this.countries;
    } catch (error) {
      console.error('❌ Error fetching countries:', error);
      
      // Fallback: países básicos si la API falla
      return this.getFallbackCountries();
    }
  }

  private getFallbackCountries(): Country[] {
    return [
      { name: "Todos los países", flag: "🌍", code: "ALL", region: "Global" },
      { name: "España", flag: "https://flagcdn.com/es.svg", code: "ES", region: "Europe" },
      { name: "Argentina", flag: "https://flagcdn.com/ar.svg", code: "AR", region: "Americas" },
      { name: "México", flag: "https://flagcdn.com/mx.svg", code: "MX", region: "Americas" },
      { name: "Colombia", flag: "https://flagcdn.com/co.svg", code: "CO", region: "Americas" },
      { name: "Chile", flag: "https://flagcdn.com/cl.svg", code: "CL", region: "Americas" },
      { name: "Alemania", flag: "https://flagcdn.com/de.svg", code: "DE", region: "Europe" },
      { name: "Portugal", flag: "https://flagcdn.com/pt.svg", code: "PT", region: "Europe" },
      { name: "República Checa", flag: "https://flagcdn.com/cz.svg", code: "CZ", region: "Europe" },
      { name: "Hungría", flag: "https://flagcdn.com/hu.svg", code: "HU", region: "Europe" },
      { name: "Austria", flag: "https://flagcdn.com/at.svg", code: "AT", region: "Europe" },
      { name: "Grecia", flag: "https://flagcdn.com/gr.svg", code: "GR", region: "Europe" },
      { name: "Bélgica", flag: "https://flagcdn.com/be.svg", code: "BE", region: "Europe" },
      { name: "Indonesia", flag: "https://flagcdn.com/id.svg", code: "ID", region: "Asia" },
      { name: "Maldivas", flag: "https://flagcdn.com/mv.svg", code: "MV", region: "Asia" },
      { name: "Suiza", flag: "https://flagcdn.com/ch.svg", code: "CH", region: "Europe" },
      { name: "Nueva Zelanda", flag: "https://flagcdn.com/nz.svg", code: "NZ", region: "Oceania" },
      { name: "Laos", flag: "https://flagcdn.com/la.svg", code: "LA", region: "Asia" },
      { name: "Singapur", flag: "https://flagcdn.com/sg.svg", code: "SG", region: "Asia" },
      { name: "Japón", flag: "https://flagcdn.com/jp.svg", code: "JP", region: "Asia" },
      { name: "Tailandia", flag: "https://flagcdn.com/th.svg", code: "TH", region: "Asia" },
      { name: "Vietnam", flag: "https://flagcdn.com/vn.svg", code: "VN", region: "Asia" },
      { name: "Estados Unidos", flag: "https://flagcdn.com/us.svg", code: "US", region: "Americas" },
      { name: "Reino Unido", flag: "https://flagcdn.com/gb.svg", code: "GB", region: "Europe" },
      { name: "Francia", flag: "https://flagcdn.com/fr.svg", code: "FR", region: "Europe" },
      { name: "Italia", flag: "https://flagcdn.com/it.svg", code: "IT", region: "Europe" },
      { name: "Canadá", flag: "https://flagcdn.com/ca.svg", code: "CA", region: "Americas" },
      { name: "Brasil", flag: "https://flagcdn.com/br.svg", code: "BR", region: "Americas" },
      { name: "Australia", flag: "https://flagcdn.com/au.svg", code: "AU", region: "Oceania" },
      { name: "India", flag: "https://flagcdn.com/in.svg", code: "IN", region: "Asia" },
      { name: "China", flag: "https://flagcdn.com/cn.svg", code: "CN", region: "Asia" },
      { name: "Corea del Sur", flag: "https://flagcdn.com/kr.svg", code: "KR", region: "Asia" }
    ];
  }

  async searchCountries(query: string): Promise<Country[]> {
    const countries = await this.getAllCountries();
    
    if (!query.trim()) return countries;
    
    const searchTerm = query.toLowerCase();
    return countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      country.region.toLowerCase().includes(searchTerm)
    );
  }

  getCountryByCode(code: string): Country | undefined {
    return this.countries.find(country => country.code === code);
  }

  getCountriesByRegion(region: string): Country[] {
    return this.countries.filter(country => country.region === region);
  }
}

export default CountriesService;
