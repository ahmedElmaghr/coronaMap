import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("CountryInfo")
export class CountryInfo {
  @JsonProperty("_id", Number)
  _id: number;
  @JsonProperty("iso2", String)
  iso2: string;
  @JsonProperty("iso3", String)
  iso3: string;
  @JsonProperty("lat", Number)
  lat: number;
  @JsonProperty("long", Number)
  long: number;
  @JsonProperty("flag", String)
  flag: string;

  constructor() {
    this._id = 0;
    this.iso2 = "";
    this.iso3 = "";
    this.lat = 0;
    this.long = 0;
    this.flag = "";
  }

}
