
const constructData = (pays, statCovid19) => {
    var result = [];

    pays.forEach((d) => {
        var coordinate = {
            longitude: d.longitude,
            latitude: d.latitude
        };

        var object = {
            coordinate,
            data : d,
            stat: getStatByPays(d, statCovid19)
        }
        result.push(object);
    })

    return result;
}

const getStatByPays = (d, covid19) => {
    let variable = covid19.data.filter(word => {
        return word.Country == d.name
    })
    let countryData = variable[0];
    if (countryData) {
        return countryData
    } else {
        return 0
    }
}
export default { constructData };