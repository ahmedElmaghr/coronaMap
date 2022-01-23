import { CountryDailyInfo } from "../models/CountryDailyInfo"
import { CountryRef } from "../dto/countryRef"

export const getCountryFromDataset = (dataset : CountryDailyInfo[])=>{
        return dataset.map((elt : CountryDailyInfo)=>{
            let label = elt.country;
            let value = elt.countryInfo?.iso2;
            return new CountryRef(value,label);
        })
}