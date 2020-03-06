
const constructData = (data, covid19) => {
    var result = [];

    data.forEach((d) => {
        var ville = {
            data : d,
            longitude: d.longitude,
            latitude: d.latitude
        };

        var object = {
            ville,
            case: getCase(d, covid19)
        }
        result.push(object);
    })

    return result;
}

const getCase = (d, covid19) => {
    let variable = covid19.data.filter(word => {
        return word.Country == d.name
    })
    let countryData = variable[0];
    if (countryData) {
        return countryData.TotalCases
    } else {
        return 0
    }
}
export default { constructData };