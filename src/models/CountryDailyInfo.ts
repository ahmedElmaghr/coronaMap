import { JsonObject, JsonProperty } from "json2typescript";
import { CountryInfo } from "./CountryInfo";

@JsonObject("CountryDailyInfo")
export class CountryDailyInfo {
  @JsonProperty("country", String)
  id: string;
  
  @JsonProperty("updated", Number)
  updated: number;
  @JsonProperty("country", String)
  country: string;
  @JsonProperty("countryInfo")
  countryInfo : CountryInfo;
  @JsonProperty("cases", Number)
  cases: number;
  @JsonProperty("todayCases", Number)
  todayCases: number;
  @JsonProperty("deaths", Number)
  deaths: number;
  @JsonProperty("todayDeaths", Number)
  todayDeaths: number;
  @JsonProperty("recovered", Number)
  recovered: number;
  @JsonProperty("todayRecovered", Number)
  todayRecovered: number;
  @JsonProperty("active", Number)
  active: number;
  @JsonProperty("critical", Number)
  critical: number;
  @JsonProperty("tests", Number)
  tests: number;
  @JsonProperty("population", Number)
  population: number;
  @JsonProperty("continent", String)
  continent: string;

  constructor() {
      this.id = "";
    this.updated = 0;
    this.country = "";
    this.countryInfo = new CountryInfo();
    this.cases = 0;
    this.todayCases = 0;
    this.deaths = 0;
    this.todayDeaths = 0;
    this.recovered = 0;
    this.todayRecovered = 0;
    this.active = 0;
    this.critical = 0;
    this.tests = 0;
    this.population = 0;
    this.continent = "";
  }
}
