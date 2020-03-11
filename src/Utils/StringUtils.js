export class StringUtils {
  //verify string not empty
  static isNotEmpty = entity => {
    return entity != null && entity.trim() != "";
  };
}
