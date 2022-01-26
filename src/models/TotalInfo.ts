import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("TotalInfo")
export class TotalInfo {
  @JsonProperty("updated", Number)
  updated: number;
  @JsonProperty("affectedCountries", Number)
  affectedCountries: number;
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

  constructor() {
    this.updated = 0;
    this.affectedCountries = 0;
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
  }
}
