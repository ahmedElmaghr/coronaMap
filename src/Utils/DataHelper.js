
const constructData = (data) => {
    console.log("data", data);
    var dataMap = [];
    dataMap = data.reduce(function (map, node) {
        var name = node.name;
        var coordinate = {
            longitude: node.longitude,
            latitude: node.latitude
        };
        map[name] = {
            coordinate,
            case : node.case
        };
        return map;
    }, []);

    return dataMap;
}


export default { constructData };