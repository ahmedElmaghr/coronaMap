import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("timeline")
export class Timeline {
  @JsonProperty("cases")
  cases: Map<string, string>;
  @JsonProperty("deaths")
  deaths: Map<string, string>;
  @JsonProperty("recovered")
  recovered: Map<string, string>;

  constructor() {
    this.cases = new Map();
    this.deaths = new Map();
    this.recovered = new Map();
  }
}
