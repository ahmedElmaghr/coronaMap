import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("TotalInfo")
export class TotalInfo {
  @JsonProperty("updated", Number)
  private updated: number;
  @JsonProperty("affectedCountries", Number)
  private affectedCountries: number;
  @JsonProperty("cases", Number)
  private cases: number;
  @JsonProperty("todayCases", Number)
  private todayCases: number;
  @JsonProperty("deaths", Number)
  private deaths: number;
  @JsonProperty("todayDeaths", Number)
  private todayDeaths: number;
  @JsonProperty("recovered", Number)
  private recovered: number;
  @JsonProperty("todayRecovered", Number)
  private todayRecovered: number;
  @JsonProperty("active", Number)
  private active: number;
  @JsonProperty("critical", Number)
  private critical: number;
  @JsonProperty("tests", Number)
  private tests: number;
  @JsonProperty("population", Number)
  private population: number;

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
