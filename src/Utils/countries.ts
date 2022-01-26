import { CountryDailyInfo } from "../models/CountryDailyInfo"
import { SelectOptions } from "../dto/selectOptions"

export const getCountryFromDataset = (dataset : CountryDailyInfo[])=>{
        return dataset.map((elt : CountryDailyInfo)=>{
            let label = elt.country;
            let value = elt.countryInfo?.iso2;
            return new SelectOptions(value,label);
        })
}