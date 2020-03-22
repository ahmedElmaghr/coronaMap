
const constructData = (pays, statCovid19) => {
    var result = [];
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
            stat: getStatByPays(d, statCovid19)
        }
        result.push(object);
        i++;
    })

    return result;
}

const getStatByPays = (d, covid19) => {
    let variable = covid19.data.filter(word => {
        let countryTrimmed = word.Country ? word.Country.trim() : "";
        return countryTrimmed === d.name
    })
    let countryData = variable[0];
    if (countryData) {
        return countryData
    } else {
        return {
            Country: d.name
        };
    }
}
export default { constructData, getStatByPays };