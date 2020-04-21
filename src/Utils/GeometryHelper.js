const calculateCx = d => {
    if (StringUtils.isNotEmpty(d)) {
      var x = d.coordinate.latitude;
      var y = d.coordinate.longitude;

      var coordinate = [x, y];
      return this.projection()(coordinate)[0];
    }
  };
  const   calculateCy = d => {
    if (StringUtils.isNotEmpty(d)) {
      var x = d.coordinate.latitude;
      var y = d.coordinate.longitude;
      var coordinate = [x, y];
      return this.projection()(coordinate)[1];
    }
  };
export default{calculateCx,calculateCy}