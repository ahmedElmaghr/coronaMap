import { JsonObject, JsonProperty } from "json2typescript";
import { Timeline } from "./Timeline";

@JsonObject("HistoricalCountry")
export class HistoricalCountry {

    @JsonProperty("country")
    country : string;
    @JsonProperty("province")
    province : Array<string>;
    @JsonProperty("timeline")
    timeline : Timeline;


	constructor() {
        this.country = '';
        this.province= [];
        this.timeline= new Timeline();
	}

}