
export const constructData = (pays, statCovid19) => {
    var result = new Array();
    var i = 0;
    pays.forEach((d) => {
        var coordinate = {
            longitude: d.longitude,
            latitude: d.latitude
        };

        var object = {
            id: i,
            coordinate,
            data: d,
            stat: getStatByCountry(d, statCovid19)
        }
        result.push(object);
        i++;
    })

    return result;
}

export const getStatByCountry = (d, covid19) => {
    let variable = covid19.filter(world => {
        let countryTrimmed = world.country ? world.country.trim() : "";
        return countryTrimmed === d.name
    })
    let countryData = variable[0];
    if (countryData) {
        return countryData
    } else {
        return {
            country: d.name
        };
    }
}